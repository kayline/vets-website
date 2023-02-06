import { expect } from 'chai';
import React from 'react';
import { renderWithStoreAndRouter } from '@department-of-veterans-affairs/platform-testing/react-testing-library-helpers';
import { beforeEach } from 'mocha';
import { waitFor } from '@testing-library/react';
import RecordList from '../../components/RecordList';
import vaccines from '../fixtures/vaccines.json';
import reducer from '../../reducers';

describe('Record list component', () => {
  const initialState = {
    mr: {
      vaccines: {
        vaccineList: vaccines,
        vaccineDetails: vaccines[0],
      },
    },
  };
  let screen = null;
  beforeEach(() => {
    screen = renderWithStoreAndRouter(
      <RecordList records={vaccines} type="vaccines" />,
      {
        initialState,
        reducers: reducer,
        path: '/vaccines',
      },
    );
  });

  it('renders without errors', () => {
    expect(screen.getByText('Displaying', { exact: false })).to.exist;
  });

  it('displays a list of records when records are provided', async () => {
    await waitFor(() => {
      expect(screen.getAllByTestId('record-list-item')).to.have.length(5);
    });
  });
});
