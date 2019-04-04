
import {
    FETCH_USER_DETAILS
  } from '../actions/type'
  
  const initialState = {
        userData: {},
        privateEntriesCount:{},
        publicEntriesCount:{},
        totalEntriesCount:{}
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
      default:
        return state;
    }
  }