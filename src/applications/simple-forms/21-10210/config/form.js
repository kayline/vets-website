import environment from 'platform/utilities/environment';
import footerContent from 'platform/forms/components/FormFooter';
import { scrollAndFocus } from 'platform/utilities/ui';

import manifest from '../manifest.json';
import getHelp from '../../shared/components/GetFormHelp';
import {
  CLAIM_OWNERSHIPS,
  CLAIMANT_TYPES,
  OTHER_RELATIONSHIP,
} from '../definitions/constants';
import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';
import claimOwnershipPg from '../pages/claimOwnership';
import claimantType from '../pages/claimantType';
import witnessPersInfo from '../pages/witnessPersInfo';
import witnessOtherRelationship from '../pages/witnessOtherRelationship';
import witnessContInfo from '../pages/witnessContInfo';
import claimantPersInfo from '../pages/claimantPersInfo';
import claimantIdInfo from '../pages/claimantIdInfo';
import claimantAddrInfo from '../pages/claimantAddrInfo';
import claimantContInfo from '../pages/claimantContInfo';
import vetPersInfo from '../pages/vetPersInfo';
import vetIdInfo from '../pages/vetIdInfo';
import vetAddrInfo from '../pages/vetAddrInfo';
import vetContInfo from '../pages/vetContInfo';
import statement from '../pages/statement';
import transformForSubmit from './submit-transformer';

// "Flows" in comments below map to "Stories" in the mockups:
// https://www.sketch.com/s/a11421d3-c148-41a2-a34f-3d7821ea676f

// mock-data import for local development
// import the appropriate file [flow?.json] for the flow you're working on, or
// noStmtInfo.json for all flows [manually select claimOwnership, claimantType,
// & witnessRelationshipWithClaimant via UI]
// import testData from '../tests/e2e/fixtures/data/noStmtInfo.json';

// const mockData = testData.data;

const pageScrollAndFocus = () => {
  return () => {
    const { pathname } = document.location;
    let focusSelector = '';

    if (
      pathname.includes('claim-ownership') ||
      pathname.includes('claimant-type')
    ) {
      focusSelector = '#main .schemaform-first-field legend';
    } else {
      // since form-level useCustomScrollAndFocus is true,
      // this fn fires on every chapter change, so we need to
      // provide default focusSelector for all other pages
      focusSelector = '#nav-form-header';
    }

    if (!window.Cypress) {
      scrollAndFocus(document.querySelector(focusSelector));
    }
  };
};

const witnessHasOtherRelationship = formData => {
  const { claimOwnership, witnessRelationshipToClaimant } = formData;

  if (!!claimOwnership && !!witnessRelationshipToClaimant) {
    return (
      claimOwnership === CLAIM_OWNERSHIPS.THIRD_PARTY &&
      witnessRelationshipToClaimant.includes(OTHER_RELATIONSHIP)
    );
  }

  return false;
};

