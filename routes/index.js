import express from 'express';
import users from './user';
import entries from './entry'

const routes = express.Router();

routes.use('/user', users);
routes.use('/entry', entries);


export default routes;