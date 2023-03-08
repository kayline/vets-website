import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { locationShouldBeDisplayed } from '../../utils/appointment';
import AppointmentLocation from './AppointmentLocation';

import AppointmentAction from './AppointmentAction';

const AppointmentListItem = props => {
  const { appointment, token, router } = props;
  const appointmentDateTime = new Date(appointment.startTime);
  const { t } = useTranslation();
  return (
    <li className="appointment-item vads-u-padding--2">
      <div className="appointment-summary vads-u-margin--0 vads-u-padding--0">
        <h2
          className="appointment-time vads-u-font-family--serif vads-u-font-weight--bold vads-u-margin-bottom--1 vads-u-margin-top--0"
          data-testid="appointment-time"
        >
          {t('date-time', { date: appointmentDateTime })}
        </h2>
        <p className="vads-u-margin--0 vads-u-margin-bottom--1 appointment-detail">
          <span className="item-label vads-u-font-weight--bold ">
            {t('type-of-care')}:{' '}
          </span>
          <span className="item-value" data-testid="type-of-care">
            {appointment.clinicStopCodeName
              ? appointment.clinicStopCodeName
              : t('VA-appointment')}
          </span>
          {appointment.doctorName && (
            <>
              <span className="item-label vads-u-font-weight--bold ">
                {t('provider')}:{' '}
              </span>
              <span className="item-value" data-testid="provider">
                {appointment.doctorName}
              </span>
            </>
          )}
          <span className="item-label vads-u-font-weight--bold ">
            {t('facility')}:{' '}
          </span>
          <span className="item-value" data-testid="facility-name">
            {appointment.facility}
          </span>
          <span className="item-label vads-u-font-weight--bold ">
            {t('clinic')}:{' '}
          </span>
          <span className="item-value" data-testid="clinic-name">
            <AppointmentLocation appointment={appointment} />
          </span>
          {locationShouldBeDisplayed(appointment) && (
            <>
              <span className="item-label vads-u-font-weight--bold ">
                {t('location')}:{' '}
              </span>
              <span className="item-value" data-testid="clinic-location">
                {appointment.clinicLocation}
              </span>
            </>
          )}
        </p>
      </div>
      <AppointmentAction
        appointment={appointment}
        router={router}
        token={token}
        event="check-in-clicked-non-VAOS-design"
      />
    </li>
  );
};

AppointmentListItem.propTypes = {
  appointment: PropTypes.object,
  router: PropTypes.object,
  token: PropTypes.string,
};

export default AppointmentListItem;
