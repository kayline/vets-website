/**
 * [TestRail-integrated] Spec for Higher Level Review - Wizard
 * @testrailinfo projectId 5
 * @testrailinfo suiteId 6
 * @testrailinfo groupId 3256
 * @testrailinfo runName HLR-e2e-ContactLoop
 */

import { WIZARD_STATUS_COMPLETE } from 'platform/site-wide/wizard';

import {
  BASE_URL,
  WIZARD_STATUS,
  CONTESTABLE_ISSUES_API,
  CONTACT_INFO_PATH,
} from '../constants';

import mockUser from './fixtures/mocks/user.json';
import mockStatus from './fixtures/mocks/profile-status.json';
import mockV2Data from './fixtures/data/maximal-test-v2.json';

// Telephone specific responses
import mockTelephoneUpdate from './fixtures/mocks/telephone-update.json';
import mockTelephoneUpdateSuccess from './fixtures/mocks/telephone-update-success.json';

const checkOpt = {
  waitForAnimations: true,
};

describe('HLR contact info loop', () => {
  Cypress.config({ requestTimeout: 10000 });
  const MAIN_CONTACT_PATH = `${BASE_URL}/${CONTACT_INFO_PATH}`;

  beforeEach(() => {
    window.dataLayer = [];
    cy.intercept('GET', '/v0/feature_toggles?*', {
      data: {
        type: 'feature_toggles',
        features: [{ name: 'loop_pages', value: true }],
      },
    });

    cy.intercept('GET', `/v1${CONTESTABLE_ISSUES_API}compensation`, []);
    cy.intercept('GET', '/v0/in_progress_forms/20-0996', mockV2Data);
    cy.intercept('PUT', '/v0/in_progress_forms/20-0996', mockV2Data);

    // telephone
    cy.intercept('PUT', '/v0/profile/telephones', mockTelephoneUpdate);
    cy.intercept('GET', '/v0/profile/status/*', mockTelephoneUpdateSuccess);

    sessionStorage.setItem(WIZARD_STATUS, WIZARD_STATUS_COMPLETE);

    cy.login(mockUser);
    cy.intercept('GET', '/v0/profile/status', mockStatus);

    cy.visit(BASE_URL);
    cy.injectAxe();
  });

  const getToContactPage = () => {
    // start form
    cy.findAllByText(/start the request/i, { selector: 'a' })
      .first()
      .click();

    // Veteran info (DOB, SSN, etc)
    cy.location('pathname').should('eq', `${BASE_URL}/veteran-information`);
    cy.findAllByText(/continue/i, { selector: 'button' })
      .first()
      .click();

    // Homeless question
    cy.location('pathname').should('eq', `${BASE_URL}/homeless`);
    cy.get('[type="radio"][value="N"]').check(checkOpt);
    cy.findAllByText(/continue/i, { selector: 'button' })
      .first()
      .click();
  };

  it('should edit info on a new page & cancel returns to contact info page - C12883', () => {
    getToContactPage();

    // Contact info
    cy.location('pathname').should('eq', `${BASE_URL}/contact-information`);
    cy.injectAxe();
    cy.axeCheck();

    // Mobile phone
    cy.get('a[href$="phone"]').click();
    cy.location('pathname').should('eq', `${BASE_URL}/edit-mobile-phone`);
    cy.injectAxe();
    cy.axeCheck();

    cy.findByText(/cancel/i, { selector: 'button' }).click();
    cy.location('pathname').should('eq', `${BASE_URL}/contact-information`);

    // Email
    cy.get('a[href$="email-address"]').click();
    cy.location('pathname').should('eq', `${BASE_URL}/edit-email-address`);
    cy.injectAxe();
    cy.axeCheck();

    cy.findByText(/cancel/i, { selector: 'button' }).click();
    cy.location('pathname').should('eq', `${BASE_URL}/contact-information`);

    // Mailing address
    cy.get('a[href$="mailing-address"]').click();
    cy.location('pathname').should('eq', `${BASE_URL}/edit-mailing-address`);
    cy.injectAxe();
    cy.axeCheck();

    cy.findByText(/cancel/i, { selector: 'button' }).click();
    cy.location('pathname').should('eq', `${BASE_URL}/contact-information`);
  });

  // eslint-disable-next-line @department-of-veterans-affairs/axe-check-required
  it('should edit info on a new page, update & return to contact info page - C12884', () => {
    getToContactPage();
    cy.intercept('/v0/profile/telephones', mockTelephoneUpdateSuccess);

    // Mobile phone
    cy.get('a[href$="mobile-phone"]').click();
    cy.contains('Edit mobile phone').should('be.visible');
    cy.location('pathname').should('eq', `${BASE_URL}/edit-mobile-phone`);

    cy.findByLabelText(/mobile phone/i)
      .clear()
      .type('8885551212');
    cy.findAllByText(/save/i, { selector: 'button' })
      .first()
      .click();

    cy.location('pathname').should('eq', MAIN_CONTACT_PATH);

    // Skipping AXE-check; already done in previous test.
  });
});
