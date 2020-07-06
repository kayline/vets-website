import React from 'react';
import PropTypes from 'prop-types';

import ClaimPhase from './ClaimPhase';
import ClaimEstimate from './ClaimEstimate';
import PhaseBackWarning from './PhaseBackWarning';
import CompleteDetails from './CompleteDetails';
import { getUserPhase, groupTimelineActivity } from '../utils/helpers';

const LAST_EVIDENCE_GATHERING_PHASE = 6;

export default function ClaimsTimeline(props) {
  const {
    events,
    phase,
    estimatedDate,
    id,
    currentPhaseBack,
    everPhaseBack,
  } = props;
  const userPhase = getUserPhase(phase);
  const activityByPhase = groupTimelineActivity(events);

  return (
    <ol className="process form-process claim-timeline">
      <ClaimPhase
        phase={1}
        current={userPhase}
        activity={activityByPhase}
        id={id}
      />
      <ClaimPhase
        phase={2}
        current={userPhase}
        activity={activityByPhase}
        id={id}
      >
        <p>
          Your claim has been assigned to a reviewer who is determining if
          additional information is needed.
        </p>
      </ClaimPhase>
      <ClaimPhase
        phase={3}
        current={userPhase}
        activity={activityByPhase}
        id={id}
      >
        <p>
          If we need more information, we’ll request it from you, health care
          providers, governmental agencies, or others. Once we have all the
          information we need, we’ll review it and send your claim to the rating
          specialist for a decision.
          {everPhaseBack &&
            ' There may be times when a claim moves forward to “Preparation for notification” and then briefly back to this stage for more processing.'}
        </p>
        {currentPhaseBack &&
          phase === LAST_EVIDENCE_GATHERING_PHASE && <PhaseBackWarning />}
      </ClaimPhase>
      <ClaimPhase
        phase={4}
        current={userPhase}
        activity={activityByPhase}
        id={id}
      >
        <p>We are preparing your claim decision packet to be mailed.</p>
      </ClaimPhase>
      <ClaimPhase
        phase={5}
        current={userPhase}
        activity={activityByPhase}
        id={id}
      >
        {userPhase !== 5 ? (
          <ClaimEstimate maxDate={estimatedDate} id={id} />
        ) : (
          <CompleteDetails />
        )}
      </ClaimPhase>
    </ol>
  );
}

ClaimsTimeline.propTypes = {
  events: PropTypes.array,
  phase: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  currentPhaseBack: PropTypes.bool,
  everPhaseBack: PropTypes.bool,
};
