// import fullSchema from 'vets-json-schema/dist/10-10CG-schema.json';
import {
  titleUI,
  selectUI,
} from 'platform/forms-system/src/js/web-component-patterns';
import { states } from 'platform/forms/address';
import {
  MED_CENTER_LABELS,
  MED_CENTERS_BY_STATE,
  STATE_LABELS,
} from '../../../utils/constants';
import content from '../../../locales/en/content.json';
import fullSchema from '../../10-10CG-schema.json';

const { veteran } = fullSchema.properties;
const { plannedClinic } = veteran.properties;

const vaMedicalCenterJson = {
  uiSchema: {
    ...titleUI(
      content['vet-info-title--facility'],
      content['vet-med-center-description'],
    ),
    'view:plannedClinicState': selectUI({
      title: content['form-address-state-label'],
      hint: content['vet-med-center-state-hint'],
      labels: STATE_LABELS,
    }),
    veteranPlannedClinic: selectUI({
      title: content['vet-info-title--facility'],
      labels: MED_CENTER_LABELS,
      updateSchema: formData => {
        const state = formData['view:plannedClinicState'];
        return state
          ? { enum: MED_CENTERS_BY_STATE[state] || [] }
          : { enum: [] };
      },
    }),
  },
  schema: {
    type: 'object',
    required: ['view:plannedClinicState', 'veteranPlannedClinic'],
    properties: {
      'view:plannedClinicState': {
        type: 'string',
        enum: states.USA.map(state => state.value).filter(
          state => !!MED_CENTERS_BY_STATE[state],
        ),
      },
      veteranPlannedClinic: { ...plannedClinic, enum: [] },
    },
  },
};

export default vaMedicalCenterJson;
