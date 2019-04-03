import {
  FETCH_ALL_PUBLIC_ENTRIES,FETCH_ENTRY_DETAILS
} from '../actions/type'

const initialState = {
  entries: {
    currentPage: {}
  },
  entryDetails:{}

}
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_PUBLIC_ENTRIES:
      return {
        ...state,
        entries: action.entries,
        currentPage: action.currentPage
      };
    case FETCH_ENTRY_DETAILS:
      return {
        ...state,
        entryDetails: action.entry
      };
    default:
      return state;
  }
}