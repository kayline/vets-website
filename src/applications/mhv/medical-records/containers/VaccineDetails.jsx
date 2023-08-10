import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { formatDateLong } from '@department-of-veterans-affairs/platform-utilities/exports';
import { generatePdf } from '@department-of-veterans-affairs/platform-pdf/exports';
import moment from 'moment';
import {
  processList,
  nameFormat,
  dateFormat,
  sendErrorToSentry,
} from '../util/helpers';
import ItemList from '../components/shared/ItemList';
import { getVaccineDetails } from '../actions/vaccines';
import { setBreadcrumbs } from '../actions/breadcrumbs';
import PrintHeader from '../components/shared/PrintHeader';
import PrintDownload from '../components/shared/PrintDownload';
import { emptyField } from '../util/constants';

const VaccineDetails = () => {
  const vaccineDetails = useSelector(state => state.mr.vaccines.vaccineDetails);
  const user = useSelector(state => state.user.profile);
  const name = nameFormat(user.userFullName);
  const dob = dateFormat(user.dob, 'LL');
  const { vaccineId } = useParams();
  const dispatch = useDispatch();

  useEffect(
    () => {
      if (vaccineId) dispatch(getVaccineDetails(vaccineId));
    },
    [vaccineId, dispatch],
  );
  const formattedDate = formatDateLong(vaccineDetails?.date);

  useEffect(
    () => {
      dispatch(
        setBreadcrumbs(
          [
            {
              url: '/my-health/medical-records/vaccines',
              label: 'Vaccines',
            },
          ],
          {
            url: `/my-health/medical-records/vaccines/${vaccineId}`,
            label: vaccineDetails?.name,
          },
        ),
      );
    },
    [vaccineDetails, dispatch],
  );

  const generateVaccinePdf = async () => {
    const pdfData = {
      headerLeft: name,
      headerRight: `Date of birth: ${dob}`,
      footerLeft: `Report generated by My HealtheVet and VA on ${moment().format(
        'LL',
      )}`,
      footerRight: 'Page %PAGE_NUMBER% of %TOTAL_PAGES%',
      title: `Vaccines: ${vaccineDetails.name} on ${vaccineDetails.date}`,
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
                value: vaccineDetails.location || emptyField,
                inline: true,
              },
              {
                title: 'Reaction',
                value: processList(vaccineDetails.reactions),
                inline: !vaccineDetails.reactions.length,
              },
              {
                title: 'Provider notes',
                value: processList(vaccineDetails.notes),
                inline: !vaccineDetails.notes.length,
              },
            ],
          },
        ],
      },
    };

    try {
      await generatePdf('medicalRecords', 'vaccine_report', pdfData);
    } catch (error) {
      sendErrorToSentry(error, 'Vaccine details');
    }
  };

  const content = () => {
    if (vaccineDetails) {
      return (
        <>
          <PrintHeader />
          <h1 className="vads-u-margin-bottom--0p5">{vaccineDetails.name}</h1>
          <div className="time-header">
            <h2 className="vads-u-font-size--base vads-u-font-family--sans">
              Date:{' '}
            </h2>
            <p>{formattedDate}</p>
          </div>
          <section className="set-width-480">
            <PrintDownload list download={generateVaccinePdf} />
            <div className="detail-block max-80">
              <h2>Location</h2>
              <p>{vaccineDetails.location}</p>
              <h2 className="vads-u-margin-bottom--0">
                Reactions recorded by provider
              </h2>
              <ItemList list={vaccineDetails.reactions} />
              <h2 className="vads-u-margin-bottom--0">Provider notes</h2>
              <ItemList list={vaccineDetails.notes} />
            </div>
          </section>
        </>
      );
    }
    return (
      <va-loading-indicator
        message="Loading..."
        setFocus
        data-testid="loading-indicator"
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
