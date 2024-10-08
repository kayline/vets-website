import React from 'react';
import PropTypes from 'prop-types';
import Alert from './Alert';

const SearchResultMessage = ({
  message,
  error,
  resultsFound,
  resultRef,
  facilityType,
}) => {
  if (error) {
    return (
      <Alert
        displayType="warning"
        title="Find VA locations isn’t working right now"
        description={message}
      />
    );
  }
  if (facilityType && !resultsFound) {
    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      <div className="search-result-title" ref={resultRef} tabIndex={0}>
        <strong>For better results:</strong>
        <ul className="vads-u-margin-y--1p5">
          <li>
            <strong>Zoom out</strong> to view a larger area of the map,&nbsp;
            <strong>or</strong>
          </li>
          <li>
            <strong>Move the map</strong> to a different area
          </li>
        </ul>
        Then click the <strong>“Search this area of map”</strong> button.
        <p />
        If we still haven’t found any facilities near you,{' '}
        <strong>please enter a different:</strong>
        <ul className="vads-u-margin-y--1p5">
          <li>
            <strong>Search term</strong> (street, city, state, or postal code),{' '}
            <strong>or</strong>
          </li>
          <li>
            <strong>Service type</strong> (like “chiropractor or optometrist”),
            and select the option that best meets your needs
          </li>
        </ul>
      </div>
    );
  }

  return (
    <p className="search-result-title">
      Please enter a location (street, city, state, or postal code) and facility
      type, then click search above to find facilities.
    </p>
  );
};

SearchResultMessage.propTypes = {
  error: PropTypes.any,
  facilityType: PropTypes.string,
  message: PropTypes.string,
  resultRef: PropTypes.any,
  resultsFound: PropTypes.bool,
};

export default SearchResultMessage;
