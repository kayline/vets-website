/* eslint-disable camelcase */
export const mockUser = {
  data: {
    id: '',
    type: 'users_scaffolds',
    attributes: {
      services: [
        'appeals-status',
        'claim_increase',
        'edu-benefits',
        'evss_common_client',
        'evss-claims',
        'lighthouse',
        'facilities',
        'form-prefill',
        'form-save-in-progress',
        'form526',
        'hca',
        'id-card',
        'identity-proofed',
        'mhv-accounts',
        'user-profile',
        'vet360',
      ],
      account: {
        accountUuid: 'c049d895-ecdf-40a4-ac0f-7947a06ea0c2',
      },
      profile: {
        email: 'vets.gov.user+36@gmail.com',
        firstName: 'WESLEY',
        middleName: 'WATSON',
        lastName: 'FORD',
        birthDate: '1986-05-06',
        gender: 'M',
        zip: '21122-6706',
        lastSignedIn: '2020-07-21T00:04:51.589Z',
        loa: {
          current: 3,
          highest: 3,
        },
        multifactor: true,
        verified: true,
        signIn: {
          serviceName: 'idme',
          accountType: 'N/A',
          ssoe: true,
        },
        authnContext: 'http://idmanagement.gov/ns/assurance/loa/3',
        claims: {
          ch33_bank_accounts: true,
          communication_preferences: true,
          connected_apps: true,
          military_history: true,
          payment_history: true,
          personal_information: true,
          rating_info: true,
          appeals: true,
          medical_copays: true,
        },
      },
      vaProfile: {
        status: 'OK',
        birthDate: '19860506',
        familyName: 'Ford',
        gender: 'M',
        givenNames: ['Wesley', 'Watson'],
        isCernerPatient: false,
        facilities: [
          {
            facilityId: '983',
            isCerner: false,
          },
        ],
        vaPatient: true,
        mhvAccountState: 'OK',
      },
      veteranStatus: {
        status: 'OK',
        isVeteran: true,
        servedInMilitary: true,
      },
      inProgressForms: [],
      prefillsAvailable: [
        '21-686C',
        '40-10007',
        '22-1990',
        '22-1990N',
        '22-1990E',
        '22-1995',
        '22-1995S',
        '22-5490',
        '22-5495',
        '22-0993',
        '22-0994',
        'FEEDBACK-TOOL',
        '22-10203',
        '21-526EZ',
        '21-526EZ-BDD',
        '1010ez',
        '21P-530',
        '21P-527EZ',
        '686C-674',
        '20-0996',
        'MDOT',
      ],
      vet360ContactInformation: {
        email: {
          id: 100,
          emailAddress: 'veteran@gmail.com',
        },
        mobilePhone: {
          areaCode: '503',
          countryCode: '1',
          createdAt: '2018-04-21T20:09:50Z',
          effectiveEndDate: '2018-04-21T20:09:50Z',
          effectiveStartDate: '2018-04-21T20:09:50Z',
          extension: '0000',
          id: 123,
          isInternational: false,
          isTextable: true,
          isTextPermitted: null,
          isTty: true,
          isVoicemailable: true,
          phoneNumber: '5551234',
          phoneType: 'MOBILE',
          sourceDate: '2018-04-21T20:09:50Z',
          updatedAt: '2018-04-21T20:09:50Z',
        },
        homePhone: {
          areaCode: '503',
          countryCode: '1',
          createdAt: '2018-04-21T20:09:50Z',
          effectiveEndDate: '2018-04-21T20:09:50Z',
          effectiveStartDate: '2018-04-21T20:09:50Z',
          extension: '0000',
          id: 123,
          isInternational: false,
          isTextable: false,
          isTextPermitted: false,
          isTty: true,
          isVoicemailable: true,
          phoneNumber: '2222222',
          phoneType: 'HOME',
          sourceDate: '2018-04-21T20:09:50Z',
          updatedAt: '2018-04-21T20:09:50Z',
        },
        workPhone: null,
        faxNumber: null,
        temporaryPhone: {
          areaCode: '503',
          countryCode: '1',
          createdAt: '2018-04-21T20:09:50Z',
          effectiveEndDate: '2018-04-21T20:09:50Z',
          effectiveStartDate: '2018-04-21T20:09:50Z',
          extension: '0000',
          id: 123,
          isInternational: false,
          isTextable: false,
          isTextPermitted: false,
          isTty: true,
          isVoicemailable: true,
          phoneNumber: '5555555',
          phoneType: 'MOBILE',
          sourceDate: '2018-04-21T20:09:50Z',
          updatedAt: '2018-04-21T20:09:50Z',
        },
        mailingAddress: {
          addressLine1: '1493 Martin Luther King Rd',
          addressLine2: 'Apt 1',
          addressLine3: null,
          addressPou: 'CORRESPONDENCE',
          addressType: 'DOMESTIC',
          city: 'Fulton',
          countryName: 'United States',
          countryCodeFips: 'US',
          countryCodeIso2: 'US',
          countryCodeIso3: 'USA',
          createdAt: '2018-04-21T20:09:50Z',
          effectiveEndDate: '2018-04-21T20:09:50Z',
          effectiveStartDate: '2018-04-21T20:09:50Z',
          id: 123,
          internationalPostalCode: '54321',
          province: 'string',
          sourceDate: '2018-04-21T20:09:50Z',
          stateCode: 'NY',
          updatedAt: '2018-04-21T20:09:50Z',
          zipCode: '97062',
          zipCodeSuffix: '1234',
          badAddress: false,
        },
        residentialAddress: {
          addressLine1: 'PSC 808 Box 37',
          addressLine2: null,
          addressLine3: null,
          addressPou: 'RESIDENCE/CHOICE',
          addressType: 'OVERSEAS MILITARY',
          city: 'FPO',
          countryName: 'United States',
          countryCodeFips: 'US',
          countryCodeIso2: 'US',
          countryCodeIso3: 'USA',
          latitude: 37.5615,
          longitude: -121.9988,
          createdAt: '2018-04-21T20:09:50Z',
          effectiveEndDate: '2018-04-21T20:09:50Z',
          effectiveStartDate: '2018-04-21T20:09:50Z',
          id: 124,
          internationalPostalCode: '54321',
          province: 'string',
          sourceDate: '2018-04-21T20:09:50Z',
          stateCode: 'AE',
          updatedAt: '2018-04-21T20:09:50Z',
          zipCode: '09618',
          zipCodeSuffix: '1234',
        },
      },
    },
  },
  meta: {
    errors: null,
  },
};
