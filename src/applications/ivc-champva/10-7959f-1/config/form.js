import {
  ssnOrVaFileNumberSchema,
  ssnOrVaFileNumberUI,
  inlineTitleUI,
  titleSchema,
  fullNameUI,
  fullNameSchema,
  addressUI,
  addressSchema,
  titleUI,
} from 'platform/forms-system/src/js/web-component-patterns';

import manifest from '../manifest.json';

import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';

/** @type {FormConfig} */
const formConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  // submitUrl: '/v0/api',
  submit: () =>
    Promise.resolve({ attributes: { confirmationNumber: '123123123' } }),
  trackingPrefix: '10-7959f-1-FMP-',
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  v3SegmentedProgressBar: true,
  preSubmitInfo: {
    statementOfTruth: {
      body:
        'I confirm that the identifying information in this form is accurate and has been represented correctly.',
      messageAriaDescribedby:
        'I confirm that the identifying information in this form is accurate and has been represented correctly.',
    },
  },
  formId: '10-7959F-1',
  saveInProgress: {
    messages: {
      inProgress: 'Your CHAMPVA application (10-7959F-1) is in progress.',
      expired:
        'Your saved CHAMPVA benefits application (10-7959F-1) has expired. If you want to apply for Foriegn Medical Program benefits, please start a new application.',
      saved: 'Your CHAMPVA benefits application has been saved.',
    },
  },
  version: 0,
  prefillEnabled: true,
  savedFormMessages: {
    notFound: 'Please start over to apply for CHAMPVA benefits.',
    noAuth:
      'Please sign in again to continue your application for CHAMPVA benefits.',
  },
  title: 'Foreign Medical Program (FMP) Registration Form',
  defaultDefinitions: {},
  chapters: {
    applicantInformationChapter: {
      title: 'Applicant Information',
      pages: {
        page1: {
          path: 'veteran-information',
          title: 'Veteran Information',
          uiSchema: {
            fullNameTitle: inlineTitleUI('Your name'),
            fullName: fullNameUI(),
          },
          schema: {
            type: 'object',
            required: ['fullName'],
            properties: {
              fullNameTitle: titleSchema,
              fullName: fullNameSchema,
            },
          },
        },
        page2: {
          path: 'veteran-information/ssn',
          title: 'Veteran SSN and VA file number',
          uiSchema: {
            ...titleUI(
              `Veteran's identification information`,
              `You must enter either a Social Security number of VA File number`,
            ),
            ssn: ssnOrVaFileNumberUI(),
          },
          schema: {
            type: 'object',
            required: ['ssn'],
            properties: {
              titleSchema,
              ssn: ssnOrVaFileNumberSchema,
            },
          },
        },
        page3: {
          path: 'physical-address',
          title: 'Physical Address',
          uiSchema: {
            ...titleUI("Veteran's home address (residence)"),
            physicalAddress: addressUI(),
          },
          schema: {
            type: 'object',
            required: ['physicalAddress'],
            properties: {
              titleSchema,
              physicalAddress: addressSchema(),
            },
          },
        },
      },
    },
  },
};

export default formConfig;
