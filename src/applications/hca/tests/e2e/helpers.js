import minTestData from './fixtures/data/minimal-test.json';

const testData = minTestData.data;

export const goToNextPage = pagePath => {
  // Clicks Continue button, and optionally checks destination path.
  cy.findAllByText(/continue/i, { selector: 'button' })
    .first()
    .scrollIntoView()
    .click();
  if (pagePath) {
    cy.location('pathname').should('include', pagePath);
  }
};

export const advanceToServiceInfoPage = () => {
  cy.get('[href="#start"]')
    .first()
    .click();
  cy.wait('@mockSip');
  cy.location('pathname').should(
    'include',
    '/veteran-information/personal-information',
  );

  goToNextPage('/veteran-information/birth-information');

  goToNextPage('/veteran-information/maiden-name-information');

  goToNextPage('/veteran-information/birth-sex');

  goToNextPage('/veteran-information/demographic-information');

  goToNextPage('/veteran-information/veteran-address');
  cy.get('[type=radio]')
    .first()
    .scrollIntoView()
    .check('Y');

  goToNextPage('/veteran-information/contact-information');
  cy.wait('@mockSip');

  goToNextPage('/va-benefits/basic-information');
  cy.get('[name="root_vaCompensationType"]').check('none');
  goToNextPage('/va-benefits/pension-information');
  cy.get('[name="root_vaPensionType"]').check('No');

  goToNextPage('/military-service/service-information');
};

export const shortFormAdditionalHelpAssertion = () => {
  cy.get('va-alert-expandable')
    .shadow()
    .findByText(/you’re filling out a shortened application!/i)
    .first()
    .should('exist');
};

export const shortFormSelfDisclosureToSubmit = () => {
  goToNextPage('/va-benefits/basic-information');
  cy.get('[type=radio]#root_vaCompensationType_1')
    .first()
    .scrollIntoView()
    .check('highDisability');

  goToNextPage('/va-benefits/confirm-service-pay');
  cy.findByText(
    /confirm that you receive service-connected pay for a 50% or higher disability rating./i,
  )
    .first()
    .should('exist');

  cy.injectAxe();
  cy.axeCheck();
  cy.findAllByText(/confirm/i, { selector: 'button' })
    .first()
    .click();

  // medicaid page with short form message
  shortFormAdditionalHelpAssertion();

  cy.get('[type=radio]#root_isMedicaidEligibleNo')
    .first()
    .scrollIntoView()
    .check('N');

  // general insurance
  goToNextPage('/insurance-information/general');
  shortFormAdditionalHelpAssertion();

  cy.get('[type=radio]#root_isCoveredByHealthInsuranceNo')
    .first()
    .scrollIntoView()
    .check('N');

  // va facility
  goToNextPage('/insurance-information/va-facility');
  shortFormAdditionalHelpAssertion();

  cy.get('[name="root_view:preferredFacility_view:facilityState"]').select(
    testData['view:preferredFacility']['view:facilityState'],
  );

  cy.wait('@getFacilities');
  cy.get('[name="root_view:preferredFacility_vaMedicalFacility"]')
    .shadow()
    .find('select')
    .select(testData['view:preferredFacility'].vaMedicalFacility);

  goToNextPage('review-and-submit');

  // check review page for self disclosure of va compensation type
  cy.get(`button.usa-button-unstyled`)
    .contains(/^VA benefits$/)
    .click();
  cy.findByText(/Do you receive VA disability compensation?/i, {
    selector: 'dt',
  })
    .next('dd')
    .should('have.text', 'Yes (50% or higher rating)');

  cy.get('[name="privacyAgreementAccepted"]')
    .scrollIntoView()
    .shadow()
    .find('[type="checkbox"]')
    .check();
  cy.findByText(/submit/i, { selector: 'button' }).click();
  cy.wait('@mockSubmit').then(interception => {
    // check submitted vaCompensationType value.
    cy.wrap(JSON.parse(interception.request.body.form))
      .its('vaCompensationType')
      .should('eq', 'highDisability');
  });
  cy.location('pathname').should('include', '/confirmation');
};
