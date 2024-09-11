import {
  numberUI,
  numberSchema,
} from 'platform/forms-system/src/js/web-component-patterns';
import { StudentIncomeAtSchoolH3 } from './helpers';
import { generateHelpText, studentIncomeNote } from '../../../helpers';

export const schema = {
  type: 'object',
  properties: {
    studentInformation: {
      type: 'array',
      minItems: 1,
      maxItems: 100,
      items: {
        type: 'object',
        properties: {
          'view:pensionEarnings': {
            type: 'object',
            properties: {},
          },
          'view:incomeNote': {
            type: 'object',
            properties: {},
          },
          studentEarningsFromSchoolYear: {
            type: 'object',
            properties: {
              earningsFromAllEmployment: numberSchema,
              annualSocialSecurityPayments: numberSchema,
              otherAnnuitiesIncome: numberSchema,
              allOtherIncome: numberSchema,
            },
          },
        },
      },
    },
  },
};

export const uiSchema = {
  studentInformation: {
    items: {
      'ui:title': StudentIncomeAtSchoolH3,
      'view:pensionEarnings': {
        'ui:description': generateHelpText(
          'If you’re claiming or you already receive Veterans Pension or Survivors Pension benefits, we need to know the student’s income. If you’re not claiming or receiving pension benefits, skip this question.',
        ),
      },
      'view:incomeNote': {
        'ui:description': studentIncomeNote,
      },
      studentEarningsFromSchoolYear: {
        earningsFromAllEmployment: numberUI('Earnings from all employment'),
        annualSocialSecurityPayments: numberUI('Annual Social Security'),
        otherAnnuitiesIncome: numberUI('Other annuities'),
        allOtherIncome: {
          ...numberUI('All other income'),
          'ui:description': generateHelpText('i.e. interest, dividends, etc.'),
        },
      },
    },
  },
};
