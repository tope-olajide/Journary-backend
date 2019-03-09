import express from 'express';
import users from './user';

const routes = express.Router();

routes.use('/user', users);


export default routes;