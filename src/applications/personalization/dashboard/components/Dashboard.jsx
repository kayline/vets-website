import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import {
  fetchMilitaryInformation as fetchMilitaryInformationAction,
  fetchHero as fetchHeroAction,
} from '@@profile/actions';
import { toggleValues } from '~/platform/site-wide/feature-toggles/selectors';
import FEATURE_FLAG_NAMES from '~/platform/utilities/feature-toggles/featureFlagNames';
import { connectDrupalSourceOfTruthCerner } from '~/platform/utilities/cerner/dsot';
import recordEvent from '~/platform/monitoring/record-event';
import { focusElement } from '~/platform/utilities/ui';
import {
  Toggler,
  useFeatureToggle,
} from '~/platform/utilities/feature-toggles';
import {
  createIsServiceAvailableSelector,
  isLOA3 as isLOA3Selector,
  isLOA1 as isLOA1Selector,
  isVAPatient as isVAPatientSelector,
  hasMPIConnectionError,
  isNotInMPI,
} from '~/platform/user/selectors';
import {
  RequiredLoginView,
  RequiredLoginLoader,
} from '~/platform/user/authorization/components/RequiredLoginView';
import backendServices from '~/platform/user/profile/constants/backendServices';
import {
  DowntimeNotification,
  externalServices,
} from '~/platform/monitoring/DowntimeNotification';

import NameTag from '~/applications/personalization/components/NameTag';
import MPIConnectionError from '~/applications/personalization/components/MPIConnectionError';
import NotInMPIError from '~/applications/personalization/components/NotInMPIError';
import IdentityNotVerified from '~/applications/personalization/components/IdentityNotVerified';
import { fetchTotalDisabilityRating as fetchTotalDisabilityRatingAction } from '~/applications/personalization/rated-disabilities/actions';
import { hasTotalDisabilityServerError } from '~/applications/personalization/rated-disabilities/selectors';
import { API_NAMES } from '../../common/constants';
import useDowntimeApproachingRenderMethod from '../useDowntimeApproachingRenderMethod';
import ApplyForBenefits from './apply-for-benefits/ApplyForBenefits';
import ClaimsAndAppeals from './claims-and-appeals/ClaimsAndAppeals';
import HealthCare from './health-care/HealthCare';
import CTALink from './CTALink';
import BenefitPayments from './benefit-payments/BenefitPayments';
import Debts from './debts/Debts';
import { getAllPayments } from '../actions/payments';
import Notifications from './notifications/Notifications';
import { canAccess } from '../../common/selectors';
import { RenderClaimsWidgetDowntimeNotification } from './RenderWidgetDowntimeNotification';
import SavedApplications from './apply-for-benefits/SavedApplications';
import EducationAndTraining from './education-and-training/EducationAndTraining';

const DashboardHeader = ({ showNotifications }) => {
  const { useToggleValue, TOGGLE_NAMES } = useFeatureToggle();
  const hideNotificationsSection = useToggleValue(
    TOGGLE_NAMES.myVaHideNotificationsSection,
  );

  return (
    <div>
      <h1
        id="dashboard-title"
        data-testid="dashboard-title"
        tabIndex="-1"
        className="vads-u-margin--0 vads-u-margin-top--2 medium-screen:vads-u-margin-top--3"
      >
        My VA
      </h1>
      <CTALink
        href="/profile"
        text="Go to your profile"
        className="vads-u-margin-top--2"
        onClick={() => {
          recordEvent({
            event: 'dashboard-navigation',
            'dashboard-action': 'view-link',
            'dashboard-product': 'view-your-profile',
          });
        }}
      />
      {showNotifications && !hideNotificationsSection && <Notifications />}
    </div>
  );
};

const LOA1Content = ({ isLOA1, isVAPatient, useLighthouseClaims }) => {
  return (
    <Toggler toggleName={Toggler.TOGGLE_NAMES.myVaUseExperimentalFrontend}>
      <Toggler.Enabled>
        <>
          <div className="vads-l-row">
            <div className="vads-l-col--12 medium-screen:vads-l-col--8 medium-screen:vads-u-padding-right--3">
              <IdentityNotVerified headline="Verify your identity to access more VA.gov tools and features" />
            </div>
          </div>

          <ClaimsAndAppeals
            useLighthouseClaims={useLighthouseClaims}
            isLOA1={isLOA1}
          />

          <HealthCare isVAPatient={isVAPatient} isLOA1={isLOA1} />
          <EducationAndTraining isLOA1={isLOA1} />
          <SavedApplications isLOA1={isLOA1} />
        </>
      </Toggler.Enabled>

      <Toggler.Disabled>
        <div className="vads-l-row">
          <div className="vads-l-col--12 medium-screen:vads-l-col--8 medium-screen:vads-u-padding-right--3">
            <IdentityNotVerified headline="Verify your identity to access more VA.gov tools and features" />
          </div>
        </div>
        <ApplyForBenefits />
      </Toggler.Disabled>
    </Toggler>
  );
};

