/* eslint-disable require-jsdoc */

import express from 'express';
import Entry from '../../controllers/entries';

import Auth from '../../middleware/auth';

const newAuth = new Auth();
const entry = express.Router();

entry.use('*', newAuth.verify);
entry.route('/search')
  .get(Entry.searchEntries);

entry.route('/')
  .post(Entry.addEntry)
  .get(Entry.getAllPublicEntries);

entry.route('/private')
  .get(Entry.getUserPrivateEntries);

entry.route('/public')
  .get(Entry.getUserPublicEntries);

entry.route('/:entryId')
  .put(Entry.modifyEntry)
  .delete(Entry.deleteEntry)
  .get(Entry.viewEntry);


export default entry;
