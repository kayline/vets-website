import environment from '@department-of-veterans-affairs/platform-utilities/environment';
import {
  fullNameSchema,
  fullNameUI,
  ssnOrVaFileNumberSchema,
  ssnOrVaFileNumberUI,
  addressSchema,
  addressUI,
  phoneSchema,
  phoneUI,
  emailSchema,
  emailUI,
  dateOfBirthSchema,
  dateOfBirthUI,
  dateOfDeathSchema,
  dateOfDeathUI,
  yesNoSchema,
  yesNoUI,
  radioSchema,
  radioUI,
  titleSchema,
  titleUI,
} from 'platform/forms-system/src/js/web-component-patterns';
import fileUploadUI from 'platform/forms-system/src/js/definitions/file';
import get from '@department-of-veterans-affairs/platform-forms-system/get';

import {
  relationshipToVeteranUI,
  customRelationshipSchema,
} from '../components/CustomRelationshipPattern';

import transformForSubmit from './submitTransformer';
import manifest from '../manifest.json';
import IntroductionPage from '../containers/IntroductionPage';
import ApplicantField from '../components/Applicant/ApplicantField';
import ConfirmationPage from '../containers/ConfirmationPage';
import getNameKeyForSignature from '../helpers/signatureKeyName';
import { getAgeInYears, isInRange } from '../helpers/utilities';
import {
  sponsorWording,
  applicantWording,
} from '../helpers/wordingCustomization';
import {
  thirdPartyInfoUiSchema,
  thirdPartyInfoSchema,
} from '../components/ThirdPartyInfo';
import {
  sponsorCasualtyReportConfig,
  sponsorDisabilityRatingConfig,
  sponsorDischargePapersConfig,
  blankSchema,
} from '../components/Sponsor/sponsorFileUploads';
import {
  applicantBirthCertConfig,
  applicantSchoolCertConfig,
  applicantAdoptedConfig,
  applicantStepChildConfig,
} from '../components/Applicant/applicantFileUpload';
import { homelessInfo, noPhoneInfo } from '../components/Sponsor/sponsorAlerts';

import {
  ApplicantMedicareStatusPage,
  ApplicantMedicareStatusReviewPage,
} from '../pages/ApplicantMedicareStatusPage';
import ApplicantRelationshipPage, {
  ApplicantRelationshipReviewPage,
} from '../pages/ApplicantRelationshipPage';
import ApplicantMedicareStatusContinuedPage, {
  ApplicantMedicareStatusContinuedReviewPage,
} from '../pages/ApplicantMedicareStatusContinuedPage';
import ApplicantOhiStatusPage, {
  ApplicantOhiStatusReviewPage,
} from '../pages/ApplicantOhiStatusPage';

import AdditionalDocumentationAlert from '../components/AdditionalDocumentationAlert';

import { fileTypes, attachmentsSchema } from './attachments';

// Used to condense some repetitive schema boilerplate
const applicantListSchema = (requireds, propertyList) => {
  return {
    type: 'object',
    properties: {
      applicants: {
        type: 'array',
        items: {
          type: 'object',
          required: requireds,
          properties: propertyList,
        },
      },
    },
  };
};

const uploadUrl = `${
  environment.API_URL
}/simple_forms_api/v1/simple_forms/submit_supporting_documents`;