DashboardHeader.propTypes = {
  showNotifications: PropTypes.bool,
};

LOA1Content.propTypes = {
  isLOA1: PropTypes.bool,
  isVAPatient: PropTypes.bool,
  useLighthouseClaims: PropTypes.bool,
};

const Dashboard = ({
  canAccessMilitaryHistory,
  canAccessPaymentHistory,
  canAccessRatingInfo,
  fetchFullName,
  fetchMilitaryInformation,
  fetchTotalDisabilityRating,
  getPayments,
  isLOA3,
  isLOA1,
  payments,
  showLoader,
  showMPIConnectionError,
  showNameTag,
  showNotInMPIError,
  showNotifications,
  useLighthouseClaims,
  isVAPatient,
  ...props
}) => {
  const downtimeApproachingRenderMethod = useDowntimeApproachingRenderMethod();
  const dispatch = useDispatch();

  useEffect(() => {
    // use Drupal based Cerner facility data
    connectDrupalSourceOfTruthCerner(dispatch);
  }, []);

  // focus on the name tag or the header when we are done loading
  useEffect(
    () => {
      if (!showLoader) {
        if (showNameTag) {
          focusElement('#name-tag');
        } else {
          focusElement('#dashboard-title');
        }
      }
    },
    [showLoader, showNameTag],
  );

  // fetch data when we determine they are LOA3
  useEffect(
    () => {
      if (isLOA3) {
        fetchFullName();
        if (canAccessMilitaryHistory) {
          fetchMilitaryInformation();
        }
        if (canAccessRatingInfo) {
          fetchTotalDisabilityRating();
        }
      }
    },
    [
      canAccessMilitaryHistory,
      canAccessRatingInfo,
      isLOA3,
      fetchFullName,
      fetchMilitaryInformation,
      fetchTotalDisabilityRating,
    ],
  );

  // fetch data when we determine they are LOA3
  useEffect(
    () => {
      if (canAccessPaymentHistory) {
        getPayments();
      }
    },
    [canAccessPaymentHistory, getPayments],
  );

  return (
    <RequiredLoginView
      serviceRequired={[backendServices.USER_PROFILE]}
      user={props.user}
      showProfileErrorMessage
    >
      <DowntimeNotification
        appTitle="user dashboard"
        loadingIndicator={<RequiredLoginLoader />}
        dependencies={[
          externalServices.mvi,
          externalServices.mhv,
          externalServices.appeals,
        ]}
        render={downtimeApproachingRenderMethod}
      >
        {showLoader && <RequiredLoginLoader />}
        {!showLoader && (
          <div className="dashboard">
            {showNameTag && (
              <div id="name-tag">
                <NameTag
                  totalDisabilityRating={props.totalDisabilityRating}
                  totalDisabilityRatingServerError={
                    props.totalDisabilityRatingServerError
                  }
                />
              </div>
            )}
            <div className="vads-l-grid-container vads-u-padding-x--1 vads-u-padding-bottom--3 medium-screen:vads-u-padding-x--2 medium-screen:vads-u-padding-bottom--4">
              <DashboardHeader showNotifications={showNotifications} />

              {showMPIConnectionError && (
                <div className="vads-l-row">
                  <MPIConnectionError className="vads-l-col--12 medium-screen:vads-l-col--8 medium-screen:vads-u-padding-right--3 vads-u-margin-top--3" />
                </div>
              )}

              {showNotInMPIError && (
                <div className="vads-l-row">
                  <NotInMPIError
                    className="vads-l-col--12 medium-screen:vads-l-col--8 medium-screen:vads-u-padding-right--3 vads-u-margin-top--3"
                    level={2}
                  />
                </div>
              )}

              {/* LOA1 user experience */}
              {isLOA1 && (
                <LOA1Content
                  isLOA1={isLOA1}
                  isVAPatient={isVAPatient}
                  useLighthouseClaims={useLighthouseClaims}
                />
              )}

              {/* LOA3 user experience */}
              {props.showClaimsAndAppeals && (
                <DowntimeNotification
                  dependencies={[
                    externalServices.mhv,
                    externalServices.appeals,
                  ]}
                  render={RenderClaimsWidgetDowntimeNotification}
                >
                  <ClaimsAndAppeals useLighthouseClaims={useLighthouseClaims} />
                </DowntimeNotification>
              )}
              {isLOA3 && (
                <>
                  <HealthCare isVAPatient={isVAPatient} />
                  <Debts />
                  <BenefitPayments
                    payments={payments}
                    showNotifications={showNotifications}
                  />
                  <EducationAndTraining />
                  <SavedApplications />
                </>
              )}
            </div>
          </div>
        )}
      </DowntimeNotification>
    </RequiredLoginView>
  );
};

const isClaimsAvailableSelector = createIsServiceAvailableSelector(
  backendServices.EVSS_CLAIMS,
);

const isLighthouseClaimsAvailableSelector = createIsServiceAvailableSelector(
  backendServices.LIGHTHOUSE,
);

const isAppealsAvailableSelector = createIsServiceAvailableSelector(
  backendServices.APPEALS_STATUS,
);

