import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { VaModal } from '@department-of-veterans-affairs/component-library/dist/react-bindings';

import { scrollAndFocus } from 'platform/utilities/ui';

import { MAX_LENGTH } from '../constants';

// We shouldn't ever see the couldn't find contestable issues message since we
// prevent the user from navigating past the intro page; but it's here just in
// case we end up filtering out deferred and expired issues
export const ContestableIssuesLegend = ({ onReviewPage, inReviewMode }) => {
  let Wrap = 'h2';
  const wrapClassNames = ['vads-u-font-size--h3'];
  if (onReviewPage) {
    // Using a div in review mode, see
    // https://dsva.slack.com/archives/C8E985R32/p1672863010797129?thread_ts=1672860474.162309&cid=C8E985R32
    Wrap = inReviewMode ? 'div' : 'h4';
    wrapClassNames.push(
      'vads-u-font-family--serif',
      `vads-u-margin-top--${inReviewMode ? '2' : '0'}`,
    );
  }
  return (
    <>
      <legend className="vads-u-width--full">
        <Wrap className={wrapClassNames.join(' ')}>
          Select the issues you’d like us to review
        </Wrap>
      </legend>
      <div className="vads-u-margin-bottom--2">
        These are the issues we have on file for you. If an issue is missing
        from the list, you can add it here. Select the issues you’d like us to
        review.
      </div>
    </>
  );
};

ContestableIssuesLegend.propTypes = {
  inReviewMode: PropTypes.bool,
  onReviewPage: PropTypes.bool,
};

export const maxSelectedErrorMessage =
  'You’ve reached the maximum number of allowed selected issues';

// Not setting "visible" as a variable since we're controlling rendering at a
// higher level
export const MaxSelectionsAlert = ({ closeModal }) => (
  <VaModal
    modalTitle={maxSelectedErrorMessage}
    status="warning"
    onCloseEvent={closeModal}
    visible
  >
    You are limited to {MAX_LENGTH.SELECTIONS} selected issues for each
    Supplemental Claims request. If you would like to select more than{' '}
    {MAX_LENGTH.SELECTIONS}, please submit this request and create a new request
    for the remaining issues.
  </VaModal>
);

MaxSelectionsAlert.propTypes = {
  closeModal: PropTypes.func,
};

export const NoIssuesLoadedAlert = ({ submitted }) => {
  const wrapAlert = useRef(null);

  useEffect(
    () => {
      if (wrapAlert?.current) {
        scrollAndFocus(wrapAlert.current);
      }
    },
    [wrapAlert, submitted],
  );

  return (
    <div ref={wrapAlert}>
      <va-alert status="error" class="vads-u-margin-bottom--2">
        <h3 slot="headline">Sorry, we couldn’t find any eligible issues</h3>
        <p>
          If you’d like to add an issue for review, please select "Add a new
          issue" to get started.
        </p>
      </va-alert>
    </div>
  );
};

NoIssuesLoadedAlert.propTypes = {
  submitted: PropTypes.bool,
};

export const noneSelected =
  'You must select at least 1 issue before you can continue filling out your request.';

/**
 * Shows the alert box only if the form has been submitted
 */
export const NoneSelectedAlert = ({ count }) => {
  const wrapAlert = useRef(null);

  useEffect(
    () => {
      if (wrapAlert?.current) {
        scrollAndFocus(wrapAlert.current);
      }
    },
    [wrapAlert],
  );
  return (
    <div ref={wrapAlert}>
      <va-alert status="error" class="vads-u-margin-bottom--2">
        <h3
          slot="headline"
          className="eligible-issues-error vads-u-margin-x--2 vads-u-margin-y--1 vads-u-padding-x--3 vads-u-padding-y--2"
        >
          {`You’ll need to ${
            count === 0 ? 'add, and select,' : 'select'
          } an issue`}
        </h3>
        <p>{noneSelected}</p>
      </va-alert>
    </div>
  );
};

NoneSelectedAlert.propTypes = {
  count: PropTypes.number,
};

export const ContestableIssuesAdditionalInfo = (
  <va-additional-info
    trigger="Why aren’t all my issues listed here"
    class="vads-u-margin-top--4"
  >
    If you don’t see your issue or decision listed here, it may not be in our
    system yet. This can happen if it’s a more recent claim decision. We may
    still be processing it.
  </va-additional-info>
);
