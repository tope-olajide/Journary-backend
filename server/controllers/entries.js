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

  static async modifyEntry({ user, body, params }, res) {
    const userId = user.userid;
    const { entryId } = params;
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
    const findEntryQuery = 'SELECT * FROM entries WHERE entryId=$1';
    const updateEntryQuery = 'UPDATE users SET entryImageUrl=$1,title=$2,content=$3,isPrivate=$4 returning *';
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
          message: 'You cannot modify a diary that was not created by You!'
        });
      }
      const values = [
        entryImageUrl || rows[0].entryImageUrl,
        title || rows[0].title,
        content || rows[0].content,
        isPrivate || rows[0].isPrivate
      ];
      const response = await db.query(updateEntryQuery, values);
      return res.status(200).json({
        success: true,
        message: 'Entry updated successfully',
        response: response.row[0]
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error Updating diary',
        error
      });
    }
  }
}
