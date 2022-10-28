export const Actions = {
  Alerts: {
    CLOSE_ALERT: 'SM_ALERT_CLOSE_ALERT',
    ADD_ALERT: 'SM_ALERT_ADD_ALERT',
  },
  Breadcrumbs: {
    SET_BREAD_CRUMBS: 'SM_SET_BREAD_CRUMBS',
  },
  Category: { GET_LIST: 'SM_CATEGORY_GET_LIST' },
  Draft: {
    GET: 'SM_DRAFT_GET',
    GET_LIST: 'SM_DRAFT_GET_LIST',
    GET_HISTORY: 'SM_DRAFT_GET_HISTORY',
    CREATE_DRAFT: 'SM_DRAFT_CREATE',
    UPDATE_DRAFT: 'SM_DRAFT_UPDATE',
    CLEAR_DRAFT: 'SM_DRAFT_CLEAR',
    AUTO_SAVE_STARTED: 'SM_DRAFT_SAVE_STARTED',
    SAVE_STARTED: 'SM_DRAFT_SAVE_STARTED',
    SAVE_FAILED: 'SM_DRAFT_SAVE_FAILED',
    CREATE_SUCCEEDED: 'SM_DRAFT_CREATE_SUCCEEDED',
    UPDATE_SUCCEEDED: 'SM_DRAFT_UPDATE_SUCCEEDED',
  },
  Folder: {
    GET: 'SM_FOLDER_GET',
    CLEAR: 'SM_FOLDER_CLEAR',
    GET_LIST: 'SM_FOLDER_GET_LIST',
    CREATE: 'SM_FOLDER_CREATE',
    DELETE: 'SM_FOLDER_DELETE',
    RENAME: 'SM_FOLDER_RENAME',
  },
  Message: {
    GET: 'SM_MESSAGE_GET',
    CLEAR: 'SM_MESSAGE_CLEAR',
    GET_LIST: 'SM_MESSAGE_GET_LIST',
    CLEAR_LIST: 'SM_MESSAGE_CLEAR_LIST',
    GET_HISTORY: 'SM_MESSAGE_GET_HISTORY',
    CLEAR_HISTORY: 'SM_MESSAGE_CLEAR_HISTORY',
  },
  Search: {
    RUN: 'SM_SEARCH_RUN',
    CLEAR: 'SM_SEARCH_CLEAR',
  },
  TriageTeam: {
    GET_LIST: 'SM_TRIAGE_TEAM_GET_LIST',
  },
};
