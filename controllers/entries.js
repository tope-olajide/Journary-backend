import { validateEntry } from '../middleware/validator';
import db from '../db';
import Encryption from '../middleware/encryption';

const newEncryption = new Encryption();
const decryptEntries = (encryptedEntriesArray) => {
  const decryptedEntries = encryptedEntriesArray.map(entry => ({
    title: newEncryption.decryptDiary(entry.title),
    entry_image_url: newEncryption.decryptDiary(entry.entry_image_url),
    entry_id: entry.entry_id
  }));
  return decryptedEntries;
};


/**
 * @description - Class Definition for the Entry Object
 *
 * @export
 *
 * @class Entry
 */
export default class Entry {
  /**
   * @description - Creates a new diary entry
   *
   * @param {object} req - HTTP Request
   *
   * @param {object} res - HTTP Response
   *
   * @return {json} Returns json object
   *
   * @memberof Entry
   */
  static async addEntry({ user, body }, res) {
    const userId = user.id;
    const { featureImageUrl, title, content } = body;
    const encryptedFeatureImageUrl = newEncryption.encryptDiary(
      featureImageUrl
    );
    const encryptedTitle = newEncryption.encryptDiary(title);
    const encryptedContent = newEncryption.encryptDiary(content);
    console.log(encryptedFeatureImageUrl);
    console.log(encryptedTitle);
    console.log(encryptedContent);
    const validateEntryError = validateEntry({
      title,
      content,
    });
    if (validateEntryError) {
      return res.status(400).json({
        success: false,
        message: validateEntryError,
      });
    }
    const text = `INSERT INTO entries (entry_image_url, title, content, user_id)
        VALUES ($1, $2, $3, $4)
        returning *`;
    const values = [encryptedFeatureImageUrl, encryptedTitle, encryptedContent, userId];
    try {
      const { rows } = await db.query(text, values);
      const entry = rows[0];
      return res.status(201).json({
        success: true,
        message: 'New Entry created',
        entry,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating Entry',
        error,
      });
    }
  }

  /**
   * @description - Modifies an entry
   *
   * @param {object} req - HTTP Request
   *
   * @param {object} res - HTTP Response
   *
   * @return {json} Returns json object
   *
   * @memberof Entry
   */
  static async modifyEntry({ user, body, params }, res) {
    const userId = user.id;
    const { entryId } = params;
    const {
      featureImageUrl, title, content, isPrivate
    } = body;
    const validateEntryError = validateEntry({
      title,
      content,
    });
    if (validateEntryError) {
      return res.status(400).json({
        success: false,
        message: validateEntryError,
      });
    }
    const findEntryQuery = 'SELECT * FROM entries WHERE entry_id=$1';
    const updateEntryQuery = 'UPDATE entries SET entry_image_url=$1,title=$2,content=$3,is_private=$4 WHERE entry_id=$5 returning *';
    try {
      const { rows } = await db.query(findEntryQuery, [entryId]);
      if (!rows[0]) {
        return res.status(404).json({
          success: false,
          message: 'diary does not exist!',
        });
      }
      if (rows[0].user_id !== userId) {
        return res.status(401).json({
          success: false,
          message: 'You cannot modify a diary that was not created by You!',
        });
      }
      /*  If a user upload a new image, encrypt the url and save,
      else save the old encrypted image */
      const encryptedImageUrl = featureImageUrl
        ? newEncryption.encryptDiary(featureImageUrl)
        : rows[0].entry_image_url;
      /* If a user modify the title on an entry, encrypt the modified title
        and save, else save the old encrypted title */
      const encryptedTitle = title
        ? newEncryption.encryptDiary(title)
        : rows[0].title;
      /* If a user modify the content on an entry, encrypt the modified content
       and save, else save the old encrypted content */
      const encryptedContent = content
        ? newEncryption.encryptDiary(content)
        : rows[0].content;
      const values = [
        encryptedImageUrl,
        encryptedTitle,
        encryptedContent,
        isPrivate || rows[0].is_private,
        entryId,
      ];
      const modifiedEntry = await db.query(updateEntryQuery, values);
      return res.status(200).json({
        success: true,
        message: 'Entry updated successfully',
        modifiedEntry: modifiedEntry.rows[0],
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error Updating diary',
        error,
      });
    }
  }

