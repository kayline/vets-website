import React from 'react';
import { intersection, pick } from 'lodash';

import fullSchema from 'vets-json-schema/dist/26-4555-schema.json';
import fullNameUI from 'platform/forms-system/src/js/definitions/fullName';
import dateUI from 'platform/forms-system/src/js/definitions/date';
import { veteranFields } from '../definitions/constants';

const { required, properties } = fullSchema.properties[
  veteranFields.parentObject
];
const pageFields = [veteranFields.fullName, veteranFields.dateOfBirth];

export default {
  uiSchema: {
    'ui:title': (
      <h3 className="vads-u-color--gray-dark vads-u-margin-y--0">
        Name and date of birth
      </h3>
    ),
    [veteranFields.parentObject]: {
      [veteranFields.fullName]: fullNameUI,
      [veteranFields.dateOfBirth]: dateUI('Date of birth'),
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
