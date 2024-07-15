export const Actions = {
  Alerts: {
    ADD_ALERT: 'MR_ALERT_ADD_ALERT',
    CLEAR_ALERT: 'MR_ALERT_CLEAR',
  },
  Breadcrumbs: {
    SET_BREAD_CRUMBS: 'MR_SET_BREAD_CRUMBS',
  },
  LabsAndTests: {
    GET: 'MR_LABS_AND_TESTS_GET',
    GET_LIST: 'MR_LABS_AND_TESTS_GET_LIST',
    CLEAR_DETAIL: 'MR_LAB_AND_TESTS_CLEAR_DETAIL',
    UPDATE_LIST_STATE: 'MR_LAB_AND_TESTS_UPDATE_LIST_STATE',
  },
  CareSummariesAndNotes: {
    GET: 'MR_CARE_SUMMARIES_AND_NOTES_GET',
    GET_LIST: 'MR_CARE_SUMMARIES_AND_NOTES_GET_LIST',
    GET_FROM_LIST: 'MR_CARE_SUMMARIES_AND_NOTES_GET_FROM_LIST',
    CLEAR_DETAIL: 'MR_CARE_SUMMARIES_AND_NOTES_CLEAR_DETAIL',
    UPDATE_LIST_STATE: 'MR_CARE_SUMMARIES_AND_NOTES_UPDATE_LIST_STATE',
    COPY_UPDATED_LIST: 'MR_CARE_SUMMARIES_AND_NOTES_COPY_UPDATED_LIST',
  },
  Vaccines: {
    GET: 'MR_VACCINES_GET',
    GET_LIST: 'MR_VACCINES_GET_LIST',
    GET_FROM_LIST: 'MR_VACCINE_GET_FROM_LIST',
    CLEAR_DETAIL: 'MR_VACCINE_CLEAR_DETAIL',
    UPDATE_LIST_STATE: 'MR_VACCINE_UPDATE_LIST_STATE',
  },
  Vitals: {
    GET: 'MR_VITALS_GET',
    GET_LIST: 'MR_VITALS_GET_LIST',
    CLEAR_DETAIL: 'MR_VITAL_CLEAR_DETAIL',
    UPDATE_LIST_STATE: 'MR_VITAL_UPDATE_LIST_STATE',
  },
  Conditions: {
    GET: 'MR_CONDITION_GET',
    GET_LIST: 'MR_CONDITION_GET_LIST',
    GET_FROM_LIST: 'MR_CONDITION_GET_FROM_LIST',
    CLEAR_DETAIL: 'MR_CONDITION_CLEAR_DETAIL',
    UPDATE_LIST_STATE: 'MR_CONDITION_UPDATE_LIST_STATE',
  },
  Allergies: {
    GET: 'MR_ALLERGY_GET',
    GET_LIST: 'MR_ALLERGIES_GET_LIST',
    GET_FROM_LIST: 'MR_ALLERGIES_GET_FROM_LIST',
    CLEAR_DETAIL: 'MR_ALLERGY_CLEAR_DETAIL',
    UPDATE_LIST_STATE: 'MR_ALLERGY_UPDATE_LIST_STATE',
  },
  Sharing: {
    STATUS: 'MR_SHARING_STATUS',
    STATUS_ERROR: 'MR_SHARING_STATUS_ERROR',
    UPDATE: 'MR_SHARING_UPDATE',
    CLEAR: 'MR_SHARING_CLEAR',
  },
  Pagination: {
    SET_PAGINATION: 'MR_SET_PAGINATION',
    RESET_PAGINATION: 'MR_RESET_PAGINATION',
  },
  Refresh: {
    GET_STATUS: 'MR_REFRESH_GET_STATUS',
    UPDATE_PHASE: 'MR_REFRESH_UPDATE_PHASE',
    SET_INITIAL_FHIR_LOAD: 'MR_REFRESH_SET_INITIAL_FHIR_LOAD',
    TIMED_OUT: 'MR_REFRESH_TIMED_OUT',
  },
  BlueButtonReport: {
    GET: 'MR_BLUE_BUTTON_GET_DATA',
  },
  IsDetails: {
    SET_IS_DETAILS: 'MR_SET_IS_DETAILS',
    CLEAR_IS_DETAILS: 'MR_CLEAR_IS_DETAILS',
  },
};
