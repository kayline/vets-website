import React from 'react';
import { connect } from 'react-redux';
import externalServiceStatus from 'platform/monitoring/DowntimeNotification/config/externalServiceStatus';
import {
  DowntimeNotification,
  externalServices,
} from 'platform/monitoring/DowntimeNotification';
import { PAGE_NAMES } from '../constants';
import StartFormButton from '../components/StartFormButton';
import ContactDMC from '../components/Contacts';
import DelayedLiveRegion from '../DelayedLiveRegion';
import { fsrFeatureToggle } from '../../utils/helpers';

import { MaintenanceAlert } from '../../components/Alerts';

const StartForm = ({ setWizardStatus }) => {
  const label = 'Start your request now';
  const currentDate = Date.parse(new Date());
  const endOfMaintenanceDate = Date.parse(new Date('2022-05-31'));

  return (
    <>
      {currentDate < endOfMaintenanceDate ? (
        <va-alert class="row vads-u-margin-bottom--5" status="info" show-icon>
          <h2 slot="headline" className="vads-u-font-size--h3">
            The online financial help request form (VA Form 5655) is down for
            maintenance
          </h2>
          <p className="vads-u-font-size--base vads-u-font-family--sans">
            We’re doing some work on the online financial help request form (VA
            Form 5655) between Friday, May 27th and Tuesday, May 31st. We’re
            sorry it’s not working right now.
          </p>
          <p>
            To request help with VA education, disability compensation, or
            pension benefit debt, please fill out the PDF version of our{' '}
            <a href="https://www.va.gov/vaforms/va/pdf/VA5655.pdf">
              Financial Status Report (VA Form 5655)
            </a>
            .
          </p>
        </va-alert>
      ) : (
        <div className="vads-u-background-color--gray-lightest vads-u-padding--2 vads-u-margin-top--2">
          <h2
            className="vads-u-margin-top--0 vads-u-font-size--h6 vads-u-font-weight--normal vads-u-font-family--sans"
            id="wizard-results"
          >
            Based on the information you provided, you can use our online
            Financial Status Report (VA Form 5655) to request help with your
            debt.
          </h2>
          <StartFormButton setWizardStatus={setWizardStatus} label={label} />
          <p className="vads-u-margin-bottom--1">
            <strong>If you submitted VA Form 5655 in the past 6 months</strong>
          </p>
          <p className="vads-u-margin-top--0">
            You don’t need to submit a new request unless you have changes to
            report. <ContactDMC />
          </p>
        </div>
      )}
    </>
  );
};

const Submit = ({ showFSR, setWizardStatus }) => {
  return (
    <DelayedLiveRegion>
      <DowntimeNotification
        appTitle="VA Form 5655"
        dependencies={[externalServices.dmc]}
        render={({ status }) => {
          if (!showFSR || status === externalServiceStatus.down) {
            return <MaintenanceAlert />;
          }
          return <StartForm setWizardStatus={setWizardStatus} />;
        }}
      />
    </DelayedLiveRegion>
  );
};

const mapStateToProps = state => ({
  showFSR: fsrFeatureToggle(state),
});

export default {
  name: PAGE_NAMES.submit,
  component: connect(mapStateToProps)(Submit),
};
