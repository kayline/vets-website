const createSessionStorageKeys = ({ isPreCheckIn = true }) => {
  const namespace = isPreCheckIn
    ? 'health.care.pre.check.in'
    : 'health.care.check-in';
  const sessionStorageKeys = {
    CURRENT_UUID: `${namespace}.current.uuid`,
    COMPLETE: `${namespace}.complete`,
    SHOULD_SEND_DEMOGRAPHICS_FLAGS: `${namespace}.should.send.demographics.flags`,
    PROGRESS_STATE: `${namespace}.progress`,
    PERMISSIONS: `${namespace}.permissions`,
  };
  if (!isPreCheckIn) {
    sessionStorageKeys.SHOULD_SEND_TRAVEL_PAY_CLAIM = `${namespace}.should.send.travel.pay.claim`;
    sessionStorageKeys.TRAVEL_CLAIM_DATA = `${namespace}.travel.claim.data`;
  }
  return sessionStorageKeys;
};

export { createSessionStorageKeys };
