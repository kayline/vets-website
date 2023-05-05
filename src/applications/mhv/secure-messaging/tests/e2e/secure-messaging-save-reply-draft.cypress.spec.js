import SecureMessagingSite from './sm_site/SecureMessagingSite';
import PatientMessageDetailsPage from './pages/PatientMessageDetailsPage';
import PatientInboxPage from './pages/PatientInboxPage';
import PatientInterstitialPage from './pages/PatientInterstitialPage';
import PatientReplyPage from './pages/PatientReplyPage';
import mockMessages from './fixtures/messages-response.json';

describe('Secure Messaging Reply', () => {
  it('Axe Check Message Reply', () => {
    const landingPage = new PatientInboxPage();
    const messageDetailsPage = new PatientMessageDetailsPage();
    const patientInterstitialPage = new PatientInterstitialPage();
    const replyPage = new PatientReplyPage();
    const site = new SecureMessagingSite();
    site.login();
    const messageDetails = landingPage.getNewMessageDetails();
    const messageDetailsBody = messageDetails.data.attributes.body;

    landingPage.loadInboxMessages(mockMessages, messageDetails);
    messageDetailsPage.loadMessageDetails(messageDetails);
    messageDetailsPage.loadReplyPageDetails(messageDetails);
    patientInterstitialPage.getContinueButton().click();
    const testMessageBody = 'Test message body';
    replyPage.getMessageBodyField().type(testMessageBody, { force: true });
    cy.injectAxe();
    cy.axeCheck();

    replyPage.saveReplyDraft(messageDetails, testMessageBody);
    cy.log(
      `the message details after saveReplyDraft ${JSON.stringify(
        messageDetails,
      )}`,
    );
    cy.log(
      `the message details before assert${JSON.stringify(messageDetails)}`,
    );
    cy.log(`message details  Body${messageDetailsBody}`);
    cy.log(
      `messageDetails.data.attributes.body = ${
        messageDetails.data.attributes.body
      }`,
    );
    messageDetailsPage.ReplyToMessageTO(messageDetails);
    messageDetailsPage.ReplyToMessagesenderName(messageDetails);
    messageDetailsPage.ReplyToMessagerecipientName(messageDetails);
    messageDetailsPage.ReplyToMessageDate(messageDetails);
    messageDetailsPage.ReplyToMessageId(messageDetails);

    messageDetails.data.attributes.body = messageDetailsBody;
    messageDetailsPage.ReplyToMessagebody(messageDetailsBody);

    replyPage.sendReplyDraft(
      landingPage.getNewMessage().attributes.messageId,
      landingPage.getNewMessage().attributes.senderId,
      landingPage.getNewMessage().attributes.category,
      landingPage.getNewMessage().attributes.subject,
      testMessageBody,
    );
    cy.injectAxe();
    cy.axeCheck();
  });
});
