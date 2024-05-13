import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { waitForElementToBeRemoved } from '@testing-library/react';
import { expect } from 'chai';
import { setupServer } from 'msw/node';

import { $ } from '@department-of-veterans-affairs/platform-forms-system/ui';

import {
  FIELD_TITLES,
  FIELD_NAMES,
  DEFAULT_ERROR_MESSAGE,
} from '@@vap-svc/constants';

import * as mocks from '@@profile/msw-mocks';
import ContactInformation from '@@profile/components/contact-information/ContactInformation';

import {
  createBasicInitialState,
  renderWithProfileReducers,
  wait,
} from '../../unit-test-helpers';

const ui = (
  <MemoryRouter>
    <ContactInformation />
  </MemoryRouter>
);
let view;
let server;

function getEditButton(addressName) {
  let editButton = view.queryByText(new RegExp(`add.*${addressName}`, 'i'), {
    selector: 'button',
  });
  if (!editButton) {
    // Need to use `queryByRole` since the visible label is simply `Edit`, but
    // the aria-label is more descriptive
    editButton = view.queryByRole('button', {
      name: new RegExp(`edit.*${addressName}`, 'i'),
    });
  }
  return editButton;
}

function updateAddress(addressName) {
  userEvent.click(getEditButton(addressName));
  const { container } = view;

  const countryDropdown = $('va-select[label="Country"]', container);
  const line1Input = $('va-text-input[label^="Street address"]', container);
  const cityInput = $('va-text-input[label="City"]', container);
  const stateDropdown = $('va-select[label="State"]', container);
  const zipCodeInput = $('va-text-input[label="Zip code"]', container);
  const submitButton = view.getByText(/save/i, { selector: 'button' });

  // input the address info (can't type into web components using RTL)
  countryDropdown.__events.vaSelect({ target: { value: 'USA' } });
  line1Input.value = '123 main st'; // va-text-input don't have exposed events
  cityInput.value = 'san francisco';
  stateDropdown.__events.vaSelect({ target: { value: 'CA' } });
  zipCodeInput.value = '94105';

  userEvent.click(submitButton);

  return { cityInput };
}

// When the update happens while the Edit View is still active
async function testQuickSuccess(addressName) {
  server.use(...mocks.transactionSucceeded);

  const { cityInput } = updateAddress(addressName);

  // wait for the edit mode to exit
  await waitForElementToBeRemoved(cityInput);

  // confirm that the new address appears
  expect(view.getAllByText(/123 Main St/i).length).to.equal(2);
  expect(view.getAllByText(/San Francisco, CA 94105/i).length).to.equal(2);

  // and the edit address button should exist
  expect(
    view.getByRole('button', { name: new RegExp(`edit.*${addressName}`, 'i') }),
  ).to.exist;

  // the add address button should not exist
  expect(
    view.queryByText(new RegExp(`add.*${addressName}`, 'i'), {
      selector: 'button',
    }),
  ).not.to.exist;
}

// When the update happens but not until after the Edit View has exited and the
// user returned to the read-only view
async function testSlowSuccess(addressName) {
  server.use(...mocks.transactionPending);

  const { cityInput } = updateAddress(addressName);

  // wait for the edit mode to exit
  await waitForElementToBeRemoved(cityInput);

  // check that the "we're working on saving your..." message appears
  const updatingMessage = await view.findByText(
    new RegExp(`We’re working on saving your new ${addressName}.`, 'i'),
  );
  expect(updatingMessage).to.exist;

  server.use(...mocks.transactionSucceeded);

  await waitForElementToBeRemoved(updatingMessage);

  // confirm that the new address appears
  expect(view.getAllByText(/123 Main St/i).length).to.equal(2);
  expect(view.getAllByText(/San Francisco, CA 94105/i).length).to.equal(2);

  // and the edit address button should exist
  expect(
    view.getByRole('button', { name: new RegExp(`edit.*${addressName}`, 'i') }),
  ).to.exist;

  // the add address button should not exist
  expect(
    view.queryByText(new RegExp(`add.*${addressName}`, 'i'), {
      selector: 'button',
    }),
  ).not.to.exist;
}

