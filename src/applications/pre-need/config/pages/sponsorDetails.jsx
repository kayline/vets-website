import fullSchemaPreNeed from 'vets-json-schema/dist/40-10007-schema.json';

import { merge, pick } from 'lodash';
import applicantDescription from 'platform/forms/components/ApplicantDescription';
import currentOrPastDateUI from 'platform/forms-system/src/js/definitions/currentOrPastDate';

import environment from 'platform/utilities/environment';

import fullNameUI from 'platform/forms/definitions/fullName';
import {
  veteranUI,
  ssnDashesUI,
  sponsorDetailsSubHeader,
  sponsorDetailsDescription,
} from '../../utils/helpers';

const { veteran } = fullSchemaPreNeed.properties.application.properties;

// prod flag for MBMS-47182
export const uiSchema = !environment.isProduction()
  ? {
      'ui:title': sponsorDetailsSubHeader,
      application: {
        veteran: merge({}, veteranUI, {
          'view:sponsorDetailsDescription': {
            'ui:description': sponsorDetailsDescription,
            'ui:options': {
              displayEmptyObjectOnReview: true,
            },
          },
          currentName: merge({}, fullNameUI, {
            first: {
              'ui:title': 'Sponsor’s first name',
            },
            last: {
              'ui:title': 'Sponsor’s last name',
            },
            middle: {
              'ui:title': 'Sponsor’s middle name',
            },
            suffix: {
              'ui:title': 'Sponsor’s suffix',
            },
            maiden: {
              'ui:title': 'Sponsor’s maiden name',
            },
            'ui:order': ['first', 'middle', 'last', 'suffix', 'maiden'],
          }),
          ssn: {
            ...ssnDashesUI,
            'ui:title': 'Sponsor’s Social Security number',
          },
          dateOfBirth: currentOrPastDateUI('Sponsor’s date of birth'),
          placeOfBirth: {
            'ui:title': "Sponsor's place of birth (City, State, or Territory)",
          },
        }),
      },
    }
  : {
      'ui:title': sponsorDetailsSubHeader,
      'ui:description': applicantDescription,
      application: {
        veteran: merge({}, veteranUI, {
          currentName: merge({}, fullNameUI, {
            first: {
              'ui:title': 'Sponsor’s first name',
            },
            last: {
              'ui:title': 'Sponsor’s last name',
            },
            middle: {
              'ui:title': 'Sponsor’s middle name',
            },
            suffix: {
              'ui:title': 'Sponsor’s suffix',
            },
            maiden: {
              'ui:title': 'Sponsor’s maiden name',
            },
            'ui:order': ['first', 'middle', 'last', 'suffix', 'maiden'],
          }),
          ssn: {
            ...ssnDashesUI,
            'ui:title': 'Sponsor’s Social Security number',
          },
          dateOfBirth: currentOrPastDateUI('Sponsor’s date of birth'),
          placeOfBirth: {
            'ui:title': "Sponsor's place of birth (City, State, or Territory)",
          },
        }),
      },
    };

// prod flag for MBMS-47182
export const schema = !environment.isProduction()
  ? {
      type: 'object',
      properties: {
        application: {
          type: 'object',
          properties: {
            veteran: {
              type: 'object',
              required: ['ssn'],
              properties: merge(
                {},
                {
                  'view:sponsorDetailsDescription': {
                    type: 'object',
                    properties: {},
                  },
                },
                pick(veteran.properties, [
                  'currentName',
                  'ssn',
                  'dateOfBirth',
                  'placeOfBirth',
                ]),
              ),
            },
          },
        },
      },
    }
  : {
      type: 'object',
      properties: {
        application: {
          type: 'object',
          properties: {
            veteran: {
              type: 'object',
              required: ['ssn'],
              properties: pick(veteran.properties, [
                'currentName',
                'ssn',
                'dateOfBirth',
                'placeOfBirth',
              ]),
            },
          },
        },
      },
    };
