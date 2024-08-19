import React from 'react';
import {
  DowntimeNotification,
  externalServices,
} from '@department-of-veterans-affairs/platform-monitoring/DowntimeNotification';
import PropTypes from 'prop-types';
import { Toggler } from 'platform/utilities/feature-toggles';

import RoutedSavableApp from 'platform/forms/save-in-progress/RoutedSavableApp';
import WIP from '../../shared/components/WIP';
import formConfig from '../config/form';

export default function App({ location, children }) {
  const breadcrumbList = [
    { href: '/', label: 'Home' },
    { href: '/health-care', label: 'Health care' },
    {
      href: '/health-care/foreign-medical-program',
      label: 'Foreign Medical Program (FMP)',
    },
    {
      href: '/health-care/foreign-medical-program/',
      label: 'Register for the Foreign Medical Program (FMP)',
    },
  ];
  const bcString = JSON.stringify(breadcrumbList);
  return (
    <div className="vads-l-grid-container large-screen:vads-u-padding-x--0">
      <Toggler toggleName={Toggler.TOGGLE_NAMES.form107959F1}>
        <Toggler.Enabled>
          <va-breadcrumbs breadcrumb-list={bcString} />
          <RoutedSavableApp formConfig={formConfig} currentLocation={location}>
            <DowntimeNotification
              appTitle={`CHAMPVA Form ${formConfig.formId}`}
              dependencies={[externalServices.pega]}
            >
              {children}
            </DowntimeNotification>
          </RoutedSavableApp>
        </Toggler.Enabled>
        <Toggler.Disabled>
          <br />
          <WIP
            content={{
              description:
                'We’re rolling out the Foreign Medical Program (FMP) registration (VA Form 10-7959f-1) in stages. It’s not quite ready yet. Please check back again soon.',
              redirectLink: '/',
              redirectText: 'Return to VA home page',
            }}
          />
        </Toggler.Disabled>
      </Toggler>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.object,
  location: PropTypes.object,
};
