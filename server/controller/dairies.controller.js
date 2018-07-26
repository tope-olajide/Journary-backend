import diaryDB from '../models/entriesDB';
/**
 * Business Controller.
 * @class DairyController
 * */
export default class DairyController {
  /**
   * List all entries
   *
   * @param {object} req The request body of the request.
   * @param {object} res The response body.
   * @returns {object} res.
   */
  static listAllEntries(req, res) {
    return res.json(diaryDB);
  }


  /**
   * Get an Entry
   *
   * @param {object} req The request body of the request.
   * @param {object} res The response body.
   * @returns {object} res.
   */
  static getAnEntry(req, res) {
    const { id } = req.params;
    /**
 * Check user id
 * @param   {object} user
 *
 * @returns {object} user id
 */
    function checkId(user) {
      return user.id == id;
    }
    /**
 * find user id
 * @param   {object} user
 *
 * @returns {object} user id
 */
    function findId() {
      return diaryDB.find(checkId);
    }
    if (findId()) {
      return res.json(findId());
    }
    return res.status(404).end();
  }

  /**
   * Register a new dairy entry
   *
   * @param {object} req The request body of the request.
   * @param {object} res The response body.
   * @returns {object} res.
   */
  static createEntry(req, res) {
    const {
      id, title, entry
    } = req.body;

    diaryDB.push({ id, title, entry });
    return res.json(diaryDB);
  }

  /**
   * Update an  entry
   *
   * @param {object} req The request body of the request.
   * @param {object} res The response body.
   * @returns {object} res.
   */
  static updateEntry(req, res) {
    const { id } = req.params;
    const {
      entryId, title, entry
    } = req.body;
    const newId = id - 1;
    if (diaryDB[newId]) {
      diaryDB[newId].id = entryId;
      diaryDB[newId].title = title;
      diaryDB[newId].entry = entry;
      return res.json(diaryDB[newId]);
    }

    res.status(404).end();
  }
}
