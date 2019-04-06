import axios from 'axios';
import {FETCH_USER_DETAILS,UPDATED_USER_DETAILS,GET_REMINDER_SETTINGS,SET_REMINDER_SETTINGS
  } from './type';
const url = 'http://127.0.0.1:9000/api/user/';
const token = localStorage.getItem('token');
const setHeaderToken = {
    headers: {
      authorization: token
    }
  }

export const fetchProfileDetails=()=> {
    return dispatch => axios.get(`${url}`,setHeaderToken)
        .then((response) => {
            const {
                userData,privateEntriesCount,publicEntriesCount,totalEntriesCount
            } = response.data;
            dispatch({
                type: FETCH_USER_DETAILS,
                userData,privateEntriesCount,publicEntriesCount,totalEntriesCount
            });
        });
}

export const updateProfile=(userData)=> {
  return dispatch => axios.post(`${url}update-profile`, userData,setHeaderToken)
      .then((response) => {
          const {
            updatedUser
          } = response.data;
          dispatch({
            type: UPDATED_USER_DETAILS,
            updatedUser
        });
      });
}
export const getReminderSettings=()=> {
  return dispatch => axios.get(`${url}get-reminder`,setHeaderToken)
      .then((response) => {
          const {
            reminder
          } = response.data;
          console.log(reminder)
          dispatch({
            type: GET_REMINDER_SETTINGS,
            reminder
        });
      });
}
export const saveReminder=()=> {
  return dispatch => axios.post(`${url}set-reminder`,setHeaderToken)
      .then((response) => {
          const {
            reminder
          } = response.data;
          console.log(reminder)
          dispatch({
            type: SET_REMINDER_SETTINGS,
            reminder
        });
      });
}
