import React from 'react';
import PropTypes from 'prop-types';
import { shallowEqual } from 'recompose';
import { useSelector } from 'react-redux';
import {
  AppointmentDate,
  AppointmentTime,
} from '../../appointment-list/components/AppointmentDateTime';
import { selectConfirmedAppointmentData } from '../../appointment-list/redux/selectors';
import DetailPageLayout, {
  When,
  What,
  Where,
  Section,
} from './DetailPageLayout';
import { APPOINTMENT_STATUS } from '../../utils/constants';
import FacilityDirectionsLink from '../FacilityDirectionsLink';
import Address from '../Address';
import AddToCalendarButton from '../AddToCalendarButton';
import NewTabAnchor from '../NewTabAnchor';
import FacilityPhone from '../FacilityPhone';

export default function ClaimExamLayout({ data: appointment }) {
  const {
    clinicName,
    clinicPhysicalLocation,
    facility,
    facilityPhone,
    isPastAppointment,
    startDate,
    status,
    typeOfCareName,
  } = useSelector(
    state => selectConfirmedAppointmentData(state, appointment),
    shallowEqual,
  );

  if (!appointment) return null;

  let heading = 'Claim exam';
  if (isPastAppointment) heading = 'Past claim exam';
  else if (APPOINTMENT_STATUS.cancelled === status)
    heading = 'Canceled claim exam';

  return (
    <DetailPageLayout heading={heading} data={appointment}>
      {APPOINTMENT_STATUS.booked === status &&
        !isPastAppointment && (
          <Section heading="How to prepare for this exam">
            <span>
              This appointment is for disability rating purposes only. It
              doesn’t include treatment. If you have medical evidence to support
              your claim, bring copies to this appointment.
            </span>
          </Section>
        )}
      <When>
        <AppointmentDate date={startDate} />
        <br />
        <AppointmentTime appointment={appointment} />
        <br />
        {APPOINTMENT_STATUS.booked === status &&
          !isPastAppointment && (
            <div className="vads-u-margin-top--2 vaos-hide-for-print">
              <AddToCalendarButton
                appointment={appointment}
                facility={facility}
              />
            </div>
          )}
      </When>
      <What>{typeOfCareName || 'Type of care information not available'}</What>
      <Where
        heading={
          APPOINTMENT_STATUS.booked === status && !isPastAppointment
            ? 'Where to attend'
            : 'Where'
        }
      >
        {!!facility === false && (
          <>
            <span>Facility details not available</span>
            <br />
            <NewTabAnchor href="/find-locations">
              Find facility information
            </NewTabAnchor>
            <br />
            <br />
          </>
        )}
        {!!facility && (
          <>
            {facility.name}
            <br />
            <Address address={facility?.address} />
            <div className="vads-u-margin-top--1 vads-u-color--link-default">
              <va-icon icon="directions" size="3" srtext="Directions icon" />{' '}
              <FacilityDirectionsLink location={facility} />
            </div>
            <br />
          </>
        )}
        <span>Clinic: {clinicName || 'Not available'}</span> <br />
        <span>Location: {clinicPhysicalLocation || 'Not available'}</span>{' '}
        <br />
        {facilityPhone && (
          <FacilityPhone heading="Clinic phone:" contact={facilityPhone} />
        )}
      </Where>
      {((APPOINTMENT_STATUS.booked === status && isPastAppointment) ||
        APPOINTMENT_STATUS.cancelled === status) && (
        <Section heading="Scheduling facility">
          {!!facility === false && (
            <>
              <span>Facility details not available</span>
              <br />
              <NewTabAnchor href="/find-locations">
                Find facility information
              </NewTabAnchor>
              <br />
              <br />
            </>
          )}
          {!!facility && (
            <>
              {facility.name}
              <br />
              {facilityPhone && (
                <FacilityPhone heading="Phone:" contact={facilityPhone} />
              )}
              {!facilityPhone && <>Not available</>}
            </>
          )}
        </Section>
      )}
      {APPOINTMENT_STATUS.booked === status &&
        !isPastAppointment && (
          <Section heading="Need to make changes?">
            Contact this facility compensation and pension office if you need to
            reschedule or cancel your appointment.
            <br />
            {!!facility && (
              <>
                <br />
                {facilityPhone && (
                  <FacilityPhone heading="Phone:" contact={facilityPhone} />
                )}
                {!facilityPhone && <>Not available</>}
              </>
            )}
          </Section>
        )}
    </DetailPageLayout>
  );
}
ClaimExamLayout.propTypes = {
  data: PropTypes.object,
};
