import {
  radioSchema,
  radioUI,
} from 'platform/forms-system/src/js/web-component-patterns';

import RoleDescription from '../../components/01-personal-information-chapter/RoleDescription';
import { roleOptions } from '../../constants/options';

/** @type {PageSchema} */
export default {
  title: 'Role',
  path: 'role',
  uiSchema: {
    role: radioUI({
      title: 'Which role are you applying for?',
      description: RoleDescription,
      labels: roleOptions,
    }),
  },
  schema: {
    type: 'object',
    properties: {
      role: radioSchema(Object.keys(roleOptions)),
    },
    required: ['role'],
  },
};
