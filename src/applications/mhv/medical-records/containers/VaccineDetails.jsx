import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { formatDateLong } from '@department-of-veterans-affairs/platform-utilities/exports';
import { generatePdf } from '@department-of-veterans-affairs/platform-pdf/exports';
import moment from 'moment';
import { focusElement } from '@department-of-veterans-affairs/platform-utilities/ui';
import FEATURE_FLAG_NAMES from '@department-of-veterans-affairs/platform-utilities/featureFlagNames';
import {
  processList,
  nameFormat,
  dateFormat,
  sendErrorToSentry,
} from '../util/helpers';
import ItemList from '../components/shared/ItemList';
import { getVaccineDetails, clearVaccineDetails } from '../actions/vaccines';
import { setBreadcrumbs } from '../actions/breadcrumbs';
import PrintHeader from '../components/shared/PrintHeader';
import PrintDownload from '../components/shared/PrintDownload';
import { EMPTY_FIELD, pageTitles } from '../util/constants';
import { updatePageTitle } from '../../shared/util/helpers';

const VaccineDetails = () => {
  const record = useSelector(state => state.mr.vaccines.vaccineDetails);
  const user = useSelector(state => state.user.profile);
  const allowTxtDownloads = useSelector(
    state =>
      state.featureToggles[
        FEATURE_FLAG_NAMES.mhvMedicalRecordsAllowTxtDownloads
      ],
  );
  const name = nameFormat(user.userFullName);
  const dob = dateFormat(user.dob, 'LL');
  const { vaccineId } = useParams();
  const dispatch = useDispatch();
  const formattedDate = formatDateLong(record?.date);

  useEffect(
    () => {
      if (vaccineId) dispatch(getVaccineDetails(vaccineId));
    },
    [vaccineId, dispatch],
  );

  useEffect(
    () => {
      dispatch(
        setBreadcrumbs([
          {
            url: '/my-health/medical-records/vaccines',
            label: 'Vaccines',
          },
        ]),
      );
      return () => {
        dispatch(clearVaccineDetails());
      };
    },
    [dispatch],
  );

  useEffect(
    () => {
      if (record) {
        focusElement(document.querySelector('h1'));
        const titleDate = formattedDate ? `${formattedDate} - ` : '';
        updatePageTitle(
          `${titleDate}${record.name} - ${pageTitles.VACCINES_PAGE_TITLE}`,
        );
      }
    },
    [formattedDate, record],
  );

  const generateVaccinePdf = async () => {
    const pdfData = {
      headerLeft: name,
      headerRight: `Date of birth: ${dob}`,
      footerLeft: `Report generated by My HealtheVet and VA on ${moment().format(
        'LL',
      )}`,
      footerRight: 'Page %PAGE_NUMBER% of %TOTAL_PAGES%',
      title: `Vaccines: ${record.name} on ${record.date}`,
      subject: 'VA Medical Record',
      preface:
        'Your VA Vaccines list may not be complete. If you have any questions about your information, visit the FAQs or contact your VA Health care team.',
      results: {
        sectionSeparators: false,
        items: [
          {
            items: [
              {
                title: 'Location',
                value: record.location || EMPTY_FIELD,
                inline: true,
              },
              {
                title: 'Reaction',
                value: processList(record.reactions),
                inline: !record.reactions.length,
              },
              {
                title: 'Provider notes',
                value: processList(record.notes),
                inline: !record.notes.length,
              },
            ],
          },
        ],
      },
    };

    try {
      await generatePdf(
        'medicalRecords',
        `VA-Vaccines-details-${user.userFullName.first}-${
          user.userFullName.last
        }-${moment()
          .format('M-D-YYYY_hhmmssa')
          .replace(/\./g, '')}`,
        pdfData,
      );
    } catch (error) {
      sendErrorToSentry(error, 'Vaccine details');
    }
  };

  const content = () => {
    if (record) {
      return (
        <div className="vads-l-col--12 medium-screen:vads-l-col--8">
          <PrintHeader />
          <h1
            className="vads-u-margin-bottom--0p5"
            aria-describedby="vaccine-date"
          >
            {record.name}
          </h1>
          <div className="time-header">
            <h2
              className="vads-u-font-size--base vads-u-font-family--sans"
              id="vaccine-date"
            >
              Date:{' '}
              <span className="vads-u-font-weight--normal">
                {formattedDate}
              </span>
            </h2>
          </div>
          <PrintDownload
            download={generateVaccinePdf}
            allowTxtDownloads={allowTxtDownloads}
          />
          <div className="detail-block max-80">
            <h2>Location</h2>
            <p>{record.location}</p>
            <h2 className="vads-u-margin-bottom--0">
              Reactions recorded by provider
            </h2>
            <ItemList list={record.reactions} />
            <h2 className="vads-u-margin-bottom--0">Provider notes</h2>
            <ItemList list={record.notes} />
          </div>
        </div>
      );
    }
    return (
      <va-loading-indicator
        message="Loading..."
        setFocus
        data-testid="loading-indicator"
        class="loading-indicator"
      />
    );
  };

  return (
    <div
      className="vads-l-grid-container vads-u-padding-x--0 vads-u-margin-bottom--5"
      id="vaccine-details"
    >
      {content()}
    </div>
  );
};

export default VaccineDetails;

VaccineDetails.propTypes = {
  print: PropTypes.func,
};
