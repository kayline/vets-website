import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { clearDraft } from '../actions/draftDetails';
import { retrieveMessage } from '../actions/messages';
import { getTriageTeams } from '../actions/triageTeams';
import BeforeMessageAddlInfo from '../components/BeforeMessageAddlInfo';
import ComposeForm from '../components/ComposeForm/ComposeForm';
import ReplyForm from '../components/ComposeForm/ReplyForm';
import MessageThread from '../components/MessageThread/MessageThread';
import EmergencyNote from '../components/EmergencyNote';
import AlertBackgroundBox from '../components/shared/AlertBackgroundBox';
import AlertBox from '../components/shared/AlertBox';
import { closeAlert } from '../actions/alerts';
import { DefaultFolders } from '../util/constants';

const Compose = () => {
  const dispatch = useDispatch();
  const { draftMessage, error } = useSelector(state => state.sm.draftDetails);
  const { triageTeams } = useSelector(state => state.sm.triageTeams);
  const { draftId } = useParams();
  const activeFolder = useSelector(state => state.sm.folders.folder);
  const messageHistory = useSelector(
    state => state.sm.draftDetails.draftMessageHistory,
  );
  const alert = useSelector(state => state.sm.alerts.alert);
  const [cannotReplyAlert, setcannotReplyAlert] = useState(true);
  const [replyMessage, setReplyMessage] = useState(undefined);
  const location = useLocation();
  const history = useHistory();
  const isDraftPage = location.pathname.includes('/draft');
  const header = useRef();

  useEffect(
    () => {
      // to prevent users from accessing draft edit view if directly hitting url path with messageId
      // in case that message no longer is a draft
      if (isDraftPage && activeFolder?.folderId !== DefaultFolders.DRAFTS.id) {
        history.push('/drafts');
      }
      if (location.pathname === '/compose') {
        dispatch(clearDraft());
        setReplyMessage(null);
      }
      dispatch(getTriageTeams());
      if (isDraftPage && draftId) {
        dispatch(retrieveMessage(draftId, true));
      }
      return () => {
        dispatch(clearDraft());
      };
    },
    [isDraftPage, draftId, activeFolder, dispatch, history, location.pathname],
  );

  // Waiting for additional response data
  useEffect(
    () => {
      if (alert?.header !== null) {
        setcannotReplyAlert(cannotReplyAlert);
      }
    },
    [alert?.header, cannotReplyAlert, dispatch, draftId, location.pathname],
  );

  useEffect(
    () => {
      return () => {
        if (isDraftPage) {
          dispatch(closeAlert());
        }
      };
    },
    [location.pathname, dispatch],
  );

  useEffect(
    () => {
      // wait until messageHistory is retrieved to determine if we should show a ReplyForm
      // To prevent from Edit Draft Title falshing on screen
      if (messageHistory !== undefined) {
        if (messageHistory?.length > 0 && !replyMessage) {
          // TODO filter history to grab only received messages.
          setReplyMessage(messageHistory.shift());
        } else {
          setReplyMessage(null);
        }
      }
    },
    [messageHistory, replyMessage],
  );

  let pageTitle;

  if (isDraftPage) {
    pageTitle = 'Edit draft';
  } else {
    pageTitle = 'Compose message';
  }

  const content = () => {
    if (!isDraftPage && triageTeams) {
      return (
        <>
          <h1 className="page-title" ref={header}>
            {pageTitle}
          </h1>
          <EmergencyNote />
          <div>
            <BeforeMessageAddlInfo />
          </div>
          <ComposeForm draft={draftMessage} recipients={triageTeams} />
        </>
      );
    }
    if ((isDraftPage && !draftMessage) || !triageTeams) {
      return (
        <va-loading-indicator
          message="Loading your secure message..."
          setFocus
          data-testid="loading-indicator"
        />
      );
    }
    if (error) {
      return (
        <va-alert status="error" visible class="vads-u-margin-y--9">
          <h2 slot="headline">We’re sorry. Something went wrong on our end</h2>
          <p>
            You can’t view your secure message because something went wrong on
            our end. Please check back soon.
          </p>
        </va-alert>
      );
    }

    if (replyMessage !== undefined) {
      return (
        <>
          {replyMessage === null ? (
            <>
              <h1 className="page-title" ref={header}>
                {pageTitle}
              </h1>
              <EmergencyNote />
              <div>
                <BeforeMessageAddlInfo />
              </div>
              <ComposeForm draft={draftMessage} recipients={triageTeams} />
            </>
          ) : (
            <>
              <ReplyForm
                draftToEdit={draftMessage}
                replyMessage={replyMessage}
                cannotReplyAlert={cannotReplyAlert}
              />
              {replyMessage &&
                messageHistory?.length > 1 && (
                  <MessageThread messageHistory={messageHistory.slice(1)} />
                )}
            </>
          )}
        </>
      );
    }
    return null;
  };

  return (
    <div className="vads-l-grid-container compose-container">
      {cannotReplyAlert ? <AlertBox /> : <AlertBackgroundBox closeable />}

      {content()}
    </div>
  );
};

export default Compose;
