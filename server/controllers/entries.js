/* eslint-disable require-jsdoc */
import {
  validateEntry
} from '../middleware/validator';
import db from '../db';

export default class Entry {
  static async addEntry({ user, body }, res) {
    const userId = user.userid;
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
    const text = `INSERT INTO entries (entryImageUrl, title, content, userId)
        VALUES($1, $2, $3, $4)
        returning *`;
    const values = [
      entryImageUrl,
      title,
      content,
      userId
    ];
    try {
      const { rows } = await db.query(text, values);
      const result = rows[0];
      return res.status(201).json({
        success: true,
        message: 'New Entry created',
        result,
        userId
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating Entry',
        error
      });
    }
  }
}
