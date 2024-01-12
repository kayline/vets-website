import mockRepresentativeData from '../../constants/mock-representative-data.json';
import mockGeocodingData from '../../constants/mock-geocoding-data.json';
import { generateFeatureToggles } from '../../mocks/feature-toggles';

describe('Accessibility', () => {
  beforeEach(() => {
    cy.viewport(1200, 700);
    cy.intercept('GET', '/v0/feature_toggles*', {
      data: {
        features: [
          { name: 'find_a_representative_enable_frontend', value: true },
        ],
      },
    });
    cy.intercept('GET', '/v0/maintenance_windows', []);
    cy.intercept(
      'GET',
      '/services/veteran/v0/other_accredited_representatives',
      mockRepresentativeData,
    );
    cy.intercept('GET', '/geocoding/**/*', mockGeocodingData);
  });

  it('traverses form controls via keyboard input', () => {
    cy.visit('/get-help-from-accredited-representative/find-rep/');
    generateFeatureToggles();

    cy.injectAxe();
    cy.axeCheck();

    // Verify focused on input location
    cy.get('#representative-search-controls').trigger('mousedown');
    cy.tab();
    cy.get('va-additional-info[trigger="What does a VSO do?"]').focused();
    cy.tab();
    cy.get(
      'va-additional-info[trigger="What does an accredited attorney do?"]',
    ).focused();
    cy.tab();
    cy.get('va-radio').trigger('keydown', {
      keyCode: 9,
      which: 9,
    });
    cy.tab();
    cy.get('input[name="City, state, postal code or address"]').focus();
    cy.get('input[name="City, state, postal code or address"]').trigger(
      'keydown',
      {
        keyCode: 9,
        which: 9,
      },
    );

    // Verify focused on name input
    cy.get('input[name="Name of VSO or accredited attorney"]').focused();
    cy.get('input[name="Name of VSO or accredited attorney"]').trigger(
      'keydown',
      {
        keyCode: 9,
        which: 9,
      },
    );

    // Verify focused on Search button
    cy.get('va-button[text="Search"]').focused();
  });
});