  /**
   * @description - Delete an entry
   *
   * @param {object} req - HTTP Request
   *
   * @param {object} res - HTTP Response
   *
   * @return {json} Returns json object
   *
   */
  static async deleteEntry({ params, user }, res) {
    const userId = user.id;
    const { entryId } = params;
    const findEntryQuery = 'SELECT * FROM entries WHERE entry_id =$1';
    const deleteQuery = 'DELETE FROM entries WHERE entry_id =$1 returning *';
    try {
      const { rows } = await db.query(findEntryQuery, [entryId]);
      if (!rows[0]) {
        return res.status(404).json({
          success: false,
          message: 'diary does not exist!',
        });
      }
      if (rows[0].user_id !== userId) {
        return res.status(401).json({
          success: false,
          message: 'You cannot delete diary not created by You!',
        });
      }
      await db.query(deleteQuery, [entryId]);
      res.status(200).json({
        success: true,
        message: 'Diary Deleted successfully!',
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  /**
   * @description - View entry details
   *
   * @param {object} req - HTTP Request
   *
   * @param {object} res - HTTP Response
   *
   * @return {json} Returns json object
   *
   */
  static async viewEntry({ params, user }, res) {
    const userId = user.id;
    const { entryId } = params;
    const text = 'SELECT * FROM entries WHERE entry_id = $1';
    const updateViewCountQuery = 'UPDATE entries SET view_count = view_count + 1 WHERE entry_id = $1 ';
    try {
      const { rows } = await db.query(text, [entryId]);
      if (!rows[0]) {
        return res.status(404).json({
          success: true,
          message: 'diary not found',
          entry: [],
        });
      }
      if (rows[0].is_private === true && rows[0].user_id !== userId) {
        return res.status(401).json({
          success: false,
          message: 'You cannot view an entry that was not created by you',
        });
      }
      let isOwner;
      if (rows[0].user_id === userId) {
        isOwner = true;
      } else {
        isOwner = false;
      }
      await db.query(updateViewCountQuery, [entryId]);
      const entryDetails = {
        title: newEncryption.decryptDiary(rows[0].title),
        content: newEncryption.decryptDiary(rows[0].content),
        entry_image_url: newEncryption.decryptDiary(rows[0].entry_image_url),
        is_private: rows[0].is_private,
        user_id: rows[0].user_id,
        entry_id: rows[0].entry_id,
        created_at: rows[0].created_at,
        view_count: rows[0].view_count,
      };
      console.log(entryDetails);
      return res.status(200).json({
        success: true,
        message: 'Diary found',
        entry: entryDetails,
        isOwner,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  /**
   * @description - View entry details with no view count.
   * used to set default input values on the front end
   * when modifying entries
   *
   * @param {object} req - HTTP Request
   *
   * @param {object} res - HTTP Response
   *
   * @return {json} Returns json object
   *
   */
  static async getEntry({ params, user }, res) {
    const userId = user.id;
    const { entryId } = params;
    const text = 'SELECT * FROM entries WHERE entry_id = $1';
    try {
      const { rows } = await db.query(text, [entryId]);
      if (!rows[0]) {
        return res.status(404).json({
          success: true,
          message: 'diary not found',
          entry: [],
        });
      }
      if (rows[0].is_private === true && rows[0].user_id !== userId) {
        return res.status(401).json({
          success: false,
          message: 'You cannot view an entry that was not created by you',
        });
      }
      const entryDetails = {
        title: newEncryption.decryptDiary(rows[0].title),
        content: newEncryption.decryptDiary(rows[0].content),
        entry_image_url: newEncryption.decryptDiary(rows[0].entry_image_url),
        is_private: rows[0].is_private,
        user_id: rows[0].user_id,
        entry_id: rows[0].entry_id,
        created_at: rows[0].created_at,
        view_count: rows[0].view_count,
      };
      return res.status(200).json({
        success: true,
        message: 'Diary found',
        entry: entryDetails,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  /**
   * @description - fetches only the private entries belonging to a user
   *
   * @param {object} req - HTTP Request
   *
   * @param {object} res - HTTP Response
   *
   * @return {json} Returns json object
   *
   */
  static async getUserPrivateEntries({ user, query }, res) {
    const limit = 10;
    const currentPage = Number(query.page) || 1;
    const offset = (currentPage - 1) * limit;
    const userId = user.id;
    const text = 'SELECT entry_id,title,entry_image_url,content,view_count FROM entries  WHERE is_private =$1 and user_id =$4 LIMIT $2 OFFSET $3';
    const values = ['true', limit, offset, userId];
    try {
      const { rows } = await db.query(text, values);
      if (!rows[0]) {
        return res.status(200).json({
          success: false,
          message: 'diary not found',
          entries: [],
        });
      }
      const decryptedEntries = decryptEntries(rows);
      console.log(decryptedEntries);
      return res.status(200).json({
        success: true,
        message: 'Diaries found',
        entries: decryptedEntries,
        currentPage,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  /**
   * @description - fetches only the public entries belonging to a user
   *
   * @param {object} req - HTTP Request
   *
   * @param {object} res - HTTP Response
   *
   * @return {json} Returns json object
   *
   */
  static async getUserPublicEntries({ user, query }, res) {
    const limit = 10;
    const currentPage = Number(query.page) || 1;
    const offset = (currentPage - 1) * limit;
    const userId = user.id;
    const text = 'SELECT entry_id,title,entry_image_url,content,view_count FROM entries  WHERE is_private =$1 and user_id =$4 LIMIT $2 OFFSET $3';
    const values = ['false', limit, offset, userId];
    try {
      const { rows } = await db.query(text, values);
      if (!rows[0]) {
        return res.status(200).json({
          success: false,
          message: 'diary not found',
          entries: [],
        });
      }
      const decryptedEntries = decryptEntries(rows);
      return res.status(200).json({
        success: true,
        message: 'Diaries found',
        entries: decryptedEntries,
        currentPage,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  /**
   * @description - fetches all the public entries from the database
   *
   * @param {object} req - HTTP Request
   *
   * @param {object} res - HTTP Response
   *
   * @return {json} Returns json object
   *
   */
  static async getAllPublicEntries(req, res) {
    const limit = 10;
    const currentPage = Number(req.query.page) || 1;
    const offset = (currentPage - 1) * limit;
    const text = 'SELECT entry_id,title,entry_image_url,content,username,view_count FROM entries INNER JOIN users ON users.user_id = entries.user_id WHERE is_private =$1 LIMIT $2 OFFSET $3';
    const values = ['false', limit, offset];
    const countAllPublicEntries = 'SELECT COUNT(*) FROM entries WHERE is_private =$1';
    try {
      const { rows } = await db.query(text, values);
      if (!rows[0]) {
        return res.status(200).json({
          success: false,
          message: 'diary not found',
          entries: [],
        });
      }
      const totalEntries = await db.query(countAllPublicEntries, ['false']);
      const decryptedEntries = decryptEntries(rows);
      return res.status(200).json({
        success: true,
        message: 'Diaries found',
        entries: decryptedEntries,
        currentPage,
        totalEntries: totalEntries.rows,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  /**
   * @description - Search for entry
   *
   * @param {object} req - HTTP Request
   *
   * @param {object} res - HTTP Response
   *
   * @return {json} Returns json object
   *
   */
  static async searchEntries({ query, user }, res) {
    const { search } = query;
    const searchQuery = search.split(' ');
    const text = 'SELECT * FROM entries WHERE title LIKE $1 OR content LIKE $1';
    const values = [`%${searchQuery[0]}%`];
    const userId = user.id;
    try {
      const { rows } = await db.query(text, values);
      if (!rows[0]) {
        return res.status(200).json({
          success: false,
          message: 'diary not found',
          entres: [],
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
        diary: entries,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
