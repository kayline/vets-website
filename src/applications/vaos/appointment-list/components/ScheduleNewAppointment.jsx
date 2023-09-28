import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { recordEvent } from '@department-of-veterans-affairs/platform-monitoring/exports';
import { GA_PREFIX } from 'applications/vaos/utils/constants';
import { startNewAppointmentFlow } from '../redux/actions';
import {
  selectFeatureRequests,
  selectFeatureStatusImprovement,
  selectFeaturePrintList,
  selectFeatureBreadcrumbUrlUpdate,
} from '../../redux/selectors';

function handleClick(history, dispatch, featureBreadcrumbUrlUpdate) {
  recordEvent({
    event: `${GA_PREFIX}-schedule-appointment-button-clicked`,
  });
  dispatch(startNewAppointmentFlow());
  history.push(
    featureBreadcrumbUrlUpdate ? '/schedule/type-of-care' : '/new-appointment',
  );
}

function ScheduleNewAppointmentButton() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isPrintList = useSelector(state => selectFeaturePrintList(state));
  const featureBreadcrumbUrlUpdate = useSelector(
    selectFeatureBreadcrumbUrlUpdate,
  );

  return (
    <button
      type="button"
      className={`xsmall-screen:${
        isPrintList ? 'vads-u-margin-bottom--3' : 'vads-u-margin-bottom--2'
      } vaos-hide-for-print vads-u-margin--0 small-screen:vads-u-margin-bottom--4`}
      aria-label="Start scheduling an appointment"
      id="schedule-button"
      onClick={() => handleClick(history, dispatch, featureBreadcrumbUrlUpdate)}
    >
      Start scheduling
    </button>
  );
}

export default function ScheduleNewAppointment() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const featureStatusImprovement = useSelector(state =>
    selectFeatureStatusImprovement(state),
  );
  const showScheduleButton = useSelector(state => selectFeatureRequests(state));
  const featureBreadcrumbUrlUpdate = useSelector(
    selectFeatureBreadcrumbUrlUpdate,
  );

  if (featureStatusImprovement) {
    // Only display scheduling button on upcoming appointments page
    if (
      location.pathname.endsWith('pending') ||
      location.pathname.endsWith('past')
    ) {
      return null;
    }
    return <ScheduleNewAppointmentButton />;
  }

  return (
    <>
      {!featureStatusImprovement &&
        showScheduleButton && (
          <div className="vads-u-margin-bottom--1p5 vaos-hide-for-print">
            Schedule primary or specialty care appointments.
          </div>
        )}

      <button
        type="button"
        className="vaos-hide-for-print"
        aria-label="Start scheduling an appointment"
        id="schedule-button"
        onClick={() =>
          handleClick(history, dispatch, featureBreadcrumbUrlUpdate)
        }
      >
        Start scheduling
      </button>
    </>
  );
}
