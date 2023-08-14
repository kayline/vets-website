import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { focusElement } from '@department-of-veterans-affairs/platform-utilities/ui';
import {
  fillPrescription,
  getPrescriptionDetails,
} from '../actions/prescriptions';
import PrintHeader from './PrintHeader';
import { setBreadcrumbs } from '../actions/breadcrumbs';
import { dateFormat, generateMedicationsPDF } from '../util/helpers';
import PrintDownload from '../components/shared/PrintDownload';

const PrescriptionDetails = () => {
  const currentDate = new Date();
  const prescription = useSelector(
    state => state.rx.prescriptions.prescriptionDetails,
  );
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
              url: '/my-health/medications/prescriptions/',
              label: 'Medications',
            },
          ],
          {
            url: `/my-health/medications/prescriptions/${
              prescription.prescriptionId
            }`,
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
    headerLeft: `${userName.last}, ${userName.first}`,
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
              value: 'not in vets api data',
              inline: true,
            },
            {
              title: 'Prescription expires on',
              value: dateFormat(prescription?.expirationDate, 'MMMM D, YYYY'),
              inline: true,
            },
            {
              title: 'Prescribed by',
              value: 'not in vets api data',
              inline: true,
            },
            {
              title: 'Facility',
              value: prescription?.facilityName,
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

  const refillHistory = prescription?.rxRfRecords?.[0]?.[1];
  const shippedOn = prescription?.trackingList?.[0]?.[1];

  useEffect(
    () => {
      if (prescriptionId) dispatch(getPrescriptionDetails(prescriptionId));
    },
    [prescriptionId, dispatch],
  );

  const content = () => {
    if (prescription) {
      return (
        <>
          <PrintHeader />
          <h1 className="page-title">
            <div>{prescription.prescriptionName}</div>
            <p
              className="title-last-filled-on vads-u-font-family--sans"
              data-testid="rx-last-filled-date"
            >
              Last filled on{' '}
              {dateFormat(prescription.refillDate, 'MMMM D, YYYY')}
            </p>
          </h1>
          <div className="no-print">
            <PrintDownload download={handleDownloadPDF} />
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

          <div className="medication-details-div vads-u-margin-top--2 vads-u-margin-bottom--3">
            <h2 className="vads-u-margin-y--2 no-print">
              About your prescription
            </h2>
            <div className="no-print">
              {prescription.error && (
                <div>
                  <va-alert status="error" visible>
                    <p className="vads-u-margin-y--0">
                      We didn’t get your refill request. Try again.
                    </p>
                    <p className="vads-u-margin-y--0">
                      If it still doesn’t work, call your VA pharmacy
                      {prescription?.phoneNumber ? (
                        <>
                          <span> at </span>
                          <va-telephone contact={prescription.phoneNumber} />
                          <span>
                            (<va-telephone tty contact="711" />)
                          </span>
                        </>
                      ) : (
                        <>.</>
                      )}
                    </p>
                  </va-alert>
                </div>
              )}
              <va-button
                text="Refill prescription"
                onClick={() =>
                  dispatch(fillPrescription(prescription.prescriptionId))
                }
              />
            </div>
            <h3 className="vads-u-font-size--base vads-u-font-family--sans">
              Prescription number
            </h3>
            <p>{prescription.prescriptionNumber}</p>

            <h3 className="vads-u-font-size--base vads-u-font-family--sans">
              Status
            </h3>
            <div>
              {prescription.refillStatus === 'refillinprocess'
                ? 'Refill in process'
                : prescription.refillStatus}
            </div>
            <div className="no-print">
              <va-additional-info trigger="What does this status mean?">
                <ul>
                  <li>
                    An active medication is a prescription still in use and
                    available for refill.
                  </li>
                  <li>
                    An inactive medication is a past prescription that should no
                    longer be refilled without first talking with your care
                    provider.
                  </li>
                </ul>
              </va-additional-info>
            </div>
            <h3 className="vads-u-font-size--base vads-u-font-family--sans">
              Refills left
            </h3>
            <p>{prescription.refillRemaining}</p>
            <h3 className="vads-u-font-size--base vads-u-font-family--sans">
              Prescribed on
            </h3>
            <p>{dateFormat(prescription.orderedDate, 'MMMM D, YYYY')}</p>
            <h3 className="vads-u-font-size--base vads-u-font-family--sans">
              Order refills by this expiration date
            </h3>
            <p>{dateFormat(prescription.expirationDate, 'MMMM D, YYYY')}</p>
            <h3 className="vads-u-font-size--base vads-u-font-family--sans">
              Prescribed by
            </h3>
            <p>
              {prescription.providerFirstName
                ? `${prescription.providerLastName}, ${
                    prescription.providerFirstName
                  }`
                : 'None noted'}
            </p>
            <h3 className="vads-u-font-size--base vads-u-font-family--sans">
              Facility
            </h3>
            <p>{prescription.facilityName}</p>
            <h3 className="vads-u-font-size--base vads-u-font-family--sans">
              Phone number
            </h3>
            <div className="no-print">
              {prescription?.phoneNumber ? (
                <va-telephone contact={prescription.phoneNumber} />
              ) : (
                'None noted'
              )}
            </div>
            <div className="print-only">
              {prescription?.phoneNumber || 'No phone number provided'}
            </div>
          </div>

          <div className="medication-details-div vads-u-margin-y--3">
            <h2 className="vads-u-margin-top--3">
              About this medication or supply
            </h2>
            <h3 className="vads-u-font-size--base vads-u-font-family--sans">
              Instructions
            </h3>
            <p>{prescription?.sig || 'None noted'}</p>
            <h3 className="vads-u-font-size--base vads-u-font-family--sans">
              Reason for use
            </h3>
            <p>{prescription?.reason || 'None noted'}</p>
            <h3 className="vads-u-font-size--base vads-u-font-family--sans">
              Quantity
            </h3>
            <p>{prescription.quantity}</p>
            <h3 className="vads-u-font-size--base vads-u-font-family--sans">
              What it looks like
            </h3>
            <p>
              Your medication may look different when you get a refill. Find the
              most recent description and image in your refill history.
            </p>
          </div>

          <div className="medication-details-div vads-u-margin-bottom--8">
            <h2 className="vads-u-margin-top--3">Refill history</h2>
            {refillHistory && refillHistory.length > 0 ? (
              refillHistory.map((entry, i) => (
                <div key={entry.id}>
                  <h3 className="vads-u-font-size--lg vads-u-font-family--sans">
                    {dateFormat(entry.dispensedDate, 'MMMM D, YYYY')}
                  </h3>
                  <h4 className="vads-u-font-size--base vads-u-font-family--sans vads-u-margin--0">
                    Refill requested on
                  </h4>
                  <p className="vads-u-margin-top--0 vads-u-margin-bottom--1">
                    {dateFormat(entry.refillSubmitDate, 'MMMM D, YYYY')}
                  </p>
                  <h4 className="vads-u-font-size--base vads-u-font-family--sans vads-u-margin--0">
                    Filled by pharmacy on
                  </h4>
                  <p className="vads-u-margin-top--0 vads-u-margin-bottom--1">
                    {dateFormat(entry.dispensedDate, 'MMMM D, YYYY')}
                  </p>
                  <h4 className="vads-u-font-size--base vads-u-font-family--sans vads-u-margin--0">
                    Shipped on
                  </h4>
                  <p className="vads-u-margin-top--0 vads-u-margin-bottom--1">
                    {dateFormat(
                      shippedOn?.[i]?.completeDateTime,
                      'MMMM D, YYYY [at] h:mm z',
                    )}
                  </p>
                  <h4 className="vads-u-font-size--base vads-u-font-family--sans vads-u-margin--0">
                    Description of the medication or supply
                  </h4>
                  <p className="vads-u-margin-top--0 vads-u-margin-bottom--1">
                    {/* TODO: Not yet available */}
                    Not noted
                  </p>
                  <div className="no-print">
                    <va-additional-info trigger="Review image">
                      <p>This is where the image goes</p>
                    </va-additional-info>
                  </div>
                </div>
              ))
            ) : (
              <p>No recorded history for this medication.</p>
            )}
          </div>
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
