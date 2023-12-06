// import defaultLabsAndTests from '../fixtures/LabsAndTests.json';

class LabsAndTestsListPage {
  /*
    clickGotoLabsAndTestsLink = (
     /* LabsAndTests = defaultLabsAndTests,
      waitForLabsAndTests = false,
    ) => {
      cy.intercept(
        'GET',
        '/my_health/v1/medical_records/labs-and-tests',
        LabsAndTests,
      ).as('LabsAndTestsList');
      cy.get('[href="/my-health/medical-records/labs-and-tests"]').click();
      if (waitForLabsAndTests) {
        cy.wait('@LabsAndTestsList');
      }
    });
  }
  */

  clickLabsAndTestsDetailsLink = (_LabsAndTestsIndex = 0) => {
    cy.get('[data-testid="record-list-item"]')
      .find('a')
      .eq(_LabsAndTestsIndex)
      .click();
  };

  /* --these will be needed later when there is download list functionality
  verifyPrintOrDownload = () => {
    cy.get('[data-testid="print-records-button"]').should('be.visible');
  };

  clickPrintOrDownload = () => {
    cy.get('[data-testid="print-records-button"]').click({ force: true });
  };

  verifyDownloadPDF = () => {
    // should display a download pdf file button "Download PDF of this page"
    cy.get('[data-testid="printButton-1"]').should('be.visible');
  };

  verifyDownloadTextFile = () => {
    // should display a download text file button "Download list as a text file"
    cy.get('[data-testid="printButton-2"]').should('be.visible');
    // cy.get('[data-testid="printButton-2').click();
  };

  clickDownloadPDFFile = () => {
    // should display a download text file button "Download list as a text file"
    cy.get('[data-testid="printButton-1"]').click();
  };
  */
}

export default new LabsAndTestsListPage();
