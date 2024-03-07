import React from 'react';
import {
  titleUI,
  yesNoSchema,
  yesNoUI,
} from 'platform/forms-system/src/js/web-component-patterns';

import {
  IncomeAssetStatementFormAlert,
  LandMarketableAlert,
} from '../../../components/FormAlerts';

const LandMarketableDescription = () => (
  <div>
    <p>We want to know if the additional land is marketable.</p>
    <LandMarketableAlert />
  </div>
);

/** @type {PageSchema} */
export default {
  uiSchema: {
    ...titleUI('Income and assets'),
    'ui:description': LandMarketableDescription,
    landMarketable: yesNoUI({
      title: 'Is the additional land marketable?',
    }),
    'view:warningAlert': {
      'ui:description': IncomeAssetStatementFormAlert,
      'ui:options': {
        hideIf: formData => formData.landMarketable !== true,
      },
    },
  },
  schema: {
    type: 'object',
    properties: {
      landMarketable: yesNoSchema,
      'view:warningAlert': {
        type: 'object',
        properties: {},
      },
    },
  },
};
