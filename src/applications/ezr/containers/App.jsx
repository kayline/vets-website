import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RoutedSavableApp from 'platform/forms/save-in-progress/RoutedSavableApp';
import { setData } from 'platform/forms-system/src/js/actions';

import content from '../locales/en/content.json';
import formConfig from '../config/form';

const App = props => {
  const { children, features, formData, location, setFormData, user } = props;
  const { veteranFullName } = formData;
  const { loading, isSigiEnabled } = features;
  const { dob: veteranDateOfBirth } = user;

  /**
   * Set default view fields in the form data
   *
   * NOTE: veteranFullName is included in the dependency list to reset view fields when
   * starting a new application from save-in-progress.
   *
   * NOTE (2): the Date of Birth value from the user's profile is included to fix a bug
   * where some profiles do not contain a DOB value. In this case, we need to ask the
   * user for that data for proper submission.
   */
  useEffect(
    () => {
      if (!loading) {
        const defaultViewFields = {
          'view:userDob': veteranDateOfBirth,
          'view:isSigiEnabled': isSigiEnabled,
        };

        setFormData({
          ...formData,
          ...defaultViewFields,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isSigiEnabled, loading, veteranFullName, veteranDateOfBirth],
  );

  return loading ? (
    <va-loading-indicator message={content['load-app']} set-focus />
  ) : (
    <RoutedSavableApp formConfig={formConfig} currentLocation={location}>
      {children}
    </RoutedSavableApp>
  );
};

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  features: PropTypes.object,
  formData: PropTypes.object,
  location: PropTypes.object,
  setFormData: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  features: {
    loading: state.featureToggles.loading,
    isSigiEnabled: state.featureToggles.hcaSigiEnabled,
  },
  formData: state.form.data,
  user: state.user.profile,
});

const mapDispatchToProps = {
  setFormData: setData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
