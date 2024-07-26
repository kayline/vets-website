import React from 'react';
import PropTypes from 'prop-types';
import Breadcrumbs from './Breadcrumbs';

const PACTActApp = ({ children }) => {
  document.title = 'Learn how the PACT Act may affect you | Veterans Affairs';

  return (
    <div className="pact-act-app row vads-u-padding-bottom--8">
      <Breadcrumbs />
      <div className="usa-width-two-thirds medium-8 columns">{children}</div>
    </div>
  );
};

PACTActApp.propTypes = {
  children: PropTypes.any,
};

export default PACTActApp;