const mapStateToProps = state => {
  const { isReady: hasLoadedScheduledDowntime } = state.scheduledDowntime;
  const isLOA3 = isLOA3Selector(state);
  const isLOA1 = isLOA1Selector(state);
  const isVAPatient = isVAPatientSelector(state);
  const hero = state.vaProfile?.hero;
  const hasClaimsOrAppealsService =
    isAppealsAvailableSelector(state) ||
    isClaimsAvailableSelector(state) ||
    isLighthouseClaimsAvailableSelector(state);
  const hasMHVAccount = ['OK', 'MULTIPLE'].includes(
    state.user?.profile?.mhvAccountState,
  );
  const hasLoadedFullName = !!hero;

  const canAccessPaymentHistory = canAccess(state)[API_NAMES.PAYMENT_HISTORY];
  const canAccessRatingInfo = canAccess(state)[API_NAMES.RATING_INFO];
  const canAccessMilitaryHistory = canAccess(state)[API_NAMES.MILITARY_HISTORY];

  const hasLoadedDisabilityRating = canAccessRatingInfo
    ? state.totalRating?.loading === false
    : true;

  const hasLoadedMilitaryInformation = canAccessMilitaryHistory
    ? state.vaProfile?.militaryInformation
    : true;

  const hasLoadedAllData =
    // we do not need to fetch additional data if they are only LOA1
    isLOA1 ||
    (hasLoadedMilitaryInformation &&
      hasLoadedFullName &&
      hasLoadedDisabilityRating);

  const showLoader = !hasLoadedScheduledDowntime || !hasLoadedAllData;
  const showValidateIdentityAlert = isLOA1;
  const showNameTag = isLOA3 && isEmpty(hero?.errors);
  const showMPIConnectionError = hasMPIConnectionError(state);
  const showNotInMPIError = isNotInMPI(state);
  const showClaimsAndAppeals =
    !showMPIConnectionError &&
    !showNotInMPIError &&
    isLOA3 &&
    hasClaimsOrAppealsService;
  const showHealthCare =
    hasMHVAccount &&
    !showMPIConnectionError &&
    !showNotInMPIError &&
    isLOA3 &&
    isVAPatient;

  const useLighthouseClaims = toggleValues(state)[
    FEATURE_FLAG_NAMES.myVaUseLighthouseClaims
  ];

  const showNotifications =
    !showMPIConnectionError && !showNotInMPIError && isLOA3;

  return {
    canAccessMilitaryHistory,
    canAccessPaymentHistory,
    canAccessRatingInfo,
    isLOA3,
    isLOA1,
    showLoader,
    showValidateIdentityAlert,
    showClaimsAndAppeals,
    showHealthCare,
    isVAPatient,
    showNameTag,
    hero,
    totalDisabilityRating: state.totalRating?.totalDisabilityRating,
    totalDisabilityRatingServerError: hasTotalDisabilityServerError(state),
    useLighthouseClaims,
    user: state.user,
    showMPIConnectionError,
    showNotInMPIError,
    showNotifications,
    payments: state.allPayments.payments || [],
  };
};

Dashboard.propTypes = {
  canAccessMilitaryHistory: PropTypes.bool,
  canAccessPaymentHistory: PropTypes.bool,
  canAccessRatingInfo: PropTypes.bool,
  fetchFullName: PropTypes.func,
  fetchMilitaryInformation: PropTypes.func,
  fetchTotalDisabilityRating: PropTypes.func,
  getPayments: PropTypes.func,
  isLOA1: PropTypes.bool,
  isLOA3: PropTypes.bool,
  isVAPatient: PropTypes.bool,
  payments: PropTypes.arrayOf(
    PropTypes.shape({
      payCheckAmount: PropTypes.string.isRequired,
      payCheckDt: PropTypes.string.isRequired,
      payCheckId: PropTypes.string.isRequired,
      payCheckReturnFiche: PropTypes.string.isRequired,
      payCheckType: PropTypes.string.isRequired,
      paymentMethod: PropTypes.string.isRequired,
      bankName: PropTypes.string.isRequired,
      accountNumber: PropTypes.string.isRequired,
    }),
  ),
  showClaimsAndAppeals: PropTypes.bool,
  showHealthCare: PropTypes.bool,
  showLoader: PropTypes.bool,
  showMPIConnectionError: PropTypes.bool,
  showNameTag: PropTypes.bool,
  showNotInMPIError: PropTypes.bool,
  showNotifications: PropTypes.bool,
  showValidateIdentityAlert: PropTypes.bool,
  totalDisabilityRating: PropTypes.number,
  totalDisabilityRatingServerError: PropTypes.bool,
  useLighthouseClaims: PropTypes.bool,
  user: PropTypes.object,
};

const mapDispatchToProps = {
  fetchFullName: fetchHeroAction,
  fetchMilitaryInformation: fetchMilitaryInformationAction,
  fetchTotalDisabilityRating: fetchTotalDisabilityRatingAction,
  getPayments: getAllPayments,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
