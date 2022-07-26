import Timeouts from 'platform/testing/e2e/timeouts';
import { generateMockUser } from './mocks/user';

const selectors = {
  menu: '#login-root button[aria-controls="account-menu"]',
  signOut: '#account-menu ul li:nth-child(4)',
};

describe('User Nav Test', () => {
  ['sis', 'iam'].forEach(authBroker => {
    it(`Displays the proper elements on the nav (${authBroker})`, () => {
      const mockUser = generateMockUser({ authBroker });
      const signOutSelector = `${selectors.signOut} ${
        authBroker === 'iam' ? 'a' : 'button'
      }`;
      cy.login(mockUser);
      cy.visit('/my-va');
      cy.title().should('contain', 'My VA | Veterans Affairs');
      Cypress.on('uncaught:exception', () => {
        return false;
        // Skip over an API call that results in a network error.
      });

      cy.get(selectors.menu, { timeout: Timeouts.slow })
        .should('be.visible')
        .then(dropDownMenu => {
          cy.wrap(dropDownMenu).click();
          cy.get(signOutSelector, { timeout: Timeouts.slow })
            .should('be.visible')
            .and('contain', 'Sign Out')
            .then(signOutButton => {
              cy.wrap(signOutButton).click();
              cy.url().should(
                'match',
                /\/sessions\/slo\/new|\/my-va|chrome-error:\/\/chromewebdata\//,
              );
            });
        });
    });
  });
});
