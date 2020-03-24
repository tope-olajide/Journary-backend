import db from '../db';
import scheduleTask, { cancelTask } from '../utils/scheduler';

/**
 * @description - Class Definition for the Reminder Object
 *
 * @export
 *
 * @class Reminder
 */
export default class Reminder {
  /**
   * @description - Fetch reminder settings
   *
   * @param {object} req - HTTP Request
   *
   * @param {object} res - HTTP Response
   *
   * @return {json} Returns json object
   *
   * @memberof Reminder
   */
  static async getReminderSettings({ user }, res) {
    const userId = user.id;
    const text = 'SELECT reminder_time FROM reminders WHERE user_id = $1';
    try {
      const { rows } = await db.query(text, [userId]);
      if (!rows[0]) {
        return res.status(200).json({
          success: true,
          message: 'no reminder found',
          reminder: 'Off'
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Reminder found',
        reminder: rows[0].reminder_time
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  /**
   * @description - Creates new reminder
   *
   * @param {object} req - HTTP Request
   *
   * @param {object} res - HTTP Response
   *
   * @return {json} Returns json object
   *
   * @memberof Reminder
   */
  static async setReminderSettings({ user, body }, res) {
    const userId = user.id;
    const { email } = user;
    const { username } = user;
    const { time } = body;
    console.log(time);
    console.log(username);
    const taskId = `user00${userId}`;
    const deleteQuery = 'DELETE FROM reminders WHERE user_id =$1 returning *';
    /* const saveUserEmail = 'UPDATE users SET reminder_time=$1 WHERE user_id=$2 returning *'; */
    const saveReminderSettings = `INSERT INTO reminders(reminder_time, task_id, user_id, email, username)
      VALUES($1, $2, $3, $4,$5)
      returning *`;
    const updateReminderSettings = 'UPDATE reminders SET reminder_time =$1 WHERE task_id=$2 returning *';
    const values = [time, taskId, userId, email, username];
    const value3 = [time, taskId];
    const searchForUser = 'SELECT * FROM reminders WHERE username = $1';
    try {
      if (time === 'Off') {
        await db.query(deleteQuery, [userId]);
        cancelTask(taskId);
        return res.status(200).json({
          success: true,
          message: 'Email Reminder Deactivated Successfully'
        });
      }
      const userExist = await db.query(searchForUser, [username]);

      if (userExist.rows[0]) {
        await db.query(updateReminderSettings, value3);
        scheduleTask(taskId, time, username, email);
        return res.status(200).json({
          success: true,
          message: 'Email Reminder Updated Successfully',
          time
        });
      }
      await db.query(saveReminderSettings, values);
      scheduleTask(taskId, time, username, email);
      return res.status(200).json({
        success: true,
        message: 'Email Reminder Activated Successfully',
        time
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  /**
   * @description - Fetches all the Reminder in the database
   *
   * @param {object} req - HTTP Request
   *
   * @param {object} res - HTTP Response
   *
   * @return {json} Returns json object
   *
   * @memberof Reminder
   */
  static async getAllReminders(req, res) {
    const findAllReminders = 'SELECT * FROM reminders';
    try {
      const allReminders = await db.query(findAllReminders);
      if (!allReminders.rows[0]) {
        return res.status(200).json({
          success: true,
          message: 'No Reminder found',
          reminder: []
        });
      }
      return res.status(200).json({
        success: true,
        message: 'All Reminders',
        allReminders
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  /**
   * @description - Restart all the reminders
   * incase the app crashed or stopped working
   *
   * @param {object} req - HTTP Request
   *
   * @param {object} res - HTTP Response
   *
   * @return {json} Returns json object
   *
   * @memberof Reminder
   */
  static async setAllReminders(req, res) {
    const getAllReminders = 'SELECT * FROM reminders';
    try {
      const allReminders = await db.query(getAllReminders);
      if (!allReminders.rows[0]) {
        return res.status(200).json({
          success: true,
          message: 'There is no cron task to execute',
          reminder: []
        });
      }
      allReminders.rows.map((eachReminder) => {
        scheduleTask(
          eachReminder.task_id,
          eachReminder.reminder_time,
          eachReminder.username,
          eachReminder.email
        );
      });
      return res.status(200).json({
        success: true,
        message: 'All cron tasks executed successfully',
        allReminders
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  /**
   * @description - Stop and delete a user reminder
   *
   * @param {object} req - HTTP Request
   *
   * @param {object} res - HTTP Response
   *
   * @return {json} Returns json object
   *
   * @memberof Reminder
   */
  static async unSubscribe({ params }, res) {
    const { email } = params;
    console.log(email);
    const searchForEmail = 'SELECT * FROM reminders WHERE email = $1';
    const deleteReminder = 'DELETE FROM reminders WHERE email =$1 returning *';
    try {
      const user = await db.query(searchForEmail, [email]);
      if (!user.rows) {
        console.log(user);
        return res.status(200).json({
          success: true,
          message: 'Reminder Deactivated Already!',
          user
        });
      }
      const userId = user.rows[0].user_id;
      const taskId = `user00${userId}`;
      await db.query(deleteReminder, [email]);
      cancelTask(taskId);
      return res.status(200).json({
        success: true,
        message: 'Your Email Reminder has been Deactivated Successfully'
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
}
