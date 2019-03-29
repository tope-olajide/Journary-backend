import axios from 'axios';
import {
    ADD_ENTRY
  } from './type';
const url = 'http://127.0.0.1:9000/api/entry/';
const token = localStorage.getItem('token');
const setHeaderToken = {
    headers: {
      authorization: token
    }
  }
export const addEntry=(entryData)=> {
    return dispatch => axios.post(`${url}`, entryData,setHeaderToken)
        .then((response) => {
            const {
                entry
            } = response.data;
            dispatch({
                type: ADD_ENTRY,
                entry
            });
        });
}
export const modifyUserEntry=(entryData)=> {
  return dispatch => axios.put(`${url}`, entryData,setHeaderToken)
      .then((response) => {
          const {
              entry
          } = response.data;
          dispatch({
              type: ADD_ENTRY,
              entry
          });
      });
}