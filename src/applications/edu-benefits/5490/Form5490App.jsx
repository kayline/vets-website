import React from 'react';

import RoutedSavableApp from 'platform/forms/save-in-progress/RoutedSavableApp';
import { useBrowserMonitoring } from '~/platform/utilities/real-user-monitoring';
import { useFeatureToggle } from '~/platform/utilities/feature-toggles';
import formConfig from './config/form';

import './sass/5490.scss';

export default function Form5490Entry({ location, children }) {
  React.useEffect(
    () => {
      const checkbox = document.getElementById('root_view:noSSN');
      const input = document.getElementById(
        'root_relativeSocialSecurityNumber',
      );
      const disableSsnField = event => {
        if (event.target.checked) {
          input.setAttribute('disabled', true);
        } else {
          input.removeAttribute('disabled');
        }
      };

      if (checkbox && location.pathname === '/applicant/information') {
        checkbox?.addEventListener('change', disableSsnField);
      }
      return () => checkbox?.removeEventListener('change', disableSsnField);
    },
    [location.pathname],
  );

  const { TOGGLE_NAMES } = useFeatureToggle();
  useBrowserMonitoring({
    location,
    toggleName: TOGGLE_NAMES.disablityBenefitsBrowserMonitoringEnabled,
  });

  return (
    <RoutedSavableApp formConfig={formConfig} currentLocation={location}>
      {children}
    </RoutedSavableApp>
  );
}
