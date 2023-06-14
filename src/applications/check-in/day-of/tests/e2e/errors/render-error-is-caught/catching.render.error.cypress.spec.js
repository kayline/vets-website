import '../../../../../tests/e2e/commands';

import ApiInitializer from '../../../../../api/local-mock-api/e2e/ApiInitializer';
import ValidateVeteran from '../../../../../tests/e2e/pages/ValidateVeteran';
import Error from '../../pages/Error';
import Demographics from '../../../../../tests/e2e/pages/Demographics';
import NextOfKin from '../../../../../tests/e2e/pages/NextOfKin';
import EmergencyContact from '../../../../../tests/e2e/pages/EmergencyContact';

describe('Check In Experience ', () => {
  beforeEach(() => {
    const {
      initializeFeatureToggle,
      initializeSessionGet,
      initializeSessionPost,
      initializeCheckInDataGet,
      initializeDemographicsPatch,
    } = ApiInitializer;
    initializeFeatureToggle.withCurrentFeatures();
    initializeSessionGet.withSuccessfulNewSession();
    initializeSessionPost.withSuccess();
    initializeDemographicsPatch.withSuccess();
    initializeCheckInDataGet.withBadData();
  });
  afterEach(() => {
    cy.window().then(window => {
      window.sessionStorage.clear();
    });
  });
  it('Render Error is caught', () => {
    cy.visitWithUUID();

    ValidateVeteran.validatePage.dayOf();
    cy.injectAxeThenAxeCheck();
    ValidateVeteran.validateVeteran();
    ValidateVeteran.attemptToGoToNextPage();

    Demographics.validatePageLoaded();
    cy.injectAxeThenAxeCheck();
    Demographics.attemptToGoToNextPage();

    EmergencyContact.validatePageLoaded();
    cy.injectAxeThenAxeCheck();
    EmergencyContact.attemptToGoToNextPage();

    NextOfKin.validatePageLoaded(
      'Check-In Is this your current next of kin information?',
    );
    cy.injectAxeThenAxeCheck();
    NextOfKin.attemptToGoToNextPage();

    // Fails on the rendering of the API call
    Error.validatePageLoaded();
    cy.injectAxeThenAxeCheck();
  });
});
