import { combineReducers } from 'redux';
import entries from './entries'
import users from './users'
export default combineReducers({
    entries, users
});
