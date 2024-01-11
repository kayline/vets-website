import SecureMessagingSite from '../sm_site/SecureMessagingSite';
import PatientInboxPage from '../pages/PatientInboxPage';
import { AXE_CONTEXT } from '../utils/constants';
import PatientMessageDraftsPage from '../pages/PatientMessageDraftsPage';
import mockMultiDraftsResponse from '../fixtures/draftsResponse/multi-draft-response.json';

describe('handle multiple drafts in one thread', () => {
  const site = new SecureMessagingSite();
  const landingPage = new PatientInboxPage();
  const draftPage = new PatientMessageDraftsPage();

  const updateDates = data => {
    const currentDate = new Date().toISOString();
    const newData = { ...data };
    newData.data = newData.data.map(item => {
      const updatedItem = { ...item };
      if (updatedItem.attributes.draftDate !== null) {
        updatedItem.attributes.draftDate = currentDate;
      }
      if (updatedItem.attributes.sentDate !== null) {
        updatedItem.attributes.sentDate = currentDate;
      }
      return updatedItem;
    });
    return newData;
  };

  const updatedMultiDraftResponse = updateDates(mockMultiDraftsResponse);

  beforeEach(() => {
    site.login();
    landingPage.loadInboxMessages();
    draftPage.loadMultiDraftThread(updatedMultiDraftResponse);
  });

  it('verify headers', () => {
    const draftsCount = updatedMultiDraftResponse.data.filter(
      el => el.attributes.draftDate !== null,
    ).length;

    cy.injectAxe();
    cy.axeCheck(AXE_CONTEXT, {
      rules: {
        'aria-required-children': {
          enabled: false,
        },
      },
    });

    cy.get('[data-testid="reply-form"]')
      .find('h2')
      .should('be.visible')
      .and('contain.text', `${draftsCount} drafts`);

    cy.get('[data-testid="reply-form"]')
      .find('h3')
      .each(el => {
        cy.wrap(el).should('include.text', 'Draft');
      });

    cy.get('[data-testid="last-edit-date"]').each(el => {
      cy.wrap(el).should('include.text', 'edited');
    });
  });

  it('verify drafts detailed vew', () => {
    cy.injectAxe();
    cy.axeCheck(AXE_CONTEXT, {
      rules: {
        'aria-required-children': {
          enabled: false,
        },
      },
    });

    cy.get('[data-testid="message-body-field"]')
      .should('have.attr', 'value')
      .and('eq', updatedMultiDraftResponse.data[0].attributes.body);

    cy.get('[text="Edit draft 1"]').click();
    cy.get('[data-testid="message-body-field"]')
      .should('have.attr', 'value')
      .and('eq', updatedMultiDraftResponse.data[1].attributes.body);

    cy.get('.message-body-draft-preview').should(
      'have.text',
      `${updatedMultiDraftResponse.data[0].attributes.body}`,
    );

    cy.get('[text="Edit draft 2"]').click();
    cy.get('[data-testid="message-body-field"]')
      .should('have.attr', 'value')
      .and('eq', updatedMultiDraftResponse.data[0].attributes.body);

    cy.get('.message-body-draft-preview').should(
      'have.text',
      `${updatedMultiDraftResponse.data[1].attributes.body}`,
    );
  });
});
