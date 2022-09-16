/*
Redux action that handles API calls. Currently mocked, but the imports needed are 
below whenever sandbox environments for local dev are set up. 

This is also where GA events may be fired for successful / unsuccessful api calls
*/

// import recordEvent from 'platform/monitoring/record-event';
// import { apiRequest } from 'platform/utilities/api';
import allMessages from '../tests/fixtures/messages-response.json';
import messageDraft from '../tests/fixtures/message-draft-response.json';
import message from '../tests/fixtures/message-response.json';
import mockFolderData from '../tests/fixtures/folder-response.json';

export const MESSAGES_RETRIEVE_STARTED = 'MESSAGES_RETRIEVE_STARTED';
export const MESSAGES_RETRIEVE_SUCCEEDED = 'MESSAGES_RETRIEVE_SUCCEEDED';
export const MESSAGES_RETRIEVE_FAILED = 'MESSAGES_RETRIEVE_FAILED';

export const MESSAGE_RETRIEVE_STARTED = 'MESSAGE_RETRIEVE_STARTED';
export const MESSAGE_RETRIEVE_SUCCEEDED = 'MESSAGE_RETRIEVE_SUCCEEDED';
export const MESSAGE_RETRIEVE_FAILED = 'MESSAGE_RETRIEVE_FAILED';

export const MESSAGE_DELETE_STARTED = 'MESSAGE_DELETE_STARTED';
export const MESSAGE_DELETE_SUCCEEDED = 'MESSAGE_DELETE_SUCCEEDED';
export const MESSAGE_DELETE_FAILED = 'MESSAGE_DELETE_FAILED';
export const MESSAGE_MOVE_STARTED = 'MESSAGE_MOVE_STARTED';
export const MESSAGE_MOVE_SUCCEEDED = 'MESSAGE_MOVE_SUCCEEDED';
export const MESSAGE_MOVE_FAILED = 'MESSAGE_MOVE_FAILED';

export const FOLDERS_RETRIEVE_STARTED = 'FOLDERS_RETRIEVE_STARTED';
export const FOLDERS_RETRIEVE_FAILED = 'FOLDERS_RETRIEVE_FAILED';
export const FOLDERS_RETRIEVE_SUCCEEDED = 'FOLDERS_RETRIEVE_SUCCEEDED';

export const LOADING_COMPLETE = 'LOADING_COMPLETE';

// const SECURE_MESSAGES_URI = '/mhv/messages';

const mockDataRequest = (request, messageId) => {
  return new Promise(resolve => {
    setTimeout(() => {
      if (request === 'messages') resolve(allMessages);
      if (request === 'draft') {
        if (+messageDraft.id === +messageId) {
          resolve(messageDraft);
        } else {
          resolve({ errors: ['message not found'] });
        }
      }
      if (request === 'message') {
        if (+message.id === +messageId) {
          resolve(message);
        } else {
          resolve({ errors: ['message not found'] });
        }
      }
    }, 1500);
  });
};

const retrieveData = async (request, messageId) => {
  try {
    // replace with apiRequest when endpoint is ready
    return await mockDataRequest(request, messageId);
  } catch (error) {
    return error;
  }
};

export const getAllMessages = () => async dispatch => {
  dispatch({ type: MESSAGES_RETRIEVE_STARTED });

  const response = await retrieveData('messages');
  if (response.errors) {
    // handles errors and dispatch error action
    // fire GA event for error
    const error = response.errors[0];
    dispatch({
      type: MESSAGES_RETRIEVE_FAILED,
      response: error,
    });
  } else {
    // dispatch success action and GA event
    dispatch({
      type: MESSAGES_RETRIEVE_SUCCEEDED,
      response,
    });
  }
};

export const getMessage = (folder, messageId) => async dispatch => {
  dispatch({ type: MESSAGE_RETRIEVE_STARTED });

  const response = await retrieveData(folder, messageId);
  if (response.errors) {
    // handles errors and dispatch error action
    // fire GA event for error
    const error = response.errors[0];
    dispatch({
      type: MESSAGE_RETRIEVE_FAILED,
      response: error,
    });
  } else {
    // dispatch success action and GA event
    dispatch({
      type: MESSAGE_RETRIEVE_SUCCEEDED,
      response,
    });
  }
};

const mockMoveMessage = (messageId, folderId) => {
  let mockSuccess = null;
  if (messageId && folderId) {
    mockSuccess = true;
  }
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockSuccess);
    }, 1500);
  });
};

const moveMessageResponse = async (messageId, folderId) => {
  try {
    // replace with apiRequest when endpoint is ready
    // `mhv-sm-api/patient/v1/message/${messageId}/move/tofolder/${folderId}`

    return await mockMoveMessage(() => {
      return { messageId, folderId };
    });
  } catch (error) {
    return error;
  }
};

export const moveMessageToFolder = (messageId, folderId) => async dispatch => {
  dispatch({ type: MESSAGE_MOVE_STARTED });
  const response = await moveMessageResponse(messageId, folderId);
  if (response) {
    dispatch({
      type: MESSAGE_MOVE_FAILED,
      response,
    });
  } else {
    dispatch({
      type: MESSAGE_MOVE_SUCCEEDED,
      response,
    });
  }
};

const mockGetAllFolders = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockFolderData);
    }, 1500);
  });
};

const getFolders = async () => {
  try {
    return await mockGetAllFolders();
  } catch (error) {
    return error;
  }
};

export const getAllFolders = () => async dispatch => {
  dispatch({ type: FOLDERS_RETRIEVE_STARTED });

  const response = await getFolders();
  if (response.errors) {
    const error = response.errors[0];
    dispatch({
      type: FOLDERS_RETRIEVE_FAILED,
      response: error,
    });
  } else {
    dispatch({
      type: FOLDERS_RETRIEVE_SUCCEEDED,
      response,
    });
  }
};

export const loadingComplete = () => async dispatch => {
  dispatch({ type: LOADING_COMPLETE });
};

const deleteMessageResponse = async messageId => {
  try {
    // replace with apiRequest when endpoint is ready
    // `mhv-sm-api/patient/v1/message/${messageId}
    return messageId; // mock success
  } catch (error) {
    return error;
  }
};

export const deleteMessage = messageId => async dispatch => {
  dispatch({ type: MESSAGE_DELETE_STARTED });

  const response = await deleteMessageResponse(messageId);
  if (response.errors) {
    // handles errors and dispatch error action
    // fire GA event for error
    const error = response.errors[0];
    dispatch({
      type: MESSAGE_DELETE_FAILED,
      response: error,
    });
  } else {
    // dispatch success action and GA event
    dispatch({
      type: MESSAGE_DELETE_SUCCEEDED,
      response,
    });
  }
};
