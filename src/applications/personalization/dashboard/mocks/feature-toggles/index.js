const generateFeatureToggles = (toggles = {}) => {
  const {
    profileUseVaosV2Api = true,
    showMyVADashboardV2 = true,
    showPaymentAndDebtSection = true,
  } = toggles;

  return {
    data: {
      type: 'feature_toggles',
      features: [
        {
          name: 'profile_use_vaos_v2_api',
          value: profileUseVaosV2Api,
        },
        {
          name: 'show_myva_dashboard_2_0',
          value: showMyVADashboardV2,
        },
        {
          name: 'show_payment_and_debt_section',
          value: showPaymentAndDebtSection,
        },
      ],
    },
  };
};

module.exports = { generateFeatureToggles };