/** @type {FormConfig} */
const formConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  submitUrl: `${environment.API_URL}/simple_forms_api/v1/simple_forms`,
  trackingPrefix: 'lay-witness-10210-',
  dev: {
    // showNavLinks: true,
  },
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  preSubmitInfo: {
    statementOfTruth: {
      body:
        'I confirm that I have completed this statement. The information is true and correct to the best of my knowledge and belief.',
      messageAriaDescribedby:
        'I confirm that I have completed this statement. The information is true and correct to the best of my knowledge and belief.',
      fullNamePath: formData => {
        if (formData.claimOwnership === CLAIM_OWNERSHIPS.THIRD_PARTY) {
          return 'witnessFullName';
        }
        if (
          formData.claimOwnership === CLAIM_OWNERSHIPS.SELF &&
          formData.claimantType === CLAIMANT_TYPES.NON_VETERAN
        ) {
          return 'claimantFullName';
        }
        return 'veteranFullName';
      },
      checkboxLabel:
        'I confirm that the information in this statement is correct and true to the best of my knowledge and belief.',
    },
  },
  formId: '21-10210',
  customText: {
    appType: 'statement',
  },
  saveInProgress: {
    messages: {
      inProgress:
        'Your Lay/Witness Statement application (21-10210) is in progress.',
      expired:
        'Your saved Lay/Witness Statement application (21-10210) has expired. If you want to apply, please start a new application.',
      saved: 'Your Lay/Witness Statement application has been saved.',
    },
  },
  version: 0,
  transformForSubmit,
  // we're setting prefillEnable to true here JUST to enable Intro-page's
  // SaveInProgressInfo content to display.
  // we're actually NOT functionally implementing prefill in this form,
  // so there's no prefillTransformer prop.
  prefillEnabled: true,
  savedFormMessages: {
    notFound: 'Please start over to apply.',
    noAuth: 'Please sign in again to continue your application.',
  },
  title: 'Submit a lay or witness statement to support a VA claim',
  subTitle: 'Lay/Witness Statement (VA Form 21-10210)',
  useCustomScrollAndFocus: true,
  defaultDefinitions: {
    privacyAgreementAccepted: {
      type: 'boolean',
      enum: [true],
    },
  },
  chapters: {
    statementInfoChapter: {
      // for ALL Flows
      // claimOwnership & claimantType decide which Flow to render downstream
      title: 'Who is submitting this statement?',
      hideFormNavProgress: true,
      pages: {
        claimOwnershipPage: {
          path: 'claim-ownership',
          title: '',
          // needs form-level useCustomScrollAndFocus: true to work.
          // chapter's hideFormNavProgress interferes with scrollAndFocusTarget
          // so using a function here to ensure correct focusSelector is used
          // regardless of which page FormNav thinks current page is.
          scrollAndFocusTarget: pageScrollAndFocus(),
          // we want req'd fields prefilled for LOCAL testing/previewing
          // one single initialData prop here will suffice for entire form
          // initialData:
          // !!mockData && environment.isLocalhost() && !window.Cypress
          // ? mockData
          // : undefined,
          uiSchema: claimOwnershipPg.uiSchema,
          schema: claimOwnershipPg.schema,
        },
        claimantTypePage: {
          path: 'claimant-type',
          title: '',
          // see comment for scrollAndFocusTarget in claimOwnershipPage above
          scrollAndFocusTarget: pageScrollAndFocus(),
          uiSchema: claimantType.uiSchema,
          schema: claimantType.schema,
        },
      },
    },
    witnessPersonalInfoChapter: {
      // for Flows 2 & 4: 3rd-party claim
      title: 'Your personal information',
      pages: {
        witnessPersInfoPageA: {
          // for Flow 2: 3rd-party claim, vet claimant
          path: 'witness-personal-information-a',
          title: 'Your personal information',
          depends: {
            claimOwnership: CLAIM_OWNERSHIPS.THIRD_PARTY,
            claimantType: CLAIMANT_TYPES.VETERAN,
          },
          scrollAndFocusTarget: pageScrollAndFocus(),
          uiSchema: witnessPersInfo.uiSchemaA,
          schema: witnessPersInfo.schema,
        },
        witnessPersInfoPageB: {
          // for Flow 2: 3rd-party claim, non-vet claimant
          path: 'witness-personal-information-b',
          title: 'Your personal information',
          depends: {
            claimOwnership: CLAIM_OWNERSHIPS.THIRD_PARTY,
            claimantType: CLAIMANT_TYPES.NON_VETERAN,
          },
          scrollAndFocusTarget: pageScrollAndFocus(),
          uiSchema: witnessPersInfo.uiSchemaB,
          schema: witnessPersInfo.schema,
        },
        witnessOtherRelationshipPage: {
          path: 'witness-other-relationship',
          title: 'Your other relationship',
          depends: witnessHasOtherRelationship,
          scrollAndFocusTarget: pageScrollAndFocus(),
          uiSchema: witnessOtherRelationship.uiSchema,
          schema: witnessOtherRelationship.schema,
        },
      },
    },
    witnessContactInfoChapter: {
      // for Flows 2 & 4: 3rd-party claim
      title: 'Your contact information',
      pages: {
        witnessContactInfoPage: {
          path: 'witness-contact-information',
          title: 'Your contact information',
          depends: {
            claimOwnership: CLAIM_OWNERSHIPS.THIRD_PARTY,
          },
          scrollAndFocusTarget: pageScrollAndFocus(),
          uiSchema: witnessContInfo.uiSchema,
          schema: witnessContInfo.schema,
        },
      },
    },
    statementChapterA: {
      // for Flow 2: 3rd-party claim, vet claimant
      // populates SAME statement field as the other statementChapters
      title: 'Your statement',
      pages: {
        statementPageA: {
          depends: {
            claimOwnership: CLAIM_OWNERSHIPS.THIRD_PARTY,
            claimantType: CLAIMANT_TYPES.VETERAN,
          },
          path: 'statement-a',
          title:
            'Tell us about the claimed issue that you’re addressing on behalf of the Veteran',
          scrollAndFocusTarget: pageScrollAndFocus(),
          uiSchema: statement.uiSchema,
          schema: statement.schema,
        },
      },
    },
    statementChapterB: {
      // for Flow 4: 3rd-party claim, not-vet claimant
      // populates SAME statement field as the other statementChapters
      title: 'Your statement',
      pages: {
        statementPageB: {
          depends: {
            claimOwnership: CLAIM_OWNERSHIPS.THIRD_PARTY,
            claimantType: CLAIMANT_TYPES.NON_VETERAN,
          },
          path: 'statement-b',
          title: 'Please indicate the claimed issue that you are addressing',
          scrollAndFocusTarget: pageScrollAndFocus(),
          uiSchema: statement.uiSchema,
          schema: statement.schema,
        },
      },
    },
    claimantPersonalInfoChapter: {
      // for Flows 3 & 4: non-vet claimant
      title: ({ formData } = {}) =>
        formData.claimOwnership === CLAIM_OWNERSHIPS.SELF
          ? 'Your personal information'
          : 'Claimant’s personal information',
      pages: {
        claimantPersInfoPage: {
          path: 'claimant-personal-information',
          title: 'Claimant personal information',
          depends: {
            claimantType: CLAIMANT_TYPES.NON_VETERAN,
          },
          scrollAndFocusTarget: pageScrollAndFocus(),
          uiSchema: claimantPersInfo.uiSchema,
          schema: claimantPersInfo.schema,
        },
      },
    },
    claimantIdInfoChapter: {
      // for Flows 3 & 4: non-vet claimant
      title: ({ formData } = {}) =>
        formData.claimOwnership === CLAIM_OWNERSHIPS.SELF
          ? 'Your identification information'
          : 'Claimant’s identification information',
      pages: {
        claimantIdInfoPage: {
          path: 'claimant-identification-information',
          title: 'Claimant’s identification information',
          depends: {
            claimantType: CLAIMANT_TYPES.NON_VETERAN,
          },
          scrollAndFocusTarget: pageScrollAndFocus(),
          uiSchema: claimantIdInfo.uiSchema,
          schema: claimantIdInfo.schema,
        },
      },
    },
    claimantAddrInfoChapter: {
      // for Flows 3 & 4: non-vet claimant
      title: ({ formData } = {}) =>
        formData.claimOwnership === CLAIM_OWNERSHIPS.SELF
          ? 'Your mailing address' // Flow 3
          : 'Claimant’s mailing address', // Flow 4
      pages: {
        claimantAddrInfoPage: {
          path: 'claimant-address-information',
          title: 'Claimant’s mailing address',
          depends: {
            claimantType: CLAIMANT_TYPES.NON_VETERAN,
          },
          scrollAndFocusTarget: pageScrollAndFocus(),
          uiSchema: claimantAddrInfo.uiSchema,
          schema: claimantAddrInfo.schema,
        },
      },
    },
    claimantContactInfoChapter: {
      // for Flows 3 & 4: non-vet claimant
      title: ({ formData } = {}) =>
        formData.claimOwnership === CLAIM_OWNERSHIPS.SELF
          ? 'Your contact information'
          : 'Claimant’s contact information',
      pages: {
        claimantContInfoPage: {
          path: 'claimant-contact-information',
          title: 'Claimant’s contact information',
          depends: {
            claimantType: CLAIMANT_TYPES.NON_VETERAN,
          },
          scrollAndFocusTarget: pageScrollAndFocus(),
          uiSchema: claimantContInfo.uiSchema,
          schema: claimantContInfo.schema,
        },
      },
    },
    statementChapterC: {
      // for Flow 3: self claim, non-vet claimant
      // populates SAME statement field as the other statementChapters
      title: 'Your statement',
      pages: {
        statementPageC: {
          depends: {
            claimOwnership: CLAIM_OWNERSHIPS.SELF,
            claimantType: CLAIMANT_TYPES.NON_VETERAN,
          },
          path: 'statement-c',
          title: 'Tell us about the claimed issue that you’re addressing',
          scrollAndFocusTarget: pageScrollAndFocus(),
          uiSchema: statement.uiSchema,
          schema: statement.schema,
        },
      },
    },
    veteranPersonalInfoChapter: {
      // for All flows
      title: ({ formData } = {}) =>
        formData.claimOwnership === CLAIM_OWNERSHIPS.SELF &&
        formData.claimantType === CLAIMANT_TYPES.VETERAN
          ? 'Your personal information'
          : 'Veteran’s personal information',
      pages: {
        vetPersInfoPage: {
          path: 'veteran-personal-information',
          title: 'Veteran personal information',
          scrollAndFocusTarget: pageScrollAndFocus(),
          uiSchema: vetPersInfo.uiSchema,
          schema: vetPersInfo.schema,
        },
      },
    },
    veteranIdentificationInfo: {
      // for all Flows
      title: ({ formData } = {}) =>
        formData.claimOwnership === CLAIM_OWNERSHIPS.SELF &&
        formData.claimantType === CLAIMANT_TYPES.VETERAN
          ? 'Your identification information'
          : 'Veteran’s identification information',
      pages: {
        veteranIdentificationInfo1: {
          path: 'veteran-identification-information',
          title: 'Veteran identification information',
          scrollAndFocusTarget: pageScrollAndFocus(),
          uiSchema: vetIdInfo.uiSchema,
          schema: vetIdInfo.schema,
        },
      },
    },
    veteranMailingAddressInfo: {
      // for all Flows
      title: ({ formData } = {}) =>
        formData.claimOwnership === CLAIM_OWNERSHIPS.SELF &&
        formData.claimantType === CLAIMANT_TYPES.VETERAN
          ? 'Your mailing address'
          : 'Veteran’s mailing address',
      pages: {
        veteranMailingAddressInfo1: {
          path: 'veteran-mailing-address',
          title: 'Veteran mailing address',
          scrollAndFocusTarget: pageScrollAndFocus(),
          uiSchema: vetAddrInfo.uiSchema,
          schema: vetAddrInfo.schema,
        },
      },
    },
    veteranContactInfo: {
      // for all Flows
      title: ({ formData } = {}) =>
        formData.claimOwnership === CLAIM_OWNERSHIPS.SELF &&
        formData.claimantType === CLAIMANT_TYPES.VETERAN
          ? 'Your contact information'
          : 'Veteran’s contact information',
      pages: {
        veteranContactInfo1: {
          path: 'veteran-contact-information',
          title: 'Veteran contact information',
          scrollAndFocusTarget: pageScrollAndFocus(),
          uiSchema: vetContInfo.uiSchema,
          schema: vetContInfo.schema,
        },
      },
    },
    statementChapterD: {
      // for Flow 1: self claim, vet claimant
      // populates SAME statement field as the other statementChapters
      title: 'Your statement',
      pages: {
        statementPageD: {
          depends: {
            claimOwnership: CLAIM_OWNERSHIPS.SELF,
            claimantType: CLAIMANT_TYPES.VETERAN,
          },
          path: 'statement-d',
          title: 'Provide your statement',
          scrollAndFocusTarget: pageScrollAndFocus(),
          uiSchema: statement.uiSchema,
          schema: statement.schema,
        },
      },
    },
  },
  footerContent,
  getHelp,
};

export default formConfig;
