import * as h from '../../helpers';
import { ROUTES } from '../../../../constants';

// Flow D
// Service Period - During both
// Burn Pit 2.1 - No
// Burn Pit 2.1.1 - No
// Burn Pit 2.1.2 - No
// Agent Orange 2.2.A - No
// Agent Orange 2.2.1.A - No
// Agent Orange 2.2.2 - No
// Agent Orange 2.2.3 - No
// Radiation 2.3.A - No
// Camp Lejeune 2.4 - Yes
// Results 2 (Yes to Camp Lejeune only)

// Note: anything requiring a VA button click is tested here as unit tests cannot
// target the shadow DOM
describe('PACT Act', () => {
  describe('During both of these time periods - "Yes" to Camp Lejeune only (Results Screen 2)', () => {
    it('navigates through the flow forward and backward successfully', () => {
      cy.visit('/pact-act-wizard-test');

      // Home
      h.verifyUrl(ROUTES.HOME);
      cy.injectAxeThenAxeCheck();
      h.clickStart();

      // SERVICE_PERIOD
      h.verifyUrl(ROUTES.SERVICE_PERIOD);
      h.selectRadio(h.SERVICE_PERIOD_INPUT, 2);
      h.clickContinue();

      // BURN_PIT_2_1
      h.verifyUrl(ROUTES.BURN_PIT_2_1);
      h.selectRadio(h.BURN_PIT_2_1_INPUT, 1);
      h.clickContinue();

      // BURN_PIT_2_1_1
      h.verifyUrl(ROUTES.BURN_PIT_2_1_1);
      h.selectRadio(h.BURN_PIT_2_1_1_INPUT, 1);
      h.clickContinue();

      // BURN_PIT_2_1_2
      h.verifyUrl(ROUTES.BURN_PIT_2_1_2);
      h.selectRadio(h.BURN_PIT_2_1_2_INPUT, 1);
      h.clickContinue();

      // ORANGE_2_2_A
      h.verifyUrl(ROUTES.ORANGE_2_2_A);
      h.selectRadio(h.ORANGE_2_2_A_INPUT, 1);
      h.clickContinue();

      // ORANGE_2_2_1_A
      h.verifyUrl(ROUTES.ORANGE_2_2_1_A);
      h.selectRadio(h.ORANGE_2_2_1_A_INPUT, 1);
      h.clickContinue();

      // ORANGE_2_2_2
      h.verifyUrl(ROUTES.ORANGE_2_2_2);
      h.selectRadio(h.ORANGE_2_2_2_INPUT, 1);
      h.clickContinue();

      // ORANGE_2_2_3
      h.verifyUrl(ROUTES.ORANGE_2_2_3);
      h.selectRadio(h.ORANGE_2_2_3_INPUT, 1);
      h.clickContinue();

      // TODO add Radiation & Lejeune questions and Results screen 2

      // ORANGE_2_2_3
      h.verifyUrl(ROUTES.ORANGE_2_2_3);
      h.clickBack();

      // ORANGE_2_2_2
      h.verifyUrl(ROUTES.ORANGE_2_2_2);
      h.clickBack();

      // ORANGE_2_2_1_A
      h.verifyUrl(ROUTES.ORANGE_2_2_1_A);
      h.clickBack();

      // ORANGE_2_2_A
      h.verifyUrl(ROUTES.ORANGE_2_2_A);
      h.clickBack();

      // BURN_PIT_2_1_2
      h.verifyUrl(ROUTES.BURN_PIT_2_1_2);
      h.clickBack();

      // BURN_PIT_2_1_1
      h.verifyUrl(ROUTES.BURN_PIT_2_1_1);
      h.clickBack();

      // BURN_PIT_2_1
      h.verifyUrl(ROUTES.BURN_PIT_2_1);
      h.clickBack();

      // SERVICE_PERIOD
      h.verifyUrl(ROUTES.SERVICE_PERIOD);
      h.clickBack();

      // Home
      h.verifyUrl(ROUTES.HOME);
    });
  });
});
