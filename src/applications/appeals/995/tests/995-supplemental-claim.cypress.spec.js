import path from 'path';

import testForm from 'platform/testing/e2e/cypress/support/form-tester';
import { createTestConfig } from 'platform/testing/e2e/cypress/support/form-tester/utilities';
import { setStoredSubTask } from 'platform/forms/sub-task';

import formConfig from '../config/form';
import manifest from '../manifest.json';
import {
  mockContestableIssues,
  mockContestableIssuesWithLegacyAppeals,
} from './995.cypress.helpers';
import mockInProgress from './fixtures/mocks/in-progress-forms.json';
import mockSubmit from './fixtures/mocks/application-submit.json';
import mockStatus from './fixtures/mocks/profile-status.json';
import mockUpload from './fixtures/mocks/mockUpload.json';
import mockUser from './fixtures/mocks/user.json';
import {
  CONTESTABLE_ISSUES_API,
  PRIMARY_PHONE,
  BASE_URL,
  EVIDENCE_PRIVATE,
} from '../constants';

const testConfig = createTestConfig(
  {
    dataPrefix: 'data',

    // dataDir: path.join(__dirname, 'data'),

    // Rename and modify the test data as needed.
    dataSets: ['maximal-test'], // , 'minimal-test'],

    fixtures: {
      data: path.join(__dirname, 'fixtures', 'data'),
      mocks: path.join(__dirname, 'fixtures', 'mocks'),
    },

    pageHooks: {
      introduction: ({ afterHook }) => {
        afterHook(() => {
          // Hit the start action link
          cy.findAllByText(/start your claim/i, { selector: 'a' })
            .first()
            .click();
        });
      },
      'primary-phone-number': ({ afterHook }) => {
        afterHook(() => {
          cy.get('@testData').then(testData => {
            cy.selectRadio('primary', testData[PRIMARY_PHONE] || 'home');
            cy.findByText('Continue', { selector: 'button' }).click();
          });
        });
      },
      'supporting-evidence/additional-evidence': () => {
        cy.get('input[type="file"]')
          .upload(
            path.join(__dirname, 'fixtures/data/example-upload.pdf'),
            'testing',
          )
          .get('.schemaform-file-uploading')
          .should('not.exist');
        cy.get('select').select('Buddy/Lay Statement');
      },
      'contestable-issues': ({ afterHook }) => {
        cy.fillPage();
        cy.injectAxeThenAxeCheck();
        afterHook(() => {
          cy.get('@testData').then(testData => {
            testData.additionalIssues.forEach(({ issue, decisionDate }) => {
              if (issue) {
                cy.get('.add-new-issue').click();
                cy.url().should('include', `${BASE_URL}/add-issue?index=`);
                cy.axeCheck();
                cy.get('#add-sc-issue')
                  .shadow()
                  .find('input')
                  .type(issue);
                cy.fillDate('decision-date', decisionDate);
                cy.get('#submit').click();
              }
            });
            cy.findByText('Continue', { selector: 'button' }).click();
          });
        });
      },
      'supporting-evidence/va-medical-records': ({ afterHook }) => {
        cy.injectAxeThenAxeCheck();
        afterHook(() => {
          cy.get('@testData').then(({ locations = [] }) => {
            locations.forEach((location, index) => {
              if (location) {
                if (index > 0) {
                  cy.url().should('include', `index=${index}`);
                }
                cy.get('#add-location-name')
                  .shadow()
                  .find('input')
                  .type(location.locationAndName);
                location?.issues.forEach(issue => {
                  cy.get(`va-checkbox[value="${issue}"]`)
                    .shadow()
                    .find('input')
                    .check();
                });
                cy.fillDate('from', location.evidenceDates?.from);
                cy.fillDate('to', location.evidenceDates?.to);
                cy.axeCheck();

                // Add another
                if (index + 1 < locations.length) {
                  cy.get('.vads-c-action-link--green').click();
                }
              }
            });
            cy.findByText('Continue', { selector: 'button' }).click();
          });
        });
      },
      'supporting-evidence/request-private-medical-records': ({
        afterHook,
      }) => {
        cy.injectAxeThenAxeCheck();
        afterHook(() => {
          cy.get('@testData').then(data => {
            const hasPrivate = data[EVIDENCE_PRIVATE];
            cy.get(
              `va-radio-option[value="${hasPrivate ? 'y' : 'n'}"]`,
            ).click();
            cy.findByText('Continue', { selector: 'button' }).click();
          });
        });
      },
      'supporting-evidence/private-medical-records': ({ afterHook }) => {
        cy.injectAxeThenAxeCheck();
        afterHook(() => {
          cy.get('@testData').then(({ providerFacility = [] }) => {
            providerFacility.forEach((facility, index) => {
              if (facility) {
                if (index > 0) {
                  cy.url().should('include', `index=${index}`);
                }
                cy.get('#add-facility-name')
                  .shadow()
                  .find('input')
                  .type(facility.providerFacilityName);

                cy.get('#country')
                  .shadow()
                  .find('select')
                  .select(facility.providerFacilityAddress.country);
                cy.get('#street')
                  .shadow()
                  .find('input')
                  .type(facility.providerFacilityAddress.street);
                if (facility.street2) {
                  cy.get('#street2')
                    .shadow()
                    .find('input')
                    .type(facility.providerFacilityAddress.street2);
                }
                cy.get('#city')
                  .shadow()
                  .find('input')
                  .type(facility.providerFacilityAddress.city);
                if (facility.providerFacilityAddress.country === 'USA') {
                  cy.get('#state')
                    .shadow()
                    .find('select')
                    .select(facility.providerFacilityAddress.state);
                } else {
                  cy.get('#state')
                    .shadow()
                    .find('input')
                    .type(facility.providerFacilityAddress.state);
                }
                cy.get('#postal')
                  .shadow()
                  .find('input')
                  .type(facility.providerFacilityAddress.postalCode);

                facility?.issues.forEach(issue => {
                  cy.get(`va-checkbox[value="${issue}"]`)
                    .shadow()
                    .find('input')
                    .check();
                });
                cy.fillDate('from', facility.treatmentDateRange?.from);
                cy.fillDate('to', facility.treatmentDateRange?.to);
                cy.axeCheck();

                // Add another
                if (index + 1 < providerFacility.length) {
                  cy.get('.vads-c-action-link--green').click();
                }
              }
            });
            cy.findByText('Continue', { selector: 'button' }).click();
          });
        });
      },
      'supporting-evidence/request-record-limitations': ({ afterHook }) => {
        afterHook(() => {
          cy.get('@testData').then(data => {
            cy.injectAxeThenAxeCheck();
            if (data.limitedConsent) {
              cy.get('va-textarea')
                .shadow()
                .find('textarea')
                .type(data.limitedConsent);
            }
            cy.findByText('Continue', { selector: 'button' }).click();
          });
        });
      },
    },

    setupPerTest: () => {
      cy.login(mockUser);
      setStoredSubTask({ benefitType: 'compensation' });

      cy.intercept('GET', '/v0/profile/status', mockStatus);
      cy.intercept('GET', '/v0/maintenance_windows', []);
      cy.intercept('POST', '/v0/upload_supporting_evidence', mockUpload);

      // Include legacy appeals to mock data for maximal test
      const dataSet = Cypress.currentTest.titlePath[1];
      cy.intercept(
        'GET',
        `/v1${CONTESTABLE_ISSUES_API}compensation`,
        dataSet === 'maximal-test'
          ? mockContestableIssuesWithLegacyAppeals
          : mockContestableIssues,
      );

      cy.intercept('PUT', '/v0/in_progress_forms/20-0995', mockInProgress);

      cy.intercept('POST', '/v1/supplemental_claims', mockSubmit);

      cy.get('@testData').then(testData => {
        cy.intercept('GET', '/v0/in_progress_forms/20-0995', testData);
        cy.intercept('PUT', '/v0/in_progress_forms/20-0995', testData);
        cy.intercept('GET', '/v0/feature_toggles?*', {
          data: { features: [{ name: 'supplemental_claim', value: true }] },
        });
      });

      // cy.route('POST', formConfig.submitUrl, { status: 200 });
    },

    // Skip tests in CI until the form is released.
    // Remove this setting when the form has a content page in production.
    skip: Cypress.env('CI'),
  },
  manifest,
  formConfig,
);

testForm(testConfig);
