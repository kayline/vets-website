import {
  testNumberOfErrorsOnSubmitForWebComponents,
  testNumberOfWebComponentFields,
} from '../helpers.spec';

import formConfig from '../../../../config/form';

const {
  chapters: {
    militaryService: {
      pages: { combatOperationService },
    },
  },
} = formConfig;
const { title: pageTitle, schema, uiSchema } = combatOperationService;

// run test for correct number of fields on the page
const expectedNumberOfWebComponentFields = 1;
testNumberOfWebComponentFields(
  formConfig,
  schema,
  uiSchema,
  expectedNumberOfWebComponentFields,
  pageTitle,
);

// run test for correct number of error messages on submit
const expectedNumberOfWebComponentErrors = 0;
testNumberOfErrorsOnSubmitForWebComponents(
  formConfig,
  schema,
  uiSchema,
  expectedNumberOfWebComponentErrors,
  pageTitle,
);
