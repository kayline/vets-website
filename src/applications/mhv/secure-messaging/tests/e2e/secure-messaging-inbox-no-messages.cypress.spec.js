import SecureMessagingSite from './sm_site/SecureMessagingSite';
import PatientInboxPage from './pages/PatientInboxPage';
import mockInboxNoMessages from './fixtures/empty-thread-response.json';
import { Assertions, AXE_CONTEXT, Locators } from './utils/constants';

describe('Secure Messaging Inbox No Messages', () => {
  it('inbox no messages', () => {
    const landingPage = new PatientInboxPage();
    const site = new SecureMessagingSite();

    site.login();
    landingPage.loadInboxMessages(mockInboxNoMessages);

    cy.get('@inboxMessages')
      .its('response')
      .should('have.property', Assertions.CODE_STATUS, 200);

    cy.get(Locators.NO_MESS)
      .should('have.text', Assertions.NO_MESSAGE_FOLDER)
      .should('be.visible');
    cy.injectAxe();
    cy.axeCheck(AXE_CONTEXT, {
      rules: {
        'aria-required-children': {
          enabled: false,
        },
      },
    });
  });
});
