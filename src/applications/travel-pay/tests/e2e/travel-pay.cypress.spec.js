/* eslint-disable @department-of-veterans-affairs/axe-check-required */
import { appName, rootUrl } from '../../manifest.json';
import user from '../fixtures/user.json';
import ApiInitializer from './utilities/ApiInitializer';

const testStatuses = [
  'Claim Submitted',
  'Saved',
  'In Process',
  'Incomplete',
  'Appealed',
  'Manual Review',
  'Closed',
  'On Hold',
];

Cypress.Commands.add('openFilters', () => {
  cy.get('va-accordion-item[data-testid="filters-accordion"]')
    .shadow()
    .find('h2 button[aria-controls="content"]')
    .eq(0)
    .click({ waitForAnimations: true });
});

describe(`${appName} -- Status Page`, () => {
  beforeEach(() => {
    cy.intercept('/data/cms/vamc-ehr.json', {});
    ApiInitializer.initializeFeatureToggle.withAllFeatures();
    ApiInitializer.initializeClaims.happyPath();
    cy.login(user);
    cy.visit(rootUrl);
    cy.injectAxeThenAxeCheck();
  });

  it('defaults to "most recent" sort order', () => {
    cy.get('select[name="claimsOrder"]').should('have.value', 'mostRecent');
  });

  it('shows a list of claims ordered by appointment date descending by default', () => {
    cy.get('h3[data-testid="travel-claim-details"]')
      .first()
      .should('include.text', 'May 15, 2024');

    // Using fifth element to be less susceptible to
    // pagination changes and more confident in terms
    // of correct sort order
    cy.get('h3[data-testid="travel-claim-details"]')
      .eq(4)
      .should('include.text', ' June 22, 2023');
  });

  it('navigates to view claim details and back to status page', () => {
    cy.get('h3[data-testid="travel-claim-details"]~a')
      .first()
      .click();

    cy.location('pathname').should(
      'eq',
      '/my-health/travel-claim-status/498d60a7-fe33-4ea8-80a6-80a27d9fc212',
    );

    // TODO: update mock data to reflect proper claim number formatting
    cy.get('.claim-details-claim-number').should(
      'include.text',
      'Claim number: d00606da-ee39-4a0c-b505-83f6aa052594',
    );

    cy.get('.claim-details-breadcrumb-wrapper .go-back-link').click();
    cy.location('pathname').should('eq', '/my-health/travel-claim-status/');
  });

  it('sorts the claims ordered by appointment date ascending on user action', () => {
    cy.get('select[name="claimsOrder"]').should('have.value', 'mostRecent');
    cy.get('select[name="claimsOrder"]').select('oldest');
    cy.get('select[name="claimsOrder"]').should('have.value', 'oldest');

    cy.get('va-button[data-testid="Sort travel claims"]').click();

    cy.get('h3[data-testid="travel-claim-details"]')
      .first()
      .should('include.text', 'February 2, 2022');

    // Using fifth element to be less susceptible to
    // pagination changes and more confident in terms
    // of correct sort order
    cy.get('h3[data-testid="travel-claim-details"]')
      .eq(4)
      .should('include.text', 'August 11, 2022');
  });

  it('filters the claims by status and preserves default sort', () => {
    cy.openFilters();
    cy.selectVaCheckbox('Saved', true);
    cy.get('va-button[data-testid="apply_filters"]').click({
      waitForAnimations: true,
    });

    cy.get('va-card').should('have.length', 5);
  });

  it('filters the claims by multiple statuses and preserves default sort', () => {
    cy.openFilters();
    cy.selectVaCheckbox('Saved', true);
    cy.selectVaCheckbox('Incomplete', true);
    cy.get('va-button[data-testid="apply_filters"]').click({
      waitForAnimations: true,
    });

    cy.get('h3[data-testid="travel-claim-details"]').should('have.length', 6);
    cy.get('h3[data-testid="travel-claim-details"]')
      .first()
      .should('include.text', 'May 15, 2024');
    cy.get('h3[data-testid="travel-claim-details"]')
      .eq(5)
      .should('include.text', 'March 27, 2022');
  });

  it('filters the claims by a date range preset', () => {
    // the month argument is 0-indexed in the date constructor,
    // so this is setting the date to June 25, 2024, i.e., 6/25/24
    cy.clock(new Date(2024, 5, 25), ['Date']);

    cy.openFilters();

    cy.get('select[name="claimsDates"]').should('have.value', 'all');
    cy.get('select[name="claimsDates"]').select('Past 3 Months');
    cy.get('select[name="claimsDates"]').should('have.value', 'Past 3 Months');

    cy.get('va-button[data-testid="apply_filters"]').click({
      waitForAnimations: true,
    });

    cy.get('h3[data-testid="travel-claim-details"]').should('have.length', 1);

    cy.get('h3[data-testid="travel-claim-details"]')
      .first()
      .should('include.text', 'May 15, 2024');
  });

  it('filters by multiple properties with non-default sorting', () => {
    cy.get('select[name="claimsOrder"]').select('oldest');
    cy.get('select[name="claimsOrder"]').should('have.value', 'oldest');
    cy.get('va-button[data-testid="Sort travel claims"]').click();

    cy.openFilters();
    cy.selectVaCheckbox('Claim Submitted', true);
    cy.get('select[name="claimsDates"]').select('All of 2023');
    cy.get('select[name="claimsDates"]').should('have.value', 'All of 2023');

    cy.get('va-button[data-testid="apply_filters"]').click({
      waitForAnimations: true,
    });

    cy.get('h3[data-testid="travel-claim-details"]').should('have.length', 3);
    cy.get('h3[data-testid="travel-claim-details"]')
      .first()
      .should('include.text', 'May 17, 2023');
    cy.get('h3[data-testid="travel-claim-details"]')
      .eq(2)
      .should('include.text', 'December 28, 2023');
  });

  it('resets the filters when button is pressed', () => {
    cy.openFilters();
    cy.selectVaCheckbox('Saved', true);
    cy.get('va-button[data-testid="apply_filters"]').click({
      waitForAnimations: true,
    });
    cy.get('va-button[data-testid="reset_search"]').click({
      waitForAnimations: true,
    });
    cy.get('h3[data-testid="travel-claim-details"]').should('have.length', 10);
    testStatuses.forEach(statusName => {
      cy.get(`va-checkbox[name="${statusName}"`)
        .shadow()
        .find('input[type="checkbox"]')
        .should('not.be.checked');
    });
    cy.get('h3[data-testid="travel-claim-details"]')
      .first()
      .should('include.text', 'May 15, 2024');
  });

  it('preserves sort order when filters are applied', () => {
    cy.get('select[name="claimsOrder"]').select('oldest');
    cy.get('va-button[data-testid="Sort travel claims"]').click();
    cy.openFilters();
    cy.selectVaCheckbox('Saved', true);
    cy.get('va-button[data-testid="apply_filters"]').click({
      waitForAnimations: true,
    });
    cy.get('h3[data-testid="travel-claim-details"]')
      .first()
      .should('include.text', 'March 27, 2022');
    cy.get('h3[data-testid="travel-claim-details"]')
      .eq(4)
      .should('include.text', 'August 16, 2023');
  });
});
