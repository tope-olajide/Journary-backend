import {
  FETCH_USER_DETAILS,
  UPDATED_USER_DETAILS,
  GET_REMINDER_SETTINGS
} from '../actions/type'

const initialState = {
  userData: {},
  privateEntriesCount: {},
  publicEntriesCount: {},
  totalEntriesCount: {},
  updatedUser: {},
  reminderSettings:{}
}
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_DETAILS:
      return {
        ...state,
        userData: action.userData,
        privateEntriesCount: action.privateEntriesCount,
        publicEntriesCount: action.publicEntriesCount,
        totalEntriesCount: action.totalEntriesCount
      };
    case UPDATED_USER_DETAILS:
      return {
        ...state,
        updatedUser: action.updatedUser
      }
    case GET_REMINDER_SETTINGS:
      return {
        ...state,
        reminderSettings: action.reminder
      };
    default:
      return state;
  }
}