import nodemailer from 'nodemailer';
import config from '../config/config';

const cron = require('node-cron');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: config.email,
    pass: config.password
  }
});
const allTask = {};
const scheduler = (time, username, email) => cron.schedule(time, () => {
  const mailOptions = {
    from: 'Journary <noreply@journary.com>',
    to: email,
    subject: 'Reminder',
    html: `<h3>Hello ${username}</h3>,
    <p>This is a reminder email sent to you from journary.netlify.com to <b>remind you about writing a new diary today.</b></p>
    <p>Click <a href="https://journary.netlify.com/new-entry" target="_blank">here</a> to create a new entry or visit https://journary.netlify.com/my-profile to update your reminder setting</p>
    <p>To deactivate this reminder click <a href="https://journary.netlify.com/unsubscribe/${email}" target="_blank">here</a> or copy and paste this link https://journary.netlify.com/unsubscribe/${email}</p>`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return false;
    }
    console.log('Email successfully sent!');
  });
});
const scheduleTask = (taskId, time, username, email) => {
  if (!scheduler(time, username, email)) {
    return false;
  }
  allTask[taskId] = scheduler(time, username, email);
};
export const cancelTask = (taskId) => {
  allTask[taskId].destroy();
  console.log(allTask);
};
export default scheduleTask;
