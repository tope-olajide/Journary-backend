/* eslint-disable require-jsdoc */

import express from 'express';
import User from '../../controllers/users'
import ImageGallery from '../../controllers/imageGalleries'
import Auth from '../../middleware/auth';
import Reminder from '../../controllers/reminder'

const newAuth = new Auth();

const user = express.Router();
user.post('/signup', User.signupUser);
user.post('/signin', User.signInUser);
user.get('/cancel-reminder/:email', Reminder.unSubscribe);
user.get('/set-all-reminders', Reminder.setAllReminders);
user.use('*', newAuth.verify);
user.put('/update-profile', User.modifyUser);
user.post('/gallery', ImageGallery.saveImageUrl);
user.get('/gallery', ImageGallery.fetchImageGallery);
user.delete('/gallery/:imageId', ImageGallery.deleteImage);
user.get('/', User.getUser);
user.get('/get-reminder', Reminder.getReminderSettings);
user.post('/set-reminder', Reminder.setReminderSettings);
user.get('/fetch-all-reminders', Reminder.getAllReminders);

user.get('/unsubscribe/:email', Reminder.unSubscribe);

export default user;
