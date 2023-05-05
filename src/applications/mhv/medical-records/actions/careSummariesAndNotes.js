import { Actions } from '../util/actionTypes';
import {
  mockGetCareSummariesAndNotesList,
  mockGetCareSummaryAndNotesDetails,
} from '../api/MrApi';

export const getCareSummariesAndNotesList = () => async dispatch => {
  const response = await mockGetCareSummariesAndNotesList();
  dispatch({ type: Actions.CareSummariesAndNotes.GET_LIST, response });
};

export const getCareSummaryAndNotesDetails = summaryId => async dispatch => {
  const response = await mockGetCareSummaryAndNotesDetails(summaryId);
  dispatch({ type: Actions.CareSummariesAndNotes.GET, response });
};
