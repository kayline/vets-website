import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { shouldHideFormFooter } from '../selectors';

const FormFooter = ({ formConfig, currentLocation, isHidden }) => {
  const GetFormHelp = formConfig.getHelp;
  const trimmedPathname = currentLocation.pathname.replace(/\/$/, '');
  const isConfirmationPage = trimmedPathname.endsWith('confirmation');

  return !isConfirmationPage ? (
    <div className="row">
      <div className="usa-width-two-thirds medium-8 columns">
        <div className="help-footer-box">
          {!isHidden && (
            <>
              <h2 className="help-heading">Need help?</h2>
              <GetFormHelp />
            </>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

FormFooter.propTypes = {
  currentLocation: PropTypes.object,
  formConfig: PropTypes.object,
  isHidden: PropTypes.bool,
};

const mapStateToProps = state => ({
  isHidden: shouldHideFormFooter(state),
});

export { FormFooter };
export default connect(mapStateToProps)(FormFooter);
