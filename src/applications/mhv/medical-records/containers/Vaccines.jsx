import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecordList from '../components/RecordList/RecordList';
import { getVaccineList } from '../actions/vaccine';
import { printContent } from '../util/helpers';
import { setBreadcrumbs } from '../actions/breadcrumbs';

const Vaccines = () => {
  const vaccines = useSelector(state => state.mr.vaccines.vaccineList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVaccineList());
  });

  useEffect(
    () => {
      dispatch(
        setBreadcrumbs(
          [
            { url: '/my-health/medical-records/', label: 'Dashboard' },
            {
              url: '/my-health/medical-records/health-history',
              label: 'Health history',
            },
          ],
          { url: '/my-health/medical-records/vaccines', label: 'VA vaccines' },
        ),
      );
    },
    [dispatch],
  );

  const content = () => {
    if (vaccines?.length) {
      return (
        <RecordList records={vaccines} type="vaccine" print={printContent} />
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
    <div className="vaccines" id="vaccines">
      <h1>Vaccines</h1>
      <p>
        This is a complete list of vaccines that the VA has on file for you.
      </p>
      <p className="print-only">
        Your VA Vaccines list may not be complete. If you have any questions
        about your information, visit the FAQs or contact your VA Health care
        team.
      </p>
      <div className="vads-u-display--flex vads-u-margin-y--3 no-print">
        <button
          className="link-button vads-u-margin-right--3"
          type="button"
          data-testid="print-records-button"
          onClick={() => printContent('vaccines')}
        >
          <i
            aria-hidden="true"
            className="fas fa-print vads-u-margin-right--1"
          />
          Print page
        </button>
        <button className="link-button" type="button">
          <i
            aria-hidden="true"
            className="fas fa-download vads-u-margin-right--1"
          />
          Download page
        </button>
      </div>

      {content()}

      <iframe
        title="contentsToPrint"
        id="contentsToPrint"
        style={{
          height: '0px',
          width: '0px',
          position: 'absolute',
          border: 'none',
        }}
      />
    </div>
  );
};

export default Vaccines;
