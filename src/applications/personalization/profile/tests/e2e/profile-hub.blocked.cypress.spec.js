import disabilityComps from '@@profile/mocks/endpoints/disability-compensations';
import { checkForLegacyLoadingIndicator } from '~/applications/personalization/common/e2eHelpers';
import mockUser from '../fixtures/users/user-36.json';
import { PROFILE_PATHS } from '../../constants';
import { mockProfileLOA3 } from './helpers';
import { generateFeatureToggles } from '../../mocks/endpoints/feature-toggles';

const checkForAccountSecurityAsRedirect = () => {
  cy.visit(PROFILE_PATHS.PROFILE_ROOT);

  checkForLegacyLoadingIndicator();

  cy.findByText('We can’t show your information').should('exist');

  cy.url().should('include', 'profile/account-security');
};

describe('Profile - Hub page', () => {
  // visits the profile page with useProfileHub toggled on and off
  // and checks that the correct content is rendered

  beforeEach(() => {
    cy.login(mockUser);

    mockProfileLOA3();

    cy.intercept(
      'v0/feature_toggles*',
      generateFeatureToggles({
        profileUseHubPage: true,
        profileLighthouseDirectDeposit: true,
      }),
    );
  });

  it('should render blocked profile content when user is deceased', () => {
    cy.intercept(
      '/v0/profile/direct_deposits/disability_compensations',
      disabilityComps.isDeceased,
    );

    checkForAccountSecurityAsRedirect();

    cy.injectAxeThenAxeCheck();
  });

  it('should render blocked profile content when user has fiduciary flag', () => {
    cy.intercept(
      '/v0/profile/direct_deposits/disability_compensations',
      disabilityComps.isFiduciary,
    );

    checkForAccountSecurityAsRedirect();

    cy.injectAxeThenAxeCheck();
  });

  it('should render blocked profile content when user in not competent', () => {
    cy.intercept(
      '/v0/profile/direct_deposits/disability_compensations',
      disabilityComps.isNotCompetent,
    );

    checkForAccountSecurityAsRedirect();

    cy.injectAxeThenAxeCheck();
  });
});
