import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { focusElement } from '@department-of-veterans-affairs/platform-utilities/ui';
import FEATURE_FLAG_NAMES from '@department-of-veterans-affairs/platform-utilities/featureFlagNames';
import { formatDateLong } from '@department-of-veterans-affairs/platform-utilities/exports';
import {
  updatePageTitle,
  generatePdfScaffold,
  formatName,
  crisisLineHeader,
  reportGeneratedBy,
  txtLine,
  usePrintTitle,
} from '@department-of-veterans-affairs/mhv/exports';
import {
  generateTextFile,
  getNameDateAndTime,
  makePdf,
  processList,
} from '../util/helpers';
import ItemList from '../components/shared/ItemList';
import {
  getConditionDetails,
  clearConditionDetails,
} from '../actions/conditions';
import { setBreadcrumbs } from '../actions/breadcrumbs';
import PrintHeader from '../components/shared/PrintHeader';
import PrintDownload from '../components/shared/PrintDownload';
import DownloadingRecordsInfo from '../components/shared/DownloadingRecordsInfo';
import {
  ALERT_TYPE_ERROR,
  accessAlertTypes,
  pageTitles,
} from '../util/constants';
import AccessTroubleAlertBox from '../components/shared/AccessTroubleAlertBox';
import useAlerts from '../hooks/use-alerts';
import DateSubheading from '../components/shared/DateSubheading';
import { generateConditionContent } from '../util/pdfHelpers/conditions';
import DownloadSuccessAlert from '../components/shared/DownloadSuccessAlert';

const ConditionDetails = props => {
  const { runningUnitTest } = props;
  const record = useSelector(state => state.mr.conditions.conditionDetails);
  const conditionList = useSelector(
    state => state.mr.conditions.conditionsList,
  );
  const user = useSelector(state => state.user.profile);
  const allowTxtDownloads = useSelector(
    state =>
      state.featureToggles[
        FEATURE_FLAG_NAMES.mhvMedicalRecordsAllowTxtDownloads
      ],
  );
  const { conditionId } = useParams();
  const dispatch = useDispatch();
  const activeAlert = useAlerts(dispatch);
  const [downloadStarted, setDownloadStarted] = useState(false);

  useEffect(
    () => {
      dispatch(
        setBreadcrumbs([
          {
            url: '/my-health/medical-records/conditions',
            label: 'Conditions',
          },
        ]),
      );
      return () => {
        dispatch(clearConditionDetails());
      };
    },
    [dispatch],
  );

  useEffect(
    () => {
      if (conditionId)
        dispatch(getConditionDetails(conditionId, conditionList));
    },
    [conditionId, conditionList, dispatch],
  );

  useEffect(
    () => {
      if (record?.name) {
        focusElement(document.querySelector('h1'));
        updatePageTitle(
          `${record.name} - ${pageTitles.HEALTH_CONDITIONS_PAGE_TITLE}`,
        );
      }
    },
    [record],
  );

  usePrintTitle(
    pageTitles.HEALTH_CONDITIONS_PAGE_TITLE,
    user.userFullName,
    user.dob,
    updatePageTitle,
  );

  const generateConditionDetailsPdf = async () => {
    setDownloadStarted(true);
    const title = `Conditions: ${record.name} on ${record.date}`;
    const subject = 'VA Medical Record';
    const scaffold = generatePdfScaffold(user, title, subject);
    const pdfData = { ...scaffold, ...generateConditionContent(record) };
    const pdfName = `VA-conditions-details-${getNameDateAndTime(user)}`;
    makePdf(pdfName, pdfData, 'Condition details', runningUnitTest);
  };

  const generateConditionTxt = async () => {
    setDownloadStarted(true);
    const content = `
${crisisLineHeader}\n\n
${record.name} \n
${formatName(user.userFullName)}\n
Date of birth: ${formatDateLong(user.dob)}\n
${reportGeneratedBy}\n
Date entered: ${record.date} \n
${txtLine} \n
Provider: ${record.provider} \n
Provider Notes: ${processList(record.note)} \n
Status of health condition: ${record.active} \n
Location: ${record.facility} \n
SNOMED Clinical term: ${record.name} \n`;

    const fileName = `VA-Conditions-details-${getNameDateAndTime(user)}`;

    generateTextFile(content, fileName);
  };

  const accessAlert = activeAlert && activeAlert.type === ALERT_TYPE_ERROR;

  const content = () => {
    if (accessAlert) {
      return (
        <AccessTroubleAlertBox
          alertType={accessAlertTypes.HEALTH_CONDITIONS}
          className="vads-u-margin-bottom--9"
        />
      );
    }
    if (record) {
      return (
        <>
          <PrintHeader />
          <h1
            className="vads-u-margin-bottom--0"
            aria-describedby="condition-date"
            data-dd-privacy="mask"
          >
            {record.name.split(' (')[0]}
          </h1>
          <DateSubheading
            date={record.date}
            id="condition-date"
            label="Date entered"
          />

          {downloadStarted && <DownloadSuccessAlert />}
          <PrintDownload
            downloadPdf={generateConditionDetailsPdf}
            allowTxtDownloads={allowTxtDownloads}
            downloadTxt={generateConditionTxt}
          />
          <DownloadingRecordsInfo allowTxtDownloads={allowTxtDownloads} />

          <div className="condition-details max-80">
            <h2 className="vads-u-font-size--base vads-u-font-family--sans">
              Provider
            </h2>
            <p data-dd-privacy="mask" data-testid="condition-provider">
              {record.provider}
            </p>
            <h2 className="vads-u-font-size--base vads-u-font-family--sans">
              Location
            </h2>
            <p data-dd-privacy="mask" data-testid="condition-location">
              {record.facility || 'There is no facility reported at this time'}
            </p>
            <h2 className="vads-u-margin-bottom--0">Provider notes</h2>
            <ItemList
              data-testid="condition-provider-notes"
              list={record.comments}
            />
          </div>
        </>
      );
    }

    return (
      <div className="vads-u-margin-y--8">
        <va-loading-indicator
          message="Loading..."
          setFocus
          data-testid="loading-indicator"
        />
      </div>
    );
  };

  return (
    <div className="vads-l-grid-container vads-u-padding-x--0 vads-u-margin-bottom--5">
      {content()}
    </div>
  );
};

export default ConditionDetails;

ConditionDetails.propTypes = {
  runningUnitTest: PropTypes.bool,
};
