import fullSchemaHca from 'vets-json-schema/dist/10-10EZ-schema.json';
import { SpouseAdditionalInformation } from '../../../components/FormDescriptions';

const { cohabitedLastYear, sameAddress } = fullSchemaHca.properties;
const date = new Date();

export default {
  uiSchema: {
    'ui:title': 'Spouse\u2019s additional information',
    'ui:description': SpouseAdditionalInformation,
    cohabitedLastYear: {
      'ui:title': `Did you live with your spouse for all or part of ${date.getFullYear() -
        1}?`,
      'ui:widget': 'yesNo',
    },
    sameAddress: {
      'ui:title': 'Do you have the same address as your spouse?',
      'ui:widget': 'yesNo',
    },
  },
  schema: {
    type: 'object',
    required: ['sameAddress'],
    properties: {
      cohabitedLastYear,
      sameAddress,
    },
  },
};
