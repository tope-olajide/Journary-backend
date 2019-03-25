/* eslint-disable require-jsdoc */

import express from 'express';
import Entry from '../../controllers/entries';

const entry = express.Router();

entry.route('/')
  .post(Entry.addEntry)
  .get(Entry.getUserPublicEntries);

export default entry;