async function testAddressValidation500(addressName) {
  server.use(...mocks.validateAddressFailure);

  updateAddress(addressName);

  // expect an error to be shown
  const alert = await view.findByTestId('edit-error-alert');
  expect(alert).to.contain.text(DEFAULT_ERROR_MESSAGE);

  // make sure that edit mode is not automatically exited
  await wait(75);
  expect(view.getByTestId('edit-error-alert')).to.exist;
  const editButton = getEditButton();
  expect(editButton).to.not.exist;
}

// When the initial transaction creation request fails
async function testTransactionCreationFails(addressName) {
  server.use(...mocks.createTransactionFailure);

  updateAddress(addressName);

  // expect an error to be shown
  const alert = await view.findByTestId('edit-error-alert');
  expect(alert).to.contain.text(DEFAULT_ERROR_MESSAGE);

  // make sure that edit mode is not automatically exited
  await wait(75);
  expect(view.getByTestId('edit-error-alert')).to.exist;
  const editButton = getEditButton();
  expect(editButton).to.not.exist;
}

// When the update fails while the Edit View is still active
async function testQuickFailure(addressName) {
  server.use(...mocks.transactionFailed);

  updateAddress(addressName);

  // expect an error to be shown
  const alert = await view.findByTestId('edit-error-alert');
  expect(alert).to.contain.text(DEFAULT_ERROR_MESSAGE);

  // make sure that edit mode is not automatically exited
  await wait(75);
  expect(view.getByTestId('edit-error-alert')).to.exist;
  const editButton = getEditButton();
  expect(editButton).to.not.exist;
}

// When the update fails but not until after the Edit View has exited and the
// user returned to the read-only view
async function testSlowFailure(addressName) {
  server.use(...mocks.transactionPending);

  const { cityInput } = updateAddress(addressName);

  // wait for the edit mode to exit
  await waitForElementToBeRemoved(cityInput);

  // check that the "we're working on saving your..." message appears
  const updatingMessage = await view.findByText(
    new RegExp(`We’re working on saving your new ${addressName}.`, 'i'),
  );
  expect(updatingMessage).to.exist;

  server.use(...mocks.transactionFailed);

  await waitForElementToBeRemoved(updatingMessage);

  // make sure the error message appears
  expect(
    view.getByText(
      /We couldn’t save your recent .* update. Please try again later/i,
    ),
  ).to.exist;

  // and the add/edit button should be back
  expect(getEditButton(addressName)).to.exist;
}

describe('Updating', () => {
  before(() => {
    server = setupServer(
      ...mocks.editAddressSuccess,
      ...mocks.apmTelemetry,
      ...mocks.rootTransactionStatus,
    );
    server.listen();
  });
  beforeEach(() => {
    window.VetsGov = { pollTimeout: 1 };
    const initialState = createBasicInitialState();

    view = renderWithProfileReducers(ui, {
      initialState,
    });
  });
  afterEach(() => {
    server.resetHandlers();
  });
  after(() => {
    server.close();
  });

  // the list of address fields that we need to test
  const addresses = [
    FIELD_NAMES.MAILING_ADDRESS,
    FIELD_NAMES.RESIDENTIAL_ADDRESS,
  ];

  addresses.forEach(address => {
    const addressName = FIELD_TITLES[address];
    describe(`${addressName} when the entered address passes address validation`, () => {
      it('should handle a transaction that succeeds quickly', async () => {
        await testQuickSuccess(addressName);
      });
      it('should handle a transaction that does not succeed until after the edit view exits', async () => {
        await testSlowSuccess(addressName);
      });
      it('should show an error and not auto-exit edit mode if the address validation API errors', async () => {
        await testAddressValidation500(addressName);
      });
      it('should show an error and not auto-exit edit mode if the transaction cannot be created', async () => {
        await testTransactionCreationFails(addressName);
      });
      it.skip('should show an error and not auto-exit edit mode if the transaction fails quickly', async () => {
        await testQuickFailure(addressName);
      });
      it('should show an error if the transaction fails after the edit view exits', async () => {
        await testSlowFailure(addressName);
      });
    });
  });
});
