export default class PageObject {
  rootUrl = '/my-health/appointments';

  assertLink({ name, exist = true } = {}) {
    cy.findByRole('link', { name }).should(exist ? 'exist' : 'not.exist');
    return this;
  }

  assertNexButton({ enabled = true, label = 'Continue' } = {}) {
    cy.contains('button', label)
      .as('button')
      .should(enabled ? 'be.enabled' : 'be.disabled');

    return this;
  }

  assertAlert({ text, exist, status }) {
    cy.get(`va-alert[status=${status}]`)
      .as('alert')
      .shadow();
    cy.get('@alert')
      .contains(text)
      .should(exist ? 'exist' : 'not.exist');

    return this;
  }

  assertModal({ text, exist, status }) {
    cy.get(`va-modal[status=${status}]`)
      .as('modal')
      .shadow();
    cy.get('@modal')
      .contains(text)
      .should(exist ? 'exist' : 'not.exist');

    return this;
  }

  assertErrorAlert({ text, exist = true }) {
    return this.assertAlert({ text, exist, status: 'error' });
  }

  assertWarningAlert({ text, exist = true }) {
    return this.assertAlert({ text, exist, status: 'warning' });
  }

  assertWarningModal({ text, exist = true }) {
    return this.assertModal({ text, exist, status: 'warning' });
  }

  clickNextButton(label = 'Continue') {
    cy.contains('button', label)
      .as('button')
      .should('not.be.disabled');
    cy.get('@button').focus();
    cy.get('@button').click({ waitForAnimations: true });

    return this;
  }

  selectRadioButton(label) {
    cy.findByLabelText(label).as('radio');
    cy.get('@radio').check();

    return this;
  }

  visit(url = '', options = {}) {
    const normalizedUrl = `${this.rootUrl}/${url.replace(/^\//, '')}`;

    if (Object.keys(options).length) cy.visit(normalizedUrl, options);
    else cy.visit(normalizedUrl);

    cy.injectAxe();

    return this;
  }

  validate() {
    this._validateUrl();
    this._validateHeader();
    return this;
  }

  _validateUrl() {
    return this;
  }

  _validateHeader() {
    return this;
  }
}
