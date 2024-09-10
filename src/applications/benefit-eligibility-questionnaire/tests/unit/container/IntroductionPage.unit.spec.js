import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { expect } from 'chai';
import sinon from 'sinon';

import IntroductionPage from '../../../containers/IntroductionPage';
import formConfig from '../../../config/form';

describe('<IntroductionPage>', () => {
  const getData = () => ({
    props: {
      formConfig,
      route: {
        path: 'introduction',
      },
      router: {
        push: sinon.spy(),
      },
    },
    mockStore: {
      getState: () => ({
        form: {
          formId: 'T-QSTNR',
          data: {},
        },
      }),
      subscribe: () => {},
      dispatch: () => {},
    },
  });
  const subject = ({ mockStore, props }) =>
    render(
      <Provider store={mockStore}>
        <IntroductionPage {...props} />
      </Provider>,
    );

  context('when the page renders', () => {
    it('should contain the correct page title and introduction', () => {
      const { mockStore, props } = getData();
      const { container } = subject({ mockStore, props });
      const selectors = {
        title: container.querySelector('[data-testid="form-title"]'),
        actionLink: container.querySelector('va-link-action'),
      };

      expect(selectors.actionLink).to.have.attribute('text', 'Get started');
      expect(selectors.title).to.contain.text(
        'Complete the benefit eligibility questionnaire',
      );
    });
  });
});
