import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDateLong } from '@department-of-veterans-affairs/platform-utilities/exports';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { focusElement } from '@department-of-veterans-affairs/platform-utilities/ui';
import FEATURE_FLAG_NAMES from '@department-of-veterans-affairs/platform-utilities/featureFlagNames';
import PrintHeader from '../shared/PrintHeader';
import { mhvUrl } from '~/platform/site-wide/mhv/utilities';
import { isAuthenticatedWithSSOe } from '~/platform/user/authentication/selectors';
import PrintDownload from '../shared/PrintDownload';
import DownloadingRecordsInfo from '../shared/DownloadingRecordsInfo';
import { makePdf, nameFormat } from '../../util/helpers';
import { updatePageTitle } from '../../../shared/util/helpers';
import { EMPTY_FIELD, pageTitles } from '../../util/constants';

const MicroDetails = props => {
  const { record, fullState, runningUnitTest } = props;
  const user = useSelector(state => state.user.profile);
  const allowTxtDownloads = useSelector(
    state =>
      state.featureToggles[
        FEATURE_FLAG_NAMES.mhvMedicalRecordsAllowTxtDownloads
      ],
  );
  const name = nameFormat(user.userFullName);
  const dob = formatDateLong(user.dob, 'LL');

  useEffect(
    () => {
      focusElement(document.querySelector('h1'));
      const titleDate = record.date !== EMPTY_FIELD ? `${record.date} - ` : '';
      updatePageTitle(
        `${titleDate}${record.name} - ${
          pageTitles.LAB_AND_TEST_RESULTS_PAGE_TITLE
        }`,
      );
    },
    [record],
  );

  const generateMicrobiologyPdf = async () => {
    const pdfData = {
      headerLeft: name,
      headerRight: `Date of birth: ${dob}`,
      headerBanner: [
        {
          text:
            'If you’re ever in crisis and need to talk with someone right away, call the Veterans Crisis line at 988. Then select 1.',
        },
      ],
      footerLeft: `Report generated by My HealtheVet and VA on ${moment().format(
        'LL',
      )}`,
      footerRight: 'Page %PAGE_NUMBER% of %TOTAL_PAGES%',
      title: `Lab and test results: Microbiology on ${record.date}`,
      subject: 'VA Medical Record',
      preface:
        'If you have any questions about these results, send a secure message to your care team.',
      results: {
        sectionSeparators: false,
        items: [
          {
            header: 'Details about this test',
            items: [
              {
                title: 'Sample tested',
                value: record.sampleTested,
                inline: true,
              },
              {
                title: 'Sample from',
                value: record.sampleFrom,
                inline: true,
              },
              {
                title: 'Ordered by',
                value: record.orderedBy,
                inline: true,
              },
              {
                title: 'Ordering location',
                value: record.orderingLocation,
                inline: true,
              },
              {
                title: 'Collecting location',
                value: record.collectingLocation,
                inline: true,
              },
              {
                title: 'Lab location',
                value: record.labLocation,
                inline: true,
              },
              {
                title: 'Date completed',
                value: record.date,
                inline: true,
              },
            ],
          },
          {
            header: 'Results',
            items: [
              {
                title: '',
                value: record.results,
                inline: true,
              },
            ],
          },
        ],
      },
    };

    makePdf(
      'microbiology_report',
      pdfData,
      'Microbiology details',
      runningUnitTest,
    );
  };

  return (
    <div className="vads-l-grid-container vads-u-padding-x--0 vads-u-margin-bottom--5">
      <PrintHeader />
      <h1 className="vads-u-margin-bottom--0" aria-describedby="microbio-date">
        {record.name}
      </h1>
      <div className="time-header">
        <h2
          className="vads-u-font-size--base vads-u-font-family--sans"
          id="microbio-date"
        >
          Date:{' '}
          <span className="vads-u-font-weight--normal">{record.date}</span>
        </h2>
      </div>
      <div className="no-print">
        <PrintDownload
          download={generateMicrobiologyPdf}
          allowTxtDownloads={allowTxtDownloads}
        />
        <DownloadingRecordsInfo allowTxtDownloads={allowTxtDownloads} />
      </div>
      <div className="test-details-container max-80">
        <h2>Details about this test</h2>
        <h3 className="vads-u-font-size--base vads-u-font-family--sans">
          Sample tested
        </h3>
        <p>{record.sampleTested}</p>
        <h3 className="vads-u-font-size--base vads-u-font-family--sans">
          Sample from
        </h3>
        <p>{record.sampleFrom}</p>
        <h3 className="vads-u-font-size--base vads-u-font-family--sans">
          Ordered by
        </h3>
        <p>{record.orderedBy}</p>
        <h3 className="vads-u-font-size--base vads-u-font-family--sans">
          Ordering location
        </h3>
        <p>{record.orderingLocation}</p>
        <h3 className="vads-u-font-size--base vads-u-font-family--sans">
          Collecting location
        </h3>
        <p>{record.collectingLocation}</p>
        <h3 className="vads-u-font-size--base vads-u-font-family--sans">
          Lab location
        </h3>
        <p>{record.labLocation}</p>
        <h3 className="vads-u-font-size--base vads-u-font-family--sans">
          Date completed
        </h3>
        <p>{record.date}</p>
      </div>

      <div className="test-results-container">
        <h2>Results</h2>
        <va-additional-info
          trigger="Need help understanding your results?"
          class="no-print"
        >
          <p>
            Your provider will review your results and explain what they mean
            for your health. To ask a question now, send a secure message to
            your care team.
          </p>
          <p>
            <a
              href={mhvUrl(
                isAuthenticatedWithSSOe(fullState),
                'secure-messaging',
              )}
            >
              Start a new message
            </a>
          </p>
        </va-additional-info>
        <p className="vads-u-font-size--base make-monospace">
          {record.results}
        </p>{' '}
      </div>
    </div>
  );
};

export default MicroDetails;

MicroDetails.propTypes = {
  fullState: PropTypes.object,
  record: PropTypes.object,
  runningUnitTest: PropTypes.bool,
};
