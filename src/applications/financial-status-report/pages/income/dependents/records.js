import React from 'react';
import ItemLoop from '../../../components/ItemLoop';
import CardDetailsView from '../../../components/CardDetailsView';
import DependentAges from '../../../components/DependentAges';

export const uiSchema = {
  'ui:title': () => (
    <>
      <legend className="schemaform-block-title">Your dependents</legend>
      <p>Enter each dependent’s age separately.</p>
    </>
  ),
  personalData: {
    dependents: {
      'ui:field': ItemLoop,
      'ui:options': {
        viewField: CardDetailsView,
        doNotScroll: true,
        itemName: 'a dependent',
        keepInPageOnReview: true,
      },
      items: {
        dependentAge: {
          'ui:title': 'Dependent’s age',
          'ui:options': {
            classNames: 'vads-u-margin-bottom--3 vads-u-margin-top--3',
            widgetClassNames: 'input-size-3',
          },
          'ui:errorMessages': {
            required: 'Please enter your dependent(s) age.',
            pattern: 'Please enter only numerical values.',
          },
        },
      },
    },
  },
};

export const schema = {
  type: 'object',
  properties: {
    personalData: {
      type: 'object',
      properties: {
        dependents: {
          type: 'array',
          items: {
            type: 'object',
            required: ['dependentAge'],
            properties: {
              dependentAge: {
                type: 'string',
                pattern: '^\\d+$',
              },
            },
          },
        },
      },
    },
  },
};
export const uiSchemaEnhanced = {
  'ui:title': () => (
    <>
      <legend className="schemaform-block-title">Your dependents</legend>
      <p>Enter each dependent’s age separately.</p>
    </>
  ),
  personalData: {
    dependents: {
      'ui:field': DependentAges,
    },
  },
};

export const schemaEnhanced = {
  type: 'object',
  properties: {
    personalData: {
      type: 'object',
      properties: {
        dependents: {
          type: 'array',
          items: {
            type: 'object',
            required: ['dependentAge'],
            properties: {
              dependentAge: {
                type: 'string',
                pattern: '^\\d+$',
              },
            },
          },
        },
      },
    },
  },
};
