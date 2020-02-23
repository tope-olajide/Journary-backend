import schema from './createTables';
import logger from '../helpers/logger';

(async () => {
  const res = await schema.createUsers();
  if (res) logger.info('User table successfully migrated');
})().catch(err => logger.info(err.message));

(async () => {
  const res = await schema.createEntries();
  if (res) logger.info('Entries table successfully migrated');
})().catch(err => logger.info(err.message));

(async () => {
  const res = await schema.createReminders();
  if (res) logger.info('Reminders table successfully migrated');
})().catch(err => logger.info(err.message));

(async () => {
  const res = await schema.createImageGalleries();
  if (res) logger.info('ImageGalleries table successfully migrated');
})().catch(err => logger.info(err.message));