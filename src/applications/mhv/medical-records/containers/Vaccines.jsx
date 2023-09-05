import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { generatePdf } from '@department-of-veterans-affairs/platform-pdf/exports';
import { focusElement } from '@department-of-veterans-affairs/platform-utilities/ui';
import RecordList from '../components/RecordList/RecordList';
import { getVaccinesList } from '../actions/vaccines';
import { setBreadcrumbs } from '../actions/breadcrumbs';
import PrintHeader from '../components/shared/PrintHeader';
import { recordType, EMPTY_FIELD, pageTitles } from '../util/constants';
import PrintDownload from '../components/shared/PrintDownload';
import {
  dateFormat,
  nameFormat,
  processList,
  sendErrorToSentry,
} from '../util/helpers';
import { updatePageTitle } from '../../shared/util/helpers';

const Vaccines = () => {
  const dispatch = useDispatch();
  const vaccines = useSelector(state => state.mr.vaccines.vaccinesList);
  const user = useSelector(state => state.user.profile);
  const name = nameFormat(user.userFullName);
  const dob = dateFormat(user.dob, 'LL');

  useEffect(() => {
    dispatch(getVaccinesList());
  }, []);

  useEffect(() => {
    dispatch(
      setBreadcrumbs(
        [{ url: '/my-health/medical-records/', label: 'Medical records' }],
        {
          url: '/my-health/medical-records/vaccines',
          label: 'VA vaccines',
        },
      ),
    );
    focusElement(document.querySelector('h1'));
    updatePageTitle(pageTitles.VACCINES_PAGE_TITLE);
  }, []);

  const generateVaccinesPdf = async () => {
    const pdfData = {
      headerLeft: name,
      headerRight: `Date of birth: ${dob}`,
      footerLeft: `Report generated by My HealtheVet and VA on ${moment().format(
        'LL',
      )}`,
      footerRight: 'Page %PAGE_NUMBER% of %TOTAL_PAGES%',
      title: 'Vaccines',
      subject: 'VA Medical Record',
      preface:
        'Your VA Vaccines list may not be complete. If you have any questions about your information, visit the FAQs or contact your VA Health care team.',
      results: {
        items: [],
      },
    };

    vaccines.forEach(item => {
      pdfData.results.items.push({
        header: item.name,
        items: [
          {
            title: 'Date received',
            value: item.date || EMPTY_FIELD,
            inline: true,
          },
          {
            title: 'Location',
            value: item.location || EMPTY_FIELD,
            inline: true,
          },
          {
            title: 'Reaction',
            value: processList(item.reactions),
            inline: !item.reactions.length,
          },
          {
            title: 'Provider notes',
            value: processList(item.notes),
            inline: !item.notes.length,
          },
        ],
      });
    });

    try {
      await generatePdf('medicalRecords', 'vaccines_report', pdfData);
    } catch (error) {
      sendErrorToSentry(error, 'Vaccines');
    }
  };

  const content = () => {
    if (vaccines?.length) {
      return <RecordList records={vaccines} type={recordType.VACCINES} />;
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
    <div id="vaccines">
      <PrintHeader />
      <h1 className="page-title">Vaccines</h1>
      <section className="set-width-486">
        <p>
          This is a complete list of vaccines that the VA has on file for you.
        </p>
        <p className="print-only vads-u-margin-bottom--0 max-80">
          Your VA Vaccines list may not be complete. If you have any questions
          about your information, visit the FAQs or contact your VA Health care
          team.
        </p>
        <PrintDownload list download={generateVaccinesPdf} />
      </section>
      {content()}
    </div>
  );
};

export default Vaccines;
