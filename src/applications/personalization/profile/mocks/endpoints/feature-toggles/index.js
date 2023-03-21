const { snakeCase } = require('lodash');

const defaultToggleValues = {
  profileDoNotRequireInternationalZipCode: true,
  profileNotificationSettings: true,
  profileShowPronounsAndSexualOrientation: true,
  profileShowReceiveTextNotifications: true,
  profileUseVAFSC: false,
  profileHideDirectDepositCompAndPen: false,
  profileShowPaymentsNotificationSetting: true,
  profileUseInfoCard: true,
  profileUseFieldEditingPage: true,
};

const generateFeatureToggles = (values = defaultToggleValues) => {
  const mergedValues = { ...defaultToggleValues, ...values };

  const features = Object.entries(mergedValues).map(([key, value]) => {
    return {
      name: snakeCase(key),
      value,
    };
  });

  return {
    data: {
      type: 'feature_toggles',
      features,
    },
  };
};

module.exports = { generateFeatureToggles };
