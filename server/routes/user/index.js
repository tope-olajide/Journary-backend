/* eslint-disable require-jsdoc */

import express from 'express';
import User from '../../controllers/users'
import Auth from '../../middleware/auth';

const newAuth = new Auth();

const user = express.Router();
user.post('/signup', User.signupUser);
user.post('/signin', User.signInUser);
user.use('*', newAuth.verify);
user.get('/', User.getUser);
export default user;
