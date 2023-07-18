import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { chunk } from 'lodash';
import { VaPagination } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import { generatePdf } from '@department-of-veterans-affairs/platform-pdf/exports';
import moment from 'moment';
import { setBreadcrumbs } from '../actions/breadcrumbs';
import { getVitalDetails } from '../actions/vitals';
import PrintHeader from '../components/shared/PrintHeader';
import PrintDownload from '../components/shared/PrintDownload';
import {
  dateFormat,
  macroCase,
  nameFormat,
  processList,
  sendErrorToSentry,
} from '../util/helpers';
import { emptyField, vitalTypeDisplayNames } from '../util/constants';

const MAX_PAGE_LIST_LENGTH = 5;
const VitalDetails = () => {
  const vitalDetails = useSelector(state => state.mr.vitals.vitalDetails);
  const user = useSelector(state => state.user.profile);
  const name = nameFormat(user.userFullName);
  const dob = dateFormat(user.dob, 'LL');
  const { vitalType } = useParams();
  const dispatch = useDispatch();

  const perPage = 5;
  const [currentVitals, setCurrentVitals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const paginatedVitals = useRef([]);

  useEffect(() => {
    if (vitalDetails?.length) {
      dispatch(
        setBreadcrumbs(
          [
            { url: '/my-health/medical-records/', label: 'Dashboard' },
            {
              url: '/my-health/medical-records/health-history',
              label: 'Health history',
            },
            {
              url: '/my-health/medical-records/health-history/vitals',
              label: 'VA vitals',
            },
          ],
          {
            url: `/my-health/medical-records/health-history/vitals/${vitalType}`,
            label: vitalTypeDisplayNames[macroCase(vitalType)],
          },
        ),
      );
    }
  });

  const paginateData = data => {
    return chunk(data, perPage);
  };

  const onPageChange = page => {
    setCurrentVitals(paginatedVitals.current[page - 1]);
    setCurrentPage(page);
  };

  const fromToNums = (page, total) => {
    const from = (page - 1) * perPage + 1;
    const to = Math.min(page * perPage, total);
    return [from, to];
  };

  useEffect(
    () => {
      if (vitalDetails?.length) {
        paginatedVitals.current = paginateData(vitalDetails);
        setCurrentVitals(paginatedVitals.current[currentPage - 1]);
      }
    },
    [currentPage, vitalDetails],
  );

  const displayNums = fromToNums(currentPage, vitalDetails?.length);

  useEffect(
    () => {
      if (vitalType) {
        dispatch(getVitalDetails(macroCase(vitalType)));
      }
    },
    [vitalType],
  );

  const generateVitalsPdf = async () => {
    const pdfData = {
      headerLeft: name,
      headerRight: `Date of birth: ${dob}`,
      headerBanner: [
        {
          text:
            'If you’re ever in crisis and need to talk with someone right away, call the Veterans Crisis line at 988. Then select 1.',
        },
      ],
      footerLeft: `Report generated by My HealtheVet and VA on ${moment().format(
        'LL',
      )}`,
      footerRight: 'Page %PAGE_NUMBER% of %TOTAL_PAGES%',
      title: `Vitals`,
      subject: 'VA Medical Record',
      preface:
        'This list includes vitals and other basic health numbers your providers check at your appointments.',
      results: {
        header: vitalTypeDisplayNames[macroCase(vitalType)],
        items: [],
      },
    };

    vitalDetails.forEach(item => {
      pdfData.results.items.push({
        header: moment(item.date).format('LLL'),
        items: [
          {
            title: 'Result',
            value: item.measurement || emptyField,
            inline: true,
          },
          {
            title: 'Location',
            value: item.location || emptyField,
            inline: true,
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
      await generatePdf('medicalRecords', 'vitals_report', pdfData);
    } catch (error) {
      sendErrorToSentry(error, 'Vital details');
    }
  };

  const content = () => {
    if (vitalDetails?.length) {
      return (
        <>
          <h1>{vitalTypeDisplayNames[vitalDetails[0].type]}</h1>
          <section className="set-width-486">
            <PrintDownload list download={generateVitalsPdf} />
            <div className="vads-u-padding-y--1 vads-u-margin-bottom--0 vads-u-border-top--1px vads-u-border-bottom--1px vads-u-border-color--gray-light no-print">
              Displaying {displayNums[0]}
              &#8211;
              {displayNums[1]} of {vitalDetails.length} vitals
            </div>

            <ul className="vital-details no-print">
              {currentVitals?.length > 0 &&
                currentVitals?.map((vital, idx) => (
                  <li key={idx}>
                    <h2>{moment(vital.date).format('LLL')}</h2>
                    <h3>Result:</h3>
                    <p className="vads-u-margin-bottom--1 vads-u-margin-top--0">
                      {vital.measurement}
                    </p>
                    <h3>Location:</h3>
                    <p className="vads-u-margin-bottom--1 vads-u-margin-top--0">
                      {vital.location}
                    </p>
                    <h3>Provider notes:</h3>
                    {vital?.notes?.length > 0 ? (
                      <ul className="comment-list">
                        {vital.notes.map((comment, commentIdx) => (
                          <li key={commentIdx}>{comment}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="vads-u-margin--0">None noted</p>
                    )}
                  </li>
                ))}
            </ul>

            {/* print view start */}
            <ul className="vital-details print-only">
              {vitalDetails?.length > 0 &&
                vitalDetails?.map((vital, idx) => (
                  <li key={idx}>
                    <h2>{moment(vital.date).format('LLL')}</h2>
                    <h3>Result:</h3>
                    <p>{vital.measurement}</p>
                    <h3>Location:</h3>
                    <p>{vital.location}</p>
                    <h3>Provider notes:</h3>
                    {vital?.notes?.length > 0 ? (
                      <ul className="comment-list">
                        {vital.notes.map((comment, commentIdx) => (
                          <li key={commentIdx}>{comment}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="vads-u-margin--0">None noted</span>
                    )}
                  </li>
                ))}
            </ul>
            {/* print view end */}

            <div className="vads-u-margin-bottom--2 no-print">
              <VaPagination
                onPageSelect={e => onPageChange(e.detail.page)}
                page={currentPage}
                pages={paginatedVitals.current.length}
                maxPageListLength={MAX_PAGE_LIST_LENGTH}
                showLastPage
              />
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
    <>
      <PrintHeader />

      {content()}
    </>
  );
};

export default VitalDetails;

VitalDetails.propTypes = {
  print: PropTypes.func,
};
