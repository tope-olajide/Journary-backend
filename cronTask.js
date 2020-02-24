import db from './db';
import scheduleTask from './utils/scheduler';

const cronTask = async () => {
  const getAllTasks = 'SELECT * FROM reminders';
  const allTasks = await db.query(getAllTasks);
  try {
    if (!allTasks.rows[0]) {
      console.log('There is no cron task to execute');
    }
    allTasks.rows.map((eachUser) => {
      scheduleTask(
        eachUser.task_id,
        eachUser.reminder_time,
        eachUser.username,
        eachUser.email
      );
    });
    console.log('All cron tasks executed successfully');
    console.log(allTasks);
  } catch (error) {
    console.log(error);
  }
};
export default cronTask;
