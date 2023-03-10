import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import AppointmentMessageVaos from './AppointmentMessageVaos';
import AppointmentActionVaos from './AppointmentActionVaos';
import {
  appointmentIcon,
  clinicName,
  getAppointmentId,
} from '../../utils/appointment';
import { APP_NAMES } from '../../utils/appConstants';

const AppointmentListItemVaos = props => {
  const { appointment, goToDetails, router, app, page } = props;
  const { t } = useTranslation();

  const appointmentDateTime = new Date(appointment.startTime);
  const clinic = clinicName(appointment);

  const pagesToShowDetails = ['details', 'complete', 'confirmation'];
  const showDetailsLink = pagesToShowDetails.includes(page) && goToDetails;

  const typeOfCare = appointment.clinicStopCodeName
    ? appointment.clinicStopCodeName
    : t('VA-appointment');

  const infoBlockMessage = () => {
    if (appointment?.kind === 'phone') {
      return (
        <span data-testid="phone-msg-confirmation">
          {t('your-provider-will-call-you-at-your-appointment-time')}
        </span>
      );
    }
    return (
      <span data-testid="in-person-msg-confirmation">
        {t('please-bring-your-insurance-cards-with-you-to-your-appointment')}
      </span>
    );
  };

  return (
    <li
      className="vads-u-border-bottom--1px check-in--appointment-item"
      data-testid="appointment-list-item"
    >
      <div className="check-in--appointment-summary vads-u-margin-bottom--2 vads-u-margin-top--2">
        <div
          data-testid="appointment-time"
          className="vads-u-font-size--h2 vads-u-font-family--serif vads-u-font-weight--bold"
        >
          {t('date-time', { date: appointmentDateTime })}
        </div>
        <div
          data-testid="appointment-type-and-provider"
          className="vads-u-font-weight--bold"
        >
          {typeOfCare}
          {appointment.doctorName
            ? ` ${t('with')} ${appointment.doctorName}`
            : ''}
        </div>
        <div className="vads-u-display--flex vads-u-align-items--baseline">
          <div
            data-testid="appointment-kind-icon"
            className="vads-u-margin-right--1 check-in--label"
          >
            {appointmentIcon(appointment)}
          </div>
          <div
            data-testid="appointment-kind-and-location"
            className="vads-u-display--inline"
          >
            {appointment?.kind === 'phone' ? (
              t('phone')
            ) : (
              <>
                {`${t('in-person')} at ${appointment.facility}`} <br /> Clinic:{' '}
                {clinic}
              </>
            )}
          </div>
        </div>
        {showDetailsLink && (
          <div className="vads-u-margin-y--2">
            <a
              data-testid="details-link"
              href={`${
                router.location.basename
              }/appointment-details/${getAppointmentId(appointment)}`}
              onClick={e => goToDetails(e, appointment)}
              aria-label={t('details-for-appointment', {
                time: appointmentDateTime,
                type: typeOfCare,
              })}
            >
              Details
            </a>
          </div>
        )}
        {app === APP_NAMES.CHECK_IN &&
          page !== 'confirmation' && (
            <>
              <AppointmentMessageVaos appointment={appointment} />
              <AppointmentActionVaos
                appointment={appointment}
                router={router}
                event="check-in-clicked-VAOS-design"
              />
            </>
          )}
      </div>
      {app === APP_NAMES.PRE_CHECK_IN &&
        page === 'confirmation' && (
          <va-alert
            background-only
            show-icon
            data-testid="appointment-message"
            class="vads-u-margin-bottom--2"
          >
            <div>{infoBlockMessage()}</div>
          </va-alert>
        )}
    </li>
  );
};

AppointmentListItemVaos.propTypes = {
  app: PropTypes.string.isRequired,
  appointment: PropTypes.object.isRequired,
  page: PropTypes.string.isRequired,
  goToDetails: PropTypes.func,
  router: PropTypes.object,
};

export default AppointmentListItemVaos;
