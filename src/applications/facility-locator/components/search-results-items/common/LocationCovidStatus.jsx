/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import createCommonStore from 'platform/startup/store';
import { connectFeatureToggle } from 'platform/utilities/feature-toggles';
import { FeatureToggleReducer } from 'platform/site-wide/feature-toggles/reducers';
import { toggleValues } from 'platform/site-wide/feature-toggles/selectors';

const store = createCommonStore({
  FeatureToggleReducer,
});

const LocationCovidStatus = ({ supplementalStatus, staticCovidStatuses }) => {
  const [showVamcAlert, setShowVamcAlert] = useState(true);

  useEffect(() => {
    connectFeatureToggle(store.dispatch);
    store.subscribe(() => {
      const flags = toggleValues(store.getState());
      if (
        flags?.showExpandableVamcAlert === 'undefined' ||
        flags?.showExpandableVamcAlert === false
      ) {
        setShowVamcAlert(false);
      }
    });
  }, []);

  if (!staticCovidStatuses) {
    return <></>;
  }

  const covidStatus = staticCovidStatuses.find(status => {
    const activeCovidStatus = supplementalStatus?.find(activeStatus =>
      activeStatus.id.includes('COVID'),
    );

    return status.status_id === activeCovidStatus?.id;
  });

  if (!covidStatus || !showVamcAlert) {
    return <></>;
  }

  return (
    <va-alert
      background-only
      show-icon
      status="info"
      data-testid={`${covidStatus.status_id.toLowerCase()}-message`}
      class="vads-u-margin-x--0"
    >
      <div>{covidStatus.name}</div>
    </va-alert>
  );
};

LocationCovidStatus.propTypes = {
  staticCovidStatuses: PropTypes.array,
  supplementalStatus: PropTypes.array,
};

export default LocationCovidStatus;
