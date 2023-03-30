import React from 'react';

const MaritalStatusInfo = (
  <va-additional-info trigger="Why does my marital status matter?">
    <p>
      We want to make sure we understand your household’s financial situation.
    </p>
    <p>
      If you’re married, we also need to understand your spouse’s financial
      situation. This allows us to make a more informed decision on your
      request.
    </p>
  </va-additional-info>
);

export const uiSchema = {
  'ui:title': 'Your spouse information',
  questions: {
    isMarried: {
      'ui:title': 'Are you married?',
      'ui:widget': 'yesNo',
      'ui:required': () => true,
      'ui:errorMessages': {
        required: 'Please select your marital status.',
      },
    },
  },
  'view:components': {
    'view:maritalStatus': {
      'ui:description': MaritalStatusInfo,
    },
  },
};
export const schema = {
  type: 'object',
  properties: {
    questions: {
      type: 'object',
      properties: {
        isMarried: {
          type: 'boolean',
        },
      },
    },
    'view:components': {
      type: 'object',
      properties: {
        'view:maritalStatus': {
          type: 'object',
          properties: {},
        },
      },
    },
  },
};
