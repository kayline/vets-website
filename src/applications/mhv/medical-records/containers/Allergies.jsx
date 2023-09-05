import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generatePdf } from '@department-of-veterans-affairs/platform-pdf/exports';
import moment from 'moment';
import { focusElement } from '@department-of-veterans-affairs/platform-utilities/ui';
import RecordList from '../components/RecordList/RecordList';
import { setBreadcrumbs } from '../actions/breadcrumbs';
import {
  recordType,
  EMPTY_FIELD,
  ALERT_TYPE_ERROR,
  pageTitles,
} from '../util/constants';
import { getAllergiesList } from '../actions/allergies';
import PrintHeader from '../components/shared/PrintHeader';
import PrintDownload from '../components/shared/PrintDownload';
import {
  dateFormat,
  nameFormat,
  processList,
  sendErrorToSentry,
} from '../util/helpers';
import AccessTroubleAlertBox from '../components/shared/AccessTroubleAlertBox';
import { updatePageTitle } from '../../shared/util/helpers';

const Allergies = () => {
  const dispatch = useDispatch();
  const allergies = useSelector(state => state.mr.allergies.allergiesList);
  const user = useSelector(state => state.user.profile);
  const name = nameFormat(user.userFullName);
  const dob = dateFormat(user.dob, 'LL');
  const alertList = useSelector(state => state.mr.alerts?.alertList);
  const [activeAlert, setActiveAlert] = useState();

  useEffect(() => {
    dispatch(getAllergiesList());
  }, []);

  useEffect(
    () => {
      if (alertList?.length) {
        const filteredSortedAlerts = alertList
          .filter(alert => alert.isActive)
          .sort((a, b) => {
            // Sort chronologically descending.
            return b.datestamp - a.datestamp;
          });
        if (filteredSortedAlerts.length > 0) {
          // The activeAlert is the most recent alert marked as active.
          setActiveAlert(filteredSortedAlerts[0]);
        }
      }
    },
    [alertList],
  );

  useEffect(() => {
    dispatch(
      setBreadcrumbs(
        [{ url: '/my-health/medical-records/', label: 'Medical records' }],
        {
          url: '/my-health/medical-records/allergies',
          label: 'Allergies',
        },
      ),
    );
    focusElement(document.querySelector('h1'));
    updatePageTitle(pageTitles.ALLERGIES_PAGE_TITLE);
  }, []);

  const generateAllergiesPdf = async () => {
    const pdfData = {
      headerLeft: name,
      headerRight: `Date of birth: ${dob}`,
      footerLeft: `Report generated by My HealtheVet and VA on ${moment().format(
        'LL',
      )}`,
      footerRight: 'Page %PAGE_NUMBER% of %TOTAL_PAGES%',
      title: 'Allergies',
      subject: 'VA Medical Record',
      preface:
        'Your allergies list may not be complete. If you have any questions about your information, visit the FAQs or contact your VA Health care team.',
      results: {
        items: [],
      },
    };

    allergies.forEach(item => {
      pdfData.results.items.push({
        header: item.name,
        items: [
          {
            title: 'Date entered',
            value: item.date || EMPTY_FIELD,
            inline: true,
          },
          {
            title: 'Reaction',
            value: processList(item.reaction),
            inline: true,
          },
          {
            title: 'Type of allergy',
            value: item.type || EMPTY_FIELD,
            inline: true,
          },
          {
            title: 'VA drug class',
            value: item.drugClass || EMPTY_FIELD,
            inline: true,
          },
          {
            title: 'Location',
            value: item.location || EMPTY_FIELD,
            inline: true,
          },
          {
            title: 'Observed or reported',
            value: item.observed ? 'Observed' : 'Reported',
            inline: true,
          },
          {
            title: 'Provider notes',
            value: item.notes,
            inline: !item.notes,
          },
        ],
      });
    });

    try {
      await generatePdf('medicalRecords', 'allergies_report', pdfData);
    } catch (error) {
      sendErrorToSentry(error, 'Allergies');
    }
  };

  const accessAlert = activeAlert && activeAlert.type === ALERT_TYPE_ERROR;

  const content = () => {
    if (accessAlert) {
      return <AccessTroubleAlertBox />;
    }
    if (allergies?.length > 0) {
      return <RecordList records={allergies} type={recordType.ALLERGIES} />;
    }
    if (allergies?.length === 0) {
      return (
        <div className="vads-u-margin-bottom--3">
          <va-alert background-only status="info">
            You don’t have any records in Allergies
          </va-alert>
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
    <div id="allergies">
      <PrintHeader />
      <h1 className="vads-u-margin--0">Allergies</h1>
      <section className="set-width-486">
        <p className="vads-u-margin-top--1">
          Review allergies and reactions in your VA medical records.
        </p>

        {!accessAlert && (
          <>
            <PrintDownload list download={generateAllergiesPdf} />
            <va-additional-info
              trigger="What to know about downloading records"
              class="no-print"
            >
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
          </>
        )}
      </section>
      {content()}
    </div>
  );
};

export default Allergies;
