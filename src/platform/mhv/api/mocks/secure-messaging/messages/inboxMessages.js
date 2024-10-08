const { sub, formatISO } = require('date-fns');

const inboxMessages = {
  data: [
    {
      id: '3550426',
      type: 'messages',
      attributes: {
        messageId: 3550426,
        category: 'OTHER',
        subject: 'General Inquiry',
        body: null,
        attachment: false,
        sentDate: `${formatISO(sub(new Date(), { days: 10 }))}`,
        senderId: 2992380,
        senderName: 'COSTELLO, ANNE M',
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: 'DETROIT: Dermatology, Bishop, Walter, Md',
        proxySenderName: null,
      },
      links: {
        self: 'http://127.0.0.1:3000/my_health/v1/messaging/messages/3550426',
      },
    },
    {
      id: '3549585',
      type: 'messages',
      attributes: {
        messageId: 3549585,
        category: 'OTHER',
        subject: 'TEST',
        body: null,
        attachment: false,
        sentDate: `${formatISO(sub(new Date(), { days: 12 }))}`,
        senderId: 2992380,
        senderName: 'COSTELLO, ANNE M',
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: 'DETROIT: MHV Coordinator, Prince, Diana',
        proxySenderName: null,
      },
      links: {
        self: 'http://127.0.0.1:3000/my_health/v1/messaging/messages/3549585',
      },
    },
    {
      id: '3400519',
      type: 'messages',
      attributes: {
        messageId: 3400519,
        category: 'OTHER',
        subject: 'General Inquiry',
        body: null,
        attachment: false,
        sentDate: `${formatISO(sub(new Date(), { days: 16 }))}`,
        senderId: 2992380,
        senderName: 'COSTELLO, ANNE M',
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: 'DETROIT: Cardiology, Yang, Christina, Md',
        proxySenderName: null,
      },
      links: {
        self: 'http://127.0.0.1:3000/my_health/v1/messaging/messages/3400519',
      },
    },
    {
      id: '3258313',
      type: 'messages',
      attributes: {
        messageId: 3258313,
        category: 'OTHER',
        subject: 'General Inquiry',
        body: null,
        attachment: false,
        sentDate: `${formatISO(sub(new Date(), { days: 20 }))}`,
        senderId: 2992380,
        senderName: 'COSTELLO, ANNE M',
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: 'DETROIT: Audiology, House, Gregory, Md',
        proxySenderName: null,
      },
      links: {
        self: 'http://127.0.0.1:3000/my_health/v1/messaging/messages/3258313',
      },
    },
    {
      id: '3258248',
      type: 'messages',
      attributes: {
        messageId: 3258248,
        category: 'OTHER',
        subject: 'General Inquiry',
        body: null,
        attachment: false,
        sentDate: '2024-01-09T19:28:27.000Z',
        senderId: 2992380,
        senderName: 'COSTELLO, ANNE M',
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: 'DETROIT: Audiology, House, Gregory, Md',
        proxySenderName: null,
      },
      links: {
        self: 'http://127.0.0.1:3000/my_health/v1/messaging/messages/3258248',
      },
    },
    {
      id: '3004701',
      type: 'messages',
      attributes: {
        messageId: 3004701,
        category: 'TEST_RESULTS',
        subject: 'Test Results',
        body: null,
        attachment: false,
        sentDate: '2023-09-07T14:55:42.000Z',
        senderId: 2992380,
        senderName: 'COSTELLO, ANNE  M',
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: '** DETROIT: Primary Care, Lydon, John R. Md',
        proxySenderName: null,
      },
      links: {
        self: 'http://127.0.0.1:3000/my_health/v1/messaging/messages/3004701',
      },
    },
    {
      id: '3004688',
      type: 'messages',
      attributes: {
        messageId: 3004688,
        category: 'TEST_RESULTS',
        subject: 'Test Results',
        body: null,
        attachment: false,
        sentDate: '2023-09-07T14:52:52.000Z',
        senderId: 2992380,
        senderName: 'COSTELLO, ANNE  M',
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: '** DETROIT: Primary Care, Lydon, John R. Md',
        proxySenderName: null,
      },
      links: {
        self: 'http://127.0.0.1:3000/my_health/v1/messaging/messages/3004688',
      },
    },
    {
      id: '3004676',
      type: 'messages',
      attributes: {
        messageId: 3004676,
        category: 'TEST_RESULTS',
        subject: 'Test Results',
        body: null,
        attachment: true,
        sentDate: '2023-09-07T14:51:45.000Z',
        senderId: 2992380,
        senderName: 'COSTELLO, ANNE  M',
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: '** DETROIT: Primary Care, Lydon, John R. Md',
        proxySenderName: null,
      },
      links: {
        self: 'http://127.0.0.1:3000/my_health/v1/messaging/messages/3004676',
      },
    },
    {
      id: '3004667',
      type: 'messages',
      attributes: {
        messageId: 3004667,
        category: 'TEST_RESULTS',
        subject: 'Test Result',
        body: null,
        attachment: false,
        sentDate: '2023-09-07T14:50:00.000Z',
        senderId: 2992380,
        senderName: 'COSTELLO, ANNE  M',
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: '** DETROIT: Primary Care, Lydon, John R. Md',
        proxySenderName: null,
      },
      links: {
        self: 'http://127.0.0.1:3000/my_health/v1/messaging/messages/3004667',
      },
    },
    {
      id: '3004661',
      type: 'messages',
      attributes: {
        messageId: 3004661,
        category: 'APPOINTMENTS',
        subject: 'Appointment Follow-up',
        body: null,
        attachment: false,
        sentDate: '2023-09-07T14:48:34.000Z',
        senderId: 2992380,
        senderName: 'COSTELLO, ANNE  M',
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: 'DETROIT: Cardiology, Yang, Christina, Md',
        proxySenderName: null,
      },
      links: {
        self: 'http://127.0.0.1:3000/my_health/v1/messaging/messages/3004661',
      },
    },
    {
      id: '3004641',
      type: 'messages',
      attributes: {
        messageId: 3004641,
        category: 'APPOINTMENTS',
        subject: 'Annual physical',
        body: null,
        attachment: false,
        sentDate: '2023-09-07T14:40:52.000Z',
        senderId: 2992380,
        senderName: 'COSTELLO, ANNE  M',
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: '** DETROIT: Primary Care, Lydon, John R. Md',
        proxySenderName: null,
      },
      links: {
        self: 'http://127.0.0.1:3000/my_health/v1/messaging/messages/3004641',
      },
    },
    {
      id: '3004632',
      type: 'messages',
      attributes: {
        messageId: 3004632,
        category: 'MEDICATIONS',
        subject: 'LOSARTAN 25MG: PRESCRIPTION READY',
        body: null,
        attachment: false,
        sentDate: '2023-09-07T14:37:44.000Z',
        senderId: 2992380,
        senderName: 'COSTELLO, ANNE  M',
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: 'DETROIT: Pharmacy',
        proxySenderName: null,
      },
      links: {
        self: 'http://127.0.0.1:3000/my_health/v1/messaging/messages/3004632',
      },
    },
    {
      id: '3004624',
      type: 'messages',
      attributes: {
        messageId: 3004624,
        category: 'MEDICATIONS',
        subject: 'LOSARTAN 25MG: DELAYED',
        body: null,
        attachment: false,
        sentDate: '2023-09-07T14:35:32.000Z',
        senderId: 2992380,
        senderName: 'COSTELLO, ANNE  M',
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: 'DETROIT: Pharmacy',
        proxySenderName: null,
      },
      links: {
        self: 'http://127.0.0.1:3000/my_health/v1/messaging/messages/3004624',
      },
    },
    {
      id: '3004605',
      type: 'messages',
      attributes: {
        messageId: 3004605,
        category: 'MEDICATIONS',
        subject: 'Losartan Refill Sent',
        body: null,
        attachment: false,
        sentDate: '2023-09-07T14:30:46.000Z',
        senderId: 2992380,
        senderName: 'COSTELLO, ANNE  M',
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: 'DETROIT: Cardiology, Yang, Christina, Md',
        proxySenderName: null,
      },
      links: {
        self: 'http://127.0.0.1:3000/my_health/v1/messaging/messages/3004605',
      },
    },
    {
      id: '3004593',
      type: 'messages',
      attributes: {
        messageId: 3004593,
        category: 'MEDICATIONS',
        subject: 'Losartan Refill Request',
        body: null,
        attachment: false,
        sentDate: '2023-09-07T14:23:25.000Z',
        senderId: 2992380,
        senderName: 'COSTELLO, ANNE  M',
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: '** DETROIT: Primary Care, Lydon, John R. Md',
        proxySenderName: null,
      },
      links: {
        self: 'http://127.0.0.1:3000/my_health/v1/messaging/messages/3004593',
      },
    },
    {
      id: '3004581',
      type: 'messages',
      attributes: {
        messageId: 3004581,
        category: 'EDUCATION',
        subject: 'My HealtheVet Training for Newcomers',
        body: null,
        attachment: false,
        sentDate: '2023-09-07T14:12:32.000Z',
        senderId: 2992380,
        senderName: 'COSTELLO, ANNE  M',
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: null,
        triageGroupName: 'DETROIT: MHV Coordinator, Prince, Diana',
        proxySenderName: null,
      },
      links: {
        self: 'http://127.0.0.1:3000/my_health/v1/messaging/messages/3004581',
      },
    },
    {
      id: '3004565',
      type: 'messages',
      attributes: {
        messageId: 3004565,
        category: 'COVID',
        subject: 'Covid Cases Increasing',
        body: null,
        attachment: false,
        sentDate: '2023-09-07T14:08:22.000Z',
        senderId: 2992380,
        senderName: 'COSTELLO, ANNE  M',
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: '** DETROIT: Primary Care, Lydon, John R. Md',
        proxySenderName: null,
      },
      links: {
        self: 'http://127.0.0.1:3000/my_health/v1/messaging/messages/3004565',
      },
    },
    {
      id: '3004551',
      type: 'messages',
      attributes: {
        messageId: 3004551,
        category: 'OTHER',
        subject: 'Flu Shot Clinic',
        body: null,
        attachment: false,
        sentDate: '2023-09-07T14:01:58.000Z',
        senderId: 2992380,
        senderName: 'COSTELLO, ANNE  M',
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: '** DETROIT: Primary Care, Lydon, John R. Md',
        proxySenderName: null,
      },
      links: {
        self: 'http://127.0.0.1:3000/my_health/v1/messaging/messages/3004551',
      },
    },
    {
      id: '3004545',
      type: 'messages',
      attributes: {
        messageId: 3004545,
        category: 'OTHER',
        subject: 'Flu Shot Clinic',
        body: null,
        attachment: false,
        sentDate: '2023-09-07T14:00:24.000Z',
        senderId: 2992380,
        senderName: 'COSTELLO, ANNE  M',
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: null,
        triageGroupName: '** DETROIT: Primary Care, Lydon, John R. Md',
        proxySenderName: null,
      },
      links: {
        self: 'http://127.0.0.1:3000/my_health/v1/messaging/messages/3004545',
      },
    },
    {
      id: '3004536',
      type: 'messages',
      attributes: {
        messageId: 3004536,
        category: 'TEST_RESULTS',
        subject: 'EKG Results',
        body: null,
        attachment: false,
        sentDate: '2023-09-07T13:57:20.000Z',
        senderId: 2992380,
        senderName: 'COSTELLO, ANNE  M',
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: 'DETROIT: Cardiology, Yang, Christina, Md',
        proxySenderName: null,
      },
      links: {
        self: 'http://127.0.0.1:3000/my_health/v1/messaging/messages/3004536',
      },
    },
    {
      id: '3004527',
      type: 'messages',
      attributes: {
        messageId: 3004527,
        category: 'APPOINTMENTS',
        subject: 'Appointment Request',
        body: null,
        attachment: false,
        sentDate: '2023-09-07T13:55:13.000Z',
        senderId: 2992380,
        senderName: 'COSTELLO, ANNE  M',
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: 'DETROIT: Audiology, House, Gregory, Md',
        proxySenderName: null,
      },
      links: {
        self: 'http://127.0.0.1:3000/my_health/v1/messaging/messages/3004527',
      },
    },
  ],
};

module.exports = {
  inboxMessages,
};
