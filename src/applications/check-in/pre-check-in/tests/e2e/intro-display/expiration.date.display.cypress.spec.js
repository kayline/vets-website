import { generateFeatureToggles } from '../../../api/local-mock-api/mocks/feature.toggles';
import '../support/commands';

import validateVeteran from '../pages/ValidateVeteran';
import introduction from '../pages/Introduction';

import apiInitializer from '../support/ApiInitializer';

describe('Pre-Check In Experience', () => {
  describe('Introduction Page', () => {
    beforeEach(function() {
      cy.intercept(
        'GET',
        '/v0/feature_toggles*',
        generateFeatureToggles({
          checkInExperienceUpdateInformationPageEnabled: true,
        }),
      );
      apiInitializer.initializeSessionGet.withSuccessfulNewSession();

      apiInitializer.initializeSessionPost.withSuccess();
      cy.visitPreCheckInWithUUID();
      validateVeteran.validateVeteran();
      validateVeteran.attemptToGoToNextPage();
      introduction.validatePageLoaded();
    });
    afterEach(() => {
      cy.window().then(window => {
        window.sessionStorage.clear();
      });
    });
    it('expiration date is day before appointment', () => {
      introduction.validateExpirationDate();
    });
  });
});
