import path from 'path';
import testForm from 'platform/testing/e2e/cypress/support/form-tester';
import { createTestConfig } from 'platform/testing/e2e/cypress/support/form-tester/utilities';
import { WIZARD_STATUS_COMPLETE } from 'applications/static-pages/wizard';
import { WIZARD_STATUS } from '../../wizard/constants';
import formConfig from '../../config/form';
import manifest from '../../manifest.json';
import mockUser from './fixtures/mocks/mockUser.json';
import saveInProgress from './fixtures/mocks/saveInProgress.json';
import debts from './fixtures/mocks/debts.json';
import copays from './fixtures/mocks/copays.json';
import EnhancedVeteranEmploymentHistory from './pages/employment/EnhancedVeteranEmploymentHistory';
import SpouseEmploymentHistory from './pages/employment/SpouseEmploymentHistory';

Cypress.config('waitForAnimations', true);

const testConfig = createTestConfig(
  {
    skip: true,
    dataPrefix: 'data',
    dataSets: ['efsr-maximal'],
    fixtures: { data: path.join(__dirname, 'fixtures', 'data') },

    setupPerTest: () => {
      sessionStorage.setItem(WIZARD_STATUS, WIZARD_STATUS_COMPLETE);
      cy.login(mockUser);
      cy.intercept('GET', '/v0/feature_toggles*', {
        data: {
          features: [
            { name: 'show_financial_status_report_wizard', value: true },
            { name: 'show_financial_status_report', value: true },
            { name: 'combined_financial_status_report', value: true },
            {
              name: 'combined_financial_status_report_enhancements',
              value: true,
            },
          ],
        },
      });
      cy.intercept('GET', '/v0/debts', debts);
      cy.intercept('GET', '/v0/medical_copays', copays);
      cy.get('@testData').then(testData => {
        cy.intercept('PUT', '/v0/in_progress_forms/5655', testData);
        cy.intercept('GET', '/v0/in_progress_forms/5655', saveInProgress);
      });
      cy.intercept('POST', formConfig.submitUrl, {
        statusCode: 200,
        body: {
          status: 'Document has been successfully uploaded to filenet',
        },
      }).as('submitForm');
    },

    pageHooks: {
      introduction: () => {
        cy.findAllByText(/start/i, { selector: 'button' })
          .first()
          .click();
      },
      'all-available-debts': ({ afterHook }) => {
        afterHook(() => {
          cy.get(`input[name="request-help-with-debt"]`)
            .first()
            .check();
          cy.get(`input[name="request-help-with-copay"]`)
            .first()
            .check();
          cy.get('.usa-button-primary').click();
        });
      },
      'enhanced-employment-records': ({ afterHook }) => {
        afterHook(() => {
          EnhancedVeteranEmploymentHistory.fillEmployerInfo();
        });
      },
      'gross-monthly-income': ({ afterHook }) => {
        afterHook(() => {
          cy.get('#gross-monthly-income')
            .first()
            .shadow()
            .find('input')
            .type('1000');
          cy.get('.usa-button-primary').click();
        });
      },
      'deduction-checklist': ({ afterHook }) => {
        afterHook(() => {
          EnhancedVeteranEmploymentHistory.goBackAndValidateInput(
            '[data-testid="gross-monthly-income"]',
            '1000',
          );

          // continuing to deduction checklist
          EnhancedVeteranEmploymentHistory.attemptNextPage();

          cy.get(`input[name="State tax"]`)
            .first()
            .check();
          EnhancedVeteranEmploymentHistory.attemptNextPage();
        });
      },
      'deduction-values': ({ afterHook }) => {
        afterHook(() => {
          cy.get('#State\\ tax0')
            .first()
            .shadow()
            .find('input')
            .type('123');
          cy.get('.usa-button-primary').click();
        });
      },
      'household-expenses-checklist': ({ afterHook }) => {
        afterHook(() => {
          cy.get('#Rent0').check();
          cy.get('.usa-button-primary').click();
        });
      },
      'household-expenses-values': ({ afterHook }) => {
        afterHook(() => {
          cy.get('#Rent0')
            .first()
            .shadow()
            .find('input')
            .type('123');
          cy.get('.usa-button-primary').click();
        });
      },
      'credit-card-bills': ({ afterHook }) => {
        afterHook(() => {
          cy.get('#root_questions_hasCreditCardBillsYes').check();
          cy.get('.usa-button-primary').click();
        });
      },
      'your-credit-card-bills': ({ afterHook }) => {
        afterHook(() => {
          cy.get('#unpaidBalance')
            .first()
            .shadow()
            .find('input')
            .type('100');
          cy.get('#minMonthlyPayment')
            .first()
            .shadow()
            .find('input')
            .type('100');
          cy.get('#amountOverdue')
            .first()
            .shadow()
            .find('input')
            .type('100');
          cy.get('.usa-button-primary').click();
        });
      },
      'credit-card-bills-summary': ({ afterHook }) => {
        afterHook(() => {
          cy.get('.usa-button-primary').click();
        });
      },
      'enhanced-spouse-employment-records': ({ afterHook }) => {
        afterHook(() => {
          SpouseEmploymentHistory.fillEmployerInfo();
        });
      },
      'spouse-gross-monthly-income': ({ afterHook }) => {
        afterHook(() => {
          cy.get('#gross-monthly-income')
            .first()
            .shadow()
            .find('input')
            .type('1000');
          cy.get('.usa-button-primary').click();
        });
      },
      'spouse-deduction-checklist': ({ afterHook }) => {
        afterHook(() => {
          cy.get('[type="checkbox"][value="State tax"]').click();
          SpouseEmploymentHistory.attemptNextPage();
        });
      },
      'spouse-deduction-values': ({ afterHook }) => {
        afterHook(() => {
          cy.get('#State\\ tax0')
            .first()
            .shadow()
            .find('input')
            .type('123');
          SpouseEmploymentHistory.attemptNextPage();
        });
      },
      'dependent-ages': ({ afterHook }) => {
        afterHook(() => {
          cy.get('#dependentAge-0')
            .shadow()
            .find('input')
            .type('12');
          cy.get('#dependentAge-1')
            .shadow()
            .find('input')
            .type('17');
          cy.get('.usa-button-primary').click();
        });
      },
      'your-vehicle-records': ({ afterHook }) => {
        afterHook(() => {
          cy.get('va-number-input')
            .as('numberInputs')
            .should('have.length', 2);
          cy.get('#add-make-name')
            .first()
            .shadow()
            .find('input')
            .type('Make');
          cy.get('#add-model-name')
            .first()
            .shadow()
            .find('input')
            .type('Model');
          cy.get('#year')
            .first()
            .shadow()
            .find('input')
            .type('2000');
          cy.get('#estValue')
            .first()
            .shadow()
            .find('input')
            .type('1000');
          cy.get('.usa-button-primary').click();
        });
      },
      'vehicles-summary': ({ afterHook }) => {
        afterHook(() => {
          cy.get('[data-testid="mini-summary-card"]')
            .as('cards')
            .should('have.length', 1);
          cy.get('@cards')
            .eq(0)
            .should('contain', '$1,000.00')
            .and('contain', 'Make')
            .and('contain', 'Model')
            .and('contain', '2000');
          cy.get('.usa-button-primary').click();
        });
      },
      'cfsr-recreational-vehicle-records': ({ afterHook }) => {
        afterHook(() => {
          cy.findByLabelText(
            /What is the estimated value of all of your trailers, campers, and boats?/,
          ).type('2500');
          cy.get('.usa-button-primary').click();
        });
      },
      'other-assets-checklist': ({ afterHook }) => {
        afterHook(() => {
          cy.get('[type=checkbox]')
            .as('checklist')
            .should('have.length', 6);
          cy.get('@checklist')
            .eq(0)
            .click();
          cy.get('@checklist')
            .eq(1)
            .click();
          cy.get('.usa-button-primary').click();
        });
      },
      'other-assets-values': ({ afterHook }) => {
        afterHook(() => {
          cy.get('va-number-input')
            .as('numberInputs')
            .should('have.length', 2);
          cy.get('#Antiques0')
            .first()
            .shadow()
            .find('input')
            .type('1000');
          cy.get('[id="Collectibles, or collection(s)1"]')
            .first()
            .shadow()
            .find('input')
            .type('1500');
          cy.get('.usa-button-primary').click();
        });
      },
      'other-assets-summary': ({ afterHook }) => {
        afterHook(() => {
          cy.get('[data-testid="mini-summary-card"]')
            .as('cards')
            .should('have.length', 2);
          cy.get('@cards')
            .eq(0)
            .should('contain', 'Antiques')
            .and('contain', '$1,000.00');
          cy.get('@cards')
            .eq(1)
            .should('contain', 'Collectibles')
            .and('contain', '$1,500.00');
          cy.get('.usa-button-primary').click();
        });
      },
      'utility-bill-checklist': ({ afterHook }) => {
        afterHook(() => {
          cy.get('[type=checkbox]')
            .as('checklist')
            .should('have.length', 6);
          cy.get('@checklist')
            .eq(0)
            .click();
          cy.get('@checklist')
            .eq(1)
            .click();
          cy.get('.usa-button-primary').click();
        });
      },
      'utility-bill-values': ({ afterHook }) => {
        afterHook(() => {
          cy.get('va-number-input')
            .as('numberInputs')
            .should('have.length', 2);
          cy.get('#Electricity0')
            .first()
            .shadow()
            .find('input')
            .type('1000');
          cy.get('[id="Gas1"]')
            .first()
            .shadow()
            .find('input')
            .type('1500');
          cy.get('.usa-button-primary').click();
        });
      },
      'utility-bill-summary': ({ afterHook }) => {
        afterHook(() => {
          cy.get('[data-testid="mini-summary-card"]')
            .as('cards')
            .should('have.length', 2);
          cy.get('@cards')
            .eq(0)
            .should('contain', 'Electricity')
            .and('contain', '$1,000.00');
          cy.get('@cards')
            .eq(1)
            .should('contain', 'Gas')
            .and('contain', '$1,500.00');
          cy.get('.usa-button-primary').click();
        });
      },
      'resolution-option/0': ({ afterHook }) => {
        afterHook(() => {
          cy.get('[type="radio"][value="monthly"]').click();
          cy.get('.usa-button-primary').click();
        });
      },
      'resolution-comment/0': ({ afterHook }) => {
        afterHook(() => {
          cy.get(`#root_resolutionComment`).type('10.00');
          cy.get('.usa-button-primary').click();
        });
      },
      'resolution-option/1': ({ afterHook }) => {
        afterHook(() => {
          cy.get('[type="radio"][value="waiver"]').click();
          cy.get('[type="checkbox"]').click();
          cy.get('.usa-button-primary').click();
        });
      },
      'review-and-submit': ({ afterHook }) => {
        afterHook(() => {
          cy.get('#veteran-signature')
            .shadow()
            .find('input')
            .first()
            .type('Mark Webb');
          cy.get(`input[name="veteran-certify"]`).check();
          cy.get(`input[name="privacy-policy"]`).check();
          cy.findAllByText(/Submit your request/i, {
            selector: 'button',
          }).click();
        });
      },
    },
  },
  manifest,
  formConfig,
);

testForm(testConfig);
