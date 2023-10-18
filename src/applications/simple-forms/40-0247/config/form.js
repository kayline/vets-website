// we're not using JSON schema for this form.
import environment from 'platform/utilities/environment';
import footerContent from 'platform/forms/components/FormFooter';
import getHelp from '../../shared/components/GetFormHelp';

import manifest from '../manifest.json';

import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';
import vetPersInfoPg from '../pages/veteranPersonalInfo';
import vetIdInfoPg from '../pages/veteranIdInfo';
import vetSupportDocsPg from '../pages/veteranSupportDocs';
import requestTypePg from '../pages/requestType';
import appPersInfoPg from '../pages/applicantPersonalInfo';
import appAddrPg from '../pages/applicantAddress';
import appContactInfoPg from '../pages/applicantContactInfo';
import certsPg from '../pages/certificates';
import addlCertsYNPg from '../pages/additionalCertificatesYesNo';
import addlCertsReqPg from '../pages/additionalCertificatesRequest';
import transformForSubmit from './submit-transformer';
import { getInitialData } from '../helpers';

// mock-data import for local development
import testData from '../tests/e2e/fixtures/data/test-data.json';

const mockData = testData.data;

/** @type {FormConfig} */
const formConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  submitUrl: '/v0/api',
  submit: () =>
    Promise.resolve({
      confirmationNumber: '[mock-confirmation-number]',
    }),
  // Coordinate with backend to determine final submitUrl
  // submitUrl: `${environment.API_URL}/simple_forms_api/v1/simple_forms`,
  trackingPrefix: '0247-pmc',
  dev: {
    showNavLinks: !window.Cypress,
  },
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  preSubmitInfo: {
    statementOfTruth: {
      body:
        'I confirm, to the best of my knowledge, that the decedent has never committed a serious crime, such as murder or other offense that could have resulted in imprisonment for life, has never been convicted of a serious crime, and has never been convicted of a sexual offense for which the decedent was sentenced to a minimum of life imprisonment',
      messageAriaDescribedby:
        'I confirm, to the best of my knowledge, that the decedent has never committed a serious crime, such as murder or other offense that could have resulted in imprisonment for life, has never been convicted of a serious crime, and has never been convicted of a sexual offense for which the decedent was sentenced to a minimum of life imprisonment',
      fullNamePath: 'applicantFullName',
      checkboxLabel:
        'I confirm that the information above is correct and true to the best of my knowledge and belief.',
    },
  },
  transformForSubmit,
  formId: '40-0247',
  saveInProgress: {
    // messages: {
    //   inProgress: 'Your certificate request (40-0247) is in progress.',
    //   expired: 'Your saved certificate request (40-0247) has expired. If you want a certificate, please start a new request.',
    //   saved: 'Your certificate request has been saved.',
    // },
  },
  version: 0,
  prefillEnabled: true,
  savedFormMessages: {
    notFound: 'Please start over to request a certificate.',
    noAuth: 'Please sign in again to continue your request for certificate.',
  },
  title: 'Request a Presidential Memorial Certificate',
  subTitle: 'Presidential Memorial Certificate request form (VA Form 40-0247)',
  v3SegmentedProgressBar: true,
  defaultDefinitions: {
    privacyAgreementAccepted: {
      type: 'boolean',
      enum: [true],
    },
  },
  useCustomScrollAndFocus: true,
  chapters: {
    veteranPersonalInfoChapter: {
      title: 'Veteran’s personal information',
      pages: {
        veteranPersonalInfoPage: {
          path: 'veteran-personal-information',
          title: 'Veteran’s personal information',
          // we want req'd fields prefilled for LOCAL testing/previewing
          // one single initialData prop here will suffice for entire form
          initialData: getInitialData({ mockData, environment }),
          uiSchema: vetPersInfoPg.uiSchema,
          schema: vetPersInfoPg.schema,
          pageClass: 'veteran-personal-information',
          // for this 1st page, default scroll-n-focus is not working
          scrollAndFocusTarget:
            'va-segmented-progress-bar[uswds][heading-text][header-level="2"]',
        },
      },
    },
    veteranIdentificationInfoChapter: {
      title: 'Veteran’s identification information',
      pages: {
        veteranIdentificationInfoPage: {
          path: 'veteran-identification-information',
          title: 'Veteran’s identification information',
          uiSchema: vetIdInfoPg.uiSchema,
          schema: vetIdInfoPg.schema,
          pageClass: 'veteran-identification-information',
        },
      },
    },
    veteranSupportingDocumentationChapter: {
      title: 'Veteran’s supporting documentation',
      pages: {
        veteranSupportDocsPage: {
          path: 'veteran-supporting-documentation',
          title: 'Veteran’s supporting documentation',
          uiSchema: vetSupportDocsPg.uiSchema,
          schema: vetSupportDocsPg.schema,
          pageClass: 'veteran-supporting-documentation',
        },
      },
    },
    requestTypeChapter: {
      title: 'Request type',
      pages: {
        requestTypePage: {
          path: 'request-type',
          title: 'Request type',
          uiSchema: requestTypePg.uiSchema,
          schema: requestTypePg.schema,
          pageClass: 'request-type',
        },
      },
    },
    applicantPersonalInfoChapter: {
      title: 'Your personal information',
      pages: {
        applicantPersonalInfoPage: {
          path: 'applicant-personal-information',
          title: 'Your personal information',
          uiSchema: appPersInfoPg.uiSchema,
          schema: appPersInfoPg.schema,
          pageClass: 'applicant-personal-information',
        },
      },
    },
    applicantAddressChapter: {
      title: 'Your address',
      pages: {
        applicantAddressPage: {
          path: 'applicant-address',
          title: 'Your address',
          uiSchema: appAddrPg.uiSchema,
          schema: appAddrPg.schema,
          pageClass: 'applicant-address',
        },
      },
    },
    applicantContactInfoChapter: {
      title: 'Your contact information',
      pages: {
        applicantContactInfoPage: {
          path: 'applicant-contact-information',
          title: 'Your contact information',
          uiSchema: appContactInfoPg.uiSchema,
          schema: appContactInfoPg.schema,
          pageClass: 'applicant-contact-information',
        },
      },
    },
    certificatesChapter: {
      title: 'Certificates',
      pages: {
        certificatesPage: {
          path: 'certificates',
          title: 'Certificates',
          uiSchema: certsPg.uiSchema,
          schema: certsPg.schema,
          pageClass: 'certificates',
        },
      },
    },
    additionalCertificatesChapter: {
      title: 'Additional certificates request',
      pages: {
        additionalCertificatesYesNoPage: {
          path: 'additional-certificates-yes-no',
          title: 'Additional certificates: Yes or No',
          uiSchema: addlCertsYNPg.uiSchema,
          schema: addlCertsYNPg.schema,
          pageClass: 'additional-certificates-yes-no',
        },
        additionalCertificatesRequestPage: {
          path: 'additional-certificates-request',
          title: 'Additional certificates: Address and quantity',
          depends: formData => formData.additionalCertificates === true,
          uiSchema: addlCertsReqPg.uiSchema,
          schema: addlCertsReqPg.schema,
          pageClass: 'additional-certificates-request',
        },
      },
    },
  },
  footerContent,
  getHelp,
  customText: {
    appType: 'request',
  },
};

export default formConfig;
