import React from 'react';
import PropTypes from 'prop-types';

const NeedsToVerify = ({ pathname }) => (
  <va-alert status="continue">
    <h2 slot="headline">
      You’ll need to verify your identity to access more VA.gov tools and
      features
    </h2>
    <p>
      We need to make sure you’re you — and not someone pretending to be you —
      before we can give you access to your personal and health-related
      information. This helps to keep your information safe, and to prevent
      fraud and identity theft.
    </p>
    <strong>This one-time process takes about 5-10 minutes.</strong>
    <p>
      <a
        href={`/verify?next=${pathname}`}
        className="verify-link vads-c-action-link--green"
      >
        Verify your identity
      </a>
    </p>
  </va-alert>
);

NeedsToVerify.propTypes = {
  pathname: PropTypes.string,
};

export default NeedsToVerify;
