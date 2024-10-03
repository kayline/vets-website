const set = require('lodash/set');
const cloneDeep = require('lodash/cloneDeep');
/**
 * Loops through the claims array and adds the claims to the user object
 *
 * @param {Object} user
 * @param {Array} claims
 * @returns user with claims added to the profile.claims object with boolean values
 */
const createUserWithDataClaims = (user, claims) => {
  const result = cloneDeep(user);
  claims.forEach(claim => {
    result.data.attributes.profile.claims[claim.name] = claim.value;
  });
  return result;
};

const baseUserResponses = {
  loa3User72: {
    data: {
      id: '',
      type: 'users_scaffolds',
      attributes: {
        services: [
          'facilities',
          'hca',
          'edu-benefits',
          'form-save-in-progress',
          'form-prefill',
          'form526',
          'user-profile',
          'appeals-status',
          'id-card',
          'identity-proofed',
          'vet360',
          'lighthouse',
        ],
        account: {
          accountUuid: '7d9e2bfb-13ae-45c8-8764-ea3c87cd8af3',
        },
        profile: {
          email: 'vets.gov.user+75@gmail.com',
          firstName: 'Mitchell',
          middleName: 'G',
          lastName: 'Jenkins',
          birthDate: '1949-03-04',
          gender: 'M',
          zip: '97063',
          lastSignedIn: '2022-03-24T18:15:06.566Z',
          loa: {
            current: 3,
            highest: 3,
          },
          multifactor: true,
          verified: true,
          signIn: {
            serviceName: 'idme',
            accountType: 'N/A',
          },
          authnContext: 'http://idmanagement.gov/ns/assurance/loa/3',
          claims: {
            ch33BankAccounts: true,
            communicationPreferences: true,
            connectedApps: true,
            militaryHistory: true,
            paymentHistory: true,
            personalInformation: true,
            ratingInfo: true,
            appeals: true,
            medicalCopays: true,
            coe: true,
          },
          edipi: 3332224445,
        },
        vaProfile: {
          status: 'OK',
          birthDate: '19490304',
          familyName: 'Jenkins',
          gender: 'M',
          givenNames: ['Mitchell', 'G'],
          isCernerPatient: false,
          facilities: [
            {
              facilityId: '989',
              isCerner: false,
            },
            {
              facilityId: '987',
              isCerner: false,
            },
            {
              facilityId: '983',
              isCerner: false,
            },
          ],
          vaPatient: true,
          mhvAccountState: 'NONE',
        },
        veteranStatus: {
          status: 'OK',
          isVeteran: true,
          servedInMilitary: true,
        },
        inProgressForms: [],
        prefillsAvailable: [
          '21-686C',
          'FORM-MOCK-AE-DESIGN-PATTERNS',
          '26-1880',
        ],
        vet360ContactInformation: {
          email: {
            createdAt: '2018-04-20T17:24:13.000Z',
            emailAddress: 'myemail72585885@unattended.com',
            effectiveEndDate: null,
            effectiveStartDate: '2019-03-07T22:32:40.000Z',
            id: 20648,
            sourceDate: '2019-03-07T22:32:40.000Z',
            sourceSystemUser: null,
            transactionId: '44a0858b-3dd1-4de2-903d-38b147981a9c',
            updatedAt: '2019-03-08T05:09:58.000Z',
            vet360Id: '1273766',
          },
          residentialAddress: {
            addressLine1: '345 Home Address St.',
            addressLine2: null,
            addressLine3: null,
            addressPou: 'RESIDENCE/CHOICE',
            addressType: 'DOMESTIC',
            city: 'San Francisco',
            countryName: 'United States',
            countryCodeIso2: 'US',
            countryCodeIso3: 'USA',
            countryCodeFips: null,
            countyCode: null,
            countyName: null,
            createdAt: '2022-03-21T21:26:35.000Z',
            effectiveEndDate: null,
            effectiveStartDate: '2022-03-23T19:11:51.000Z',
            geocodeDate: '2022-03-23T19:11:51.000Z',
            geocodePrecision: null,
            id: 312003,
            internationalPostalCode: null,
            latitude: 37.781,
            longitude: -122.4605,
            province: null,
            sourceDate: '2022-03-23T19:11:51.000Z',
            sourceSystemUser: null,
            stateCode: 'CA',
            transactionId: 'c5adb989-3b87-47b6-afe3-dc18800cedc3',
            updatedAt: '2022-03-23T19:11:52.000Z',
            validationKey: null,
            vet360Id: '1273766',
            zipCode: '94118',
            zipCodeSuffix: null,
            badAddress: null,
          },
          mailingAddress: {
            addressLine1: '123 Mailing Address St.',
            addressLine2: null,
            addressLine3: null,
            addressPou: 'CORRESPONDENCE',
            addressType: 'DOMESTIC',
            city: 'Fulton',
            countryName: 'United States',
            countryCodeIso2: 'US',
            countryCodeIso3: 'USA',
            countryCodeFips: null,
            countyCode: null,
            countyName: null,
            createdAt: '2022-03-21T21:06:15.000Z',
            effectiveEndDate: null,
            effectiveStartDate: '2022-03-23T19:14:59.000Z',
            geocodeDate: '2022-03-23T19:15:00.000Z',
            geocodePrecision: null,
            id: 311999,
            internationalPostalCode: null,
            latitude: 45.2248,
            longitude: -121.3595,
            province: null,
            sourceDate: '2022-03-23T19:14:59.000Z',
            sourceSystemUser: null,
            stateCode: 'NY',
            transactionId: '3ea3ecf8-3ddf-46d9-8a4b-b5554385b3fb',
            updatedAt: '2022-03-23T19:15:01.000Z',
            validationKey: null,
            vet360Id: '1273766',
            zipCode: '97063',
            zipCodeSuffix: null,
            badAddress: null,
          },
          mobilePhone: {
            areaCode: '619',
            countryCode: '1',
            createdAt: '2022-01-12T16:22:03.000Z',
            extension: null,
            effectiveEndDate: null,
            effectiveStartDate: '2022-02-17T20:15:44.000Z',
            id: 269804,
            isInternational: false,
            isTextable: null,
            isTextPermitted: null,
            isTty: null,
            isVoicemailable: null,
            phoneNumber: '5551234',
            phoneType: 'MOBILE',
            sourceDate: '2022-02-17T20:15:44.000Z',
            sourceSystemUser: null,
            transactionId: 'fdb13953-f670-4bd3-a3bb-8881eb9165dd',
            updatedAt: '2022-02-17T20:15:45.000Z',
            vet360Id: '1273766',
          },
          homePhone: {
            areaCode: '989',
            countryCode: '1',
            createdAt: '2018-04-20T17:22:56.000Z',
            extension: null,
            effectiveEndDate: null,
            effectiveStartDate: '2022-03-11T16:31:55.000Z',
            id: 2272982,
            isInternational: false,
            isTextable: null,
            isTextPermitted: null,
            isTty: null,
            isVoicemailable: null,
            phoneNumber: '8981233',
            phoneType: 'HOME',
            sourceDate: '2022-03-11T16:31:55.000Z',
            sourceSystemUser: null,
            transactionId: '2814cdf6-7f2c-431b-95f3-d37f3837215d',
            updatedAt: '2022-03-11T16:31:56.000Z',
            vet360Id: '1273766',
          },
          workPhone: null,
          temporaryPhone: null,
          faxNumber: null,
          textPermission: null,
        },
        session: {
          ssoe: true,
          transactionid: 'YEI6t8W3ANsvCT04oB+iXh/UP03PXSFg3Y36L2QaxLE=',
        },
      },
    },
    meta: {
      errors: null,
    },
  },
};

