import get from 'platform/utilities/data/get';
import { isValidDateRange } from 'platform/forms/validations';
import { convertToDateField } from 'platform/forms-system/src/js/validation';
import { isValidCentralMailPostalCode } from 'platform/forms/address/validations';

export function validateAfterMarriageDate(errors, dateOfSeparation, formData) {
  const fromDate = convertToDateField(formData.dateOfMarriage);
  const toDate = convertToDateField(dateOfSeparation);

  if (!isValidDateRange(fromDate, toDate)) {
    errors.addError('Date marriage ended must be after date of marriage');
  }
}

export function validateAfterMarriageDates(errors, dateOfSeparation, formData) {
  formData.spouseMarriages?.forEach(marriage => {
    if (marriage.dateOfSeparation === dateOfSeparation) {
      validateAfterMarriageDate(errors, dateOfSeparation, marriage);
    }
  });
}

export function validateUniqueMarriageDates(errors, dateOfMarriage, formData) {
  let count = 0;
  formData.spouseMarriages?.forEach(marriage => {
    if (dateOfMarriage === marriage.dateOfMarriage) {
      count += 1;
    }
  });
  if (count > 1) {
    errors.addError('Date of marriage must be unique');
  }
}

export function validateServiceBirthDates(errors, service, formData) {
  const fromDate = convertToDateField(formData.veteranDateOfBirth);
  const toDate = convertToDateField(
    get('activeServiceDateRange.from', service),
  );

  if (!isValidDateRange(fromDate, toDate)) {
    errors.activeServiceDateRange.from.addError(
      'Date entering active service should be after birth date',
    );
  }
}

export function validateCentralMailPostalCode(errors, address) {
  if (!isValidCentralMailPostalCode(address)) {
    errors.postalCode.addError(
      'Please enter a valid postal code (e.g. 12345 or 12345-6789)',
    );
  }
}

// Does not allow a dollar sign
export const isValidCurrency = currencyAmount => {
  const regex = /^(?!.*\$)(([1-9]\d{0,2}(,\d{3})*|\d+)(\.\d{1,2})?)?$/;
  return regex.test(currencyAmount);
};
