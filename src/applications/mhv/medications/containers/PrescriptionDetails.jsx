import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { focusElement } from '@department-of-veterans-affairs/platform-utilities/ui';
import { getPrescriptionDetails } from '../actions/prescriptions';
import PrintHeader from './PrintHeader';
import { setBreadcrumbs } from '../actions/breadcrumbs';
import { dateFormat, generateMedicationsPDF } from '../util/helpers';
import PrintDownload from '../components/shared/PrintDownload';
import { updatePageTitle } from '../../shared/util/helpers';
import NonVaPrescription from '../components/PrescriptionDetails/NonVaPrescription';
import VaPrescription from '../components/PrescriptionDetails/VaPrescription';
import BeforeYouDownloadDropdown from '../components/shared/BeforeYouDownloadDropdown';

const PrescriptionDetails = () => {
  const currentDate = new Date();
  const prescription = useSelector(
    state => state.rx.prescriptions?.prescriptionDetails,
  );
  const nonVaPrescription = prescription?.prescriptionSource === 'NV';
  const userName = useSelector(state => state.user.profile.userFullName);
  const dob = useSelector(state => state.user.profile.dob);
  const { prescriptionId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (prescription) {
      dispatch(
        setBreadcrumbs(
          [
            {
              url: '/my-health/about-medications',
              label: 'About Medications',
            },
            {
              url: '/my-health/medications/',
              label: 'Medications',
            },
          ],
          {
            url: `/my-health/medications/${prescription.prescriptionId}`,
            label: prescription.prescriptionName,
          },
        ),
      );
    }
  });

  useEffect(
    () => {
      if (prescription) {
        focusElement(document.querySelector('h1'));
        updatePageTitle(prescription.prescriptionName);
      }
    },
    [prescription],
  );

  const pdfData = {
    headerBanner: [
      {
        text:
          'If you’re ever in crisis and need to talk with someone right away, call the Veterans Crisis line at 988. Then select 1.',
      },
    ],
    headerLeft: userName.first
      ? `${userName.last}, ${userName.first}`
      : `${userName.last}`,
    headerRight: `Date of birth: ${dateFormat(dob, 'MMMM D, YYYY')}`,
    footerLeft: `Report generated by My HealtheVet and VA on ${dateFormat(
      currentDate,
      'MMMM D, YYYY',
    )}`,
    footerRight: 'Page %PAGE_NUMBER% of %TOTAL_PAGES%',
    title: prescription?.prescriptionName,
    preface: 'This is a pdf of one of your prescriptions',
    results: {
      items: [
        {
          items: [
            {
              title: 'Prescription number',
              value: prescription?.prescriptionNumber,
              inline: true,
            },
            {
              title: 'Status',
              value: prescription?.refillStatus,
              inline: true,
            },
            {
              title: 'Refills left',
              value: prescription?.refillRemaining,
              inline: true,
            },
            {
              title: 'Quantity',
              value: prescription?.quantity,
              inline: true,
            },
            {
              title: 'Prescribed on',
              value: 'None noted',
              inline: true,
            },
            {
              title: 'Prescription expires on',
              value: dateFormat(prescription?.expirationDate, 'MMMM D, YYYY'),
              inline: true,
            },
            {
              title: 'Prescribed by',
              value: 'None noted',
              inline: true,
            },
            {
              title: 'Facility',
              value: prescription?.facilityName,
              inline: true,
            },
            {
              title: 'Phone number',
              value: 'None noted',
              inline: true,
            },
            {
              title: 'Category',
              value: 'None noted',
              inline: true,
            },
            {
              title: 'Source',
              value: 'None noted',
              inline: true,
            },
            {
              title: 'Image',
              value: 'None noted',
              inline: true,
            },
          ],
        },
      ],
    },
  };

  const handleDownloadPDF = () => {
    generateMedicationsPDF(
      'medicalRecords',
      `${prescription.prescriptionName
        .replace(/\s/g, '_')
        .replace(/\//g, '-')}`,
      pdfData,
    );
  };

  useEffect(
    () => {
      if (prescriptionId) dispatch(getPrescriptionDetails(prescriptionId));
    },
    [prescriptionId, dispatch],
  );

  const filledEnteredDate = () => {
    if (nonVaPrescription) {
      return (
        <>
          Documented on {dateFormat(prescription.orderedDate, 'MMMM D, YYYY')}
        </>
      );
    }
    return (
      <>
        {prescription.dispensedDate ? (
          <div>
            Last filled on{' '}
            {dateFormat(prescription.dispensedDate, 'MMMM D, YYYY')}
          </div>
        ) : (
          <div>Not filled yet</div>
        )}
      </>
    );
  };

  const content = () => {
    if (prescription) {
      return (
        <>
          <PrintHeader />
          <h1
            aria-describedby="last-filled"
            data-testid="prescription-name"
            className="vads-u-margin-bottom--0"
            id="prescription-name"
          >
            {prescription.prescriptionName}
          </h1>
          <p
            id="last-filled"
            className="title-last-filled-on vads-u-font-family--sans vads-u-margin-top--0p5"
            data-testid="rx-last-filled-date"
          >
            {filledEnteredDate()}
          </p>
          <div className="no-print">
            <PrintDownload download={handleDownloadPDF} />
            <BeforeYouDownloadDropdown />
          </div>
          <div className="print-only">
            <strong>Note:</strong> This file doesn’t include your allergies or
            adverse reactions.
          </div>
          {nonVaPrescription ? (
            <NonVaPrescription {...prescription} />
          ) : (
            <VaPrescription {...prescription} />
          )}
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

  return <div>{content()}</div>;
};

export default PrescriptionDetails;
