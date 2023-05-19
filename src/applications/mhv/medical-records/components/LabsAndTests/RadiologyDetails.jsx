import React from 'react';
import PropTypes from 'prop-types';
import { dateFormat, downloadFile } from '../../util/helpers';
import PrintHeader from '../shared/PrintHeader';
import { getVaccinePdf } from '../../api/MrApi';
import { mhvUrl } from '~/platform/site-wide/mhv/utilities';
import { isAuthenticatedWithSSOe } from '~/platform/user/authentication/selectors';
import PrintDownload from '../shared/PrintDownload';

const RadiologyDetails = props => {
  const { results, fullState } = props;

  const formattedDate = dateFormat(results?.date, 'MMMM D, YYYY');

  const download = () => {
    getVaccinePdf(1).then(res => downloadFile('radiology.pdf', res.pdf));
  };

  const content = () => {
    if (results) {
      return (
        <>
          <PrintHeader />
          <h1 className="vads-u-margin-bottom--0">{results.name}</h1>
          <div className="time-header">
            <h2 className="vads-u-font-size--base vads-u-font-family--sans">
              Date:{' '}
            </h2>
            <p>{formattedDate}</p>
          </div>

          <div className="no-print">
            <PrintDownload list download={download} />
            <va-additional-info trigger="What to know about downloading records">
              <ul>
                <li>
                  <strong>If you’re on a public or shared computer,</strong>{' '}
                  print your records instead of downloading. Downloading will
                  save a copy of your records to the public computer.
                </li>
                <li>
                  <strong>If you use assistive technology,</strong> a Text file
                  (.txt) may work better for technology such as screen reader,
                  screen enlargers, or Braille displays.
                </li>
              </ul>
            </va-additional-info>
          </div>

          <div className="test-details-container max-80">
            <h2>Details about this test</h2>
            <h3 className="vads-u-font-size--base vads-u-font-family--sans no-print">
              Images
            </h3>
            <p className="no-print">
              <va-link
                active
                href={`/my-health/medical-records/labs-and-tests/radiology-images/${
                  results.id
                }`}
                text={`See all ${results.images.length} images`}
              />
            </p>
            <h3 className="vads-u-font-size--base vads-u-font-family--sans">
              Reason for test
            </h3>
            <p>{results.reason}</p>
            <h3 className="vads-u-font-size--base vads-u-font-family--sans">
              Clinical history
            </h3>
            <p>{results.clinicalHistory}</p>
            <h3 className="vads-u-font-size--base vads-u-font-family--sans">
              Ordered by
            </h3>
            <p>{results.orderedBy}</p>
            <h3 className="vads-u-font-size--base vads-u-font-family--sans">
              Ordering location
            </h3>
            <p>{results.orderingLocation}</p>
            <h3 className="vads-u-font-size--base vads-u-font-family--sans">
              Imaging location
            </h3>
            <p>{results.imagingLocation}</p>
            <h3 className="vads-u-font-size--base vads-u-font-family--sans">
              Imaging provider
            </h3>
            <p>{results.imagingProvider}</p>
          </div>

          <div className="test-results-container">
            <h2>Results</h2>
            <va-additional-info
              trigger="Need help understanding your results?"
              class="no-print"
            >
              <p>
                Your provider will review your results and explain what they
                mean for your health. To ask a question now, send a secure
                message to your care team.
              </p>
              <p>
                <a
                  href={mhvUrl(
                    isAuthenticatedWithSSOe(fullState),
                    'secure-messaging',
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  Start a new message
                </a>
              </p>
            </va-additional-info>
            <p>{results.labResults}</p>
          </div>
        </>
      );
    }
    return <></>;
  };

  return (
    <div className="vads-l-grid-container vads-u-padding-x--0 vads-u-margin-bottom--5">
      {content()}
    </div>
  );
};

export default RadiologyDetails;

RadiologyDetails.propTypes = {
  results: PropTypes.object,
};
