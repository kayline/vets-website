// import defaultPathology from '../fixtures/Pathology.json';

import BaseDetailsPage from './BaseDetailsPage';

class PathologyDetailsPage extends BaseDetailsPage {
  verifyLabName = name => {
    cy.get('[data-testid="pathology-name"]').should('contain', name);
  };

  verifyLabDate = date => {
    cy.get('[data-testid="header-time"]').should('contain', date);
  };

  verifySampleTested = sampleTested => {
    cy.get('[data-testid="pathology-sample-tested"]').should(
      'contain',
      sampleTested,
    );
  };

  verifyLabLocation = location => {
    cy.get('[data-testid="pathology-location"]').should('contain', location);
  };

  verifyLabComments = labComments => {
    cy.get('[data-testid="pathology-lab-comments"]').should(
      'contain',
      labComments,
    );
  };

  verifyDateCompleted = dateCompleted => {
    cy.get('[data-testid="date-completed"]').should('contain', dateCompleted);
  };

  verifyComposeMessageLink = composeMessageLink => {
    // verify compose a message on the My Healthvet website
    cy.get('[data-testid="compose-message-Link"]').should('be.visible');
    cy.get('[data-testid="compose-message-Link"]')
      .contains(composeMessageLink)
      .invoke('attr', 'href')
      .should('contain', 'myhealth.va.gov/mhv-portal-web/compose-message');
    // https://mhv-syst.myhealth.va.gov/mhv-portal-web/compose-message
  };

  verifyReport = reportText => {
    cy.get('[data-testid="pathology-report"]').should('contain', reportText);
  };
}

export default new PathologyDetailsPage();
