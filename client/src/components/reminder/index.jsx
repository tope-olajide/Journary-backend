import React, { useState, useEffect } from "react";
import NavigationBar from "../commons/Navigation";
import Footer from "../commons/Footer";
import { getReminderSettings, saveReminder } from "../../actions/userActions";
import { connect } from "react-redux";
import SubmitButton from "../add-entry/SubmitButton";
import toastNotification from "./../../utils/toastNotification";
const ReminderSettings = ({dispatch, reminder}) => {
  const [submitValue, setSubmitValue] = useState("Submit");
  const enableLoading = () => {
    setSubmitValue(
      <b>
        <i class="fas fa-spinner fa-lg fa-spin" />
      </b>
    );
    setIsLoading(true);
    toastNotification(["info"], `loading...`);
  };
  const disableLoading = () => {
    setSubmitValue("Submit");
    setIsLoading(false);
  };
  const [isLoading, setIsLoading] = useState(true);
const [isError, setIsError] = useState(false);
  const [schedule, setSchedule] = useState();
  useEffect(() => {
    getReminder();
},[reminder]);
  const setState = event => {
    setSchedule(event.target.value);
  };
  const getReminder=()=>{
    dispatch(getReminderSettings())
      .then(() => {
        console.log("success");
        setIsLoading(false);
        setSchedule(reminder)
      })
      .catch(error => {
        console.log("fail");
        setIsLoading(false);
        setIsError(true);
      });
  }
  const setReminder=()=>{
    enableLoading();
    dispatch(saveReminder(schedule))
      .then(() => {
        toastNotification(["success"], `saved to database successfully`);
        disableLoading();
      })
      .catch(function(err) {
        toastNotification(["error"], `  ${err.response.data.message}`);
        disableLoading();
      });
  }
  if (isLoading) {
    return <h1>Loading</h1>;
  } else if (isError) {
    return <h1>Error!</h1>;
  } else {
    
    return (
      <>
        <NavigationBar />
        <div class="profile-header">
          <br />
          <br />
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
            <SubmitButton
                submitValue={submitValue}
                handleSubmit={setReminder}
                isLoading={isLoading}
              />
          </form>
          ;
        </div>
        <Footer />
      </>
    );
  }
};
const mapStateToProps = state => {
  console.log(state.users.reminderSettings);
  return {
    reminder: state.users.reminderSettings
  };
};
export default connect(mapStateToProps)(ReminderSettings);
