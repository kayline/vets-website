import React from 'react';
import PropTypes from 'prop-types';
import { dateFormat } from '../../util/helpers';
import { dispStatusObj } from '../../util/constants';
import CallPharmacyPhone from './CallPharmacyPhone';

const ExtraDetails = rx => {
  const { dispStatus, cmopDivisionPhone, refillRemaining } = rx;
  let noRefillRemaining = false;
  if (refillRemaining === 0 && dispStatus === 'Active') {
    noRefillRemaining = true;
  }
  return (
    <div className="shipping-info">
      {dispStatus === dispStatusObj.unknown && (
        <div className="statusIcon unknownIcon">
          <div>
            We’re sorry. There’s a problem with our system. You can’t manage
            this prescription online right now.
            <p className="vads-u-margin-top--1">
              Check back later. Or call your VA pharmacy
              <CallPharmacyPhone cmopDivisionPhone={cmopDivisionPhone} />
            </p>
          </div>
        </div>
      )}
      {dispStatus === dispStatusObj.refillinprocess && (
        <div className="statusIcon refillProcessIcon">
          <p data-testid="rx-refillinprocess-info">
            Refill in process. We expect to fill it on{' '}
            {dateFormat(rx.refillDate, 'MMMM D, YYYY')}.
          </p>
          <p className="vads-u-margin-top--1 vads-u-padding-right--2">
            If you need it sooner, or call your VA pharmacy
            <CallPharmacyPhone cmopDivisionPhone={cmopDivisionPhone} />
          </p>
        </div>
      )}
      {dispStatus === dispStatusObj.submitted && (
        <p className="statusIcon submittedIcon">
          We got your request on{' '}
          {dateFormat(rx.refillSubmitDate, 'MMMM D, YYYY')}. Check back for
          updates.
        </p>
      )}
      {dispStatus === dispStatusObj.expired && (
        <div>
          <p className="vads-u-margin-y--0">
            This prescription is too old to refill. If you need more, request a
            renewal.
          </p>
          <va-link
            href="/my-health/about-medications/accordion-renew-rx"
            text="Learn how to renew prescriptions"
          />
        </div>
      )}
      {dispStatus === dispStatusObj.discontinued && (
        <div>
          <p className="vads-u-margin-y--0">
            You can’t refill this prescription. If you need more, send a message
            to your care team.
          </p>
          <va-link href="/" text="Compose a message" />
        </div>
      )}
      {dispStatus === dispStatusObj.transferred && (
        <div>
          <p className="vads-u-margin-y--0">
            To manage this prescription, go to our My VA Health portal.
          </p>
          <va-link href="/" text="Go to your prescription in My VA Health" />
        </div>
      )}
      {dispStatus === dispStatusObj.nonVA && (
        <div>
          <p className="vads-u-margin-y--0">
            This isn’t a prescription that you filled through a VA pharmacy. You
            can’t manage this medication in this online tool.
          </p>
        </div>
      )}
      {dispStatus === dispStatusObj.onHold && (
        <div className="no-print">
          <p className="vads-u-margin-y--0">
            We put a hold on this prescription. If you need it now, call your VA
            pharmacy
            <CallPharmacyPhone cmopDivisionPhone={cmopDivisionPhone} />
          </p>
        </div>
      )}
      {dispStatus === dispStatusObj.active &&
        noRefillRemaining && (
          <div className="no-print">
            <p className="vads-u-margin-y--0">
              You have no refills left. If you need more, request a renewal.
            </p>
            <va-link
              href="/my-health/about-medications/accordion-renew-rx"
              text="Learn how to renew prescriptions"
            />
          </div>
        )}
    </div>
  );
};

ExtraDetails.propTypes = {
  rx: PropTypes.shape({
    dispStatus: PropTypes.string,
    cmopDivisionPhone: PropTypes.string,
  }),
};

export default ExtraDetails;
