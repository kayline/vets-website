import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import { CONTACTS } from '@department-of-veterans-affairs/component-library/contacts';
import FormNavButtons from 'platform/forms-system/src/js/components/FormNavButtons';

const PersonalAuthenticatedInformation = ({
  goBack,
  goForward,
  isLoggedIn,
  user,
}) => {
  const {
    userFullName: { first = '', middle = '', last = '', suffix = '' },
    dob,
  } = user;
  const dateOfBirthFormatted = dob ? moment(dob).format('MMMM DD, YYYY') : '-';

  return (
    <>
      {isLoggedIn && (
        <>
          <div className="vads-u-margin-top--2p5 vads-u-margin-bottom--2">
            {dob ? (
              <p>This is the personal information we have on file for you.</p>
            ) : (
              <p>Here’s the name we have on file for you.</p>
            )}
            <div className="vads-u-border-left--7px vads-u-border-color--primary vads-u-padding-y--1 vads-u-margin-bottom--3">
              <div className="vads-u-padding-left--1">
                <p
                  className="vads-u-margin--1px"
                  data-testid="hca-veteran-fullname"
                >
                  <strong>
                    {' '}
                    {first} {middle} {last} {suffix}
                  </strong>
                </p>
                {dob && (
                  <p
                    className="vads-u-margin--1px"
                    data-testid="hca-veteran-dob"
                  >
                    Date of birth: {dateOfBirthFormatted}
                  </p>
                )}
              </div>
            </div>
            <p>
              <strong>Note:</strong> If you need to update your personal
              information, call our VA benefits hotline at{' '}
              <va-telephone contact={CONTACTS.VA_BENEFITS} /> (
              <va-telephone contact={CONTACTS[711]} tty />
              ), Monday through Friday, 8:00 a.m. to 9:00 p.m.{' '}
              <dfn>
                <abbr title="Eastern Time">ET</abbr>
              </dfn>
              .
            </p>
            <p>
              You can also call your VA medical center (
              <va-link href="/find-locations/" text="find a VA location tool" />
              ) to get help changing your name on file with VA. Ask for the
              eligibility department.
            </p>
          </div>
          <FormNavButtons goBack={goBack} goForward={goForward} />
        </>
      )}
    </>
  );
};

PersonalAuthenticatedInformation.propTypes = {
  goBack: PropTypes.func,
  goForward: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.login.currentlyLoggedIn,
    user: state.user.profile,
  };
};

export default connect(mapStateToProps)(PersonalAuthenticatedInformation);
