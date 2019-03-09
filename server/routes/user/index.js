/* eslint-disable require-jsdoc */

import express from 'express';
import User from '../../controllers/users';

const user = express.Router();


user.post('/signup', User.signupUser);

export default user;
