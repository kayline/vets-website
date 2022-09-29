import { CSP_IDS } from 'platform/user/authentication/constants';
import { makeMockContactInfo } from '~/platform/user/profile/vap-svc/util/local-vapsvc.js';

export const makeMockUser = () => {
  return {
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
        account: { accountUuid: 'c049d895-ecdf-40a4-ac0f-7947a06ea0c2' },
        profile: {
          email: 'vets.gov.user+36@gmail.com',
          firstName: 'WESLEY',
          middleName: 'WATSON',
          lastName: 'FORD',
          birthDate: '1986-05-06',
          gender: 'M',
          zip: '21122-6706',
          lastSignedIn: '2020-07-21T00:04:51.589Z',
          loa: { current: 3, highest: 3 },
          multifactor: true,
          verified: true,
          signIn: {
            serviceName: CSP_IDS.ID_ME,
            accountType: 'N/A',
            ssoe: true,
          },
          authnContext: 'http://idmanagement.gov/ns/assurance/loa/3',
          claims: {
            // eslint-disable-next-line camelcase
            payment_history: true,
          },
        },
        vaProfile: {
          status: 'OK',
          birthDate: '19860506',
          familyName: 'Ford',
          gender: 'M',
          givenNames: ['Wesley', 'Watson'],
          isCernerPatient: false,
          facilities: [{ facilityId: '983', isCerner: false }],
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
        vet360ContactInformation: makeMockContactInfo(),
      },
    },
    meta: { errors: null },
  };
};

export const mockUser = makeMockUser();
