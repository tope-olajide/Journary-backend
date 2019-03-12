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

  static async deleteEntry({
    params,
    user
  }, res) {
    const userId = user.userid;
    const { entryId } = params;
    const findEntryQuery = 'SELECT * FROM entries WHERE entryId=$1';
    const deleteQuery = 'DELETE FROM entries WHERE entryId=$1 returning *';
    try {
      const { rows } = await db.query(findEntryQuery, [entryId]);
      if (!rows[0]) {
        return res.status(404).json({
          success: false,
          message: 'diary does not exist!'
        });
      }
      if (rows[0].userid !== userId) {
        return res.status(401).json({
          success: false,
          message: 'You cannot modify diary not created by You!'
        });
      }
      const deleteDairy = await db.query(deleteQuery, [entryId]);
      if (deleteDairy.rows[0]) {
        res.status(200).json({
          success: true,
          message: 'Diary Deleted!'
        });
      }
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