const mockErrorResponses = {
  externalServiceError: {
    data: {
      id: '',
      type: 'users_scaffolds',
      attributes: {
        services: [
          'facilities',
          'hca',
          'edu-benefits',
          'form-save-in-progress',
          'form-prefill',
          'form526',
          'user-profile',
          'appeals-status',
          'id-card',
          'identity-proofed',
          'vet360',
          'lighthouse',
        ],
        account: {
          accountUuid: '7d9e2bfb-13ae-45c8-8764-ea3c87cd8af3',
        },
        profile: {
          email: 'vets.gov.user+75@gmail.com',
          firstName: 'MITCHELL',
          middleName: 'G',
          lastName: 'JENKINS',
          birthDate: '1949-03-04',
          gender: 'M',
          zip: '97063',
          lastSignedIn: '2022-03-24T18:15:06.566Z',
          loa: {
            current: 3,
            highest: 3,
          },
          multifactor: true,
          verified: true,
          signIn: {
            serviceName: 'idme',
            accountType: 'N/A',
          },
          authnContext: 'http://idmanagement.gov/ns/assurance/loa/3',
        },
        vaProfile: {
          status: 'OK',
          birthDate: '19490304',
          familyName: 'Jenkins',
          gender: 'M',
          givenNames: ['Mitchell', 'G'],
          isCernerPatient: false,
          facilities: [
            {
              facilityId: '989',
              isCerner: false,
            },
            {
              facilityId: '987',
              isCerner: false,
            },
            {
              facilityId: '983',
              isCerner: false,
            },
          ],
          vaPatient: false,
          mhvAccountState: 'NONE',
        },
        veteranStatus: {
          status: 'OK',
          isVeteran: true,
          servedInMilitary: true,
        },
        inProgressForms: [],
        prefillsAvailable: ['21-686C', 'FORM_MOCK_AE_DESIGN_PATTERNS'],
        vet360ContactInformation: null,
        session: {
          ssoe: true,
          transactionid: 'YEI6t8W3ANsvCT04oB+iXh/UP03PXSFg3Y36L2QaxLE=',
        },
      },
    },
    meta: {
      errors: [
        {
          externalService: 'VAProfile',
          startTime: '2020-11-19T17:32:54Z',
          endTime: null,
          description:
            'VET360_502, 502, Bad Gateway, Received an an invalid response from the upstream server',
          status: 502,
        },
        {
          externalService: 'VAProfile',
          startTime: '2020-11-19T17:32:54Z',
          endTime: null,
          description: 'Second error message',
          status: 502,
        },
      ],
    },
  },
};

