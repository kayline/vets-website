import DirectDeposit from '../DirectDeposit';
import { paymentHistory } from '../../../../mocks/endpoints/payment-history';
import { anAccount } from '../../../../mocks/endpoints/bank-accounts';
import { loa3User72 } from '../../../../mocks/endpoints/user';
import { data } from '../../../../mocks/endpoints/mhvAccount';

describe('Direct Deposit Consistently', () => {
  beforeEach(() => {
    cy.intercept('GET', '/v0/feature_toggles*', {});
    cy.intercept('GET', '/v0/mhv_account', { data });
    cy.intercept('GET', '/v0/profile/ch33_bank_accounts', anAccount);
    cy.login(loa3User72);
  });

  it('happy path', () => {
    cy.intercept(
      'GET',
      'v0/ppiu/payment_information',
      paymentHistory.simplePaymentHistory,
    );
    DirectDeposit.visitPage();

    DirectDeposit.confirmDirectDepositIsAvailable();

    cy.injectAxeThenAxeCheck();
  });
  it('blocks profile for deceased veterans', () => {
    cy.intercept(
      'GET',
      'v0/ppiu/payment_information',
      paymentHistory.isDeceased,
    );
    DirectDeposit.visitPage();
    cy.injectAxeThenAxeCheck();
    DirectDeposit.confirmDirectDepositIsNotAvailableInNav();
    DirectDeposit.confirmRedirectToAccountSecurity();
    DirectDeposit.confirmProfileIsBlocked();
  });
  it('shows blocked message for Fiduciary', () => {
    cy.intercept(
      'GET',
      'v0/ppiu/payment_information',
      paymentHistory.isFiduciary,
    );
    DirectDeposit.visitPage();
    cy.injectAxeThenAxeCheck();
    DirectDeposit.confirmDirectDepositIsNotAvailableInNav();
    DirectDeposit.confirmRedirectToAccountSecurity();
    DirectDeposit.confirmProfileIsBlocked();
  });
  it('shows blocked message for Not Competent', () => {
    cy.intercept(
      'GET',
      'v0/ppiu/payment_information',
      paymentHistory.isNotCompetent,
    );
    DirectDeposit.visitPage();
    cy.injectAxeThenAxeCheck();
    DirectDeposit.confirmDirectDepositIsNotAvailableInNav();
    DirectDeposit.confirmRedirectToAccountSecurity();
    DirectDeposit.confirmProfileIsBlocked();
  });
});
