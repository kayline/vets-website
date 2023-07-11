import mockMessages from '../fixtures/messages-response.json';
import mockCategories from '../fixtures/categories-response.json';
import mockFolders from '../fixtures/folder-response.json';
import mockToggles from '../fixtures/toggles-response.json';

class FolderLoadPage {
  foldersSetup = () => {
    cy.intercept('GET', '/v0/feature_toggles?*', mockToggles).as(
      'featureToggle',
    );
    cy.intercept(
      'GET',
      '/my_health/v1/messaging/messages/categories',
      mockCategories,
    ).as('categories');
    cy.intercept('GET', '/my_health/v1/messaging/folders*', mockFolders).as(
      'folders',
    );
    cy.intercept(
      'GET',
      '/my_health/v1/messaging/folders/0/threads?*',
      mockMessages,
    ).as('inboxMessages');
    cy.visit('my-health/secure-messages/inbox/', {
      onBeforeLoad: win => {
        cy.stub(win, 'print');
      },
    });
  };

  loadFolderMessages = (folderName, folderNumber, folderResponseIndex) => {
    this.foldersSetup();
    cy.intercept('GET', `/my_health/v1/messaging/folders/${folderNumber}*`, {
      data: mockFolders.data[folderResponseIndex],
    }).as('inboxFolderMetaData');

    cy.get(`[data-testid="${folderName}-sidebar"]`).click();

    cy.wait('@folders');
    cy.wait('@featureToggle');
    cy.wait('@mockUser');
    cy.wait('@inboxMessages');
  };

  loadInboxMessages = () => {
    this.loadFolderMessages('inbox', 0, 0);
  };

  loadDraftMessages = () => {
    this.loadFolderMessages('drafts', -2, 1);
  };

  loadSentMessages = () => {
    this.loadFolderMessages('sent', -1, 2);
  };

  loadDeletedMessages = () => {
    this.loadFolderMessages('trash', -3, 3);
  };

  getFolderHeader = text => {
    cy.get('[data-testid="folder-header"]').should('have.text', `${text}`);
  };
}

export default new FolderLoadPage();
