import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generatePdf } from '@department-of-veterans-affairs/platform-pdf/exports';
import moment from 'moment';
import RecordList from '../components/RecordList/RecordList';
import { setBreadcrumbs } from '../actions/breadcrumbs';
import { RecordType, emptyField } from '../util/constants';
import { getAllergiesList } from '../actions/allergies';
import PrintHeader from '../components/shared/PrintHeader';
import { mhvUrl } from '~/platform/site-wide/mhv/utilities';
import { isAuthenticatedWithSSOe } from '~/platform/user/authentication/selectors';
import PrintDownload from '../components/shared/PrintDownload';
import {
  dateFormat,
  nameFormat,
  processList,
  sendErrorToSentry,
} from '../util/helpers';

const Allergies = () => {
  const dispatch = useDispatch();
  const allergies = useSelector(state => state.mr.allergies.allergiesList);
  const user = useSelector(state => state.user.profile);
  const name = nameFormat(user.userFullName);
  const dob = dateFormat(user.dob, 'LL');
  const fullState = useSelector(state => state);

  useEffect(() => {
    dispatch(getAllergiesList());
  }, []);

  useEffect(
    () => {
      dispatch(
        setBreadcrumbs(
          [{ url: '/my-health/medical-records/', label: 'Medical records' }],
          {
            url: '/my-health/medical-records/allergies',
            label: 'Allergies',
          },
        ),
      );
    },
    [dispatch],
  );

  const generateAllergiesPdf = async res => {
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

    res.forEach(item => {
      pdfData.results.items.push({
        header: item.name,
        items: [
          {
            title: 'Date entered',
            value: item.date || emptyField,
            inline: true,
          },
          {
            title: 'Reaction',
            value: processList(item.reaction),
            inline: true,
          },
          {
            title: 'Type of allergy',
            value: item.type || emptyField,
            inline: true,
          },
          {
            title: 'VA drug class',
            value: item.drugClass || emptyField,
            inline: true,
          },
          {
            title: 'Location',
            value: item.location || emptyField,
            inline: true,
          },
          {
            title: 'Observed or reported',
            value: item.observed ? 'Observed' : 'Reported',
            inline: true,
          },
          {
            title: 'Provider notes',
            value: processList(item.notes),
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

  const content = () => {
    if (allergies?.length > 0) {
      return <RecordList records={allergies} type={RecordType.ALLERGIES} />;
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
        <va-additional-info
          trigger="What to know about allergy records"
          class="no-print"
        >
          <ul>
            <li className="vads-u-margin-bottom--2">
              <p className="vads-u-margin--0">
                If you have allergies that are missing from this list, send a
                secure message to your care team. You can also send a message to
                ask questions about your allergy records.
              </p>
              <a
                href={mhvUrl(
                  isAuthenticatedWithSSOe(fullState),
                  'secure-messaging',
                )}
                target="_blank"
                rel="noreferrer"
              >
                Compose a new message
              </a>
            </li>
            <li>
              <p className="vads-u-margin--0">
                This list doesn’t include information you entered yourself. To
                find information you entered, go back to your records on the My
                HealtheVet website.
              </p>
              <a
                href={mhvUrl(
                  isAuthenticatedWithSSOe(fullState),
                  'download-my-data',
                )}
                target="_blank"
                rel="noreferrer"
              >
                Go back to medical records on the My HealtheVet website
              </a>
            </li>
          </ul>
        </va-additional-info>
        <PrintDownload list download={generateAllergiesPdf} />
        <va-additional-info
          trigger="What to know about downloading records"
          class="no-print"
        >
          <ul>
            <li>
              <strong>If you’re on a public or shared computer,</strong> print
              your records instead of downloading. Downloading will save a copy
              of your records to the public computer.
            </li>
            <li>
              <strong>If you use assistive technology,</strong> a Text file
              (.txt) may work better for technology such as screen reader,
              screen enlargers, or Braille displays.
            </li>
          </ul>
        </va-additional-info>
      </section>
      {content()}
    </div>
  );
};

export default Allergies;
