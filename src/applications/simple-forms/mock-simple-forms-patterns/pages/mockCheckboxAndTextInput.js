import React from 'react';
import {
  ssnUI as newSsnUI,
  ssnSchema,
} from 'platform/forms-system/src/js/web-component-patterns';
import { ssnUI } from 'applications/caregivers/definitions/UIDefinitions/sharedUI';
import VaTextInputField from 'platform/forms-system/src/js/web-component-fields/VaTextInputField';
import VaCheckboxField from 'platform/forms-system/src/js/web-component-fields/VaCheckboxField';

/** @type {PageSchema} */
export default {
  uiSchema: {
    rjsf: {
      'ui:title': (
        <h3 className="vads-u-color--gray-dark vads-u-margin-y--0">
          rjsf / widget
        </h3>
      ),
    },
    rjsfSimpleTextInput: {
      'ui:title': 'text input',
    },
    rjsfRequiredCheckbox: {
      'ui:title': 'required checkbox',
      'ui:widget': 'checkbox',
      'ui:options': {
        hideLabelText: true,
      },
      'ui:errorMessages': {
        enum: 'Please select a checkbox',
        required: 'Checkbox required error',
      },
    },
    rjsfSsn: {
      ...ssnUI('Social security number'),
      'ui:title': 'Social security number',
      'ui:errorMessages': {
        required: 'Please enter a Social Security number',
      },
    },
    rjsfCheckboxWithBackground: {
      'ui:title': '',
      'ui:description': (
        <div className="vads-u-background-color--gray-light-alt">
          <input type="checkbox" id="checkbox1" />
          <label htmlFor="checkbox1">checkbox with background</label>
        </div>
      ),
    },
    wc: {
      'ui:title': (
        <h3 className="vads-u-color--gray-dark vads-u-margin-y--0">
          web component
        </h3>
      ),
    },
    wcSimpleText: {
      'ui:title': 'text input',
      'ui:webComponentField': VaTextInputField,
      'ui:options': {
        uswds: false,
      },
    },
    wcRequiredCheckbox: {
      'ui:title': 'required checkbox',
      'ui:webComponentField': VaCheckboxField,
      'ui:errorMessages': {
        enum: 'Please select a checkbox',
        required: 'Checkbox required error',
      },
      'ui:options': {
        uswds: false,
      },
    },
    wcSsn: {
      ...newSsnUI('Social Security number'),
      'ui:options': {
        uswds: false,
      },
    },
    wcCheckboxWithBackground: {
      'ui:title': '',
      'ui:description': (
        <div className="vads-u-background-color--gray-light-alt">
          <va-checkbox label="checkbox with background" />
        </div>
      ),
    },
    wcV3: {
      'ui:title': (
        <h3 className="vads-u-color--gray-dark vads-u-margin-y--0">
          v3 web component
        </h3>
      ),
    },
    wcV3SimpleText: {
      'ui:title': 'text input',
      'ui:webComponentField': VaTextInputField,
    },
    wcV3RequiredCheckbox: {
      'ui:title': 'required checkbox',
      'ui:webComponentField': VaCheckboxField,
      'ui:errorMessages': {
        enum: 'Please select a checkbox',
        required: 'Checkbox required error',
      },
    },
    wcV3Ssn: newSsnUI('Social Security number'),
    wcV3CheckboxWithBackground: {
      'ui:title': '',
      'ui:description': (
        <div className="vads-u-background-color--gray-light-alt">
          <va-checkbox label="checkbox with background" uswds />
        </div>
      ),
    },
  },
  schema: {
    type: 'object',
    properties: {
      rjsf: {
        type: 'object',
        properties: {},
      },
      rjsfSimpleTextInput: {
        type: 'string',
      },
      rjsfRequiredCheckbox: {
        type: 'boolean',
        enum: [true],
      },
      rjsfSsn: {
        type: 'string',
      },
      rjsfCheckboxWithBackground: {
        type: 'object',
        properties: {},
      },
      wc: {
        type: 'object',
        properties: {},
      },
      wcSimpleText: {
        type: 'string',
      },
      wcRequiredCheckbox: {
        type: 'boolean',
        enum: [true],
      },
      wcSsn: ssnSchema,
      wcCheckboxWithBackground: {
        type: 'object',
        properties: {},
      },
      wcV3: {
        type: 'object',
        properties: {},
      },
      wcV3SimpleText: {
        type: 'string',
      },
      wcV3RequiredCheckbox: {
        type: 'boolean',
        enum: [true],
      },
      wcV3Ssn: ssnSchema,
      wcV3CheckboxWithBackground: {
        type: 'object',
        properties: {},
      },
    },
    required: [
      'rjsfSimpleTextInput',
      'rjsfRequiredCheckbox',
      'rjsfSsn',
      'wcSimpleText',
      'wcRequiredCheckbox',
      'wcSsn',
      'wcV3SimpleText',
      'wcV3RequiredCheckbox',
      'wcV3Ssn',
    ],
  },
};
