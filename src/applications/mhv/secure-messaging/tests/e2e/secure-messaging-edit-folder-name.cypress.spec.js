import SecureMessagingSite from './sm_site/SecureMessagingSite';
import PatientInboxPage from './pages/PatientInboxPage';
import customFolderMessage from './fixtures/messages-response.json';
import customFolder from './fixtures/folder-custom-metadata.json';

describe('Secure Messaging Custom Folder Edit Folder Name Message Validation', () => {
  it('Axe Check Custom Folder List', () => {
    const landingPage = new PatientInboxPage();
    const site = new SecureMessagingSite();
    site.login();

    cy.intercept(
      'GET',
      '/my_health/v1/messaging/folders/7038175',
      customFolder,
    ).as('test2Folder');
    landingPage.loadInboxMessages();
    cy.intercept(
      'GET',
      '/my_health/v1/messaging/folders/7038175/threads?pageSize=100&pageNumber=1&sortField=SENT_DATE&sortOrder=DESC',
      customFolderMessage,
    ).as('customFolder');

    cy.get('[data-testid="my-folders-sidebar"]').click();
    cy.contains('TEST2').click();
    cy.wait('@customFolder');
    cy.get('.left-button').click({ force: true });
    cy.get('[name="new-folder-name"]')
      .shadow()
      .find('[id="inputField"]')
      .type('Testing');
    cy.get('[visible=""] > [secondary=""]').click();
    cy.injectAxe();
    cy.axeCheck();
  });
});
