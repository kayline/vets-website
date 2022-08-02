/**
 * This uiSchema is modeled after how addresses are handled in the Profile application, and makes the same pattern
 * available for use inside forms generated by the platform's form system.
 */

import React from 'react';
import constants from 'vets-json-schema/dist/constants.json';

import get from 'platform/utilities/data/get';
import set from 'platform/utilities/data/set';

/**
 * PATTERNS
 * STREET_PATTERN - rejects white space only
 * US_POSTAL_CODE_PATTERN - Matches 5 digit zipcodes
 */
const STREET_PATTERN = '^.*\\S.*';
const US_POSTAL_CODE_PATTERN = '^\\d{5}$';

export const MILITARY_CITY_VALUES = constants.militaryCities.map(
  city => city.value,
);
export const MILITARY_CITY_NAMES = constants.militaryCities.map(
  city => city.label,
);

export const MILITARY_STATE_VALUES = constants.militaryStates.map(
  state => state.value,
);
export const MILITARY_STATE_NAMES = constants.militaryStates.map(
  state => state.label,
);

export const COUNTRY_VALUES = constants.countries.map(country => country.value);
export const COUNTRY_NAMES = constants.countries.map(country => country.label);

// filtered States that include US territories
export const filteredStates = constants.states.USA.filter(
  state => !MILITARY_STATE_VALUES.includes(state.value),
);

export const STATE_VALUES = filteredStates.map(state => state.value);
export const STATE_NAMES = filteredStates.map(state => state.label);

export const schemaCrossXRef = {
  isMilitary: 'isMilitary',
  'view:militaryBaseDescription': 'view:militaryBaseDescription',
  country: 'country',
  street: 'street',
  street2: 'street2',
  street3: 'street3',
  city: 'city',
  state: 'state',
  postalCode: 'postalCode',
};

/**
  Available at https://github.com/department-of-veterans-affairs/vets-json-schema/blob/8337b2878b524867ef2b6d8600b134c682c7ac8a/src/common/definitions.js#L161
  addressSchema = {
    type: 'object',
    properties: {
      isMilitary: {
        type: 'boolean',
      },
      'view:militaryBaseDescription': {
        type: 'object',
        properties: {},
      },
      country: {
        type: 'string',
        enum: COUNTRY_VALUES,
        enumNames: COUNTRY_NAMES,
      },
      street: {
        type: 'string',
        minLength: 1,
        maxLength: 100,
        pattern: STREET_PATTERN,
      },
      street2: {
        type: 'string',
        minLength: 1,
        maxLength: 100,
        pattern: STREET_PATTERN,
      },
      street3: {
        type: 'string',
        minLength: 1,
        maxLength: 100,
        pattern: STREET_PATTERN,
      },
      city: {
        type: 'string',
      },
      state: {
        type: 'string',
      },
      postalCode: {
        type: 'string',
      },
    },
  };
  */

/**
 * CONSTANTS:
 * 2. USA - references USA value and label
 * 3. MilitaryBaseInfo - React component. Wrapped in AdditionalInfo component and used as description
 */

const USA = {
  value: 'USA',
  label: 'United States',
};

const MilitaryBaseInfo = () => (
  <p className="vads-u-margin-top--3">
    U.S. military bases are considered a domestic address and a part of the
    United States.
  </p>
);

/**
 * insertArrayIndex - Used when addresses are nested in an array and need to be accessible.
 * There's no good way to handle pathing to a schema when it lives in an array with multiple entries.
 * Example: childrenToAdd[INDEX].childAddressInfo.address. Hardcoding an index value in place of INDEX
 * would just result in the same array entry being mutated over and over, instead of the correct entry.
 */
const insertArrayIndex = (key, index) => key.replace('[INDEX]', `[${index}]`);

const getOldFormDataPath = (path, index) => {
  const indexToSlice = index !== null ? path.indexOf(index) + 1 : 0;
  return path.slice(indexToSlice);
};

// Temporary storage for city & state if military base checkbox is toggled more
// than once. Not ideal, but works since this code isn't inside a React widget
const savedAddress = {
  city: '',
  stateCode: '',
};

/**
 * Update form data to remove selected military city & state and restore any
 * previously set city & state when the "I live on a U.S. military base"
 * checkbox is unchecked. See va.gov-team/issues/42216 for details
 * @param {object} oldFormData - Form data prior to interaction change
 * @param {object} formData - Form data after interaction change
 * @param {array} path - path to address in form data
 * @param {number} index - index, if form data array of addresses; also included
 *  in the path, but added here to make it easier to distinguish between
 *  addresses not in an array with addresses inside an array
 * @returns {object} - updated Form data with manipulated mailing address if the
 * military base checkbox state changes
 */
