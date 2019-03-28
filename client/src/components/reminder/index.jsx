import React, { useState } from "react";
import NavigationBar from '../commons/Navigation'
import Footer from '../commons/Footer'
const ReminderSettings = () => {
  const [schedule, setSchedule] = useState("Off");

  const setState = event => {
    setSchedule(event.target.value);
  };
  return <>
  <NavigationBar />
  <div class="profile-header">
  
      <br /><br />
    <form onSubmit={null}>
    <h3>Email Notifications Settings</h3>
    <ul>
      <li>
        <label>
          <input
            type="radio"
            value="*/30 * * * * *"
            checked={schedule === "*/30 * * * * *"}
            onChange={setState}
          />
          every 30 seconds
        </label>
      </li>
      <li>
        <label>
          <input
            type="radio"
            value="* */30 * * * *"
            checked={schedule === "* */30 * * * *"}
            onChange={setState}
          />
          every 30 Minutes
        </label>
      </li>
      <li>
        <label>
          <input
            type="radio"
            value="* * */12 * * *"
            checked={schedule === "* * */12 * * *"}
            onChange={setState}
          />
          every 12 hours
        </label>
      </li>
      <li>
        <label>
          <input
            value="* * */24 * * *"
            type="radio"
            checked={schedule === "* * */24 * * *"}
            onChange={setState}
          />
          once in a day
        </label>
      </li>
      <li>
        <label>
          <input
            value="* * * * * */6"
            type="radio"
            checked={schedule === "* * * * * */6"}
            onChange={setState}
          />
          Once in a week
        </label>
      </li>
      <li>
        <label>
          <input
            value="Off"
            type="radio"
            checked={schedule === "Off"}
            onChange={setState}
          />
          Turn Off
        </label>
      </li>
    </ul>
    <button class="edit-profile__button" type="submit">Save settings</button>
  </form>;
  
</div>
<Footer />
  </>;
};
export default ReminderSettings;
