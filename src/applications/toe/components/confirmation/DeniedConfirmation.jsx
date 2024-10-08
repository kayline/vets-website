import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { LETTER_URL, LETTER_ENDPOINT } from '../../constants';
import LoadingIndicator from '../LoadingIndicator';

const DeniedConfirmation = ({
  user,
  dateReceived,
  confirmationError,
  confirmationLoading,
  printPage,
  sendConfirmation,
  userEmail,
  userFirstName,
}) => {
  useEffect(
    () => {
      sendConfirmation({
        claimStatus: 'DENIED',
        email: userEmail,
        firstName: userFirstName,
      });
    },
    [sendConfirmation, userEmail, userFirstName],
  );

  if (confirmationLoading) {
    return <LoadingIndicator message="Sending confirmation email..." />;
  }

  if (confirmationLoading) {
    return <LoadingIndicator message="Sending confirmation email..." />;
  }

  if (confirmationError) {
    return (
      <div>Error sending confirmation email: {confirmationError.message}</div>
    );
  }
  return (
    <>
      <div className="vads-u-margin-bottom--6">
        <va-alert
          close-btn-aria-label="Close notification"
          status="info"
          visible
        >
          <h3 slot="headline">You’re not eligible for this benefit</h3>
          <div>
            <p>
              Unfortunately, based on the information you provided and
              Department of Defense records, we have determined you’re not
              eligible for the Transfer of Entitlement for Post-9/11 GI Bill®
              (Chapter 33) benefit at this time.
            </p>{' '}
            <p>
              You can now download your decision letter, which explains why
              you’re not eligible. We’ll also mail a physical copy to your
              mailing address.
            </p>
          </div>
          <div>
            <a
              className="vads-u-font-weight--bold vads-u-flex--1 vads-u-margin-bottom--6"
              download
              href={LETTER_ENDPOINT}
            >
              <span className="vads-u-display--inline-block vads-u-margin-right--1">
                <va-icon icon="file_download" size={3} />
              </span>
              Download your decision letter (PDF)
            </a>
            .
          </div>
        </va-alert>
      </div>
      <div className="vads-u-margin-bottom--6">
        <va-alert
          background-only
          close-btn-aria-label="Close notification"
          status="info"
          visible
        >
          <div>
            <h3 slot="headline" style={{ marginTop: '0.625rem' }}>
              Application for VA education benefits (Form 22-1990e)
            </h3>
            For {user}
            <div className="vads-u-display--flex vads-u-flex-direction--column">
              <strong>Date received</strong>
              {dateReceived}
            </div>
            <br />
            <va-button
              uswds
              className="usa-button vads-u-margin-top--3 vads-u-width--auto"
              text="Print this page"
              onClick={printPage}
            />
          </div>
        </va-alert>
      </div>
      <div className="vads-u-margin-bottom--4">
        <h2>What happens next?</h2>
        <ul>
          <li>
            Download a copy of your decision letter. This can also be found at{' '}
            <a href={LETTER_URL}>Download your VA education letters</a>.
          </li>
          <li>
            We’ll notify you if you’re eligible for other VA education benefits.
          </li>
          <li>We don’t require further action by you at this time.</li>
        </ul>
      </div>
    </>
  );
};

DeniedConfirmation.propTypes = {
  printPage: PropTypes.func.isRequired,
  sendConfirmation: PropTypes.func.isRequired,
  userEmail: PropTypes.string.isRequired,
  userFirstName: PropTypes.string.isRequired,
  confirmationError: PropTypes.bool,
  confirmationLoading: PropTypes.bool,
  dateReceived: PropTypes.string,
  user: PropTypes.string,
};

DeniedConfirmation.defaultProps = {
  confirmationError: null,
  confirmationLoading: false,
};

export default DeniedConfirmation;
