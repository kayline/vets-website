import React from 'react';
import moment from 'moment';

import { getIssueName, getIssueDate } from '../utils/helpers';
import { FORMAT_YMD, FORMAT_READABLE } from '../constants';

export const missingAreaOfDisagreementErrorMessage =
  'Choose or enter a reason for disagreement';

const titlePrefix = 'Decision for';

/**
 * Title for review & submit page, text string returned
 * @param {*} data - item data (contestable issue or added issue)
 * @returns {String} - ObjectField error if not a string
 */
export const getIssueTitle = data => {
  const date = moment(getIssueDate(data), FORMAT_YMD).format(FORMAT_READABLE);
  return `${titlePrefix} ${getIssueName(data)} dated ${date}`;
};

// formContext.pagePerItemIndex is undefined here? Use index added to data :(
export const issueName = ({ formData, formContext } = {}) => {
  const index = formContext.pagePerItemIndex || formData.index;
  // https://github.com/department-of-veterans-affairs/va.gov-team/issues/27096
  const Header = formContext.onReviewPage ? 'h4' : 'h3';
  return (
    <legend
      className="schemaform-block-title schemaform-title-underline"
      aria-describedby={`area-of-disagreement-label-${index}`}
    >
      <Header className="vads-u-margin-top--0">
        {getIssueTitle(formData)}
      </Header>
    </legend>
  );
};

// Error revealed through CSS (need to verify this works for screenreaders)
// "hidden" class uses an !important flag, so we're using "hide" here
export const issusDescription = ({ formContext }) => {
  const { pagePerItemIndex, submitted } = formContext;
  // adding data-submitted attribute; updating the class name outside of React
  // breaks the areaOfDisagreementWorkAround
  return (
    <div
      key={pagePerItemIndex}
      id={`area-of-disagreement-label-${pagePerItemIndex}`}
      className="area-of-disagreement-label vads-u-font-size--base vads-u-font-weight--normal"
      data-submitted={submitted}
    >
      Tell us what you disagree with. You can choose more than one.
      <span className="vads-u-font-weight--normal schemaform-required-span">
        (*Required)
      </span>
      <p>I disagree with this:</p>
      <span
        className="usa-input-error-message"
        role="alert"
        id={`error-message-${pagePerItemIndex}`}
      >
        <span className="sr-only">Error</span>
        {missingAreaOfDisagreementErrorMessage}
      </span>
    </div>
  );
};

const titles = {
  serviceConnection: 'The service connection',
  effectiveDate: 'The effective date of award',
  evaluation: 'Your evaluation of my condition',
};

export const { serviceConnection } = titles;
export const { effectiveDate } = titles;
export const { evaluation } = titles;
export const otherLabel = 'Something else:';
// Includes _{index} which is appended by the TextWidget
export const otherDescription = ({ index }) => (
  <div
    id={`other_hint_text_${index}`}
    className="vads-u-color--gray hide-on-review"
  >
    Explain in a few words
  </div>
);

// Only show set values (ignore false & undefined)
export const AreaOfDisagreementReviewField = ({ children }) =>
  children?.props.formData ? (
    <div className="review-row">
      <dt>{titles[children.props.name]}</dt>
      <dd>{children}</dd>
    </div>
  ) : null;
