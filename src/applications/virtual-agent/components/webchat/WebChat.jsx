import React, { useMemo } from 'react';
import environment from 'platform/utilities/environment';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import recordEvent from 'platform/monitoring/record-event';
import StartConvoAndTrackUtterances from './startConvoAndTrackUtterances';
import MarkdownRenderer from './markdownRenderer';
import {
  LOGGED_IN_FLOW,
  CONVERSATION_ID_KEY,
  TOKEN_KEY,
  clearBotSessionStorage,
} from '../chatbox/utils';

const renderMarkdown = text => MarkdownRenderer.render(text);

const WebChat = ({ token, WebChatFramework, apiSession }) => {
  const { ReactWebChat, createDirectLine, createStore } = WebChatFramework;
  const csrfToken = localStorage.getItem('csrfToken');
  const userFirstName = useSelector(state =>
    _.upperFirst(_.toLower(state.user.profile.userFullName.first)),
  );
  const userUuid = useSelector(state => state.user.profile.accountUuid);
  const isLoggedIn = useSelector(state => state.user.login.currentlyLoggedIn);

  const store = useMemo(
    () =>
      createStore(
        {},
        StartConvoAndTrackUtterances.makeBotStartConvoAndTrackUtterances(
          csrfToken,
          apiSession,
          environment.API_URL,
          environment.BASE_URL,
          userFirstName === '' ? 'noFirstNameFound' : userFirstName,
          userUuid === null ? 'noUserUuid' : userUuid, // Because PVA cannot support empty strings or null pass in 'null' if user is not logged in
        ),
      ),
    [createStore],
  );
  let directLineToken = token;
  let conversationId = '';
  let directLine = {};

  // eslint-disable-next-line sonarjs/no-collapsible-if

  if (sessionStorage.getItem(LOGGED_IN_FLOW) === 'true' && isLoggedIn) {
    directLineToken = sessionStorage.getItem(TOKEN_KEY);
    conversationId = sessionStorage.getItem(CONVERSATION_ID_KEY);
  }

  addEventListener('beforeunload', () => {
    clearBotSessionStorage(false, isLoggedIn);
  });

  const links = document.querySelectorAll('div#account-menu ul li a');
  if (links && links.length) {
    const link = links[links.length - 1];
    if (link.innerText === 'Sign Out') {
      link.addEventListener('click', () => {
        clearBotSessionStorage(true);
      });
    }
  }

  directLine = useMemo(
    () =>
      createDirectLine({
        token: directLineToken,
        domain:
          'https://northamerica.directline.botframework.com/v3/directline',
        conversationId,
        watermark: '',
      }),
    [createDirectLine],
  );

  const BUTTONS = 49.2;
  const styleOptions = {
    hideUploadButton: true,
    botAvatarBackgroundColor: '#003e73', // color-primary-darker
    botAvatarInitials: 'VA',
    userAvatarBackgroundColor: '#003e73', // color-primary-darker
    userAvatarInitials: 'You',
    primaryFont: 'Source Sans Pro, sans-serif',
    bubbleBorderRadius: 5,
    bubbleFromUserBorderRadius: 5,
    bubbleBorderWidth: 0,
    bubbleFromUserBorderWidth: 0,
    bubbleBackground: '#e1f3f8',
    bubbleFromUserBackground: '#f1f1f1',
    bubbleNubSize: 10,
    bubbleFromUserNubSize: 10,
    timestampColor: '#000000',
    suggestedActionLayout: 'stacked',
    suggestedActionsStackedHeight: BUTTONS * 5,
    suggestedActionHeight: 43,
    suggestedActionActiveBackground: 'rgb(17,46,81)',
    suggestedActionBackgroundColorOnHover: 'rgb(0,62,115)',
    suggestedActionBackgroundColor: 'rgb(0, 113, 187)',
    suggestedActionTextColor: 'white',
    suggestedActionBorderRadius: 5,
    suggestedActionBorderWidth: 0,
  };

  const handleTelemetry = event => {
    const { name } = event;

    if (name === 'submitSendBox') {
      recordEvent({
        event: 'cta-button-click',
        'button-type': 'default',
        'button-click-label': 'submitSendBox',
        'button-background-color': 'gray',
        time: new Date(),
      });
    }
  };

  return (
    <div data-testid="webchat" style={{ height: '550px', width: '100%' }}>
      <ReactWebChat
        styleOptions={styleOptions}
        directLine={directLine}
        store={store}
        renderMarkdown={renderMarkdown}
        onTelemetry={handleTelemetry}
      />
    </div>
  );
};

export default WebChat;