// user that is loa1 but is a dslogon user
const loa1UserDSLogon = set(
  cloneDeep(baseUserResponses.loa1User),
  'data.attributes.profile.signIn.serviceName',
  'dslogon',
);

// user that is loa1 but is a mhv user
const loa1UserMHV = set(
  cloneDeep(baseUserResponses.loa1User),
  'data.attributes.profile.signIn.serviceName',
  'mhv',
);

// users with various contact info missing
const loa3UserWithNoMobilePhone = set(
  cloneDeep(baseUserResponses.loa3User72),
  'data.attributes.vet360ContactInformation.mobilePhone',
  null,
);

const loa3UserWithNoEmail = set(
  cloneDeep(baseUserResponses.loa3User72),
  'data.attributes.vet360ContactInformation.email',
  null,
);

const loa3UserWithNoEmailOrMobilePhone = set(
  cloneDeep(loa3UserWithNoMobilePhone),
  'data.attributes.vet360ContactInformation.email',
  null,
);

const loa3UserWithNoHomeAddress = set(
  cloneDeep(baseUserResponses.loa3User72),
  'data.attributes.vet360ContactInformation.residentialAddress',
  null,
);

// users with various data claims missing
// this user has no rating info claim and therefore should not request the rating_info endpoint
const loa3UserWithNoRatingInfoClaim = set(
  cloneDeep(baseUserResponses.loa3User72),
  'data.attributes.profile.claims.ratingInfo',
  false,
);

const loa3UserWithNoMilitaryHistoryClaim = set(
  cloneDeep(baseUserResponses.loa3User72),
  'data.attributes.profile.claims.militaryHistory',
  false,
);

const loa3UserWithoutMailingAddress = set(
  cloneDeep(baseUserResponses.loa3User72),
  'data.attributes.vet360ContactInformation.mailingAddress',
  null,
);

const loa3UserWithoutLighthouseServiceAvailable = set(
  cloneDeep(baseUserResponses.loa3User72),
  'data.attributes.services',
  baseUserResponses.loa3User72.data.attributes.services.filter(
    service => service !== 'lighthouse',
  ),
);

const loa3UserWithUpdatedMailingAddress = set(
  cloneDeep(baseUserResponses.loa3User72),
  'data.attributes.vet360ContactInformation.mailingAddress.addressLine1',
  '345 Mailing Address St.',
);

const loa3UserWithUpdatedHomePhone = set(
  cloneDeep(baseUserResponses.loa3User72),
  'data.attributes.vet360ContactInformation.homePhone.phoneNumber',
  '8985555',
);
const loa3UserWithUpdatedHomePhoneTimeStamp = set(
  cloneDeep(loa3UserWithUpdatedHomePhone),
  'data.attributes.vet360ContactInformation.homePhone.updatedAt',
  '2023-03-11T16:31:56.000Z',
);

const responses = {
  ...baseUserResponses,
  ...mockErrorResponses,
  loa1UserDSLogon,
  loa1UserMHV,
  loa3UserWithNoMobilePhone,
  loa3UserWithNoEmail,
  loa3UserWithNoEmailOrMobilePhone,
  loa3UserWithoutMilitaryHistoryClaim: createUserWithDataClaims(
    baseUserResponses.loa3User72,
    [
      { name: 'militaryHistory', value: false },
      { name: 'ratingInfo', value: false },
    ],
  ),
  loa3UserWithUpdatedMailingAddress,
  loa3UserWithNoHomeAddress,
  loa3UserWithUpdatedHomePhone,
  loa3UserWithUpdatedHomePhoneTimeStamp,
  loa3UserWithNoRatingInfoClaim,
  loa3UserWithNoMilitaryHistoryClaim,
  loa3UserWithoutMailingAddress,
  loa3UserWithoutLighthouseServiceAvailable,
};

// handler that can be used to customize the user data returned
const handleUserRequest = (req, res) => {
  // here we can customize the return of the user request
  // the main mechanism that we customize around is the query string passed to the request

  // handle test case of BAI being cleared on user request
  if (req?.query?.bai === 'clear') {
    return res.json(responses.loa3User72);
  }

  // the now query string is used to get the current user data right after an update to a field
  if (req?.query?.now) {
    return res.json(responses.loa3User72);
  }

  // example user data cases
  // return res.json(allMockResponses.loa3User72); // default user (success)
  // return res.json(allMockResponses.loa1User); // user with loa1
  // return res.json(allMockResponses.badAddress); // user with bad address
  // return res.json(allMockResponses.loa3User); // user with loa3
  // return res.json(allMockResponses.nonVeteranUser); // non-veteran user
  // return res.json(allMockResponses.externalServiceError); // external service error
  // return res.json(allMockResponses.loa3UserWithNoMobilePhone); // user with no mobile phone number
  // return res.json(allMockResponses.loa3UserWithNoEmail); // user with no email address
  return res.json(responses.loa3UserWithNoEmailOrMobilePhone); // user without email or mobile phone

  // return res.json(allMockResponses.loa3User72);
};

module.exports = { ...responses, handleUserRequest };