/** @type {FormConfig} */
const formConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  transformForSubmit,
  // submitUrl: '/v0/api',
  submit: () =>
    Promise.resolve({ attributes: { confirmationNumber: '123123123' } }),
  trackingPrefix: '10-10D-',
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  v3SegmentedProgressBar: true,
  preSubmitInfo: {
    statementOfTruth: {
      body:
        'I confirm that the identifying information in this form is accurate and has been represented correctly.',
      messageAriaDescribedby:
        'I confirm that the identifying information in this form is accurate and has been represented correctly.',
      fullNamePath: formData => getNameKeyForSignature(formData),
    },
  },
  formId: '10-10D',
  dev: {
    showNavLinks: false,
  },
  saveInProgress: {
    messages: {
      inProgress: 'Your CHAMPVA benefits application (10-10D) is in progress.',
      expired:
        'Your saved CHAMPVA benefits application (10-10D) has expired. If you want to apply for CHAMPVA benefits, please start a new application.',
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
  title: 'Apply for CHAMPVA benefits',
  subTitle: 'Form 10-10d',
  defaultDefinitions: {},
  chapters: {
    certifierInformation: {
      title: 'Signer information',
      pages: {
        page1: {
          path: 'your-information/description',
          title: 'Which of these best describes you?',
          uiSchema: {
            ...titleUI('Your relationship to this form'),
            certifierRole: radioUI({
              title: 'Which of these best describes you?',
              required: true,
              labels: {
                applicant: "I'm an applicant applying for CHAMPVA benefits",
                sponsor:
                  "I'm a Veteran applying for my spouse, dependents, or caretaker",
                other:
                  "I'm a third party representative, power of attorney or VSO (Veterans Service Officer)",
              },
            }),
            ...thirdPartyInfoUiSchema,
          },
          schema: {
            type: 'object',
            required: ['certifierRole'],
            properties: {
              titleSchema,
              certifierRole: radioSchema(['applicant', 'sponsor', 'other']),
              ...thirdPartyInfoSchema,
            },
          },
        },
        page2: {
          path: 'certification/name',
          title: 'Certification',
          depends: formData => get('certifierRole', formData) === 'other',
          uiSchema: {
            ...titleUI(
              'Your name',
              'We use this information to contact the signer of this form and verify other details',
            ),
            certifierName: fullNameUI(),
          },
          schema: {
            type: 'object',
            required: ['certifierName'],
            properties: {
              titleSchema,
              certifierName: fullNameSchema,
            },
          },
        },
        page3: {
          path: 'certification/address',
          title: 'Certification',
          depends: formData => get('certifierRole', formData) === 'other',
          uiSchema: {
            ...titleUI(
              'Your mailing address',
              'We’ll send any updates about your signer certification to this address',
            ),
            ...homelessInfo.uiSchema,
            certifierAddress: addressUI(),
          },
          schema: {
            type: 'object',
            required: ['certifierAddress'],
            properties: {
              titleSchema,
              ...homelessInfo.schema,
              certifierAddress: addressSchema(),
            },
          },
        },
        page4: {
          path: 'certification/phone',
          title: 'Certification',
          depends: formData => get('certifierRole', formData) === 'other',
          uiSchema: {
            ...titleUI(
              'Your contact information',
              'We use this information to contact the signer of this form and verify other details.',
            ),
            ...noPhoneInfo.uiSchema,
            certifierPhone: phoneUI(),
          },
          schema: {
            type: 'object',
            required: ['certifierPhone'],
            properties: {
              titleSchema,
              ...noPhoneInfo.schema,
              certifierPhone: phoneSchema,
            },
          },
        },
        page5: {
          path: 'certification/relationship',
          title: 'Certification',
          depends: formData => get('certifierRole', formData) === 'other',
          uiSchema: {
            ...titleUI(
              "What's your relationship to the Applicant(s)?",
              'Depending on your response, additional documentation may be required to determine eligibility',
            ),
            certifierRelationship: relationshipToVeteranUI({
              personTitle: 'Applicant(s)',
              labelHeaderLevel: 0,
              customLabels: {
                spouse: `I’m the spouse of an Applicant`,
                child: 'I’m the child of an Applicant',
                caretaker: 'I’m the caretaker of an Applicant',
                other: 'A relationship not listed',
              },
            }),
          },
          schema: {
            type: 'object',
            required: ['certifierRelationship'],
            properties: {
              titleSchema,
              certifierRelationship: customRelationshipSchema([
                'spouse',
                'child',
                'caretaker',
                'other',
              ]),
            },
          },
        },
      },
    },
    sponsorInformation: {
      title: 'Sponsor information',
      pages: {
        page6: {
          path: 'sponsor-information/name-dob',
          title: formData =>
            `${sponsorWording(formData)} name and date of birth`,
          uiSchema: {
            ...titleUI(
              ({ formData }) =>
                `${sponsorWording(formData)} name and date of birth`,
              ({ formData }) =>
                formData?.certifierRole === 'sponsor'
                  ? 'Please provide your information. We use this information to identify eligibility.'
                  : `Please provide the information for the Veteran that you're connected to (called your "Sponsor"). We use this information to identify eligibility.`,
            ),
            veteransFullName: fullNameUI(),
            sponsorDOB: dateOfBirthUI(),
          },
          schema: {
            type: 'object',
            required: ['sponsorDOB'],
            properties: {
              titleSchema,
              veteransFullName: fullNameSchema,
              sponsorDOB: dateOfBirthSchema,
            },
          },
        },
        page7: {
          path: 'sponsor-information/ssn',
          title: formData =>
            `${sponsorWording(formData)} identification information`,
          uiSchema: {
            ...titleUI(
              ({ formData }) =>
                `${sponsorWording(formData)} identification information`,
              'You must enter either a Social Security number or VA File number',
            ),
            ssn: ssnOrVaFileNumberUI(),
          },
          schema: {
            type: 'object',
            required: ['ssn'],
            properties: {
              titleSchema,
              // TODO: remove description from above va file number
              ssn: ssnOrVaFileNumberSchema,
            },
          },
        },
        page8: {
          path: 'sponsor-information/status',
          title: 'Sponsor status',
          depends: formData => get('certifierRole', formData) !== 'sponsor',
          uiSchema: {
            sponsorInfoTitle: titleUI('Sponsor status'),
            sponsorIsDeceased: yesNoUI({
              title: 'Is sponsor still living?',
              labels: {
                Y: 'Yes, sponsor is alive',
                N: 'No, sponsor is deceased',
              },
              yesNoReverse: true,
            }),
          },
          schema: {
            type: 'object',
            required: ['sponsorIsDeceased'],
            properties: {
              sponsorInfoTitle: titleSchema,
              sponsorIsDeceased: yesNoSchema,
            },
          },
        },
        page9: {
          path: 'sponsor-information/status-date',
          title: 'Sponsor status (continued)',
          depends: formData =>
            get('certifierRole', formData) !== 'sponsor' &&
            get('sponsorIsDeceased', formData),
          uiSchema: {
            sponsorInfoTitle: titleUI('Sponsor status (continued)'),
            sponsorDOD: dateOfDeathUI(),
            sponsorDeathConditions: yesNoUI({
              title: 'Did sponsor pass away on active military service?',
              labels: {
                yes: 'Yes, sponsor passed away during active military service',
                no:
                  'No, sponsor did not pass away during active military service',
              },
            }),
          },
          schema: {
            type: 'object',
            required: ['sponsorDOD'],
            properties: {
              sponsorInfoTitle: titleSchema,
              sponsorDOD: dateOfDeathSchema,
              sponsorDeathConditions: yesNoSchema,
            },
          },
        },
        page9a: {
          path: 'sponsor-information/status-documents',
          title: 'Sponsor casualty report',
          depends: formData =>
            get('sponsorIsDeceased', formData) &&
            get('sponsorDeathConditions', formData),
          uiSchema: {
            ...titleUI(
              'Required supporting file upload',
              ({ formData }) =>
                `Upload a file showing the casualty report for ${
                  formData.veteransFullName.first
                } ${formData.veteransFullName.last}`,
            ),
            ...sponsorCasualtyReportConfig.uiSchema,
            sponsorCasualtyReport: {
              ...fileUploadUI("Upload Sponsor's casualty report", {
                fileTypes,
                fileUploadUrl: uploadUrl,
              }),
            },
          },
          schema: {
            type: 'object',
            properties: {
              titleSchema,
              ...sponsorCasualtyReportConfig.schema,
              sponsorCasualtyReport: attachmentsSchema,
            },
          },
        },
        page10b1: {
          path: 'sponsor-information/address',
          title: formData => `${sponsorWording(formData)} mailing address`,
          depends: formData => !get('sponsorIsDeceased', formData),
          uiSchema: {
            ...titleUI(
              ({ formData }) => `${sponsorWording(formData)} mailing address`,
              "We'll send any important information about your application to this address. Any updates you make here to your address will apply only to this application",
            ),
            ...homelessInfo.uiSchema,
            sponsorAddress: {
              ...addressUI({
                labels: {
                  militaryCheckbox:
                    'Address is on a United States military base outside the country.',
                },
              }),
            },
          },
          schema: {
            type: 'object',
            required: ['sponsorAddress'],
            properties: {
              titleSchema,
              ...homelessInfo.schema,
              sponsorAddress: addressSchema(),
            },
          },
        },
        page11: {
          path: 'sponsor-information/phone',
          title: formData => `${sponsorWording(formData)} contact information`,
          depends: formData => !get('sponsorIsDeceased', formData),
          uiSchema: {
            ...titleUI(
              ({ formData }) =>
                `${sponsorWording(formData)} contact information`,
              'This information helps us contact you faster if we need to follow up with you about your application.',
            ),
            ...noPhoneInfo.uiSchema,
            sponsorPhone: {
              ...phoneUI({
                title: 'Phone number',
              }),
              'ui:required': () => true,
            },
          },
          schema: {
            type: 'object',
            required: ['sponsorPhone'],
            properties: {
              titleSchema,
              ...noPhoneInfo.schema,
              sponsorPhone: phoneSchema,
            },
          },
        },
        page12: {
          path: 'sponsor-information/disability',
          title: 'Sponsor disability rating',
          uiSchema: {
            ...titleUI(
              'Optional supporting file upload',
              ({ formData }) =>
                `Upload a file showing the disability rating for ${
                  formData.veteransFullName.first
                } ${formData.veteransFullName.last}`,
            ),
            ...sponsorDisabilityRatingConfig.uiSchema,
            sponsorDisabilityRating: {
              ...fileUploadUI("Upload Sponsor's disability rating", {
                fileTypes,
                fileUploadUrl: uploadUrl,
              }),
            },
          },
          schema: {
            type: 'object',
            properties: {
              titleSchema,
              ...sponsorDisabilityRatingConfig.schema,
              sponsorDisabilityRating: attachmentsSchema,
            },
          },
        },
        page12a: {
          path: 'sponsor-information/discharge-papers',
          title: 'Sponsor discharge papers',
          uiSchema: {
            ...titleUI(
              'Optional supporting file upload',
              ({ formData }) =>
                `Upload a file showing the discharge papers for ${
                  formData.veteransFullName.first
                } ${formData.veteransFullName.last}`,
            ),
            ...sponsorDischargePapersConfig.uiSchema,
            sponsorDischargePapers: {
              ...fileUploadUI("Upload Sponsor's discharge papers", {
                fileTypes,
                fileUploadUrl: uploadUrl,
              }),
            },
          },
          schema: {
            type: 'object',
            properties: {
              titleSchema,
              ...sponsorDischargePapersConfig.schema,
              sponsorDischargePapers: attachmentsSchema,
            },
          },
        },
      },
    },
    applicantInformation: {
      title: 'Applicant information',
      pages: {
        page13: {
          path: 'applicant-information',
          arrayPath: 'applicants',
          title: 'Applicants',
          uiSchema: {
            ...titleUI(
              'Applicant name and date of birth',
              'Please tell us the names of the applicants that you want to enroll in CHAMPVA. You can only add up to 3 applicants at a time. If you have more than 3 applicants then you will need to submit a separate form for each applicant.',
            ),
            applicants: {
              'ui:options': {
                viewField: ApplicantField,
                keepInPageOnReview: true,
                useDlWrap: false,
              },
              'ui:errorMessages': {
                minItems: 'Must have at least one applicant listed.',
                maxItems: 'A maximum of three applicants may be added.',
              },
              items: {
                applicantName: fullNameUI(),
                applicantDOB: dateOfBirthUI({ required: true }),
              },
            },
          },
          schema: applicantListSchema(['applicantDOB'], {
            titleSchema,
            applicantName: fullNameSchema,
            applicantDOB: dateOfBirthSchema,
          }),
        },
        page14: {
          path: 'applicant-information/:index/ssn-dob',
          arrayPath: 'applicants',
          title: item => `${applicantWording(item)} identification information`,
          showPagePerItem: true,
          uiSchema: {
            applicants: {
              'ui:options': {
                viewField: ApplicantField,
                keepInPageOnReview: true,
              },
              'ui:errorMessages': {
                minItems: 'Must have at least one applicant listed.',
                maxItems: 'A maximum of three applicants may be added.',
              },
              items: {
                'view:description': {
                  'ui:description':
                    'You must enter either a VA file number or Social Security number',
                },
                applicantSSN: ssnOrVaFileNumberUI(),
                // Dynamic title (uses "your" if certifierRole is applicant and
                // this is applicant[0])
                'ui:options': {
                  updateSchema: formData => {
                    return {
                      title: context =>
                        titleUI(
                          `${applicantWording(
                            formData,
                            context,
                          )} identification information`,
                        )['ui:title'], // grab styled title rather than plain text
                    };
                  },
                },
              },
            },
          },
          schema: applicantListSchema([], {
            titleSchema,
            'view:description': blankSchema,
            applicantSSN: ssnOrVaFileNumberSchema,
          }),
        },
        page15: {
          path: 'applicant-information/:index/address',
          arrayPath: 'applicants',
          showPagePerItem: true,
          title: item => `${applicantWording(item)} mailing address`,
          uiSchema: {
            applicants: {
              items: {
                'view:description': {
                  'ui:description':
                    'We’ll send any important information about your application to this address.',
                },
                applicantAddress: {
                  ...addressUI({
                    labels: {
                      militaryCheckbox:
                        'Address is on a United States military base outside the country.',
                    },
                  }),
                },
                'ui:options': {
                  updateSchema: formData => {
                    return {
                      title: context =>
                        titleUI(
                          `${applicantWording(
                            formData,
                            context,
                          )} mailing address`,
                        )['ui:title'], // grab styled title rather than plain text
                    };
                  },
                },
              },
            },
          },
          schema: applicantListSchema([], {
            'view:description': blankSchema,
            applicantAddress: addressSchema(),
          }),
        },
        page16: {
          path: 'applicant-information/:index/email-phone',
          arrayPath: 'applicants',
          showPagePerItem: true,
          title: item => `${applicantWording(item)} contact information`,
          uiSchema: {
            applicants: {
              items: {
                'ui:options': {
                  updateSchema: formData => {
                    return {
                      title: context =>
                        titleUI(
                          `${applicantWording(
                            formData,
                            context,
                          )} contact information`,
                        )['ui:title'],
                    };
                  },
                },
                applicantEmailAddress: emailUI(),
                applicantPhone: phoneUI(),
              },
            },
          },
          schema: applicantListSchema([], {
            applicantEmailAddress: emailSchema,
            applicantPhone: phoneSchema,
          }),
        },
        page17: {
          path: 'applicant-information/:index/gender',
          arrayPath: 'applicants',
          showPagePerItem: true,
          title: item => `${applicantWording(item)} gender`,
          uiSchema: {
            'ui:title': 'Applicant Gender',
            applicants: {
              items: {
                'ui:options': {
                  updateSchema: formData => {
                    return {
                      title: context =>
                        titleUI(
                          `${applicantWording(formData, context)} gender`,
                        )['ui:title'],
                    };
                  },
                },
                applicantGender: radioUI({
                  title: 'Gender',
                  required: true,
                  labels: { male: 'Male', female: 'Female' },
                }),
              },
            },
          },
          schema: applicantListSchema([], {
            applicantGender: radioSchema(['male', 'female']),
          }),
        },
        page18: {
          path: 'applicant-information/:index/relationship',
          arrayPath: 'applicants',
          showPagePerItem: true,
          title: item => `${applicantWording(item)} relationship to sponsor`,
          CustomPage: ApplicantRelationshipPage,
          CustomPageReview: ApplicantRelationshipReviewPage, // CustomReviewField,
          schema: applicantListSchema([], {
            applicantRelationshipToSponsor: {
              type: 'object',
              properties: {
                relationshipToVeteran: { type: 'string' },
                otherRelationshipToVeteran: { type: 'string' },
              },
            },
          }),
          uiSchema: {
            applicants: {
              items: {},
            },
          },
        },
        page18a: {
          path: 'applicant-information/:index/child-documents',
          arrayPath: 'applicants',
          showPagePerItem: true,
          title: item => `${applicantWording(item)} birth certificate`,
          depends: (formData, index) =>
            get(
              'applicantRelationshipToSponsor',
              formData?.applicants?.[`${index || 0}`],
            )?.relationshipToVeteran === 'child',
          uiSchema: {
            applicants: {
              items: {
                ...titleUI(
                  'Required supporting file upload',
                  ({ formData }) =>
                    `Upload a birth certificate for ${
                      formData?.applicantName?.first
                    } ${formData?.applicantName?.last}`,
                ),
                ...applicantBirthCertConfig.uiSchema,
                applicantBirthCertOrSocialSecCard: fileUploadUI(
                  "Upload the applicant's birth certificate",
                  {
                    fileTypes,
                    fileUploadUrl: `${
                      environment.API_URL
                    }/simple_forms_api/v1/simple_forms/submit_supporting_documents`,
                  },
                ),
              },
            },
          },
          schema: applicantListSchema([], {
            titleSchema,
            ...applicantBirthCertConfig.schema,
            applicantBirthCertOrSocialSecCard: attachmentsSchema,
          }),
        },
        page18b: {
          path: 'applicant-information/:index/school-documents',
          arrayPath: 'applicants',
          showPagePerItem: true,
          title: item => `${applicantWording(item)} school documents`,
          depends: (formData, index) =>
            get(
              'applicantRelationshipToSponsor',
              formData?.applicants?.[`${index || 0}`],
            )?.relationshipToVeteran === 'child' &&
            // Calculate the current app's age and check if it's between
            // 18-23. Did this isInRange method bc can't store temp age value
            // and didn't want to calculate age twice to do comparison
            isInRange(
              getAgeInYears(
                get('applicantDOB', formData?.applicants?.[`${index || 0}`]),
              ),
              18,
              23,
            ),
          uiSchema: {
            applicants: {
              items: {
                ...titleUI(
                  'Required supporting file upload',
                  ({ formData }) =>
                    `Upload a school certification for ${
                      formData?.applicantName?.first
                    } ${formData?.applicantName?.last}`,
                ),
                ...applicantSchoolCertConfig.uiSchema,
                applicantSchoolCert: fileUploadUI(
                  "Upload the applicant's school certification",
                  {
                    fileTypes,
                    fileUploadUrl: `${
                      environment.API_URL
                    }/simple_forms_api/v1/simple_forms/submit_supporting_documents`,
                  },
                ),
              },
            },
          },
          schema: applicantListSchema([], {
            titleSchema,
            ...applicantSchoolCertConfig.schema,
            applicantSchoolCert: attachmentsSchema,
          }),
        },
        page18c: {
          path: 'applicant-information/:index/child-info',
          arrayPath: 'applicants',
          showPagePerItem: true,
          title: item => `${applicantWording(item)} relationship to sponsor`,
          depends: (formData, index) =>
            get(
              'applicantRelationshipToSponsor',
              formData?.applicants?.[`${index || 0}`],
            )?.relationshipToVeteran === 'child',
          uiSchema: {
            applicants: {
              items: {
                ...titleUI(
                  ({ formData }) =>
                    `${applicantWording(formData)} relationship to sponsor`,
                ),
                'ui:description': AdditionalDocumentationAlert(),
                applicantRelationshipOrigin: radioUI({
                  title: 'Question regarding blood relation status',
                  required: true,
                  labels: {
                    blood: 'Blood',
                    adoption: 'Adoption',
                    step: 'Stepchild',
                  },
                }),
              },
            },
          },
          schema: applicantListSchema([], {
            titleSchema,
            'ui:description': blankSchema,
            applicantRelationshipOrigin: radioSchema([
              'blood',
              'adoption',
              'step',
            ]),
          }),
        },
        page18d: {
          path: 'applicant-information/:index/adoption-documents',
          arrayPath: 'applicants',
          showPagePerItem: true,
          title: item => `${applicantWording(item)} adoption documents`,
          depends: (formData, index) =>
            get(
              'applicantRelationshipToSponsor',
              formData?.applicants?.[`${index || 0}`],
            )?.relationshipToVeteran === 'child' &&
            get(
              'applicantRelationshipOrigin',
              formData?.applicants?.[`${index || 0}`],
            ) === 'adoption',
          uiSchema: {
            applicants: {
              items: {
                ...titleUI(
                  'Required supporting file upload',
                  ({ formData }) =>
                    `Upload adoption papers for ${
                      formData?.applicantName?.first
                    } ${formData?.applicantName?.last}`,
                ),
                ...applicantAdoptedConfig.uiSchema,
                applicantAdoptionPapers: fileUploadUI(
                  "Upload the applicant's adoption papers",
                  {
                    fileTypes,
                    fileUploadUrl: `${
                      environment.API_URL
                    }/simple_forms_api/v1/simple_forms/submit_supporting_documents`,
                  },
                ),
              },
            },
          },
          schema: applicantListSchema([], {
            titleSchema,
            ...applicantAdoptedConfig.schema,
            applicantAdoptionPapers: attachmentsSchema,
          }),
        },
        page18e: {
          path: 'applicant-information/:index/via-marriage-documents',
          arrayPath: 'applicants',
          showPagePerItem: true,
          title: item =>
            `${applicantWording(item)} parental marriage documents`,
          depends: (formData, index) =>
            get(
              'applicantRelationshipToSponsor',
              formData?.applicants?.[`${index || 0}`],
            )?.relationshipToVeteran === 'child' &&
            get(
              'applicantRelationshipOrigin',
              formData?.applicants?.[`${index || 0}`],
            ) === 'step',
          uiSchema: {
            applicants: {
              items: {
                ...titleUI(
                  'Required supporting file upload',
                  ({ formData }) =>
                    `Upload a marriage certificate between ${
                      formData?.applicantName?.first
                    } ${
                      formData?.applicantName?.last
                    }'s parent and the sponsor.`,
                ),
                ...applicantStepChildConfig.uiSchema,
                applicantStepMarriageCert: fileUploadUI(
                  "Upload marriage certificate between applicant's parent and the sponsor",
                  {
                    fileTypes,
                    fileUploadUrl: `${
                      environment.API_URL
                    }/simple_forms_api/v1/simple_forms/submit_supporting_documents`,
                  },
                ),
              },
            },
          },
          schema: applicantListSchema([], {
            titleSchema,
            ...applicantStepChildConfig.schema,
            applicantStepMarriageCert: attachmentsSchema,
          }),
        },
        page19: {
          path: 'applicant-information/:index/medicare-status',
          arrayPath: 'applicants',
          showPagePerItem: true,
          title: item => `${applicantWording(item)} Medicare status`,
          CustomPage: ApplicantMedicareStatusPage,
          CustomPageReview: ApplicantMedicareStatusReviewPage,
          schema: applicantListSchema([], {
            applicantMedicareStatus: { type: 'string' },
          }),
          uiSchema: {
            applicants: {
              items: {},
            },
          },
        },
        page20: {
          path: 'applicant-information/:index/medicare-status-continued',
          arrayPath: 'applicants',
          showPagePerItem: true,
          title: item =>
            `${applicantWording(item)} Medicare status (continued)`,
          depends: (formData, index) =>
            get(
              'applicantMedicareStatus',
              formData?.applicants?.[`${index || 0}`],
            ) === 'enrolled',
          CustomPage: ApplicantMedicareStatusContinuedPage,
          CustomPageReview: ApplicantMedicareStatusContinuedReviewPage,
          schema: applicantListSchema([], {
            applicantMedicarePart: { type: 'string' },
          }),
          uiSchema: {
            applicants: {
              items: {},
            },
          },
        },
        page21: {
          path: 'applicant-information/:index/ohi',
          arrayPath: 'applicants',
          showPagePerItem: true,
          title: item => `${applicantWording(item)} other health insurance`,
          CustomPage: ApplicantOhiStatusPage,
          CustomPageReview: ApplicantOhiStatusReviewPage,
          schema: applicantListSchema([], {
            applicantHasOhi: { type: 'string' },
          }),
          uiSchema: {
            applicants: {
              items: {},
            },
          },
        },
      },
    },
  },
};

export default formConfig;
