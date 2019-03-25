/* eslint-disable require-jsdoc */

import express from 'express';
import Entry from '../../controllers/entries';

import Auth from '../../middleware/auth';

const newAuth = new Auth();
const entry = express.Router();

entry.use('*', newAuth.verify);
entry.route('/')
  .post(Entry.addEntry)
  .get(Entry.getUserPublicEntries);

export default entry;
