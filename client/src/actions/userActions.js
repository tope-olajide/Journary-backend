import axios from 'axios';
import {FETCH_USER_DETAILS
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