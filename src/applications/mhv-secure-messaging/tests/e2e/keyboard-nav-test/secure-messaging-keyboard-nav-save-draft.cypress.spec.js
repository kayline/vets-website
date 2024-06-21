import SecureMessagingSite from '../sm_site/SecureMessagingSite';
import PatientInboxPage from '../pages/PatientInboxPage';
import PatientComposePage from '../pages/PatientComposePage';
import requestBody from '../fixtures/message-compose-request-body.json';
import { AXE_CONTEXT } from '../utils/constants';

describe.skip('Check confirmation message after save draft', () => {
  const site = new SecureMessagingSite();

  it('Check confirmation message after save draft', () => {
    site.login();
    PatientInboxPage.loadInboxMessages();

    PatientInboxPage.navigateToComposePage(true);
    PatientComposePage.selectRecipient(requestBody.recipientId);
    PatientComposePage.selectCategory(requestBody.category);

    PatientComposePage.getMessageSubjectField().type(`${requestBody.subject}`);
    PatientComposePage.getMessageBodyField().type(`${requestBody.body}`, {
      force: true,
    });
    PatientComposePage.saveDraftByKeyboard();
    cy.injectAxe();
    cy.axeCheck(AXE_CONTEXT, {
      rules: {
        'aria-required-children': {
          enabled: false,
        },
        'color-contrast': {
          enabled: false,
        },
      },
    });
    // next line is for checking if assertion works properly
    PatientComposePage.verifyDraftSaveButtonOnFocus();

    // cy.get('.last-save-time').should('be.focused');
    // cy.reload();
    // cy.pause();
  });
});
