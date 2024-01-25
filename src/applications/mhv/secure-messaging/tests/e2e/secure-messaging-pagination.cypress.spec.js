import SecureMessagingSite from './sm_site/SecureMessagingSite';
import mockMessagesPageOne from './fixtures/messages-response.json';
import mockMessagesPageTwo from './fixtures/messages-response-page-2.json';
import PatientInboxPage from './pages/PatientInboxPage';
import { AXE_CONTEXT } from './utils/constants';
import FolderLoadPage from './pages/FolderLoadPage';

describe('Secure Messaging Reply', () => {
  it('Axe Check Message Reply', () => {
    const landingPage = new PatientInboxPage();
    const site = new SecureMessagingSite();
    site.login();
    const threadLength = 28;

    mockMessagesPageOne.data.forEach(item => {
      const currentItem = item;
      currentItem.attributes.threadPageSize = threadLength;
    });
    mockMessagesPageTwo.data.forEach(item => {
      const currentItem = item;
      currentItem.attributes.threadPageSize = threadLength;
    });

    landingPage.loadInboxMessages(mockMessagesPageOne);
    cy.get('va-pagination').should('be.visible');
    site.loadVAPaginationNextMessages(2, mockMessagesPageTwo);
    site.verifyPaginationMessagesDisplayed(11, 20, threadLength);
    FolderLoadPage.verifyPaginationElements();
    site.loadVAPaginationPreviousMessages(1, mockMessagesPageOne);
    site.verifyPaginationMessagesDisplayed(1, 10, threadLength);
    FolderLoadPage.verifyPaginationElements();

    site.loadVAPaginationPageMessages(2, mockMessagesPageTwo);
    site.verifyPaginationMessagesDisplayed(11, 20, threadLength);
    site.loadVAPaginationPageMessages(1, mockMessagesPageOne);
    site.verifyPaginationMessagesDisplayed(1, 10, threadLength);

    cy.get('.usa-pagination__list li').then(pagesList => {
      const lastPageIndex = pagesList.length - 2;
      FolderLoadPage.navigateToLastPage(lastPageIndex);
      cy.get('.endOfThreads').should(
        'have.text',
        'End of conversations in this folder',
      );
    });
    FolderLoadPage.verifyPaginationElements();

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
