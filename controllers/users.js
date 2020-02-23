/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
import schedule from 'node-schedule';
import nodemailer from 'nodemailer';
import jsonwebtoken from 'jsonwebtoken';
import db from '../db';
import validateUser from '../utils/validateSignUpData';
import validateModifiedUser from '../utils/validateModifiedUserData';
import Encryption from '../middleware/encryption';
import config from '../config/config';
import scheduleTask, { cancelTask } from '../utils/scheduler';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
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
        email: result.email,
        expiresIn: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
      }, config.jwtSecret);
      return res.status(201).json({
        success: true,
        message: 'New user created/token generated!',
        result,
        token
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'An error occured',
        error
      });
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
          email: result.email,
          expiresIn: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
        }, config.jwtSecret);
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
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'An error occured',
        error
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
      imageUrl,
    } = body;
    const validateUserDetails = validateModifiedUser({
      fullname, email, about
    });
    if (validateUserDetails[0] === false) {
      return res.status(400).json({
        success: false,
        message: validateUserDetails[1]
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
        imageUrl,
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
        updatedUser: response.rows[0],
      });
    } catch (error) {
      console.log(error);
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
      const privateEntries = await db.query(queryPrivateEntriesCount, values);
      const publicEntries = await db.query(queryPublicEntriesCount, values);
      const totalEntriesCount = parseInt(privateEntries.rows[0].count, 10) + parseInt(publicEntries.rows[0].count, 10);
      if (!rows[0]) {
        return res.status(404).json({
          success: true,
          message: 'diary not found',
          entry: []
        });
      }
      console.log(rows);
      return res.status(200).json({
        success: true,
        message: 'User found',
        userData: rows,
        privateEntriesCount: privateEntries.rows[0].count,
        publicEntriesCount: publicEntries.rows[0].count,
        totalEntriesCount
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
