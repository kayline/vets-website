export const VA_FORM_IDS = Object.freeze({
  FORM_0873: '0873',
  FORM_10182: '10182',
  FORM_10_10EZ: '1010ez',
  FORM_20_0995: '20-0995',
  FORM_20_0996: '20-0996',
  FORM_21_0845: '21-0845',
  FORM_21_0966: '21-0966',
  FORM_21_0972: '21-0972',
  FORM_21_10210: '21-10210',
  FORM_21_4142: '21-4142',
  FORM_21_526EZ: '21-526EZ',
  FORM_21_686C: '686C-674',
  FORM_21P_0847: '21P-0847',
  FORM_21P_527EZ: '21P-527EZ',
  FORM_21P_530: '21P-530',
  FORM_22_0993: '22-0993',
  FORM_22_0994: '22-0994',
  FORM_22_1990: '22-1990',
  FORM_22_1990E: '22-1990E',
  FORM_22_1990EMEB: '22-1990EMEB',
  FORM_22_1990EZ: '22-1990EZ',
  FORM_22_1990N: '22-1990N',
  FORM_22_1990S: '22-1990S',
  FORM_22_1995: '22-1995',
  FORM_22_1995S: '22-1995S',
  FORM_22_5490: '22-5490',
  FORM_22_5490E: '22-5490E',
  FORM_22_5495: '22-5495',
  FORM_22_10203: '22-10203',
  FORM_26_4555: '26-4555',
  FORM_40_10007: '40-10007',
  FEEDBACK_TOOL: 'FEEDBACK-TOOL',
  FORM_VA_2346A: 'MDOT',
  FORM_28_8832: '28-8832',
  FORM_10_10CG: '10-10CG',
  FORM_HC_QSTNR: 'HC-QSTNR',
  FORM_COVID_VACCINE_TRIAL: 'COVID-VACCINE-TRIAL',
  FORM_COVID_VACCINE_TRIAL_UPDATE: 'COVID-VACCINE-TRIAL-UPDATE',
  FORM_21_22: '21-22',
  FORM_5655: '5655',
  FORM_COVID_VACCINATION_EXPANSION: 'COVID-VACCINATION-EXPANSION',
  FORM_26_1880: '26-1880',
  FORM_21_22A: '21-22a',
  FORM_XX_123: 'XX-123',
  FORM_MOCK: '00-1234',
  FORM_MOCK_SF_PATTERNS: 'FORM_MOCK_SF_PATTERNS',
});

export const VA_FORM_IDS_SKIP_INFLECTION = Object.freeze([
  VA_FORM_IDS.FORM_21_526EZ,
]);

export const VA_FORM_IDS_IN_PROGRESS_FORMS_API = Object.freeze({
  // 526 save-in-progress endpoint that adds an `updatedRatedDisabilities` array
  // to the saved form data from /v0/disability_compensation_in_progress_forms/
  [VA_FORM_IDS.FORM_21_526EZ]: '/v0/disability_compensation_in_progress_forms/',
});
