import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';
import { vitalTypeDisplayNames } from '../../util/constants';

const VitalListItem = props => {
  const { record } = props;

  const content = () => {
    if (record) {
      return (
        <div
          className="record-list-item vads-u-padding-y--2 vads-u-border-color--gray-light vads-u-border--0 vads-u-background-color--gray-lightest card"
          data-testid="record-list-item"
        >
          <h3 className="vads-u-font-size--h4 vads-u-margin--0 vads-u-line-height--4">
            {vitalTypeDisplayNames[record.type]}
          </h3>
          <div className="vads-u-line-height--3">
            Result: {record.measurement}
          </div>
          <div className="vads-u-line-height--3">
            {moment(record.date).format('LLL')}
          </div>
          <div className="location-collapsed vads-u-line-height--3">
            Location: {record.location}
          </div>
          <div className="print-only">Provider notes: {record.notes}</div>
          <Link
            to={`/vitals/${_.kebabCase(record.type)}-history`}
            className="vads-u-margin-y--0p5 no-print"
          >
            <span className="vads-u-font-weight--bold">
              View {vitalTypeDisplayNames[record.type].toLowerCase()} over time
            </span>
            <i
              className="fas fa-angle-right details-link-icon"
              aria-hidden="true"
            />
          </Link>
        </div>
      );
    }
    return <></>;
  };

  return content();
};

export default VitalListItem;

VitalListItem.propTypes = {
  record: PropTypes.object,
};