export const updateFormDataAddress = (
  oldFormData,
  formData,
  path,
  index = null, // this is included in the path, but added as
  newSchemaKeys = {},
) => {
  let updatedData = formData;
  const schemaKeys = { ...schemaCrossXRef, ...newSchemaKeys };

  /*
   * formData and oldFormData are not guaranteed to have the same shape; formData
   * will always return the entire data object. See below for details on oldFormData
   *
   * In the src/platform/forms-system/src/js/containers/FormPage.jsx, if the
   * address is inside an array (has a `showPagePerItem` index), oldData is set
   * to the form data from the array index (see the this.formData() function)
   * but that may not include the address object, so we're passing in a path as
   * an array and using `getOldFormDataPath` to find the appropriate path
   */
  const oldAddress = get(getOldFormDataPath(path, index), oldFormData, {});

  const address = get(path, formData, {});
  const onMilitaryBase = address?.[schemaKeys.isMilitary];
  let city = address[schemaKeys.city];
  let stateCode = address[schemaKeys.state];

  if (oldAddress?.[schemaKeys.isMilitary] !== onMilitaryBase) {
    if (onMilitaryBase) {
      savedAddress.city = oldAddress[schemaKeys.city] || '';
      savedAddress.stateCode = oldAddress[schemaKeys.state] || '';
      city = '';
      stateCode = '';
    } else {
      city = MILITARY_CITY_VALUES.includes(oldAddress[schemaKeys.city])
        ? savedAddress.city
        : city || savedAddress.city;
      stateCode = MILITARY_STATE_VALUES.includes(oldAddress[schemaKeys.state])
        ? savedAddress.stateCode
        : stateCode || savedAddress.stateCode;
    }
    // make sure we aren't splitting up a string path
    const pathArray = Array.isArray(path) ? path : [path];
    updatedData = set([...pathArray, schemaKeys.city], city, updatedData);
    updatedData = set([...pathArray, schemaKeys.state], stateCode, updatedData);
  }
  return updatedData;
};

/**
 * @param {string} path - path to the address in formData, may contain [INDEX] as part of it, which needs to be handled using insertArrayIndex
 * @param {string} checkBoxTitle - Visual label for the military base checkbox. Ex: "I live on a United States military base outside of the U.S."
 * @param {function} uiRequiredCallback - slots into ui:required for the necessary fields
 *
 * Conventions:
 * 1. formDataPath - path to entire address property in formData, after accounting for potential array nesting. Derived from the path parameter
 * 2. get(formDataPath, formData) - returns the address property, often destructured with const {country, isMilitary} = get(formDataPath, formData)
 *
 * Examples:
 * 1. Path to Address nested in array - childrenToAdd[INDEX].childAddressInfo.address
 */

