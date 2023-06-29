import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setData } from 'platform/forms-system/src/js/actions';
import { VaDate } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import { parseISODate } from 'platform/forms-system/src/js/helpers';
import PropTypes from 'prop-types';
import { getJobIndex } from '../utils/session';
import { BASE_EMPLOYMENT_RECORD } from '../constants/index';
import { isValidPastDate } from '../utils/helpers';

const EmploymentWorkDates = props => {
  const { goToPath, setFormData, data } = props;

  const RETURN_PATH = '/enhanced-employment-records';

  const editIndex = getJobIndex();

  const isEditing = editIndex && !Number.isNaN(editIndex);

  const index = isEditing ? Number(editIndex) : 0;

  const userType = 'veteran';

  const {
    personalData: {
      employmentHistory: {
        newRecord = {},
        veteran: { employmentRecords = [] },
      },
    },
  } = data;

  const [employmentRecord, setEmploymentRecord] = useState({
    ...(isEditing ? employmentRecords[index] : newRecord),
  });

  const { employerName = '', from, to } = employmentRecord;

  const { month: fromMonth, year: fromYear } = parseISODate(from);
  const { month: toMonth, year: toYear } = parseISODate(to);

  const fromError = 'Please enter your employment start date.';
  const toError = 'Please enter your employment end date.';

  const [toDateError, setToDateError] = useState(null);
  const [fromDateError, setFromDateError] = useState(null);

  const updateFormData = () => {
    if (fromDateError || (toDateError && !employmentRecord.isCurrent))
      return null;

    if (isEditing) {
      // find the one we are editing in the employeeRecords array
      const updatedRecords = employmentRecords.map((item, arrayIndex) => {
        return arrayIndex === index ? employmentRecord : item;
      });
      // update form data
      setFormData({
        ...data,
        personalData: {
          ...data.personalData,
          employmentHistory: {
            ...data.personalData.employmentHistory,
            [`${userType}`]: {
              ...data.personalData.employmentHistory[`${userType}`],
              employmentRecords: updatedRecords,
            },
          },
        },
      });
      if (employmentRecord.isCurrent) {
        return goToPath(`/gross-monthly-income`);
      }
      return goToPath(`/employment-history`);
    }

    // we are not editing a record, so we are adding a new one
    if (employmentRecord.isCurrent) {
      setFormData({
        ...data,
        personalData: {
          ...data.personalData,
          employmentHistory: {
            ...data.personalData.employmentHistory,
            newRecord: { ...employmentRecord },
          },
        },
      });
      return goToPath(`/gross-monthly-income`);
    }

    setFormData({
      ...data,
      personalData: {
        ...data.personalData,
        employmentHistory: {
          ...data.personalData.employmentHistory,
          newRecord: { ...BASE_EMPLOYMENT_RECORD },
          [`${userType}`]: {
            ...data.personalData.employmentHistory[`${userType}`],
            employmentRecords: [{ ...employmentRecord }, ...employmentRecords],
          },
        },
      },
    });
    return goToPath(`/employment-history`);
  };

  const handleChange = (key, value) => {
    setEmploymentRecord({
      ...employmentRecord,
      [key]: value,
    });
  };

  const handlers = {
    onCancel: event => {
      event.preventDefault();
      goToPath(RETURN_PATH);
    },
    handleDateChange: (key, monthYear) => {
      const dateString = `${monthYear}-XX`;
      handleChange(key, dateString);
    },
    handleBack: event => {
      event.preventDefault();
      goToPath(RETURN_PATH);
    },
    onSubmitted: event => {
      event.preventDefault();
      updateFormData();
    },
    onUpdate: () => {
      setFromDateError(
        isValidPastDate(employmentRecord.from) ? null : fromError,
      );

      setToDateError(isValidPastDate(employmentRecord.to) ? null : toError);
    },
  };

  const ShowWorkDates = () => {
    return (
      <div className="vads-u-margin-top--3">
        <VaDate
          monthYearOnly
          value={`${fromYear}-${fromMonth}`}
          label="Date you started work at this job?"
          name="from"
          onDateChange={e => handlers.handleDateChange('from', e.target.value)}
          required
          error={fromDateError}
        />
        {!employmentRecord.isCurrent ? (
          <VaDate
            monthYearOnly
            value={`${toYear}-${toMonth}`}
            label="Date you stopped work at this job?"
            name="to"
            onDateChange={e => handlers.handleDateChange('to', e.target.value)}
            required
            error={toDateError}
          />
        ) : null}
      </div>
    );
  };

  return (
    <form onSubmit={handlers.onSubmitted}>
      <fieldset className="vads-u-margin-y--2">
        <legend className="schemaform-block-title">
          Your job at {employerName}
        </legend>
        <div>{ShowWorkDates()}</div>
        <p>
          <button
            type="button"
            id="cancel"
            className="usa-button-secondary vads-u-width--auto"
            onClick={handlers.onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            id="submit"
            className="vads-u-width--auto"
            onClick={handlers.onUpdate}
          >
            {`${
              employmentRecords.length === index ? 'Update' : 'Add'
            } employment record`}
          </button>
        </p>
      </fieldset>
    </form>
  );
};

const mapStateToProps = ({ form }) => {
  return {
    formData: form.data,
    employmentHistory: form.data.personalData.employmentHistory,
  };
};

const mapDispatchToProps = {
  setFormData: setData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmploymentWorkDates);

EmploymentWorkDates.propTypes = {
  data: PropTypes.shape({
    personalData: PropTypes.shape({
      employmentHistory: PropTypes.shape({
        newRecord: PropTypes.shape({
          employerName: PropTypes.string,
          from: PropTypes.string,
          to: PropTypes.string,
          type: PropTypes.string,
          grossMonthlyIncome: PropTypes.string,
          deductions: PropTypes.array,
          isCurrent: PropTypes.bool,
        }),
        veteran: PropTypes.shape({
          employmentRecords: PropTypes.arrayOf(
            PropTypes.shape({
              employerName: PropTypes.string,
              from: PropTypes.string,
              to: PropTypes.string,
              type: PropTypes.string,
              grossMonthlyIncome: PropTypes.string,
              deductions: PropTypes.array,
              isCurrent: PropTypes.bool,
            }),
          ),
        }),
      }),
    }),
  }).isRequired,
  goToPath: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
};
