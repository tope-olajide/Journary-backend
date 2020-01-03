/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
import cron from 'node-cron';
import nodemailer from 'nodemailer';
import jsonwebtoken from 'jsonwebtoken';
import db from '../db';
import validateUser from '../utils/validateSignUpData';
import Encryption from '../middleware/encryption';
import config from '../config/config';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.email,
    pass: config.password
  }
});
const newEncryption = new Encryption();

export default class User {
  static async signupUser(req, res) {
    const {
      fullname,
      username,
      password,
      email
    } = req.body;

    const validateUserDetails = validateUser({
      fullname, username, password, email
    });
    if (validateUserDetails[0] === false) {
      return res.status(400).json({
        success: false,
        message: validateUserDetails[1]
      });
    }
    const text = 'SELECT * FROM users WHERE username = $1 OR email =$2';
    const values = [username, email];
    try {
      const usernameOrEmail = await db.query(text, values);
      if (usernameOrEmail.rows[0]) {
        if (usernameOrEmail.rows[0].username.toUpperCase() === username.toUpperCase()) {
          return res.status(400).json({
            success: false,
            message: `${username} is already taken`
          });
        }
        if (usernameOrEmail.rows[0].email.toUpperCase() === email.toUpperCase()) {
          return res.status(400).json({
            success: false,
            message: `${email} is already taken`
          });
        }
      }
      const encryptedPassword = newEncryption.generateHash(password);
      const text2 = `INSERT INTO
    users(fullname, username, password, email)
      VALUES($1, $2, $3, $4)
      returning *`;
      const values2 = [
        fullname,
        username,
        encryptedPassword,
        email
      ];
      const {
        rows
      } = await db.query(text2, values2);
      const result = rows[0];
      const token = jsonwebtoken.sign({
        id: result.user_id,
        username: result.username,
        expiresIn: '24h'
      }, 'config.jwtSecret');
      return res.status(201).json({
        success: true,
        message: 'New user created/token generated!',
        result,
        token
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static async signInUser(req, res) {
    const { authName } = req.body;
    const text = 'SELECT * FROM users WHERE username = $1 OR email =$1';
    const values = [authName];
    try {
      const {
        rows
      } = await db.query(text, values);
      const result = rows[0];
      if (!result) {
        return res.status(401).json({
          success: false,
          message: 'user not found',
          result
        });
      }
      if (newEncryption.verifyHash(req.body.password, result.password)) {
        const token = jsonwebtoken.sign({
          id: result.user_id,
          username: result.username,
          expiresIn: '24h'
        }, 'config.jwtSecret');
        return res.status(200).json({
          success: true,
          message: 'User Signed In/token generated!',
          token
        });
      }
      res.status(401).json({
        success: false,
        message: 'Invalid pasword!'
      });
    } catch (error) {
      return res.status(400).res.status(500).json({
        success: false,
        message: 'An error occured'
      });
    }
  }

  static async modifyUser({
    body,
    user
  }, res) {
    const userId = user.id;
    const {
      fullname,
      email,
      about,
      image
    } = body;
    const validateUserDetails = validateModifiedUser({
      fullname,
      email
    });
    if (validateUserDetails) {
      return res.status(400).json({
        success: false,
        message: validateUserDetails
      });
    }
    const findUserQuery = 'SELECT * FROM users WHERE user_id=$1';
    const updateUserQuery = 'UPDATE users SET fullname=$1,email=$2,about=$3,user_image_url=$4 WHERE user_id=$5 returning *';
    try {
      const {
        rows
      } = await db.query(findUserQuery, [userId]);
      if (!rows[0]) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
      const values = [
        fullname,
        email,
        about,
        image,
        userId
      ];
      const values2 = [
        email,
        userId
      ];
      const text = 'SELECT * FROM users WHERE email = $1 and user_id != $2';
      const findDuplicateEmail = await db.query(text, values2);
      if (findDuplicateEmail.rows[0]) {
        return res.status(400).json({
          success: false,
          message: 'User with this email address exist already',
          user: findDuplicateEmail.rows
        });
      }
      const response = await db.query(updateUserQuery, values);
      return res.status(200).json({
        success: true,
        message: 'User record updated',
        updatedUser: response.rows[0]
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error Updating user's profile",
        error
      });
    }
  }

  static async getUser({
    user
  }, res) {
    const userId = user.id;
    const text = 'SELECT * FROM users WHERE user_id = $1';
    const queryPrivateEntriesCount = 'SELECT COUNT(*) FROM entries WHERE is_Private = true and user_id =$1';
    const queryPublicEntriesCount = 'SELECT COUNT(*) FROM entries WHERE is_private = false and user_id =$1';
    const values = [userId];
    try {
      const {
        rows
      } = await db.query(text, values);
      const privateEntriesCount = await db.query(queryPrivateEntriesCount, values);
      const publicEntriesCount = await db.query(queryPublicEntriesCount, values);
      const totalEntriesCount = parseInt(privateEntriesCount.rows[0].count, 10) + parseInt(publicEntriesCount.rows[0].count, 10);
      if (!rows[0]) {
        return res.status(404).json({
          success: true,
          message: 'diary not found',
          entry: []
        });
      }
      return res.status(200).json({
        success: true,
        message: 'User found',
        userData: rows,
        privateEntriesCount: privateEntriesCount.rows[0].count,
        publicEntriesCount: publicEntriesCount.rows[0].count,
        totalEntriesCount
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static async getReminderSettings({
    user
  }, res) {
    const userId = user.id;
    const text = 'SELECT notification_settings FROM users WHERE user_id = $1';
    try {
      const {
        rows
      } = await db.query(text, [userId]);
      if (!rows[0].notification_settings) {
        return res.status(200).json({
          success: true,
          message: 'reminder found',
          reminder: 'Off'
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Reminder found',
        reminder: rows[0].notification_settings,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static async setReminderSettings({
    user,
    body
  }, res) {
    const userId = user.id;
    const {
      schedule
    } = body;
    console.log(schedule);

    const updateNotificationSettingsQuery = 'UPDATE users SET notification_settings=$1 WHERE user_id=$2 returning *';
    try {
      const updatedUser = await db.query(updateNotificationSettingsQuery, [schedule, userId]);
      /*  const task = cron.schedule(schedule, () => {
        console.log('---------------------');
        console.log('Running Cron Job');
        const mailOptions = {
          from: `My Diary <noreply@my-diary.com>`,
          to: updatedUser.rows[0].email,
          subject: 'Reminder',
          text: 'Hi there, this email was automatically sent by us in order to remind you to write a new diary today. To unsubscribe for this reminder, login to the app and turn it off from your settings'
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            throw error;
          } else {
            console.log('Email successfully sent!');
          }
        });
      }, {
        scheduled: false
      });
      if (schedule === 'Off') {
        task.destroy();
      } else {
        task.start();
      } */
      return res.status(200).json({
        success: true,
        message: 'Diaries found',
        reminder: updatedUser.rows[0].notification_settings,
        schedule
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
