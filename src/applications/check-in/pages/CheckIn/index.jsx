import React, { useCallback } from 'react';
import { connect } from 'react-redux';

import LoadingIndicator from '@department-of-veterans-affairs/component-library/LoadingIndicator';

import { triggerRefresh } from '../../actions';

import FeatureToggle, {
  FeatureOn,
  FeatureOff,
} from '../../components/FeatureToggle';
import DisplaySingleAppointment from './DisplaySingleAppointment';
import DisplayMultipleAppointments from './DisplayMultipleAppointments';

const CheckIn = props => {
  const {
    appointments,
    context,
    isDemographicsPageEnabled,
    isLoading,
    isUpdatePageEnabled,
    isMultipleAppointmentsEnabled,
    router,
    refreshAppointments,
  } = props;
  const appointment = appointments ? appointments[0] : {};
  const { token } = context;

  const getMultipleAppointments = useCallback(
    () => {
      refreshAppointments();
    },
    [refreshAppointments],
  );

  if (isLoading || !appointment) {
    return <LoadingIndicator message={'Loading your appointments for today'} />;
  } else {
    return (
      <FeatureToggle on={isMultipleAppointmentsEnabled}>
        <FeatureOn>
          <DisplayMultipleAppointments
            isUpdatePageEnabled={isUpdatePageEnabled}
            isDemographicsPageEnabled={isDemographicsPageEnabled}
            router={router}
            token={token}
            appointments={appointments}
            getMultipleAppointments={getMultipleAppointments}
          />
        </FeatureOn>
        <FeatureOff>
          <DisplaySingleAppointment
            isUpdatePageEnabled={isUpdatePageEnabled}
            router={router}
            token={token}
            appointment={appointment}
          />
        </FeatureOff>
      </FeatureToggle>
    );
  }
};
const mapStateToProps = state => {
  return {
    context: state.checkInData.context,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    refreshAppointments: () => dispatch(triggerRefresh()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckIn);
