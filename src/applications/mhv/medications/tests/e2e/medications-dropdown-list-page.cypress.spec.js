import MedicationsSite from './med_site/MedicationsSite';
import MedicationsListPage from './pages/MedicationsListPage';

describe('Medications List Page DropDown', () => {
  it('visits Medications List Page DropDown', () => {
    const site = new MedicationsSite();
    const listPage = new MedicationsListPage();
    cy.visit('my-health/about-medications/');
    site.login();

    cy.injectAxe();
    cy.axeCheck('main', {
      rules: {
        'aria-required-children': {
          enabled: false,
        },
        'link-name': {
          enabled: false,
        },
      },
    });
    listPage.clickGotoMedicationsLink();
    listPage.clickWhatToKnowAboutMedicationsDropDown();
    listPage.verifyTextInsideDropDownOnListPage();
  });
});
