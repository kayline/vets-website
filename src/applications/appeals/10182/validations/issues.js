import { showExtensionReason } from '../utils/helpers';
import { issueErrorMessages } from '../content/addIssue';
import {
  noneSelected,
  maxSelectedErrorMessage,
} from '../content/contestableIssues';
import { content as extensionReasonContent } from '../content/extensionReason';
import { MAX_LENGTH as NOD_MAX_LENGTH } from '../constants';

import { MAX_LENGTH, REGEXP } from '../../shared/constants';
import {
  getSelected,
  hasSomeSelected,
  hasDuplicates,
} from '../../shared/utils/issues';

/**
 *
 * @param {Function[]} validations - array of validation functions
 * @param {*} data - field data passed to the validation function
 * @param {*} fullData - full and appStateData passed to validation function
 * @returns {String[]} - error messages
 */
export const checkValidations = (validations, data, fullData) => {
  const errors = { errorMessages: [] };
  errors.addError = message => errors.errorMessages.push(message);
  validations.map(validation =>
    validation(errors, data, fullData, null, null, null, fullData),
  );
  return errors.errorMessages;
};

export const selectionRequired = (
  errors,
  _fieldData,
  formData = {},
  _schema,
  _uiSchema,
  _index,
  appStateData,
) => {
  // formData === pageData on review & submit page. It should include the entire
  // formData. see https://github.com/department-of-veterans-affairs/vsp-support/issues/162
  // Fall back to formData for unit testing
  const data = Object.keys(appStateData || {}).length ? appStateData : formData;
  if (errors && !hasSomeSelected(data)) {
    errors.addError(noneSelected);
  }
};

// Alert Veteran to duplicates based on name & decision date
export const uniqueIssue = (
  errors,
  _fieldData,
  formData,
  _schema,
  _uiSchema,
  _index,
  appStateData,
) => {
  if (errors?.addError && hasDuplicates(appStateData || formData)) {
    errors.addError(issueErrorMessages.uniqueIssue);
  }
};

export const maxIssues = (
  errors,
  _fieldData,
  formData,
  _schema,
  _uiSchema,
  _index,
  appStateData,
) => {
  if (getSelected(appStateData || formData).length > MAX_LENGTH.SELECTIONS) {
    errors.addError(maxSelectedErrorMessage);
  }
};

export const missingIssueName = (errors, data) => {
  if (!data) {
    errors.addError(issueErrorMessages.missingIssue);
  }
};

export const maxNameLength = (errors, data) => {
  if (data.length > NOD_MAX_LENGTH.ISSUE_NAME) {
    errors.addError(issueErrorMessages.maxLength);
  }
};

export const extensionReason = (
  errors,
  _fieldData,
  formData,
  _schema,
  _uiSchema,
  _index,
  appStateData,
) => {
  const data = appStateData || formData || {};
  // Ensure reason isn't just whitespace
  const reason = (data.extensionReason || '').replace(REGEXP.WHITESPACE, '');
  if (showExtensionReason(data) && !reason) {
    errors.addError(extensionReasonContent.errorMessage);
  }
};
