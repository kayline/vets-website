import { IL_UPDATE_DEPENDENTS, IL_UPDATE_ZIP } from '../constants';

export const updateDependents = value => {
  return {
    type: IL_UPDATE_DEPENDENTS,
    payload: value,
  };
};

export const updateZipCode = value => {
  return {
    type: IL_UPDATE_ZIP,
    payload: value,
  };
};
