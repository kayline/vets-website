import { errorMessages, PRIMARY_PHONE } from '../constants';
import { validateRequireRatedDisability } from '../../shared/validations';

/**
 * Check validations for Custom pages
 * @param {Function[]} validations - array of validation functions
 * @param {*} data - field data passed to the validation function
 * @param {*} fullData - full and appStateData passed to validation function
 * @returns {String[]} - error messages
 */
export const checkValidations = (
  validations = [],
  data = {},
  fullData = {},
  index,
) => {
  const errors = { errorMessages: [] };
  errors.addError = message => errors.errorMessages.push(message);
  /* errors, fieldData, formData, schema, uiSchema, index, appStateData */
  validations.map(validation =>
    validation(errors, data, fullData, null, null, index, fullData),
  );
  return errors.errorMessages;
};

export const requireRatedDisability = (errors = {}, fieldData) => {
  validateRequireRatedDisability(errors, fieldData, errorMessages);
};

/* Contact info */
export const contactInfoValidation = (errors = {}, _fieldData, formData) => {
  const { veteran = {} } = formData || {};
  if (!veteran.email) {
    errors.addError?.(errorMessages.missingEmail);
  }
  if (!(veteran.homePhone?.phoneNumber || veteran.mobilePhone?.phoneNumber)) {
    errors.addError?.(errorMessages.missingPhone);
  }
  if (!veteran.address?.addressLine1) {
    errors.addError?.(errorMessages.missingAddress);
  }
};

export const missingPrimaryPhone = (error, _fieldData, formData) => {
  if (!formData?.[PRIMARY_PHONE]) {
    error.addError?.(errorMessages.missingPrimaryPhone);
  }
};
