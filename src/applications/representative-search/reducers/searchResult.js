import {
  CLEAR_SEARCH_RESULTS,
  SEARCH_COMPLETE,
  // SEARCH_FAILED,
  FETCH_REPRESENTATIVES,
  REPORT_STARTED,
  REPORT_COMPLETE,
  // REPORT_FAILED,
  REPORT_ITEMS_UPDATED,
} from '../utils/actionTypes';

const INITIAL_STATE = {
  searchResults: [],
  reportedResults: [],
  pagination: {},
};

import { appendReportsFromLocalStorage } from '../utils/helpers';

export const SearchResultReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_REPRESENTATIVES:
    case SEARCH_COMPLETE:
      return {
        ...state,
        searchResults: appendReportsFromLocalStorage(action.payload.data),
        pagination: action.payload.meta.pagination,
        resultTime: action.payload.meta.resultTime,
      };
    case REPORT_STARTED:
      return {
        ...state,
        ...action.payload,
        reportSubmissionInProgress: true,
      };
    case REPORT_COMPLETE:
      return {
        ...state,
        reportSubmissionInProgress: false,
        searchResults: appendReportsFromLocalStorage([...state.searchResults]),
      };
    case REPORT_ITEMS_UPDATED:
      return {
        ...state,
        reportSubmissionInProgress: false,
        reportedResults: action.payload,
      };
    // case SEARCH_FAILED:
    //   if (action.error) {
    //     return {
    //       ...INITIAL_STATE,
    //       isErrorFetchRepresentatives: action.error,
    //     };
    //   }
    //   return INITIAL_STATE;
    case CLEAR_SEARCH_RESULTS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
