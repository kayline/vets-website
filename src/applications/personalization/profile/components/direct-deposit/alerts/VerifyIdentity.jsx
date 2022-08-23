import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { verify } from 'platform/user/authentication/utilities';
import {
  CSP_IDS,
  SERVICE_PROVIDERS,
} from 'platform/user/authentication/constants';

export default function VerifyIdentity() {
  const { ID_ME, LOGIN_GOV } = CSP_IDS;
  const verifyLink = useCallback(policy => {
    verify({ policy, isLink: true });
  }, []);

  return (
    <va-alert status="continue" visible>
      <h2 slot="headline" data-testid="direct-deposit-mfa-message">
        Verify your identity with Login.gov or ID.me to change your direct
        deposit information online
      </h2>
      <p>
        Before we give you access to change your direct deposit information, we
        need to make sure you’re you—and not someone pretending to be you. This
        helps us protect your bank account and prevent fraud.
      </p>
      <p>
        <strong>If you have a verified Login.gov or ID.me account</strong>, sign
        out now. Then sign back in with that account to continue.
      </p>
      <p>
        <strong>If you don’t have one of these accounts</strong>, you can create
        one and verify your identity now.
      </p>
      {[ID_ME, LOGIN_GOV].map(csp => (
        <p key={csp}>
          <a
            href={verifyLink(csp)}
            data-testid={`direct-deposit-${csp}-sign-up-link`}
          >
            Create a {SERVICE_PROVIDERS[csp].label} account
          </a>
        </p>
      ))}
      <p>
        <strong>Note:</strong> If you need help updating your direct deposit
        information, call us at <va-telephone contact="800-827-1000" /> (
        <a href="tel:711" aria-label="TTY: 7 1 1.">
          TTY: 711
        </a>
        ). We’re here Monday through Friday, 8:00 a.m. to 9:00 p.m. ET.
      </p>
    </va-alert>
  );
}

VerifyIdentity.propTypes = {
  type: PropTypes.string,
};
