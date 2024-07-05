import format from 'date-fns/format';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import FormNavButtons from '~/platform/forms-system/src/js/components/FormNavButtons';

const PersonalAuthenticatedInformation = ({ goBack, goForward }) => {
  const navButtons = <FormNavButtons goBack={goBack} goForward={goForward} />;

  // TODO: Update with form data / prefill information
  const mock = {
    first: 'Mock',
    last: 'Data',
    dateOfBirth: '1950-10-04',
    socialOrServiceNum: {
      ssn: '1112223333',
      service: null,
    },
  };

  const { first, last, dateOfBirth, socialOrServiceNum } = mock;
  const { ssn, serviceNumber } = socialOrServiceNum;

  const dateOfBirthFormatted = !dateOfBirth
    ? '-'
    : format(new Date(dateOfBirth), 'MMMM d, yyyy');

  let ssnLastFour = '-';
  if (ssn) {
    ssnLastFour = ssn.substr(ssn.length - 4);
  }

  return (
    <>
      <div>
        <div className="vads-u-margin-top--2 vads-u-margin-bottom--2">
          <h3>Your personal information</h3>
          <p>This is the personal information we have on file for you.</p>
          <div className="vads-u-border-left--4px vads-u-border-color--primary vads-u-margin-top--4 vads-u-margin-bottom--4">
            <div className="vads-u-padding-left--1">
              <p className="vads-u-margin--1px vads-u-font-weight--bold dd-privacy-mask">
                {first} {last}
              </p>
              <p
                className="vads-u-margin--1px dd-privacy-mask"
                data-dd-action-name="Veteran's SSN"
              >
                {ssn
                  ? `Social Security number: ●●●–●●–${ssnLastFour}`
                  : `Service number: ${serviceNumber}`}
              </p>
              <p className="vads-u-margin--1px dd-privacy-mask">
                Date of birth: {dateOfBirthFormatted}
              </p>
            </div>
          </div>
          <p>
            <span className="vads-u-font-weight--bold">Note:</span> If you need
            to update your personal information, please call us at{' '}
            <va-telephone contact="8008271000" />. We’re here Monday through
            Friday, 8:00 a.m. to 9:00 p.m. ET.
          </p>
        </div>
        {navButtons}
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.login.currentlyLoggedIn,
    user: state.user.profile,
    data: state.form.data,
  };
};

export default connect(mapStateToProps)(PersonalAuthenticatedInformation);

PersonalAuthenticatedInformation.propTypes = {
  data: PropTypes.object,
  first: PropTypes.string,
  goBack: PropTypes.func,
  goForward: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  last: PropTypes.string,
  middle: PropTypes.string,
  suffix: PropTypes.string,
  veteranDateOfBirth: PropTypes.string,
  veteranSocialSecurityNumber: PropTypes.string,
};

// ___________________

// import format from 'date-fns/format';
// import React from 'react';

// const YourPersonalInformationAuthenticated = formData => {
//   // const {
//   //   dob,
//   //   ssnLastFour,
//   //   userFullName: { first, last },
//   // } = useSelector(state => {
//   //   console.log(state);
//   //   return state.user.profile;
//   // });
//   console.log(formData);

//   const mock = {
//     first: 'Mark',
//     last: 'Webb',
//     dateOfBirth: '1950-10-04',
//     socialOrServiceNum: {
//       ssn: '1112223333',
//       service: null,
//     },
//   };

//   const { first, last, dateOfBirth, socialOrServiceNum } = mock;
//   const { ssn, serviceNumber } = socialOrServiceNum;

//   const dateOfBirthFormatted = !dateOfBirth
//     ? '-'
//     : format(new Date(dateOfBirth), 'MMMM d, yyyy');

//   return (
//     <div className="vads-u-margin-top--0px">
//       <p>This is the personal information we have on file for you.</p>
//       <div className="vads-u-border-left--4px vads-u-border-color--primary">
//         <div className="vads-u-padding-left--1">
//           <p className="vads-u-margin--1px vads-u-font-weight--bold dd-privacy-mask">
//             {first} {last}
//           </p>
//           <p className="vads-u-margin--1px dd-privacy-mask">
//             {ssn
//               ? `Social Security number: ${ssn}`
//               : `Service number: ${serviceNumber}`}
//           </p>
//           <p className="vads-u-margin--1px dd-privacy-mask">
//             Date of birth: {dateOfBirthFormatted}
//           </p>
//         </div>
//       </div>
//       <p>
//         <span className="vads-u-font-weight--bold">Note:</span> If you need to
//         update your personal information, please call us at{' '}
//         <va-telephone contact="8008271000" />. We’re here Monday through Friday,
//         8:00 a.m. to 9:00 p.m. ET.
//       </p>
//     </div>
//   );
// };

// export default YourPersonalInformationAuthenticated;
