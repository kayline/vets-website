const delay = require('mocker-api/lib/delay');
const {
  generateFeatureToggles,
} = require('../../common/mocks/feature-toggles');
const user = require('../../common/mocks/users');
const notifications = require('../../common/mocks/notifications');
const { createSuccessPayment } = require('./payment-history');
const { createAppealsSuccess } = require('./appeals-success');
const { createDebtsSuccess, createNoDebtsSuccess } = require('./debts');
const { createClaimsSuccess } = require('./evss-claims');
const { createLighthouseClaimsSuccess } = require('./lighthouse-claims');
const { createHealthCareStatusSuccess } = require('./health-care');
const { createUnreadMessagesSuccess } = require('./messaging');
const { user81Copays } = require('./medical-copays');
const { v2 } = require('./appointments');

// set to true to simulate a user with debts for /v0/debts endpoint
const hasDebts = false;

/* eslint-disable camelcase */
const responses = {
  'GET /v0/feature_toggles': generateFeatureToggles({
    myVaUseExperimental: true,
    showMyVADashboardV2: true,
    myVaUseLighthouseClaims: true,
    myVaUpdateErrorsWarnings: true,
  }),
  'GET /v0/user': user.cernerUser,
  'OPTIONS /v0/maintenance_windows': 'OK',
  'GET /v0/maintenance_windows': { data: [] },
  'GET /v0/medical_copays': user81Copays,
  'GET /v0/profile/payment_history': createSuccessPayment(false),
  'GET /v0/appeals': createAppealsSuccess(),
  'GET /v0/evss_claims_async': createClaimsSuccess(),
  'GET /v0/benefits_claims': createLighthouseClaimsSuccess(),
  'GET /v0/health_care_applications/enrollment_status': createHealthCareStatusSuccess(),
  'GET /v0/messaging/health/folders/0': createUnreadMessagesSuccess(),
  'GET /v0/profile/full_name': {
    id: '',
    type: 'hashes',
    attributes: {
      first: 'Mitchell',
      middle: 'G',
      last: 'Jenkins',
      suffix: null,
    },
  },
  'GET /v0/debts': hasDebts ? createDebtsSuccess() : createNoDebtsSuccess(),
  'GET /v0/onsite_notifications': notifications.hasMultiple,
  // TODO: put id into a constant file when we get more notification types
  'PATCH /v0/onsite_notifications/:id': (req, res) => {
    const { id } = req.params;

    if (
      id === 'e4213b12-eb44-4b2f-bac5-3384fbde0b7a' ||
      id === 'f9947b27-df3b-4b09-875c-7f76594d766d'
    ) {
      return res.json(notifications.createDismissalSuccessResponse(id));
    }
    if (!id) {
      return notifications.hasError;
    }

    return res.json({ data: [] });
  },
  'GET /v0/profile/service_history': {
    data: {
      id: '',
      type: 'arrays',
      attributes: {
        serviceHistory: [],
      },
    },
  },
  'GET /v0/disability_compensation_form/rating_info': {
    data: {
      id: '',
      type: 'evss_disability_compensation_form_rating_info_responses',
      attributes: {
        userPercentOfDisability: 40,
      },
    },
  },
  'GET /vaos/v2/appointments': (_req, res) => {
    const rv = v2.createAppointmentSuccess({ startsInDays: [31] });
    return res.status(200).json(rv);
  },
};

module.exports = delay(responses, 100);
