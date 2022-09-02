import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { expect } from 'chai';
import sinon from 'sinon';

import { $ } from 'platform/forms-system/src/js/utilities/ui';

import App from '../../containers/App';

const getData = ({ loggedIn = true, getCoeMock = () => {} } = {}) => ({
  props: {
    children: <div>children</div>,
    formData: {},
    getCoe: () => {},
    getCoeMock,
    loggedIn,
    location: { pathname: '/introduction', search: '' },
  },
  mockStore: {
    getState: () => ({
      user: {
        login: {
          currentlyLoggedIn: loggedIn,
        },
        profile: {},
      },
      form: {
        loadedStatus: 'success',
        savedStatus: '',
        loadedData: {
          metadata: {},
        },
      },
    }),
    subscribe: () => {},
    dispatch: () => {},
  },
});

describe('App', () => {
  it('should render', () => {
    const { props, mockStore } = getData();
    const { container } = render(
      <div>
        <Provider store={mockStore}>
          <App {...props} />
        </Provider>
      </div>,
    );
    const article = $('#form-26-1880', container);
    expect(article).to.exist;
    expect(article.dataset.location).to.eq('introduction');
  });

  it('should call API if logged in', async () => {
    const getCoeMock = sinon.spy();
    const { props, mockStore } = getData({ getCoeMock });
    render(
      <Provider store={mockStore}>
        <App {...props} />,
      </Provider>,
    );

    expect(getCoeMock.called).to.be.true;
    // not skipping generateCoe action
    expect(getCoeMock.args[0][0]).to.be.false;
  });
  it('should not call API if not logged in', () => {
    const getCoeMock = sinon.spy();
    const { props, mockStore } = getData({ getCoeMock, loggedIn: false });
    render(
      <Provider store={mockStore}>
        <App {...props} />,
      </Provider>,
    );

    expect(getCoeMock.called).to.be.true;
    // we are skippingt generateCoe action
    expect(getCoeMock.args[0][0]).to.be.true;
  });
});
