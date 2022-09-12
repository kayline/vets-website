import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FacilityAddress from '../../../components/FacilityAddress';
import AppointmentDateTime from '../AppointmentDateTime';
import Breadcrumbs from '../../../components/Breadcrumbs';
import CalendarLink from './CalendarLink';
import StatusAlert from './StatusAlert';
import TypeHeader from './TypeHeader';
import PrintLink from './PrintLink';
import RescheduleOrCancelAlert from './RescheduleOrCancelAlert';
import ProviderName from './ProviderName';
import CCInstructions from './CCInstructions';
import { getTypeOfCareById } from '../../../utils/appointment';

export default function DetailsCC({ appointment, useV2 = false }) {
  const header = 'Community care';
  const facility = appointment.communityCareProvider;
  const typeOfCare = getTypeOfCareById(appointment.vaos.apiData.serviceType);

  const ShowTypeOfCare = () => {
    if (useV2 && typeOfCare) {
      return (
        <>
          <h2
            className="vads-u-font-size--base vads-u-font-family--sans vads-u-margin-bottom--0"
            data-cy="community-care-appointment-details-header"
          >
            <div className="vads-u-display--inline">Type of care</div>
          </h2>
          <div>{typeOfCare?.name}</div>
        </>
      );
    }
    return null;
  };

  return (
    <>
      <Breadcrumbs>
        <Link to={`/cc/${appointment.id}`}>Appointment detail</Link>
      </Breadcrumbs>
      <h1>
        <AppointmentDateTime appointment={appointment} />
      </h1>
      <StatusAlert appointment={appointment} />
      <ShowTypeOfCare />
      <TypeHeader isCC>{header}</TypeHeader>
      <ProviderName appointment={appointment} useV2={useV2} />
      <FacilityAddress
        facility={facility}
        showDirectionsLink={!!appointment.communityCareProvider?.address}
        level={2}
      />

      <CCInstructions appointment={appointment} />
      <CalendarLink appointment={appointment} facility={facility} />
      <PrintLink appointment={appointment} />
      <RescheduleOrCancelAlert appointment={appointment} />
    </>
  );
}

DetailsCC.propTypes = {
  appointment: PropTypes.object.isRequired,
  useV2: PropTypes.bool,
};
