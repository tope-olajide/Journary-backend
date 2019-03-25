import axios from 'axios';
import {
    ADD_ENTRY
  } from './type';
const url = 'http://127.0.0.1:9000/api/entry/';

export function addEntry(entryData) {
    return dispatch => axios.post(`${url}`, entryData)
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