export default function addressUiSchema(
  path = 'address',
  checkBoxTitle = 'I live on a United States military base outside of the U.S.',
  uiRequiredCallback = () => false,
  newSchemaKeys = {},
) {
  /**
   * getPath
   * @param {string} pathToData takes the path argument passed to addressUiSchema.
   * @param {number} index the array index included in updateSchema if the schema is inside an array
   * if index is undefined, just return the original path, otherwise, use insertArrayIndex to handle correct index injection
   */
  const getPath = (pathToData, index) =>
    typeof index === 'number'
      ? insertArrayIndex(pathToData, index)
      : pathToData;

  const schemaKeys = { ...schemaCrossXRef, ...newSchemaKeys };

  return {
    [schemaKeys.isMilitary]: {
      'ui:title': checkBoxTitle,
      'ui:options': {
        hideEmptyValueInReview: true,
      },
    },
    [schemaKeys['view:militaryBaseDescription']]: {
      'ui:description': MilitaryBaseInfo,
    },
    [schemaKeys.country]: {
      'ui:required': uiRequiredCallback,
      'ui:title': 'Country',
      'ui:autocomplete': 'country',
      'ui:options': {
        /**
         * This is needed because the country dropdown needs to be set to USA and disabled if a
         * user selects that they live on a military base outside the US.
         */
        updateSchema: (formData, _schema, uiSchema, index) => {
          const formDataPath = getPath(path, index);
          const countryUI = uiSchema;
          const addressFormData = get(formDataPath, formData) ?? {};
          const isMilitary = addressFormData[schemaKeys.isMilitary];
          // if isMilitary === true, auto select United States and disable the field
          if (isMilitary) {
            countryUI['ui:disabled'] = true;
            addressFormData[schemaKeys.country] = USA.value;
            return {
              enum: [USA.value],
              enumNames: [USA.label],
              default: USA.value,
            };
          }
          // default to regular country select dropdown
          countryUI['ui:disabled'] = false;
          return {
            type: 'string',
            enum: COUNTRY_VALUES,
            enumNames: COUNTRY_NAMES,
          };
        },
      },
    },
    [schemaKeys.street]: {
      'ui:required': uiRequiredCallback,
      'ui:title': 'Street address',
      'ui:autocomplete': 'address-line1',
      'ui:errorMessages': {
        required: 'Street address is required',
        pattern: 'Please fill in a valid street address',
      },
    },
    [schemaKeys.street2]: {
      'ui:title': 'Street address line 2',
      'ui:autocomplete': 'address-line2',
      'ui:options': {
        hideEmptyValueInReview: true,
      },
    },
    [schemaKeys.street3]: {
      'ui:title': 'Street address line 3',
      'ui:autocomplete': 'address-line3',
      'ui:options': {
        hideEmptyValueInReview: true,
      },
    },
    [schemaKeys.city]: {
      'ui:required': uiRequiredCallback,
      'ui:autocomplete': 'address-level2',
      'ui:errorMessages': {
        required: 'City is required',
      },
      'ui:options': {
        /**
         * replaceSchema:
         * Necessary because military addresses require strict options.
         * If the isMilitary checkbox is selected, replace the city schema with a
         * select dropdown containing the values for military cities. Otherwise,
         * just return the regular string schema.
         */
        replaceSchema: (formData, _schema, uiSchema, index) => {
          const formDataPath = getPath(path, index);
          const isMilitary = (get(formDataPath, formData) ?? {})[
            schemaKeys.isMilitary
          ];
          if (isMilitary) {
            return {
              type: 'string',
              title: 'APO/FPO/DPO',
              enum: MILITARY_CITY_VALUES,
              enumNames: MILITARY_CITY_NAMES,
            };
          }
          return {
            type: 'string',
            title: 'City',
            minLength: 1,
            maxLength: 100,
            pattern: STREET_PATTERN,
          };
        },
      },
    },
    [schemaKeys.state]: {
      'ui:autocomplete': 'address-level1',
      'ui:required': (formData, index) => {
        // Only required if the country is the United States;
        const formDataPath = getPath(path, index);
        const { country } = get(formDataPath, formData) ?? {};
        return country && country === USA.value;
      },
      'ui:errorMessages': {
        required: 'Please enter a valid State, Province, or Region',
      },
      'ui:options': {
        hideEmptyValueInReview: true,
        /**
         * replaceSchema:
         * Necessary because military addresses require strict options.
         * If the isMilitary checkbox is selected, replace the state schema with a
         * select dropdown containing the values for military states.
         *
         * If the country value is USA and the military base checkbox is de-selected,
         * use the States dropdown.
         *
         * If the country value is anything other than USA, change the title and default to string.
         */
        replaceSchema: (formData, _schema, uiSchema, index) => {
          const formDataPath = getPath(path, index);
          const data = get(formDataPath, formData) ?? {};
          const country = data[schemaKeys.country];
          const isMilitary = data[schemaKeys.isMilitary];
          if (isMilitary) {
            return {
              type: 'string',
              title: 'State',
              enum: MILITARY_STATE_VALUES,
              enumNames: MILITARY_STATE_NAMES,
            };
          }
          if (!isMilitary && country === 'USA') {
            return {
              type: 'string',
              title: 'State',
              enum: STATE_VALUES,
              enumNames: STATE_NAMES,
            };
          }
          return {
            type: 'string',
            title: 'State/Province/Region',
          };
        },
      },
    },
    [schemaKeys.postalCode]: {
      'ui:required': uiRequiredCallback,
      'ui:title': 'Postal code',
      'ui:autocomplete': 'postal-code',
      'ui:errorMessages': {
        required: 'Postal code is required',
        pattern: 'Please enter a valid 5 digit US zip code',
      },
      'ui:options': {
        widgetClassNames: 'usa-input-medium',
        replaceSchema: (formData, _schema, uiSchema, index) => {
          const formDataPath = getPath(path, index);
          const data = get(formDataPath, formData) ?? {};
          const country = data[schemaKeys.country];
          const isMilitary = data[schemaKeys.isMilitary];
          if (isMilitary || country === 'USA') {
            return {
              type: 'string',
              pattern: US_POSTAL_CODE_PATTERN,
            };
          }
          return {
            type: 'string',
          };
        },
      },
    },
  };
}
