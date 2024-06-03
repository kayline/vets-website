import { cloneDeep } from 'lodash';

import {
  ssnOrVaFileNumberSchema,
  ssnOrVaFileNumberNoHintUI,
  fullNameUI,
  fullNameSchema,
  titleUI,
  titleSchema,
  dateOfBirthUI,
  dateOfBirthSchema,
  // addressUI,
  // addressSchema,
  phoneUI,
  phoneSchema,
  emailUI,
  emailSchema,
  // checkboxGroupUI,
  // checkboxGroupSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

import manifest from '../manifest.json';
import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';
import GetFormHelp from '../../shared/components/GetFormHelp';

const veteranFullNameUI = cloneDeep(fullNameUI());
veteranFullNameUI.middle['ui:title'] = 'Middle initial';

/** @type {FormConfig} */
const formConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  // submitUrl: '/v0/api',
  footerContent: GetFormHelp,
  submit: () =>
    Promise.resolve({ attributes: { confirmationNumber: '123123123' } }),
  trackingPrefix: 'fmp-cover-sheet-',
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  v3SegmentedProgressBar: true,
  formId: '10-7959F-2',
  saveInProgress: {
    // messages: {
    //   inProgress: 'Your health care benefits application (10-7959F-2) is in progress.',
    //   expired: 'Your saved health care benefits application (10-7959F-2) has expired. If you want to apply for health care benefits, please start a new application.',
    //   saved: 'Your health care benefits application has been saved.',
    // },
  },
  version: 0,
  prefillEnabled: true,
  savedFormMessages: {
    notFound: 'Please start over to apply for health care benefits.',
    noAuth:
      'Please sign in again to continue your application for health care benefits.',
  },
  title: 'File a Foreign Medical Program (FMP) Claim',
  subTitle: 'FMP Claim Cover Sheet (VA Form 10-7959f-2)',
  defaultDefinitions: {},
  chapters: {
    veteranInfoChapter: {
      title: 'Name and date of birth',
      pages: {
        page1: {
          path: 'veteran-info',
          title: 'Personal Information',
          uiSchema: {
            ...titleUI('Name and date of birth'),
            veteranFullName: veteranFullNameUI,
            veteranDateOfBirth: dateOfBirthUI({ required: true }),
          },
          schema: {
            type: 'object',
            required: ['veteranFullName', 'veteranDateOfBirth'],
            properties: {
              titleSchema,
              veteranFullName: fullNameSchema,
              veteranDateOfBirth: dateOfBirthSchema,
            },
          },
        },
      },
    },
    veteranIdentificationChapter: {
      title: 'Identification information',
      pages: {
        page2: {
          path: 'identification-information',
          uiSchema: {
            ...titleUI(
              'Identification information',
              'You must enter either a Social Security Number or a VA file number.',
            ),
            messageAriaDescribedby:
              'You must enter either a Social Security number or VA file number.',
            veteranSocialSecurityNumber: ssnOrVaFileNumberNoHintUI(),
          },
          schema: {
            type: 'object',
            required: ['veteranSocialSecurityNumber'],
            properties: {
              titleSchema,
              veteranSocialSecurityNumber: ssnOrVaFileNumberSchema,
            },
          },
        },
      },
    },
    contactInformation: {
      title: 'Contact Information',
      pages: {
        page5: {
          path: 'contact-info',
          title: "Veteran's contact information",
          uiSchema: {
            ...titleUI(
              'Phone and email address',
              'Please include this information so that we can contact you with questions or updates',
            ),
            messageAriaDescribedby:
              'Please include this information so that we can contact you with questions or updates.',
            veteranPhoneNumber: phoneUI(),
            veteranEmailAddress: emailUI(),
          },
          schema: {
            type: 'object',
            properties: {
              titleSchema,
              veteranPhoneNumber: phoneSchema,
              veteranEmailAddress: emailSchema,
            },
          },
        },
      },
    },
  },
};

export default formConfig;
