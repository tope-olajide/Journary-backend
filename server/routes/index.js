import express from 'express';
import businesses from './diary';
import users from './user';

const routes = express.Router();

routes.use('/user', users);
routes.use('/business', businesses);

export default routes;