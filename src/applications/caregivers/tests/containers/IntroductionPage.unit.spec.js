import React from 'react';
import { render } from '@testing-library/react';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import { IntroductionPage } from '../../containers/IntroductionPage';

const getData = ({ canUpload1010cgPoa = true } = {}) => ({
  mockProps: {
    router: [],
    route: { formConfig: {} },
    formData: {},
    setFormData: () => {},
    canUpload1010cgPoa,
  },
  mockStore: {
    getState: () => ({
      featureToggles: {
        canUpload1010cgPoa,
      },
      scheduledDowntime: {
        globalDowntime: null,
        isReady: true,
        isPending: false,
        serviceMap: {
          get() {},
        },
        dismissedDowntimeWarnings: [],
      },
    }),
    subscribe: () => {},
    dispatch: () => {},
  },
});

describe('IntroductionPage', () => {
  it('should render poa note', () => {
    const { mockProps, mockStore } = getData({ canUpload1010cgPoa: true });
    const view = render(
      <Provider store={mockStore}>
        <IntroductionPage {...mockProps} />,
      </Provider>,
    );
    const noteContainer = view.container.querySelector(
      '[data-testid="poa-info-note"]',
    );

    expect(noteContainer).to.exist;
  });

  it('should not render poa note', () => {
    const { mockProps, mockStore } = getData({ canUpload1010cgPoa: false });
    const view = render(
      <Provider store={mockStore}>
        <IntroductionPage {...mockProps} />,
      </Provider>,
    );
    const noteContainer = view.container.querySelector(
      '[data-testid="poa-info-note"]',
    );

    expect(noteContainer).to.not.exist;
  });
});
