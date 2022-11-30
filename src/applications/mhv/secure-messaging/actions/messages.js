import { format, addDays } from 'date-fns';
import { Actions } from '../util/actionTypes';
import {
  getMessageList,
  getMessage,
  getMessageHistory,
  deleteMessage as deleteMessageCall,
  moveMessage as moveMessageCall,
  createMessage,
  createReplyToMessage,
} from '../api/SmApi';
import { addAlert } from './alerts';
import * as Constants from '../util/constants';

/**
 * @param {Long} folderId
 * @param {Boolean} update true if using auto-refresh to prevent messageList redux
 * object from clearing out and triggering spinning circle
 *
 * @returns
 */
export const getMessages = (folderId, update = false) => async dispatch => {
  if (!update) {
    dispatch({ type: Actions.Message.CLEAR_LIST });
  }
  try {
    const response = await getMessageList(folderId);
    dispatch({
      type: Actions.Message.GET_LIST,
      response,
    });
  } catch (e) {
    dispatch(
      addAlert(
        Constants.ALERT_TYPE_ERROR,
        '',
        Constants.Alerts.Message.GET_MESSAGE_ERROR,
      ),
    );
  }
};

export const retrieveMessageHistory = (
  messageId,
  isDraft = false,
) => async dispatch => {
  const response = await getMessageHistory(messageId);
  if (response.errors) {
    // TODO Add error handling
  } else {
    dispatch({
      type: isDraft ? Actions.Draft.GET_HISTORY : Actions.Message.GET_HISTORY,
      response,
    });
  }
};

export const clearMessageHistory = () => async dispatch => {
  dispatch({ type: Actions.Message.CLEAR_HISTORY });
};

export const clearMessage = () => async dispatch => {
  dispatch({ type: Actions.Message.CLEAR });
};

/**
 * @param {Long} messageId
 * @param {Boolean} isDraft true if the message is a draft, otherwise false
 * @returns
 */
export const retrieveMessage = (
  messageId,
  isDraft = false,
) => async dispatch => {
  dispatch(clearMessage());
  const response = await getMessage(messageId);
  dispatch(retrieveMessageHistory(messageId, isDraft));
  if (response.errors) {
    // TODO Add error handling
    // TODO What happens if a message is requested on the draft page but it has already been sent and is no longer a draft?
  } else {
    dispatch({
      type: isDraft ? Actions.Draft.GET : Actions.Message.GET,
      response,
    });
  }

  // Error handling for old messages
  const { sentDate } = response.data.attributes;
  const today = new Date();
  const messageSentDate = format(new Date(sentDate), 'MM-dd-yyyy');
  const cannotReplyDate = addDays(new Date(messageSentDate), 45);
  if (today > cannotReplyDate) {
    dispatch(
      addAlert(
        Constants.ALERT_TYPE_INFO,
        Constants.Alerts.Message.CANNOT_REPLY_INFO_HEADER,
        Constants.Alerts.Message.CANNOT_REPLY_BODY,
      ),
    );
  }
};

/**
 * @param {Long} messageId
 * @returns
 */
export const deleteMessage = messageId => async dispatch => {
  try {
    await deleteMessageCall(messageId);
    dispatch(
      addAlert(
        Constants.ALERT_TYPE_SUCCESS,
        '',
        Constants.Alerts.Message.DELETE_MESSAGE_SUCCESS,
      ),
    );
  } catch (e) {
    // const error = e.errors[0].detail;
    dispatch(
      addAlert(
        Constants.ALERT_TYPE_ERROR,
        '',
        Constants.Alerts.Message.DELETE_MESSAGE_ERROR,
      ),
    );
    throw e;
  }
};

/**
 * @param {Long} messageId
 * @param {Long} folderId
 * @returns
 */
export const moveMessage = (messageId, folderId) => async dispatch => {
  try {
    await moveMessageCall(messageId, folderId);
    dispatch(
      addAlert(
        Constants.ALERT_TYPE_SUCCESS,
        '',
        Constants.Alerts.Message.MOVE_MESSAGE_SUCCESS,
      ),
    );
  } catch (e) {
    dispatch(
      addAlert(
        Constants.ALERT_TYPE_ERROR,
        '',
        Constants.Alerts.Message.MOVE_MESSAGE_ERROR,
      ),
    );
    throw e;
  }
};

export const sendMessage = (message, attachments) => async dispatch => {
  try {
    await createMessage(message, attachments);
    dispatch(
      addAlert(
        Constants.ALERT_TYPE_SUCCESS,
        '',
        Constants.Alerts.Message.SEND_MESSAGE_SUCCESS,
      ),
    );
  } catch (e) {
    dispatch(
      addAlert(
        Constants.ALERT_TYPE_ERROR,
        '',
        Constants.Alerts.Message.SEND_MESSAGE_ERROR,
      ),
    );
    throw e;
  }
};

export const sendReply = (
  replyToId,
  message,
  attachments,
) => async dispatch => {
  try {
    await createReplyToMessage(replyToId, message, attachments);
    dispatch(
      addAlert(
        Constants.ALERT_TYPE_SUCCESS,
        '',
        Constants.Alerts.Message.SEND_MESSAGE_SUCCESS,
      ),
    );
  } catch (e) {
    dispatch(
      addAlert(
        Constants.ALERT_TYPE_ERROR,
        '',
        Constants.Alerts.Message.SEND_MESSAGE_ERROR,
      ),
    );
    throw e;
  }
};
