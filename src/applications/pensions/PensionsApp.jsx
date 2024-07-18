import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import RoutedSavableApp from 'platform/forms/save-in-progress/RoutedSavableApp';
import { useFeatureToggle } from 'platform/utilities/feature-toggles';
import formConfig from './config/form';
import { NoFormPage } from './components/NoFormPage';
import { useBrowserMonitoring } from './hooks/useBrowserMonitoring';
import { submit } from './config/submit';

export default function PensionEntry({ location, children }) {
  const { useToggleValue, TOGGLE_NAMES } = useFeatureToggle();
  const pensionFormEnabled = useToggleValue(TOGGLE_NAMES.pensionFormEnabled);
  const pensionMultiplePageResponse = useToggleValue(
    TOGGLE_NAMES.pensionMultiplePageResponse,
  );
  const pensionModuleEnabled = useToggleValue(
    TOGGLE_NAMES.pensionModuleEnabled,
  );
  const isLoadingFeatures = useSelector(
    state => state?.featureToggles?.loading,
  );
  const redirectToHowToPage =
    pensionFormEnabled === false &&
    !location.pathname?.includes('/introduction');
  if (redirectToHowToPage === true) {
    window.location.href = '/pension/survivors-pension/';
  }

  // Add Datadog UX monitoring to the application
  useBrowserMonitoring();

  useEffect(
    () => {
      if (!isLoadingFeatures) {
        window.sessionStorage.setItem(
          'showMultiplePageResponse',
          pensionMultiplePageResponse,
        );
      }
    },
    [isLoadingFeatures, pensionMultiplePageResponse],
  );

  if (isLoadingFeatures !== false || redirectToHowToPage) {
    return <va-loading-indicator message="Loading application..." />;
  }

  if (!pensionFormEnabled) {
    return <NoFormPage />;
  }

  if (pensionModuleEnabled) {
    formConfig.submit = (f, fc) => submit(f, fc, 'pensions/v0/pension_claims');
  }

  return (
    <RoutedSavableApp formConfig={formConfig} currentLocation={location}>
      {children}
    </RoutedSavableApp>
  );
}
PensionEntry.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};
