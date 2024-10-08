import {
  addressUI,
  addressSchema,
  titleUI,
} from 'platform/forms-system/src/js/web-component-patterns';
import createHouseholdMemberTitle from '../../../components/DisclosureTitle';
import { showSpouseAddress } from './helpers';

/** @type {PageSchema} */
export default {
  title: 'Spouse address',
  path: 'household/marital-status/separated/spouse-address',
  depends: showSpouseAddress,
  uiSchema: {
    ...titleUI(createHouseholdMemberTitle('spouseFullName', 'address')),
    spouseAddress: addressUI({
      omit: ['isMilitary', 'street3'],
    }),
  },
  schema: {
    type: 'object',
    required: ['spouseAddress'],
    properties: {
      spouseAddress: addressSchema({ omit: ['isMilitary', 'street3'] }),
    },
  },
};
