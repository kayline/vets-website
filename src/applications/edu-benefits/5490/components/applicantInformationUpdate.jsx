import { pick } from 'lodash';
import applicantDescription from 'platform/forms/components/ApplicantDescription';
import dateUI from 'platform/forms-system/src/js/definitions/date';
import currentOrPastDateUI from 'platform/forms-system/src/js/definitions/currentOrPastDate';
import fullNameUI from 'platform/forms/definitions/fullName';
import * as personId from 'platform/forms/definitions/personId';

import { relationshipLabels, genderLabels } from 'platform/static-data/labels';

import environment from 'platform/utilities/environment';
import { ageWarning, eighteenOrOver } from '../helpers';

const defaults = prefix => ({
  fields: [
    `${prefix}FullName`,
    'view:noSSN',
    `${prefix}SocialSecurityNumber`,
    `${prefix}DateOfBirth`,
    'view:ageWarningNotification',
    'view:minorHighSchoolQuestions',
    'gender',
    'relationship',
  ],
  required: [`${prefix}FullName`, `${prefix}DateOfBirth`, 'relationship'],
  labels: {},
  isVeteran: false,
});

/**
 * Returns an applicantInformation page based on the options passed.
 *
 * @param {Object} schema   The full schema for the form
 * @param {Object} options  Options to override the defaults above
 */
export default function applicantInformationUpdate(schema, options) {
  // Use the defaults as necessary, but override with the options given
  const prefix = options && options.isVeteran ? 'veteran' : 'relative';
  const { fields, required, labels } = {
    ...defaults(prefix),
    ...options,
  };

  const possibleProperties = {
    ...schema.properties,
    'view:noSSN': {
      type: 'boolean',
    },
    'view:ageWarningNotification': {
      type: 'object',
      properties: {},
    },
    'view:minorHighSchoolQuestions': {
      type: 'object',
      properties: {
        minorHighSchoolQuestion: {
          type: 'boolean',
        },
        highSchoolGedGradDate: {
          type: 'object',
          $ref: '#/definitions/date',
        },
        highSchoolGedExpectedGradDate: {
          type: 'object',
          $ref: '#/definitions/date',
        },
      },
    },
  };

  return {
    path: 'applicant/information',
    title: 'Applicant information',
    initialData: {},
    uiSchema: {
      'ui:order': fields,
      'ui:description': applicantDescription,
      [`${prefix}FullName`]: fullNameUI,
      [`${prefix}DateOfBirth`]: {
        ...currentOrPastDateUI('Your date of birth'),
        'ui:errorMessages': {
          pattern: 'Please provide a valid date',
          required: 'Please enter a date',
          futureDate: 'Please provide a valid date',
        },
      },
      'view:ageWarningNotification': {
        'ui:description': ageWarning,
        'ui:options': {
          hideIf: formData => eighteenOrOver(formData.relativeDateOfBirth),
        },
      },
      'view:minorHighSchoolQuestions': {
        'ui:options': {
          expandUnder: 'view:ageWarningNotification',
          hideIf: formData => {
            let shouldNotShow = true;
            const isNotProd = !environment.isProduction();
            const overEighteen = eighteenOrOver(formData.relativeDateOfBirth);
            if (!isNotProd && !overEighteen) {
              shouldNotShow = true;
            } else {
              shouldNotShow = false;
            }
            return shouldNotShow;
          },
        },
        minorHighSchoolQuestion: {
          'ui:title': 'Applicant has graduated high school or received GED?',
          'ui:widget': 'yesNo',
          'ui:required': formData => {
            const isRequired = eighteenOrOver(formData.relativeDateOfBirth);
            return !isRequired;
          },
        },
        highSchoolGedGradDate: {
          ...currentOrPastDateUI('Date graduated'),
          'ui:options': {
            expandUnder: 'minorHighSchoolQuestion',
          },
          'ui:required': formData => {
            let isRequired = false;
            if (!eighteenOrOver(formData.relativeDateOfBirth)) {
              const yesNoResults =
                formData['view:minorHighSchoolQuestions']
                  .minorHighSchoolQuestion;
              if (yesNoResults) {
                isRequired = true;
              }
              if (!yesNoResults) {
                isRequired = false;
              }
            }
            return isRequired;
          },
        },
        highSchoolGedExpectedGradDate: {
          ...dateUI('Date expected to graduate'),
          'ui:options': {
            expandUnder: 'minorHighSchoolQuestion',
            expandUnderCondition: false,
          },
          'ui:errorMessages': {
            pattern: 'Please enter a valid current or future date',
            required: 'Please enter a date',
          },
        },
      },
      gender: {
        'ui:widget': 'radio',
        'ui:title': 'Your Gender',
        'ui:options': {
          labels: labels.gender || genderLabels,
        },
      },
      relationship: {
        'ui:widget': 'radio',
        'ui:title':
          'What’s your relationship to the service member whose benefit is being transferred to you?',
        'ui:options': {
          labels: labels.relationship || relationshipLabels,
        },
      },
      ...personId.uiSchema(prefix, 'view:noSSN'),
    },
    schema: {
      type: 'object',
      definitions: pick(schema.definitions, [
        'fullName',
        'relationship',
        'ssn',
        'gender',
        'date',
        'vaFileNumber',
      ]),
      required,
      properties: pick(possibleProperties, fields),
    },
  };
}
