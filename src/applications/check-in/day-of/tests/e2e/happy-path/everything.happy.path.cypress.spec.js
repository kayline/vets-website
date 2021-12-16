import { generateFeatureToggles } from '../../../api/local-mock-api/mocks/feature.toggles';
import '../support/commands';
import ValidateVeteran from '../../../../tests/e2e/pages/ValidateVeteran';
import Demographics from '../../../../tests/e2e/pages/Demographics';
import NextOfKin from '../../../../tests/e2e/pages/NextOfKin';
import EmergencyContact from '../../../../tests/e2e/pages/EmergencyContact';
import UpdateInformation from '../pages/UpdateInformation';
import Appointments from '../pages/Appointments';
import Confirmation from '../pages/Confirmation';

describe('Check In Experience -- ', () => {
  describe('everything path -- ', () => {
    beforeEach(function() {
      cy.authenticate();
      cy.getSingleAppointment();
      cy.successfulCheckin();
      cy.intercept(
        'GET',
        '/v0/feature_toggles*',
        generateFeatureToggles({
          checkInExperienceUpdateInformationPageEnabled: true,

          emergencyContactEnabled: true,
        }),
      );
    });
    afterEach(() => {
      cy.window().then(window => {
        window.sessionStorage.clear();
      });
    });
    it('everything Happy path', () => {
      cy.visitWithUUID();
      ValidateVeteran.validatePageLoaded('Check in at VA');
      cy.injectAxe();
      cy.axeCheck();
      ValidateVeteran.validateVeteran();
      ValidateVeteran.attemptToGoToNextPage();
      Demographics.validatePageLoaded();
      cy.injectAxe();
      cy.axeCheck();
      Demographics.attemptToGoToNextPage();
      NextOfKin.validatePageLoaded(
        'Is this your current next of kin information?',
      );
      cy.injectAxe();
      cy.axeCheck();
      NextOfKin.attemptToGoToNextPage();
      EmergencyContact.validatePageLoaded();
      cy.injectAxe();
      cy.axeCheck();
      EmergencyContact.attemptToGoToNextPage();
      UpdateInformation.validatePageLoaded();
      cy.injectAxe();
      cy.axeCheck();
      UpdateInformation.attemptToGoToNextPage('no');
      Appointments.validatePageLoaded();
      Appointments.validateAppointmentLength(3);
      cy.injectAxe();
      cy.axeCheck();
      Appointments.attemptCheckIn(2);
      Confirmation.validatePageLoaded();
      cy.injectAxe();
      cy.axeCheck();
    });
  });
});
