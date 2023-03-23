import React from 'react';
import { intersection, pick } from 'lodash';

import PrefillMessage from 'platform/forms/save-in-progress/PrefillMessage';
import phoneUI from 'platform/forms-system/src/js/definitions/phone';
import emailUI from 'platform/forms-system/src/js/definitions/email';
import fullSchema from 'vets-json-schema/dist/26-4555-schema.json';
import { veteranFields } from '../definitions/constants';

const { required, properties } = fullSchema.properties[
  veteranFields.parentObject
];
const pageFields = [
  veteranFields.homePhone,
  veteranFields.mobilePhone,
  veteranFields.email,
];

export default {
  uiSchema: {
    'ui:description': PrefillMessage,
    [veteranFields.parentObject]: {
      'ui:title': (
        <h3 className="vads-u-color--gray-dark vads-u-margin-y--0">
          Phone number and email address
        </h3>
      ),
      'ui:description': (
        <p className="vads-u-margin-top--1 vads-u-margin-bottom--4">
          Enter your phone and email information so we can contact you if we
          have questions about your application.
        </p>
      ),
      [veteranFields.homePhone]: phoneUI('Home phone number'),
      [veteranFields.mobilePhone]: phoneUI('Mobile phone number'),
      [veteranFields.email]: emailUI(),
    },
  },
  schema: {
    type: 'object',
    properties: {
      [veteranFields.parentObject]: {
        type: 'object',
        required: intersection(required, pageFields),
        properties: pick(properties, pageFields),
      },
    },
  },
};
