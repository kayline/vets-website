import definitions from 'vets-json-schema/dist/definitions.json';
import ssnUI from 'platform/forms-system/src/js/definitions/ssn';

/** @type {PageSchema} */
export default {
  uiSchema: {
    veteranSSN: ssnUI,
    veteranVaFileNumber: {
      'ui:title': 'VA file number (if available)',
      'ui:errorMessages': {
        pattern:
          "Please enter a valid VA file number.  All should have 7-9 digits; some may start with a 'C'",
      },
    },
    veteranServiceNumber: {
      'ui:title': 'Service number (if available)',
      'ui:errorMessages': {
        pattern:
          'Please enter a valid Service number, with 0-2 upper-case letters followed by 5-8 digits.',
      },
    },
  },
  schema: {
    type: 'object',
    required: ['veteranSSN'],
    properties: {
      veteranSSN: definitions.ssn,
      veteranVaFileNumber: definitions.vaFileNumber,
      veteranServiceNumber: definitions.veteranServiceNumber,
    },
  },
};
