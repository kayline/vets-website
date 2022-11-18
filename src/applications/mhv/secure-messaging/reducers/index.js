import { combineReducers } from 'redux';

import { alertsReducer } from './alerts';
import { categoriesReducer } from './categories';
import { draftDetailsReducer } from './draftDetails';
import { foldersReducer } from './folders';
import { messageDetailsReducer } from './messageDetails';
import { messagesReducer } from './messages';
import { searchReducer } from './search';
import { triageTeamsReducer } from './triageTeams';
import { breadcrumbsReducer } from './breadcrumbs';

const rootReducer = {
  sm: combineReducers({
    alerts: alertsReducer,
    breadcrumbs: breadcrumbsReducer,
    categories: categoriesReducer,
    draftDetails: draftDetailsReducer,
    folders: foldersReducer,
    messageDetails: messageDetailsReducer,
    messages: messagesReducer,
    search: searchReducer,
    triageTeams: triageTeamsReducer,
  }),
};

export default rootReducer;
