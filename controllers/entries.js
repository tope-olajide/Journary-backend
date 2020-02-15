/* eslint-disable no-console */
/* eslint-disable require-jsdoc */

import {
  validateEntry
} from '../middleware/validator';
import db from '../db';

export default class Entry {
  static async addEntry({
    user,
    body
  }, res) {
    const userId = user.id;
    const {
      featureImageUrl,
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
        VALUES ($1, $2, $3, $4)
        returning *`;
    const values = [
      featureImageUrl,
      title,
      content,
      userId
    ];
    try {
      const {
        rows
      } = await db.query(text, values);
      const entry = rows[0];
      console.log(entry)
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
      featureImageUrl,
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
        featureImageUrl || rows[0].entry_image_url,
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
      await db.query(deleteQuery, [entryId]);
      res.status(200).json({
        success: true,
        message: 'Diary Deleted successfully!'
      });
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
    const updateViewCountQuery = 'UPDATE entries SET view_count = view_count + 1 WHERE entry_id = $1 ';
    try {
      const {
        rows
      } = await db.query(text, [entryId]);
      if (!rows[0]) {
        return res.status(404).json({
          success: true,
          message: 'diary not found',
          entry: []
        });
      }
      if (rows[0].is_private === true && rows[0].user_id !== userId) {
        return res.status(401).json({
          success: false,
          message: 'You cannot view an entry that was not created by you'
        });
      }
      let isOwner;
      if (rows[0].user_id === userId) {
        isOwner = true;
      } else { isOwner = false; }
      await db.query(updateViewCountQuery, [entryId]);
      return res.status(200).json({
        success: true,
        message: 'Diary found',
        entry: rows,
        isOwner
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static async getEntry({
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
          entry: []
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
        entry: rows,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static async getUserPrivateEntries({
    user, query
  }, res) {
    const limit = 7;
    const currentPage = Number(query.page) || 1;
    const offset = (currentPage - 1) * limit; const userId = user.id;
    const text = 'SELECT entry_id,title,entry_image_url,content,view_count FROM entries  WHERE is_private =$1 and user_id =$4 LIMIT $2 OFFSET $3';
    const values = ['true', limit, offset, userId];
    try {
      const {
        rows
      } = await db.query(text, values);
      if (!rows[0]) {
        return res.status(200).json({
          success: false,
          message: 'diary not found',
          entries: []
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Diaries found',
        entries: rows,
        currentPage
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static async getUserPublicEntries({
    user, query
  }, res) {
    const limit = 7;
    const currentPage = Number(query.page) || 1;
    const offset = (currentPage - 1) * limit; const userId = user.id;
    const text = 'SELECT entry_id,title,entry_image_url,content,view_count FROM entries  WHERE is_private =$1 and user_id =$4 LIMIT $2 OFFSET $3';
    const values = ['false', limit, offset, userId];
    try {
      const {
        rows
      } = await db.query(text, values);
      if (!rows[0]) {
        return res.status(200).json({
          success: false,
          message: 'diary not found',
          entries: []
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Diaries found',
        entries: rows,
        currentPage
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static async getAllPublicEntries(req, res) {
    const limit = 10;
    const currentPage = Number(req.query.page) || 1;
    const offset = (currentPage - 1) * limit;
    const text = 'SELECT entry_id,title,entry_image_url,content,username,view_count FROM entries INNER JOIN users ON users.user_id = entries.user_id WHERE is_private =$1 LIMIT $2 OFFSET $3';
    const values = ['false', limit, offset];
    try {
      const {
        rows
      } = await db.query(text, values);
      if (!rows[0]) {
        return res.status(200).json({
          success: false,
          message: 'diary not found',
          entries: []
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Diaries found',
        entries: rows,
        currentPage
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
          entres: []
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
}