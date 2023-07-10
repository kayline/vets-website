import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPrescriptionsList } from '../actions/prescriptions';
import { setBreadcrumbs } from '../actions/breadcrumbs';
import MedicationsList from '../components/MedicationsList/MedicationsList';
import MedicationsListSort from '../components/MedicationsList/MedicationsListSort';
import { dateFormat, generateMedicationsPDF } from '../util/helpers';
import PrintHeader from './PrintHeader';

const Prescriptions = () => {
  const currentDate = new Date();
  const prescriptions = useSelector(
    state => state.rx.prescriptions.prescriptionsList,
  );
  const userName = useSelector(state => state.user.profile.userFullName);
  const dob = useSelector(state => state.user.profile.dob);

  const dispatch = useDispatch();
  const [rxList, setRxList] = useState([]);

  const buildPrescriptionList = useCallback(
    () => {
      return prescriptions.map(rx => {
        return {
          header: rx.prescriptionName,
          items: [
            {
              title: 'Prescription number',
              value: rx.prescriptionNumber,
              inline: true,
            },
            {
              title: 'Status',
              value: rx.refillStatus,
              inline: true,
            },
            {
              title: 'Refills left',
              value: rx.refillRemaining,
              inline: true,
            },
            {
              title: 'Quantity',
              value: rx.quantity,
              inline: true,
            },
            {
              title: 'Prescribed on',
              value: 'not in vets api data',
              inline: true,
            },
            {
              title: 'Prescription expires on',
              value: dateFormat(rx.expirationDate, 'MMMM D, YYYY'),
              inline: true,
            },
            {
              title: 'Prescribed by',
              value: 'not in vets api data',
              inline: true,
            },
            {
              title: 'Facility',
              value: rx.facilityName,
              inline: true,
            },
            {
              title: 'Phone number',
              value: 'not in vets api data',
              inline: true,
            },
            {
              title: 'Category',
              value: 'not in vets api data',
              inline: true,
            },
            {
              title: 'Source',
              value: 'not in vets api data',
              inline: true,
            },
            {
              title: 'Image',
              value: 'not in vets api data',
              inline: true,
            },
          ],
        };
      });
    },
    [prescriptions],
  );

  useEffect(() => {
    if (prescriptions) {
      dispatch(
        setBreadcrumbs([], {
          url: '/my-health/medications/prescriptions/',
          label: 'Medications',
        }),
      );
    }
  });

  useEffect(
    () => {
      dispatch(getPrescriptionsList());
    },
    [dispatch],
  );

  useEffect(
    () => {
      if (prescriptions) {
        setRxList(buildPrescriptionList());
      }
    },
    [buildPrescriptionList, prescriptions],
  );

  const pdfData = {
    headerLeft: `${userName.last}, ${userName.first}`,
    headerRight: `Date of birth: ${dateFormat(dob, 'MMMM D, YYYY')}`,
    footerLeft: `Report generated by My HealtheVet and VA on ${dateFormat(
      currentDate,
      'MMMM D, YYYY',
    )}`,
    footerRight: 'Page %PAGE_NUMBER% of %TOTAL_PAGES%',
    title: 'Medications',
    preface:
      'This is a list of your current prescriptions, allergies, and adverse reactions.',
    results: {
      header: '',
      items: rxList,
    },
  };

  const handleDownloadPDF = () => {
    generateMedicationsPDF('medicalRecords', 'rx_list', pdfData);
  };

  const content = () => {
    if (prescriptions) {
      return (
        <div className="landing-page">
          <PrintHeader />
          <h1 className="page-title">Medications</h1>
          <div className="vads-u-margin-bottom--2 no-print">
            Review your prescription medicaitons from VA, and providers outside
            of our network.
          </div>
          <div className="landing-page-content">
            <div className="no-print">
              <button
                type="button"
                className="link-button vads-u-display--block vads-u-margin-bottom--2"
                data-testid="print-records-button"
                onClick={() => window.print()}
              >
                <i
                  aria-hidden="true"
                  className="fas fa-print vads-u-margin-right--0p5"
                />
                Print medication list
              </button>
              <button
                onClick={handleDownloadPDF}
                type="button"
                className="link-button vads-u-display--block vads-u-margin-bottom--2"
              >
                <i
                  aria-hidden="true"
                  className="fas fa-download vads-u-margin-right--0p5"
                />
                Download list as a PDF
              </button>
              <button
                type="button"
                className="link-button vads-u-display--block vads-u-margin-bottom--2"
              >
                <i
                  aria-hidden="true"
                  className="fas fa-download vads-u-margin-right--0p5"
                />
                Download list as a Text file
              </button>
              <va-additional-info trigger="What to know about downloading records">
                <ul>
                  <li>
                    <strong>If you’re on a public or shared computer,</strong>{' '}
                    print your records instead of downloading. Downloading will
                    save a copy of your records to the public computer.
                  </li>
                  <li>
                    <strong>If you use assistive technology,</strong> a Text
                    file (.txt) may work better for technology such as screen
                    reader, screen enlargers, or Braille displays.
                  </li>
                </ul>
              </va-additional-info>
              <MedicationsListSort />
              <div className="rx-page-total-info vads-u-border-bottom--2px vads-u-border-color--gray-lighter" />
            </div>
            <MedicationsList rxList={prescriptions} />
          </div>
          <div className="rx-landing-page-footer no-print">
            <div className="footer-header vads-u-font-size--h2 vads-u-font-weight--bold vads-u-padding-y--1 vads-u-border-bottom--1px vads-u-border-color--gray-light">
              Resources related to medications
            </div>
            <div className="footer-links">
              <a href="nolink">Allergies and Adverse Reactions</a>
              <p>
                This is a description of why the user may need to navigate to
                medical records to see their allergies.
              </p>
              <a href="nolink">Resources and Support</a>
              <p>
                This is a description of what the user might find in resources
                and support.
              </p>
            </div>
          </div>
        </div>
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

  return <div className="vads-u-margin-top--3">{content()}</div>;
};

export default Prescriptions;
