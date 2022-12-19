import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { expect } from 'chai';
import moment from 'moment';

import ConfirmationPage from '../../containers/ConfirmationPage';

describe('hca <ConfirmationPage>', () => {
  it('should render Confirmation page', () => {
    const timestamp = 1666887649663;
    const mockStore = {
      getState: () => ({
        form: {
          submission: {
            response: {
              id: '60740',
              type: 'saved_claim_caregivers_assistance_claims',
            },
            timestamp,
          },
          data: {
            veteranFullName: {
              first: 'John',
              middle: 'Marjorie',
              last: 'Smith',
              suffix: 'Sr.',
            },
          },
        },
      }),
      subscribe: () => {},
      dispatch: () => {},
    };

    const view = render(
      <Provider store={mockStore}>
        <ConfirmationPage />
      </Provider>,
    );

    expect(
      view.container.querySelector('[data-testid="cg-veteranfullname"]'),
    ).to.contain.text('John Marjorie Smith Sr.');
    expect(
      view.container.querySelector('[data-testid="cg-timestamp"]'),
    ).to.contain.text(moment(timestamp).format('MMM D, YYYY'));
    expect(
      view.container.querySelector('[data-testid="cg-timestamp"]'),
    ).to.contain.text('Oct. 27, 2022');
  });
});
