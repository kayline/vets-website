import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const AppealHeader = ({ heading, lastUpdated }) => {
  const formattedDateTime = moment(lastUpdated)
    .utc() // ignore user's own UTC offset (timezone)
    .utcOffset(lastUpdated) // display lastUpdated's own timezone to everyone
    .format('MMMM DD, YYYY, [at] h:mm a [ET]');
  const description = `Up to date as of ${formattedDateTime}`;

  return (
    <div className="appeal-header">
      <h1>{heading}</h1>
      <p>{description}</p>
    </div>
  );
};

AppealHeader.propTypes = {
  heading: PropTypes.string.isRequired,
  lastUpdated: PropTypes.string.isRequired,
};

export default AppealHeader;
