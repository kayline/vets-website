import { generateFeatureToggles } from '../../../../api/local-mock-api/mocks/feature.toggles';
import '../../support/commands';

import validateVeteran from '../../../../../tests/e2e/pages/ValidateVeteran';

import Error from '../../../../../tests/e2e/pages/Error';

import apiInitializer from '../../support/ApiInitializer';

describe('Pre-Check In Experience ', () => {
  describe('Error handling', () => {
    describe('POST /check_in/v2/session/', () => {
      beforeEach(function() {
        cy.intercept('GET', '/v0/feature_toggles*', generateFeatureToggles({}));
        apiInitializer.initializeSessionGet.withSuccessfulNewSession();

        apiInitializer.initializeSessionPost.withFailure(400);
      });
      afterEach(() => {
        cy.window().then(window => {
          window.sessionStorage.clear();
        });
      });
      it('bad status code (400)', () => {
        cy.visitPreCheckInWithUUID();
        // page: Validate
        validateVeteran.validatePageLoaded();
        validateVeteran.validateVeteran();
        cy.injectAxe();
        cy.axeCheck();

        validateVeteran.attemptToGoToNextPage();

        Error.validatePageLoaded();
      });
    });
  });
});
