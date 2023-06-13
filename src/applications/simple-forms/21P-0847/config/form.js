import footerContent from 'platform/forms/components/FormFooter';
import environment from 'platform/utilities/environment';

import manifest from '../manifest.json';
import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';
import getHelp from '../../shared/components/GetFormHelp';
import transformForSubmit from '../../shared/config/submit-transformer';

import preparerPersonalInformation from '../pages/preparerPersonalInformation';
import preparerIdentificationInformation from '../pages/preparerIdentificationInformation';
import preparerAddress from '../pages/preparerAddress';
import preparerContactInformation from '../pages/preparerContactInformation';
import veteranPersonalInformation from '../pages/veteranPersonalInformation';
import veteranIdentificationInformation from '../pages/veteranIdentificationInformation';
import relationshipToDeceasedClaimant from '../pages/relationshipToDeceasedClaimant';
import otherRelationshipToDeceasedClaimant from '../pages/otherRelationshipToDeceasedClaimant';
import additionalInformation from '../pages/additionalInformation';

// mock-data import for local development
import testData from '../tests/e2e/fixtures/data/test-data.json';

const mockData = testData;

const formConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  submitUrl: `${environment.API_URL}/forms_api/v1/simple_forms`,
  transformForSubmit,
  trackingPrefix: '21P-0847-substitute-claimant-',
  dev: {
    showNavLinks: true,
  },
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  formId: '21P-0847',
  saveInProgress: {
    messages: {
      inProgress:
        'Your substitute claimant application (21P-0847) is in progress.',
      expired:
        'Your saved substitute claimant application (21P-0847) has expired. If you want to apply for substitute claimant, please start a new application.',
      saved: 'Your substitute claimant application has been saved.',
    },
  },
  version: 0,
  prefillEnabled: true,
  savedFormMessages: {
    notFound: 'Please start over to apply for substitute claimant.',
    noAuth:
      'Please sign in again to continue your application for substitute claimant.',
  },
  title: 'Request to be a substitute claimant',
  subTitle:
    'Request for substitution of claimant upon death of claimant (VA Form 21P-0847)',
  defaultDefinitions: {},
  chapters: {
    preparerPersonalInformationChapter: {
      title: 'Your personal information',
      pages: {
        preparerPersonalInformation: {
          path: 'preparer-personal-information',
          title: 'Your personal information',
          // we want req'd fields prefilled for LOCAL testing/previewing
          // one single initialData prop here will suffice for entire form
          initialData:
            !!mockData && environment.isLocalhost() ? mockData : undefined,
          uiSchema: preparerPersonalInformation.uiSchema,
          schema: preparerPersonalInformation.schema,
        },
      },
    },
    relationshipToDeceasedClaimantChapter: {
      title: 'Your relationship',
      pages: {
        relationshipToDeceasedClaimant: {
          path: 'relationship-to-deceased-claimant',
          title: 'Your relationship',
          uiSchema: relationshipToDeceasedClaimant.uiSchema,
          schema: relationshipToDeceasedClaimant.schema,
        },
        otherRelationshipToDeceasedClaimant: {
          path: 'other-relationship-to-deceased-claimant',
          title: 'Your relationship',
          depends: formData =>
            formData.relationshipToDeceasedClaimant === 'other',
          uiSchema: otherRelationshipToDeceasedClaimant.uiSchema,
          schema: otherRelationshipToDeceasedClaimant.schema,
        },
      },
    },
    preparerIdentificationInformationChapter: {
      title: 'Your identification information',
      pages: {
        preparerIdentificationInformation: {
          path: 'preparer-identification-information',
          title: 'Your identification information',
          uiSchema: preparerIdentificationInformation.uiSchema,
          schema: preparerIdentificationInformation.schema,
        },
      },
    },
    preparerAddressChapter: {
      title: 'Your mailing address',
      pages: {
        preparerAddress: {
          path: 'preparer-address',
          title: 'Your mailing address',
          uiSchema: preparerAddress.uiSchema,
          schema: preparerAddress.schema,
        },
      },
    },
    preparerContactInformationChapter: {
      title: 'Your contact information',
      pages: {
        preparerContactInformation: {
          path: 'preparer-contact-information',
          title: 'Your contact information',
          uiSchema: preparerContactInformation.uiSchema,
          schema: preparerContactInformation.schema,
        },
      },
    },
    veteranPersonalInformationChapter: {
      title: 'Veteran’s personal information',
      pages: {
        veteranPersonalInformation: {
          path: 'veteran-personal-information',
          title: 'Veteran’s personal information',
          uiSchema: veteranPersonalInformation.uiSchema,
          schema: veteranPersonalInformation.schema,
        },
      },
    },
    veteranIdentificationInformationChapter: {
      title: 'Veteran’s identification information',
      pages: {
        veteranIdentificationInformation: {
          path: 'veteran-identification-information',
          title: 'Veteran’s identification information',
          uiSchema: veteranIdentificationInformation.uiSchema,
          schema: veteranIdentificationInformation.schema,
        },
      },
    },
    additionalInformationChapter: {
      title: 'Additional information',
      pages: {
        additionalInformation: {
          path: 'additional-information',
          title: 'Additional information',
          uiSchema: additionalInformation.uiSchema,
          schema: additionalInformation.schema,
        },
      },
    },
  },
  footerContent,
  getHelp,
};

export default formConfig;
