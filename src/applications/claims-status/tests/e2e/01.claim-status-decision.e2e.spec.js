const E2eHelpers = require('platform/testing/e2e/helpers');
const Timeouts = require('platform/testing/e2e/timeouts.js');
const Auth = require('platform/testing/e2e/auth');
const DisabilityHelpers = require('./claims-status-helpers');

module.exports = E2eHelpers.createE2eTest(client => {
  const token = Auth.getUserToken();

  DisabilityHelpers.initClaimsListMock(token);
  DisabilityHelpers.initClaimDetailMocks(token, true, true, false, null);

  Auth.logIn(token, client, '/track-claims', 3).waitForElementVisible(
    '.claim-list-item-container',
    Timeouts.slow,
  );

  client
    .click('.claim-list-item-container:first-child a.vads-c-action-link--blue')
    .waitForElementVisible('body', Timeouts.normal)
    .waitForElementVisible('.claim-title', Timeouts.slow)
    .axeCheck('.main');

  client.expect.element('.main .usa-alert').to.be.visible;

  client.expect
    .element('.main .usa-alert')
    .text.to.contain('Your claim decision is ready');

  client.expect.element('.disability-benefits-timeline').not.to.be.present;

  client.end();
});
