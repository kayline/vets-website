export const Actions = {
  Alerts: {
    CLOSE_ALERT: 'SM_ALERT_CLOSE_ALERT',
    ADD_ALERT: 'SM_ALERT_ADD_ALERT',
    FOCUS_OUT_ALERT: 'SM_ALERT_FOCUS_OUT',
  },
  Breadcrumbs: {
    SET_BREAD_CRUMBS: 'SM_SET_BREAD_CRUMBS',
  },
  Category: { GET_LIST: 'SM_CATEGORY_GET_LIST' },
  Draft: {
    GET: 'SM_DRAFT_GET',
    GET_LIST: 'SM_DRAFT_GET_LIST',
    GET_HISTORY: 'SM_DRAFT_GET_HISTORY',
    GET_IN_THREAD: 'SM_DRAFT_GET_IN_THREAD',
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
    GET_IN_THREAD: 'SM_MESSAGE_GET_IN_THREAD',
    CLEAR: 'SM_MESSAGE_CLEAR',
    GET_LIST: 'SM_MESSAGE_GET_LIST',
    CLEAR_LIST: 'SM_MESSAGE_CLEAR_LIST',
    GET_HISTORY: 'SM_MESSAGE_GET_HISTORY',
    CLEAR_HISTORY: 'SM_MESSAGE_CLEAR_HISTORY',
    MOVE_REQUEST: 'SM_MOVE_THREAD_REQUEST',
    MOVE_SUCCESS: 'SM_MOVE_THREAD_SUCCESS',
    MOVE_FAILED: 'SM_MOVE_THREAD_FAILED',
    DELETE_REQUEST: 'SM_DELETE_THREAD_REQUEST',
    DELETE_SUCCESS: 'SM_DELETE_THREAD_SUCCESS',
    DELETE_FALED: 'SM_DELETE_THREAD_FAILED',
    SET_THREAD_PRINT_OPTION: 'SM_SET_THREAD_PRINT_OPTION',
    SET_THREAD_VIEW_COUNT: 'SM_SET_THREAD_VIEW_COUNT',
    CANNOT_REPLY_ALERT: 'SM_CANNOT_REPLY_ALERT',
  },
  Preferences: {
    GET_USER_SIGNATURE: 'SM_GET_USER_SIGNATURE',
  },
  Search: {
    RUN_BASIC: 'SM_SEARCH_RUN_BASIC',
    RUN_ADVANCED: 'SM_SEARCH_RUN_ADVANCED',
    START: 'SM_SEARCH_START',
    CLEAR: 'SM_SEARCH_CLEAR',
    SET_SORT: 'SM_SEARCH_SET_SORT',
    SET_PAGE: 'SM_SEARCH_SET_PAGE',
  },
  Thread: {
    GET_EMPTY_LIST: 'SM_THREAD_GET_EMPTY_LIST',
    GET_LIST: 'SM_THREAD_GET_LIST',
    IS_LOADING: 'SM_THREAD_IS_LOADING',
    CLEAR_LIST: 'SM_THREAD_CLEAR_LIST',
    SET_SORT_ORDER: 'SM_THREAD_SET_SORT_ORDER',
    SET_PAGE: 'SM_THREAD_SET_PAGE',
    RESET_SORT_ORDER: 'SM_THREAD_RESET_SORT_ORDER',
  },
  TriageTeam: {
    GET_LIST: 'SM_TRIAGE_TEAM_GET_LIST',
  },
};
