import manifest from '../../manifest.json';
import SecureMessagingSite from './sm_site/SecureMessagingSite';
import PatientInboxPage from './pages/PatientInboxPage';
import mockDraftsFolder from './fixtures/folder-drafts-metadata.json';
import mockSentFolder from './fixtures/sentResponse/folder-sent-metadata.json';
import particularFolderResponse from './fixtures/drafts-response.json';
import customFolderResponse from './fixtures/message-custom-response.json';
import mockSearchMessages from './fixtures/search-COVID-results.json';
import mockSearchCustomMessages from './fixtures/search-MEDICATION-results.json';
import mockTrashFolder from './fixtures/trashResponse/folder-deleted-metadata.json';
import mockCustomFolder from './fixtures/folder-custom-metadata.json';
import mockFolders from './fixtures/generalResponses/folders.json';
import { AXE_CONTEXT } from './utils/constants';
import PatientMessageCustomFolderPage from './pages/PatientMessageCustomFolderPage';

describe(manifest.appName, () => {
  describe('Advanced search in Inbox', () => {
    beforeEach(() => {
      const site = new SecureMessagingSite();
      const landingPage = new PatientInboxPage();
      site.login();
      landingPage.loadInboxMessages();
      cy.intercept(
        'POST',
        '/my_health/v1/messaging/folders/*/search',
        mockSearchMessages,
      );
      landingPage.openAdvancedSearch();
      landingPage.selectAdvancedSearchCategory();
      landingPage.submitSearchButton();
    });
    it('Check all inbox messages contain the searched category', () => {
      cy.get('[data-testid="message-list-item"]')
        .should('contain', 'COVID')
        .and('have.length', mockSearchMessages.data.length);
      cy.injectAxe();
      cy.axeCheck(AXE_CONTEXT, {
        rules: {
          'aria-required-children': {
            enabled: false,
          },
        },
      });
    });
    it('Check the search message label', () => {
      cy.get('[data-testid="search-message-folder-input-label"]')
        .should('contain', '4')
        .and('contain', 'Category: "covid"');
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
  describe('Advanced search in Drafts', () => {
    beforeEach(() => {
      const site = new SecureMessagingSite();
      const landingPage = new PatientInboxPage();
      site.login();
      landingPage.loadInboxMessages();
      cy.intercept(
        'GET',
        '/my_health/v1/messaging/folders/-2*',
        mockDraftsFolder,
      );
      cy.intercept(
        'GET',
        '/my_health/v1/messaging/folders/-2/threads?**',
        particularFolderResponse,
      );
      cy.get('[data-testid="drafts-sidebar"]').click();
      cy.intercept(
        'POST',
        '/my_health/v1/messaging/folders/*/search',
        mockSearchMessages,
      );
      landingPage.openAdvancedSearch();
      landingPage.selectAdvancedSearchCategory();
      landingPage.submitSearchButton();
    });
    it('Check all draft messages contain the searched category', () => {
      cy.get('[data-testid="message-list-item"]')
        .should('contain', 'COVID')
        .and('have.length', mockSearchMessages.data.length);
      cy.injectAxe();
      cy.axeCheck(AXE_CONTEXT, {
        rules: {
          'aria-required-children': {
            enabled: false,
          },
        },
      });
    });
    it('Check the search message label', () => {
      cy.get('[data-testid="search-message-folder-input-label"]')
        .should('contain', '4')
        .and('contain', 'Category: "covid"');
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
  describe('Advanced search in Sent', () => {
    beforeEach(() => {
      const site = new SecureMessagingSite();
      site.login();
      const landingPage = new PatientInboxPage();
      landingPage.loadInboxMessages();
      cy.intercept(
        'GET',
        '/my_health/v1/messaging/folders/-1*',
        mockSentFolder,
      ).as('basicSearchRequestDraftsMeta');
      cy.intercept(
        'GET',
        '/my_health/v1/messaging/folders/-1/threads?**',
        particularFolderResponse,
      );
      cy.get('[data-testid="sent-sidebar"]').click();
      cy.intercept(
        'POST',
        '/my_health/v1/messaging/folders/*/search',
        mockSearchMessages,
      ).as('advancedSearchRequest');
      landingPage.openAdvancedSearch();
      landingPage.selectAdvancedSearchCategory();
      landingPage.submitSearchButton();
    });
    it('Check all sent messages contain the searched category', () => {
      cy.get('[data-testid="message-list-item"]')
        .should('contain', 'COVID')
        .and('have.length', mockSearchMessages.data.length);
      cy.injectAxe();
      cy.axeCheck(AXE_CONTEXT, {
        rules: {
          'aria-required-children': {
            enabled: false,
          },
        },
      });
    });
    it('Check the search message label', () => {
      cy.get('[data-testid="search-message-folder-input-label"]')
        .should('contain', '4')
        .and('contain', 'Category: "covid"');
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
  describe('Advanced search in Trash', () => {
    beforeEach(() => {
      const site = new SecureMessagingSite();
      site.login();
      const landingPage = new PatientInboxPage();
      landingPage.loadInboxMessages();
      cy.intercept(
        'GET',
        '/my_health/v1/messaging/folders/-3*',
        mockTrashFolder,
      );
      cy.intercept(
        'GET',
        '/my_health/v1/messaging/folders/-3/threads?**',
        particularFolderResponse,
      );
      cy.get('[data-testid="trash-sidebar"]').click();
      cy.intercept(
        'POST',
        '/my_health/v1/messaging/folders/*/search',
        mockSearchMessages,
      );
      landingPage.openAdvancedSearch();
      landingPage.selectAdvancedSearchCategory();
      landingPage.submitSearchButton();
    });
    it('Check all messages contain the searched category', () => {
      cy.get('[data-testid="message-list-item"]')
        .should('contain', 'COVID')
        .and('have.length', mockSearchMessages.data.length);
      cy.injectAxe();
      cy.axeCheck(AXE_CONTEXT, {
        rules: {
          'aria-required-children': {
            enabled: false,
          },
        },
      });
    });
    it('Check the search message label', () => {
      cy.get('[data-testid="search-message-folder-input-label"]')
        .should('contain', '4')
        .and('contain', 'Category: "covid"');
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
  describe.skip('Advanced search in Custom folder', () => {
    beforeEach(() => {
      const site = new SecureMessagingSite();
      site.login();
      const landingPage = new PatientInboxPage();
      landingPage.loadInboxMessages();
      PatientMessageCustomFolderPage.loadMessages();
      cy.intercept('GET', '/my_health/v1/messaging/folders*', mockFolders);
      cy.intercept(
        'GET',
        '/my_health/v1/messaging/folders/7038175*',
        mockCustomFolder,
      );
      cy.intercept(
        'GET',
        '/my_health/v1/messaging/folders/7038175/threads?**',
        customFolderResponse,
      );
      cy.intercept(
        'POST',
        '/my_health/v1/messaging/folders/*/search',
        mockSearchCustomMessages,
      ).as('customFolderMessages');
      cy.get('[data-testid="my-folders-sidebar"]').click();
      cy.contains(
        mockFolders.data[mockFolders.data.length - 1].attributes.name,
      ).click();
      landingPage.openAdvancedSearch();
      landingPage.selectAdvancedSearchCategoryCustomFolder();
      landingPage.submitSearchButton();
    });
    it('Check all messages contain the searched category', () => {
      cy.get('[data-testid="message-list-item"]')
        .should('contain', 'test')
        .and('have.length', mockSearchCustomMessages.data.length);
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
    });
    it('Check the search message label', () => {
      cy.get('[data-testid="search-message-folder-input-label"]')
        .should('contain', '2')
        .and('contain', 'Category: "medication"');
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
    });
  });
});
