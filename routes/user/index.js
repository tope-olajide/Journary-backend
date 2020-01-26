/* eslint-disable require-jsdoc */

import express from 'express';
import User from '../../controllers/users'
import ImageGallery from '../../controllers/imageGalleries'
import Auth from '../../middleware/auth';

const newAuth = new Auth();

const user = express.Router();
user.post('/signup', User.signupUser);
user.post('/signin', User.signInUser);
user.use('*', newAuth.verify);
user.put('/update-profile', User.modifyUser);
user.post('/gallery', ImageGallery.saveImageUrl);
user.get('/gallery', ImageGallery.fetchImageGallery);
user.delete('/gallery/:imageId', ImageGallery.deleteImage);
user.get('/', User.getUser);
user.get('/get-reminder', User.getReminderSettings);
user.post('/set-reminder', User.setReminderSettings);
export default user;
