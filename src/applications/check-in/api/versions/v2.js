import appendQuery from 'append-query';
// eslint-disable-next-line import/no-unresolved
import { apiRequest } from '@department-of-veterans-affairs/platform-utilities/exports';
import environment from '@department-of-veterans-affairs/platform-utilities/environment';
import { makeApiCallWithSentry } from '../utils';

const v2 = {
  getSession: async ({
    token,
    checkInType,
    isLorotaSecurityUpdatesEnabled = false,
  }) => {
    const url = `/check_in/v2/sessions/`;
    const checkInTypeSlug = checkInType ? `?checkInType=${checkInType}` : '';
    const eventLabel = `${checkInType || 'day-of'}-get-current-session-${
      isLorotaSecurityUpdatesEnabled ? 'dob' : 'ssn4'
    }`;

    const json = await makeApiCallWithSentry(
      apiRequest(`${environment.API_URL}${url}${token}${checkInTypeSlug}`),
      eventLabel,
      token,
    );
    return {
      ...json,
    };
  },
  postSession: async ({
    lastName,
    last4,
    dob,
    token,
    checkInType = '',
    isLorotaSecurityUpdatesEnabled = false,
  }) => {
    const url = '/check_in/v2/sessions/';
    const headers = { 'Content-Type': 'application/json' };
    let data = {
      session: {
        uuid: token,
        last4: last4.trim(),
        lastName: lastName.trim(),
        checkInType,
      },
    };
    if (isLorotaSecurityUpdatesEnabled) {
      data = {
        session: {
          uuid: token,
          dob,
          lastName: lastName.trim(),
          checkInType,
        },
      };
    }

    const body = JSON.stringify(data);
    const settings = {
      headers,
      body,
      method: 'POST',
      mode: 'cors',
    };

    const eventLabel = `${checkInType || 'day-of'}-validating-user-${
      isLorotaSecurityUpdatesEnabled ? 'dob' : 'ssn4'
    }`;

    const json = await makeApiCallWithSentry(
      apiRequest(`${environment.API_URL}${url}`, settings),
      eventLabel,
      token,
    );
    return {
      ...json,
    };
  },

  getCheckInData: async (token, reload = false) => {
    const url = '/check_in/v2/patient_check_ins/';
    const requestUrl = appendQuery(`${environment.API_URL}${url}${token}`, {
      reload,
    });
    const json = await makeApiCallWithSentry(
      apiRequest(requestUrl),
      'get-lorota-data',
      token,
    );
    return {
      ...json,
    };
  },
  postCheckInData: async ({ uuid, appointmentIen, facilityId }) => {
    const url = '/check_in/v2/patient_check_ins/';
    const headers = { 'Content-Type': 'application/json' };
    const data = {
      patientCheckIns: {
        uuid,
        appointmentIen,
        facilityId,
      },
    };
    const body = JSON.stringify(data);
    const settings = {
      headers,
      body,
      method: 'POST',
      mode: 'cors',
    };

    const json = await makeApiCallWithSentry(
      apiRequest(`${environment.API_URL}${url}`, settings),
      'check-in-user',
      uuid,
    );
    return {
      ...json,
    };
  },
  getPreCheckInData: async (token, reload = false) => {
    const url = '/check_in/v2/pre_check_ins/';
    const requestUrl = appendQuery(`${environment.API_URL}${url}${token}`, {
      checkInType: 'preCheckIn',
      reload,
    });

    const json = await makeApiCallWithSentry(
      apiRequest(requestUrl),
      'get-lorota-data',
      token,
    );
    return {
      ...json,
    };
  },
  postPreCheckInData: async ({
    uuid,
    demographicsUpToDate,
    nextOfKinUpToDate,
    emergencyContactUpToDate,
    checkInType = 'preCheckIn',
  }) => {
    const url = '/check_in/v2/pre_check_ins/';
    const headers = { 'Content-Type': 'application/json' };
    const data = {
      preCheckIn: {
        uuid,
        demographicsUpToDate,
        nextOfKinUpToDate,
        emergencyContactUpToDate,
        checkInType,
      },
    };
    const body = JSON.stringify(data);
    const settings = {
      headers,
      body,
      method: 'POST',
      mode: 'cors',
    };

    const json = await makeApiCallWithSentry(
      apiRequest(`${environment.API_URL}${url}`, settings),
      'pre-check-in-user',
      uuid,
    );
    return {
      ...json,
    };
  },
  patchDayOfDemographicsData: async ({
    uuid,
    demographicsUpToDate,
    nextOfKinUpToDate,
    emergencyContactUpToDate,
  }) => {
    const url = '/check_in/v2/demographics/';
    const headers = { 'Content-Type': 'application/json' };
    const data = {
      demographics: {
        demographicConfirmations: {
          uuid,
          demographicsUpToDate,
          nextOfKinUpToDate,
          emergencyContactUpToDate,
        },
      },
    };
    const body = JSON.stringify(data);
    const settings = {
      headers,
      body,
      method: 'PATCH',
      mode: 'cors',
    };

    const json = await makeApiCallWithSentry(
      apiRequest(`${environment.API_URL}${url}${uuid}`, settings),
      'patch-demographics-update-flags',
      uuid,
    );
    return {
      ...json,
    };
  },

  postDayOfTravelPayClaim: async data => {
    const url = '/check_in/v0/travel_claims/';
    const headers = { 'Content-Type': 'application/json' };

    const travelClaimData = {
      travelClaims: {
        uuid: data.uuid,
        appointmentDate: data.appointmentDate,
      },
    };

    const body = JSON.stringify(travelClaimData);

    const settings = {
      headers,
      body,
      method: 'POST',
      mode: 'cors',
    };

    const json = await makeApiCallWithSentry(
      apiRequest(`${environment.API_URL}${url}`, settings),
      'submit-travel-pay-claim',
      data.uuid,
      true,
    );
    return {
      ...json,
    };
  },
};

export { v2 };
