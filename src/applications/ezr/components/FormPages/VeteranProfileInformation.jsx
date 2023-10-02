import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import { CONTACTS } from '@department-of-veterans-affairs/component-library/contacts';
import FormNavButtons from 'platform/forms-system/src/js/components/FormNavButtons';
import { normalizeFullName } from '../../utils/helpers/general';

const VeteranProfileInformation = ({ goBack, goForward, profile }) => {
  const { userFullName, dob } = profile;
  const veteranDOB = dob && moment(dob).format('MMMM DD, YYYY');
  const veteranName = normalizeFullName(userFullName, true);

  return (
    <>
      <div className="vads-u-margin-top--2p5 vads-u-margin-bottom--2">
        <p data-testid="ezr-veteran-profile-intro">
          {veteranDOB
            ? 'This is the personal information we have on file for you.'
            : 'Here\u2019s the name we have on file for you.'}
        </p>
        <div className="vads-u-border-left--7px vads-u-border-color--primary vads-u-padding-y--1 vads-u-margin-bottom--3">
          <dl className="vads-u-padding-left--1 vads-u-margin-y--0">
            <div data-testid="ezr-veteran-fullname">
              <dt className="vads-u-visibility--screen-reader">Full name:</dt>
              <dd
                className="vads-u-font-weight--bold dd-privacy-mask"
                data-dd-action-name="Full name"
              >
                {veteranName}
              </dd>
            </div>
            {veteranDOB ? (
              <div data-testid="ezr-veteran-dob">
                <dt className="vads-u-display--inline-block vads-u-margin-right--0p5">
                  Date of birth:
                </dt>
                <dd
                  className="vads-u-display--inline-block dd-privacy-mask"
                  data-dd-action-name="Date of birth"
                >
                  {veteranDOB}
                </dd>
              </div>
            ) : null}
          </dl>
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
          <va-link href="/find-locations/" text="find a VA location tool" />) to
          get help changing your name on file with VA. Ask for the eligibility
          department.
        </p>
      </div>
      <FormNavButtons goBack={goBack} goForward={goForward} />
    </>
  );
};

VeteranProfileInformation.propTypes = {
  goBack: PropTypes.func,
  goForward: PropTypes.func,
  profile: PropTypes.object,
};

const mapStateToProps = state => ({
  profile: state.user.profile,
});

export default connect(mapStateToProps)(VeteranProfileInformation);
