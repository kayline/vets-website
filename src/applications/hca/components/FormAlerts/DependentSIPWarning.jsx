import React from 'react';

const DependentSIPWarning = () => (
  <va-alert
    status="warning"
    data-testid="hca-sip-warning"
    class="vads-u-margin-bottom--2"
    background-only
  >
    <p className="vads-u-margin-y--0">
      Be sure to enter all the required information for your dependent. We can
      only save your progress when you enter the required information.
    </p>
  </va-alert>
);

export default DependentSIPWarning;
