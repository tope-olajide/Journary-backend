import {FETCH_ALL_PUBLIC_ENTRIES
  } from '../actions/type'
  
  const initialState = {
    entries: {},
    currentPage: {}
  }
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ALL_PUBLIC_ENTRIES:
        return {
          ...state,
          entries: action.entries,
          currentPage: action.currentPage
        };
      default:
        return state;
    }
  }