import {
  Pool,
} from 'pg';
import logger from '../helpers/logger';
import config from './config';

const database = new Pool(config.development);
(async () => {
  const res = await database.connect();
  if (res) return logger.info('connection successful');
})().catch(e => setImmediate(() => {
  throw e;
}));

export default database;
