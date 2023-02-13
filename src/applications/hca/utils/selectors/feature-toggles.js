import { createSelector } from 'reselect';
import { toggleValues } from '@department-of-veterans-affairs/platform-site-wide/selectors';
import FEATURE_FLAG_NAMES from '@department-of-veterans-affairs/platform-utilities/featureFlagNames';

const selectFeatureToggles = createSelector(
  state => ({
    isLoadingFeatureFlags: state?.featureToggles?.loading,
    isAiqEnabled: toggleValues(state)[
      FEATURE_FLAG_NAMES.hcaAmericanIndianEnabled
    ],
    isBrowserMonitoringEnabled: toggleValues(state)[
      FEATURE_FLAG_NAMES.hcaBrowserMonitoringEnabled
    ],
    isESOverrideEnabled: toggleValues(state)[
      FEATURE_FLAG_NAMES.hcaEnrollmentStatusOverrideEnabled
    ],
    isFacilitiesApiEnabled: toggleValues(state)[
      FEATURE_FLAG_NAMES.hcaUseFacilitiesApi
    ],
    isSigiEnabled: toggleValues(state)[FEATURE_FLAG_NAMES.caregiverSigiEnabled],
  }),
  toggles => toggles,
);

const makeSelectFeatureToggles = () => selectFeatureToggles;

export { makeSelectFeatureToggles };
