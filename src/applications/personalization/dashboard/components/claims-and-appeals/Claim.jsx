import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import recordEvent from '~/platform/monitoring/record-event';
import {
  getLighthouseClaimStatusDescription,
  getPhaseDescription,
  isClaimComplete,
  isLighthouseClaimComplete,
  getClaimType,
} from '../../utils/claims-helpers';

import CTALink from '../CTALink';

const capitalizeFirstLetter = input => {
  const capitalizedFirstLetter = input[0].toUpperCase();
  return `${capitalizedFirstLetter}${input.slice(1)}`;
};

function listPhase(phase) {
  return phase === 8 ? 'Closed' : getPhaseDescription(phase);
}

function handleViewClaim() {
  recordEvent({
    event: 'dashboard-navigation',
    'dashboard-action': 'view-button',
    'dashboard-product': 'view-claim',
  });
}

const claimInfo = (claim, useLighthouseClaims) => {
  if (useLighthouseClaims) {
    return {
      inProgress: !isLighthouseClaimComplete(claim),
      claimDate: claim.attributes.claimDate,
      status: getLighthouseClaimStatusDescription(claim.attributes.status),
    };
  }
  return {
    inProgress: !isClaimComplete(claim),
    claimDate: claim.attributes.dateFiled,
    status: listPhase(claim.attributes.phase),
  };
};

const Claim = ({ claim, useLighthouseClaims = false }) => {
  if (!claim.attributes) {
    throw new TypeError(
      '`claim` prop is malformed; it should have an `attributes` property.',
    );
  }
  const { inProgress, claimDate, status } = claimInfo(
    claim,
    useLighthouseClaims,
  );
  const dateRecd = moment(claimDate).format('MMMM D, YYYY');
  return (
    <div className="vads-u-padding-y--2p5 vads-u-padding-x--2p5 vads-u-background-color--gray-lightest">
      <h3 className="vads-u-margin-top--0">
        {capitalizeFirstLetter(getClaimType(claim))} claim received {dateRecd}
      </h3>
      <div className="vads-u-display--flex">
        <i
          aria-hidden="true"
          className="fas fa-fw fa-check-circle vads-u-margin-right--1 vads-u-margin-top--0p5 vads-u-color--green"
        />
        <div>
          <p className="vads-u-margin-y--0">{status}</p>
          {inProgress && claim.attributes.developmentLetterSent ? (
            <p className="vads-u-margin-y--0">
              We sent you a development letter
            </p>
          ) : null}
          {claim.attributes.decisionLetterSent ? (
            <p className="vads-u-margin-y--0">We sent you a decision letter</p>
          ) : null}
          {inProgress && claim.attributes.documentsNeeded ? (
            <p className="vads-u-margin-y--0">Items need attention</p>
          ) : null}
        </div>
      </div>
      <CTALink
        ariaLabel={`Review claim received ${dateRecd}`}
        className="vads-u-margin-top--2 vads-u-font-weight--bold"
        text="Review details"
        href={`/track-claims/your-claims/${claim.id}/status`}
        onClick={handleViewClaim}
        showArrow
      />
    </div>
  );
};

Claim.propTypes = {
  claim: PropTypes.object.isRequired,
  useLighthouseClaims: PropTypes.bool,
};

export default Claim;
