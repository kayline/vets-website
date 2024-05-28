import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UpToDateVerificationStatement from './UpToDateVerificationStatement';
import VerifiedSuccessStatement from './VerifiedSuccessStatement';
import { getPeriodsToVerify } from '../helpers';
import Alert from './Alert';

const PeriodsToVerify = ({
  loggedInEnenrollmentData,
  link,
  toggleEnrollmentSuccess,
  verifyEnrollment,
}) => {
  const userData = loggedInEnenrollmentData;
  const [userEnrollmentData, setUserEnrollmentData] = useState(userData);
  const [pendingEnrollments, setPendingEnrollments] = useState([]);
  const justVerified = !!toggleEnrollmentSuccess;
  const { error } = verifyEnrollment;
  useEffect(
    () => {
      setUserEnrollmentData(userData);
    },
    [userData],
  );

  useEffect(
    () => {
      if (
        userEnrollmentData?.['vye::UserInfo']?.verifications &&
        userEnrollmentData?.['vye::UserInfo']?.pendingVerifications
      ) {
        const { pendingVerifications } = userEnrollmentData?.['vye::UserInfo'];

        // add all data to be verified into single array
        setPendingEnrollments(pendingVerifications);
      }
    },
    [userEnrollmentData],
  );

  return (
    <>
      {error && <Alert status="error" message="Oops Something went wrong" />}
      <div id="verifications-pending-alert">
        {userEnrollmentData?.['vye::UserInfo']?.pendingVerifications?.length >
          0 && (
          <va-alert
            close-btn-aria-label="Close notification"
            status="info"
            visible
          >
            <h2
              id="vye-periods-to-verify-container"
              slot="headline"
              className="vads-u-font-size--h3
              vads-u-font-weight--bold"
            >
              You have enrollment periods to verify
            </h2>
            <div>
              {getPeriodsToVerify(pendingEnrollments)}
              {link && <>{link()}</>}
            </div>
          </va-alert>
        )}
        {/* 
                will need to update logic here/ currently this would not work in prod
                as it would always show the verified success statement if there are no pending
                enrollments even if the user didn't just verify
            */}
        {userEnrollmentData?.['vye::UserInfo']?.pendingVerifications?.length ===
          0 &&
          justVerified && (
            <div>
              <VerifiedSuccessStatement />
            </div>
          )}
        {userEnrollmentData?.['vye::UserInfo']?.pendingVerifications?.length ===
          0 &&
          !justVerified && (
            <div className="vads-u-margin-top--2">
              <UpToDateVerificationStatement />
            </div>
          )}
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  loggedInEnenrollmentData: state.personalInfo.personalInfo,
  verifyEnrollment: state.verifyEnrollment,
  // verificationsResponse: state.verificationsReducer.verificationsReducer,
});

PeriodsToVerify.propTypes = {
  link: PropTypes.func,
  loading: PropTypes.bool,
  loggedInEnenrollmentData: PropTypes.object,
  toggleEnrollmentSuccess: PropTypes.bool,
  verifyEnrollment: PropTypes.object,
};
export default connect(mapStateToProps)(PeriodsToVerify);
