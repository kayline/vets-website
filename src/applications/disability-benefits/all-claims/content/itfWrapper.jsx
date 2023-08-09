import React from 'react';
import moment from 'moment';
import { VaAdditionalInfo } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import { recordEventOnce } from 'platform/monitoring/record-event';

// EVSS returns dates like '2014-07-28T19:53:45.810+0000'
const evssDateFormat = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
const outputDateFormat = 'MMMM DD, YYYY';
const displayDate = dateString =>
  moment(dateString, evssDateFormat).format(outputDateFormat);

export const itfMessage = (headline, content, status) => (
  // Inline style to match .full-page-alert bottom margin because usa-grid > :last-child has a
  //  bottom margin of 0 and overrides it
  <div className="full-page-alert itf-wrapper">
    <va-alert visible status={status}>
      <h2 slot="headline">{headline}</h2>
      {content}
    </va-alert>
  </div>
);

const recordITFHelpEvent = () =>
  recordEventOnce({
    event: 'disability-526EZ--form-help-text-clicked',
    'help-text-label': 'Disability - Form 526EZ - What is an intent to file',
  });

const expander = (
  <VaAdditionalInfo
    trigger="What is an Intent to File?"
    disableAnalytics
    onClick={recordITFHelpEvent}
  >
    <p className="vads-u-font-size--base">
      An Intent to File request lets VA know that you’re planning to file a
      claim. An Intent to File reserves a potential effective date for when you
      could start getting benefits while you prepare your disability claim and
      gather supporting documents.
    </p>
  </VaAdditionalInfo>
);

export const claimsIntakeAddress = (
  <p className="va-address-block vads-u-font-size--base">
    Department of Veterans Affairs
    <br />
    Claims Intake Center
    <br />
    PO Box 4444
    <br />
    Janesville, WI 53547-4444
  </p>
);

export const itfError = (
  <div>
    <div>
      <p className="vads-u-font-size--base">
        Due to the high volume of submissions we are receiving, you can’t
        continue with this claim form at this time - but we have received your
        intent to file and saved your effective date for benefits. <br />
        Here’s what this means for you:
        <ul>
          <li>You have 1 year from today to complete your claim.</li>
          <li>
            If we determine that you’re eligible for disability compensation,
            we’ll backdate your benefits to today as your claim effective date.
          </li>
          <li>
            If you’re filing a claim based on the PACT Act, you may still be
            eligible to receive benefits backdated to August 10, 2022.
          </li>
        </ul>
        <strong>Note:</strong> If you come back to this form in the next few
        days and continue to get this message, don’t worry. Your intent to file
        date is set for today.
      </p>
    </div>
    {expander}
  </div>
);

export const itfSuccess = (
  hasPreviousItf,
  expirationDate,
  prevExpirationDate,
) => (
  <div>
    <p className="vads-u-font-size--base">
      Thank you for submitting your Intent to File request for disability
      compensation. Your Intent to File will expire on{' '}
      {displayDate(expirationDate)}.
    </p>
    {hasPreviousItf && (
      <p className="vads-u-font-size--base">
        <strong>Please note:</strong> We found a previous Intent to File request
        in our records that expired on {displayDate(prevExpirationDate)}. This
        ITF might have been from an application you started, but didn’t finish
        before the ITF expired. Or, it could have been from a claim you already
        submitted.
      </p>
    )}
    {expander}
  </div>
);

export const itfActive = expirationDate => (
  <div>
    <p className="vads-u-font-size--base">
      Our records show that you already have an Intent to File for disability
      compensation. Your Intent to File will expire on{' '}
      {displayDate(expirationDate)}. You’ll need to submit your claim by this
      date in order to receive payments starting from your effective date.
    </p>
    {expander}
  </div>
);
