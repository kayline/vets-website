import { VaTelephone } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import newAppointmentFlow from '../../newAppointmentFlow';
import { FACILITY_TYPES, FLOW_TYPES } from '../../../utils/constants';
import { selectFeatureAcheronService } from '../../../redux/selectors';
import { getFlowType, getFormData } from '../../redux/selectors';

function formatBestTimetoCall(bestTime) {
  const times = [];
  let output = '';
  if (bestTime?.morning) {
    times.push('Morning');
  }

  if (bestTime?.afternoon) {
    times.push('Afternoon');
  }

  if (bestTime?.evening) {
    times.push('Evening');
  }

  if (times.length === 1) {
    output = times[0];
  } else if (times.length === 2) {
    output = `${times[0]} or ${times[1]}`;
  } else {
    output = 'Anytime during the day';
  }

  return output.toLowerCase();
}

export default function ContactDetailSection({ data }) {
  const formData = useSelector(getFormData);
  const featureAcheronService = useSelector(state =>
    selectFeatureAcheronService(state),
  );
  const flowType = useSelector(getFlowType);
  return (
    <>
      <div className="vads-l-grid-container vads-u-padding--0">
        <div className="vads-l-row vads-u-justify-content--space-between">
          <div className="vads-u-flex--1 vads-u-padding-right--1">
            <h3 className="vaos-appts__block-label">Your contact details</h3>
            <span>
              {data.email}
              <br />
              <VaTelephone
                notClickable
                contact={data.phoneNumber}
                data-testid="patient-telephone"
              />
              {featureAcheronService &&
                formData.facilityType === FACILITY_TYPES.COMMUNITY_CARE &&
                flowType === FLOW_TYPES.REQUEST && (
                  <>
                    <br />
                    <i>Call {formatBestTimetoCall(data.bestTimeToCall)}</i>
                  </>
                )}
              {!featureAcheronService &&
                flowType !== FLOW_TYPES.DIRECT && (
                  <>
                    <br />
                    <i>Call {formatBestTimetoCall(data.bestTimeToCall)}</i>
                  </>
                )}
            </span>
          </div>
          <div>
            <Link
              to={newAppointmentFlow.contactInfo.url}
              aria-label="Edit call back time"
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

ContactDetailSection.propTypes = {
  data: PropTypes.object,
  flowType: PropTypes.string,
};
