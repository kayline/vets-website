import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { focusElement } from '@department-of-veterans-affairs/platform-utilities/ui';
import {
  getPrescriptionDetails,
  getAllergiesList,
  clearAllergiesError,
} from '../actions/prescriptions';
import PrintHeader from './PrintHeader';
import { setBreadcrumbs } from '../actions/breadcrumbs';
import { dateFormat, generateMedicationsPDF } from '../util/helpers';
import PrintDownload from '../components/shared/PrintDownload';
import AllergiesErrorModal from '../components/shared/AllergiesErrorModal';
import { updatePageTitle } from '../../shared/util/helpers';
import NonVaPrescription from '../components/PrescriptionDetails/NonVaPrescription';
import VaPrescription from '../components/PrescriptionDetails/VaPrescription';
import BeforeYouDownloadDropdown from '../components/shared/BeforeYouDownloadDropdown';
import {
  buildVAPrescriptionPDFList,
  buildNonVAPrescriptionPDFList,
  buildAllergiesPDFList,
} from '../util/pdfConfigs';
import { PDF_GENERATE_STATUS } from '../util/constants';

const PrescriptionDetails = () => {
  const prescription = useSelector(
    state => state.rx.prescriptions?.prescriptionDetails,
  );
  const nonVaPrescription = prescription?.prescriptionSource === 'NV';
  const userName = useSelector(state => state.user.profile.userFullName);
  const dob = useSelector(state => state.user.profile.dob);
  const allergies = useSelector(state => state.rx.allergies?.allergiesList);
  const allergiesError = useSelector(state => state.rx.allergies.error);
  const { prescriptionId } = useParams();
  const [prescriptionPdfList, setPrescriptionPdfList] = useState([]);
  const [pdfGenerateStatus, setPdfGenerateStatus] = useState(
    PDF_GENERATE_STATUS.NotStarted,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (prescription) {
      dispatch(
        setBreadcrumbs(
          [
            {
              url: '/my-health/about-medications',
              label: 'About medications',
            },
            {
              url: '/my-health/medications/',
              label: 'Medications',
            },
          ],
          {
            url: `/my-health/medications/prescription/${
              prescription.prescriptionId
            }`,
            label:
              prescription.dispStatus === 'Active: Non-VA'
                ? prescription.orderableItem
                : prescription.prescriptionName,
          },
        ),
      );
    }
  });

  useEffect(
    () => {
      if (prescription) {
        focusElement(document.querySelector('h1'));
        updatePageTitle(`${prescription.prescriptionName} | Veterans Affairs`);
      }
    },
    [prescription],
  );

  const pdfData = useCallback(
    allergiesPdfList => {
      return {
        subject: `Single Medication Record - ${prescription?.prescriptionName}`,
        headerBanner: [
          {
            text:
              'If you’re ever in crisis and need to talk with someone right away, call the Veterans Crisis line at ',
          },
          {
            text: '988',
            weight: 'bold',
          },
          {
            text: '. Then select 1.',
          },
        ],
        headerLeft: userName.first
          ? `${userName.last}, ${userName.first}`
          : `${userName.last || ' '}`,
        headerRight: `Date of birth: ${dateFormat(dob, 'MMMM D, YYYY')}`,
        footerLeft: `Report generated by My HealtheVet and VA on ${dateFormat(
          Date.now(),
          'MMMM D, YYYY',
        )}`,
        footerRight: 'Page %PAGE_NUMBER% of %TOTAL_PAGES%',
        title: 'Medication Details',
        preface:
          'This is a single medication record from your VA medical records. When you download a medication record, we also include a list of allergies and reactions in your VA medical records.',
        results: [
          {
            header: prescription?.prescriptionName,
            list: prescriptionPdfList,
          },
          {
            header: 'Allergies',
            list: allergiesPdfList || [],
            ...(allergiesPdfList &&
              !allergiesPdfList.length && {
                preface:
                  'There are no allergies or reactions in your VA medical records. If you have allergies or reactions that are missing from your records, tell your care team at your next appointment.',
              }),
            ...(!allergiesPdfList && {
              preface:
                'We couldn’t access your allergy records when you downloaded this list. We’re sorry. There was a problem with our system. Try again later. If it still doesn’t work, email us at vamhvfeedback@va.gov.',
            }),
          },
        ],
      };
    },
    [userName, dob, prescription, prescriptionPdfList],
  );

  const handleDownloadPDF = async () => {
    setPdfGenerateStatus(PDF_GENERATE_STATUS.InProgress);
    await Promise.allSettled([!allergies && dispatch(getAllergiesList())]);
  };

  const generatePDF = useCallback(
    allergiesList => {
      generateMedicationsPDF(
        'medications',
        `${nonVaPrescription ? 'Non-VA' : 'VA'}-medications-details-${
          userName.first ? `${userName.first}-${userName.last}` : userName.last
        }-${dateFormat(Date.now(), 'M-D-YYYY_hmmssa').replace(/\./g, '')}`,
        pdfData(allergiesList),
      ).then(() => {
        setPdfGenerateStatus(PDF_GENERATE_STATUS.Success);
      });
    },
    [nonVaPrescription, userName, pdfData],
  );

  useEffect(
    () => {
      if (prescriptionId) dispatch(getPrescriptionDetails(prescriptionId));
    },
    [prescriptionId, dispatch],
  );

  useEffect(
    () => {
      if (allergies && pdfGenerateStatus === PDF_GENERATE_STATUS.InProgress) {
        generatePDF(buildAllergiesPDFList(allergies));
      }
    },
    [allergies, pdfGenerateStatus, generatePDF],
  );

  useEffect(
    () => {
      if (prescription) {
        setPrescriptionPdfList(
          nonVaPrescription
            ? buildNonVAPrescriptionPDFList(prescription)
            : buildVAPrescriptionPDFList(prescription),
        );
      }
    },
    [nonVaPrescription, prescription],
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
        {prescription.dispensedDate ||
        prescription.rxRfRecords?.[0]?.[1][0]?.dispensedDate ? (
          <span>
            Last filled on{' '}
            {dateFormat(
              prescription.rxRfRecords?.[0]?.[1][0]?.dispensedDate ||
                prescription.dispensedDate,
              'MMMM D, YYYY',
            )}
          </span>
        ) : (
          <span>Not filled yet</span>
        )}
      </>
    );
  };

  const handleModalClose = () => {
    dispatch(clearAllergiesError());
    setPdfGenerateStatus(PDF_GENERATE_STATUS.NotStarted);
  };

  const handleModalDownloadButton = () => {
    generatePDF();
    dispatch(clearAllergiesError());
  };

  const content = () => {
    if (prescription) {
      return (
        <>
          <PrintHeader />
          <AllergiesErrorModal
            onCloseButtonClick={handleModalClose}
            onDownloadButtonClick={handleModalDownloadButton}
            onCancelButtonClick={handleModalClose}
            visible={Boolean(
              pdfGenerateStatus === PDF_GENERATE_STATUS.InProgress &&
                allergiesError,
            )}
          />
          <h1
            aria-describedby="last-filled"
            data-testid="prescription-name"
            className="vads-u-margin-bottom--0"
            id="prescription-name"
          >
            {prescription.dispStatus === 'Active: Non-VA'
              ? prescription.orderableItem
              : prescription.prescriptionName}
          </h1>
          <p
            id="last-filled"
            className="title-last-filled-on vads-u-font-family--sans vads-u-margin-top--0p5"
            data-testid="rx-last-filled-date"
          >
            {filledEnteredDate()}
          </p>
          <div className="no-print">
            <PrintDownload
              download={handleDownloadPDF}
              isSuccess={pdfGenerateStatus === PDF_GENERATE_STATUS.Success}
            />
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
