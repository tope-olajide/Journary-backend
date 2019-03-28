/* eslint-disable no-console */
/* eslint-disable require-jsdoc */
import cron from 'node-cron';
import nodemailer from 'nodemailer';
import {
  validateEntry
} from '../middleware/validator';
import db from '../db';
import config from '../config/config'


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.email,
    pass: config.password
  }
});
export default class Entry {
  static async addEntry({
    user,
    body
  }, res) {
    const userId = user.id;
    const {
      entryImageUrl,
      title,
      content,
    } = body;
    const validateEntryError = validateEntry({
      title,
      content,
    });
    if (validateEntryError) {
      return res.status(400).json({
        success: false,
        message: validateEntryError
      });
    }
    const text = `INSERT INTO entries (entry_image_url, title, content, user_id)
        VALUES($1, $2, $3, $4)
        returning *`;
    const values = [
      entryImageUrl,
      title,
      content,
      userId
    ];
    try {
      const {
        rows
      } = await db.query(text, values);
      const entry = rows[0];
      return res.status(201).json({
        success: true,
        message: 'New Entry created',
        entry
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating Entry',
        error
      });
    }
  }

  static async modifyEntry({
    user,
    body,
    params
  }, res) {
    const userId = user.id;
    const {
      entryId
    } = params;
    const {
      entryImageUrl,
      title,
      content,
      isPrivate
    } = body;
    const validateEntryError = validateEntry({
      title,
      content,
    });
    if (validateEntryError) {
      return res.status(400).json({
        success: false,
        message: validateEntryError
      });
    }
    const findEntryQuery = 'SELECT * FROM entries WHERE entry_id=$1';
    const updateEntryQuery = 'UPDATE entries SET entry_image_url=$1,title=$2,content=$3,is_private=$4 WHERE entry_id=$5 returning *';
    try {
      const {
        rows
      } = await db.query(findEntryQuery, [entryId]);
      if (!rows[0]) {
        return res.status(404).json({
          success: false,
          message: 'diary does not exist!'
        });
      }
      if (rows[0].user_id !== userId) {
        return res.status(401).json({
          success: false,
          message: 'You cannot modify a diary that was not created by You!'
        });
      }
      const values = [
        entryImageUrl || rows[0].entry_image_url,
        title || rows[0].title,
        content || rows[0].content,
        isPrivate || rows[0].is_private,
        entryId
      ];
      const response = await db.query(updateEntryQuery, values);
      return res.status(200).json({
        success: true,
        message: 'Entry updated successfully',
        response: response.rows[0]
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error Updating diary',
        error
      });
    }
  }

  static async deleteEntry({
    params,
    user
  }, res) {
    const userId = user.id;
    const {
      entryId
    } = params;
    const findEntryQuery = 'SELECT * FROM entries WHERE entry_id =$1';
    const deleteQuery = 'DELETE FROM entries WHERE entry_id =$1 returning *';
    try {
      const {
        rows
      } = await db.query(findEntryQuery, [entryId]);
      if (!rows[0]) {
        return res.status(404).json({
          success: false,
          message: 'diary does not exist!'
        });
      }
      if (rows[0].user_id !== userId) {
        return res.status(401).json({
          success: false,
          message: 'You cannot delete diary not created by You!'
        });
      }
      const deleteDairy = await db.query(deleteQuery, [entryId]);
      if (deleteDairy.rows[0]) {
        res.status(200).json({
          success: true,
          message: 'Diary Deleted successfully!'
        });
      }
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static async viewEntry({
    params,
    user
  }, res) {
    const userId = user.id;
    const {
      entryId
    } = params;
    const text = 'SELECT * FROM entries WHERE entry_id = $1';
    try {
      const {
        rows
      } = await db.query(text, [entryId]);
      if (!rows[0]) {
        return res.status(404).json({
          success: true,
          message: 'diary not found',
          dairy: []
        });
      }
      if (rows[0].is_private === true && rows[0].user_id !== userId) {
        return res.status(401).json({
          success: false,
          message: 'You cannot view an entry that was not created by you'
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Diary found',
        diary: rows[0]
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static async getUserPrivateEntries({
    user
  }, res) {
    const userId = user.id;
    const text = 'SELECT * FROM entries WHERE is_private = $1 and user_id =$2';
    const values = [
      true, userId
    ];
    try {
      const {
        rows
      } = await db.query(text, values);
      if (!rows[0]) {
        return res.status(200).json({
          success: true,
          message: 'diary not found',
          dairy: []
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Diary found',
        diary: rows[0]
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static async getUserPublicEntries({
    user
  }, res) {
    const userId = user.id;
    const text = 'SELECT * FROM entries WHERE is_Private = $1 and user_id =$2';
    const values = [
      true, userId
    ];
    try {
      const {
        rows
      } = await db.query(text, values);
      if (!rows[0]) {
        return res.status(200).json({
          success: false,
          message: 'diary not found',
          dairy: []
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Diary found',
        diary: rows[0]
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static async getAllPublicEntries(req, res) {
    const text = 'SELECT * FROM entries WHERE is_private =$1';
    const values = [false];
    try {
      const {
        rows
      } = await db.query(text, values);
      if (!rows[0]) {
        return res.status(200).json({
          success: false,
          message: 'diary not found',
          dairy: []
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Diaries found',
        diary: rows[0]
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static async searchEntries({
    query,
    user
  }, res) {
    const {
      search
    } = query;
    const searchQuery = search.split(' ');
    const text = 'SELECT * FROM entries WHERE title LIKE $1 OR content LIKE $1';
    const values = [`%${searchQuery[0]}%`];
    const userId = user.id;
    try {
      const {
        rows
      } = await db.query(text, values);
      if (!rows[0]) {
        return res.status(200).json({
          success: false,
          message: 'diary not found',
          dairy: []
        });
      }

      const entries = rows.filter((entry) => {
        if (!entry.is_private) {
          return entry;
        }
        return entry.user_id === userId;
      });

      return res.status(200).json({
        success: true,
        message: 'Diaries found',
        diary: entries
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static async setNotifications({
    user,
    body
  }, res) {
    const userId = user.id;
    const {
      schedule
    } = body;

    const findNotificationSettingsQuery = 'SELECT * FROM users WHERE user_id=$1';

    const updateNotificationSettingsQuery = 'UPDATE users SET notification_settings=$1 WHERE user_id=$2 returning *';
    try {
      const updatedUser = await db.query(updateNotificationSettingsQuery, [schedule, userId]);
      const task = cron.schedule(schedule, () => {
        console.log('---------------------');
        console.log('Running Cron Job');
        const mailOptions = {
          from: 'COMPANYEMAIL@gmail.com',
          to: updatedUser.rows[0].email,
          subject: 'Not a GDPR update ;)',
          text: 'Hi there, this email was automatically sent by us'
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
      }
      return res.status(200).json({
        success: true,
        message: 'Diaries found',
        diary: updatedUser.rows[0]
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
