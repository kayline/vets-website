import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { formatDateLong } from '@department-of-veterans-affairs/platform-utilities/exports';
import { generatePdf } from '@department-of-veterans-affairs/platform-pdf/exports';
import moment from 'moment';
import { focusElement } from '@department-of-veterans-affairs/platform-utilities/ui';
import FEATURE_FLAG_NAMES from '@department-of-veterans-affairs/platform-utilities/featureFlagNames';
import PrintHeader from '../shared/PrintHeader';
import PrintDownload from '../shared/PrintDownload';
import DownloadingRecordsInfo from '../shared/DownloadingRecordsInfo';
import { sendErrorToSentry } from '../../util/helpers';
import { updatePageTitle } from '../../../shared/util/helpers';
import { pageTitles } from '../../util/constants';

const EkgDetails = props => {
  const { record } = props;
  const allowTxtDownloads = useSelector(
    state =>
      state.featureToggles[
        FEATURE_FLAG_NAMES.mhvMedicalRecordsAllowTxtDownloads
      ],
  );
  const formattedDate = formatDateLong(record?.date);

  useEffect(
    () => {
      focusElement(document.querySelector('h1'));
      const titleDate = formattedDate ? `${formattedDate} - ` : '';
      updatePageTitle(
        `${titleDate}${record.name} - ${
          pageTitles.LAB_AND_TEST_RESULTS_PAGE_TITLE
        }`,
      );
    },
    [formattedDate, record.name],
  );

  const generateEkgDetails = async () => {
    const pdfData = {
      headerLeft: 'Roberts, Jesse',
      headerRight: 'Date of birth: January 1, 1970',
      footerLeft: `Report generated by My HealtheVet and VA on ${moment().format(
        'LL',
      )}`,
      footerRight: 'Page %PAGE_NUMBER% of %TOTAL_PAGES%',
      headerBanner: [
        {
          weight: 'normal',
          text:
            "If you're ever in crisis and need to talk to someone right away, call the Veterans Crisis line at ",
        },
        {
          weight: 'bold',
          text: '988',
        },
        {
          weight: 'normal',
          text: '. Then select 1.',
        },
      ],
      title: `electrocardiogram: ${record.name} on ${formattedDate}`,
      subject: 'VA Medical Record',
      preface:
        'Your VA electrocardiogram list may not be complete. If you have any questions about your information, visit the FAQs or contact your VA Health care team.',
      results: {
        items: [
          {
            items: [
              {
                title: 'Date',
                value: moment(record.date).format('LL') || ' ',
                inline: true,
              },
              {
                title: 'Location',
                value: record.facility || ' ',
                inline: true,
              },
              {
                title: 'Provider',
                value: record.orderedBy || ' ',
                inline: true,
              },
            ],
          },
        ],
      },
    };

    try {
      await generatePdf('medicalRecords', 'electrocardiogram_report', pdfData);
    } catch (error) {
      sendErrorToSentry(error, 'EKG');
    }
  };

  const download = () => {
    generateEkgDetails();
  };

  const content = () => {
    if (record) {
      return (
        <>
          <PrintHeader />
          <h1 className="vads-u-margin-bottom--0" aria-describedby="ekg-date">
            {record.name}
          </h1>
          <div className="time-header">
            <h2
              className="vads-u-font-size--base vads-u-font-family--sans"
              id="ekg-date"
            >
              Date:{' '}
              <span className="vads-u-font-weight--normal">
                {formattedDate}
              </span>
            </h2>
          </div>
          <div className="electrocardiogram-buttons no-print">
            <PrintDownload
              download={download}
              allowTxtDownloads={allowTxtDownloads}
            />
            <DownloadingRecordsInfo allowTxtDownloads={allowTxtDownloads} />
          </div>
          <div className="electrocardiogram-details max-80">
            <h2 className="vads-u-font-size--base vads-u-font-family--sans">
              Ordering location
            </h2>
            <p>
              {record.facility || 'There is no facility reported at this time'}
            </p>
            <h2 className="vads-u-font-size--base vads-u-font-family--sans">
              Results
            </h2>
            <p>
              Your EKG results aren’t available in this tool. To get your EKG
              results, you can request a copy of your complete medical record
              from your VA health facility.
            </p>
            <p className="vads-u-margin-top--2 no-print">
              <a href="https://www.va.gov/resources/how-to-get-your-medical-records-from-your-va-health-facility/">
                Learn how to get records from your VA health facility
              </a>
            </p>
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

export default EkgDetails;

EkgDetails.propTypes = {
  record: PropTypes.object,
};
