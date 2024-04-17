import get from 'platform/utilities/data/get';
import set from 'platform/utilities/data/set';

// import bankAccountUI from 'platform/forms/definitions/bankAccount';

import React from 'react';
import { bankAccountChangeLabelsUpdate } from '../utils/labels';
import { isValidRoutingNumber } from '../utils/helpers';

function isStartUpdate(form) {
  return get('bankAccountChangeUpdate', form) === 'startUpdate';
}

const gaBankInfoHelpText = () => {
  window.dataLayer.push({
    event: 'edu-5490--form-help-text-clicked',
    'help-text-label': 'What if I don’t have a bank account?',
  });
};

const directDepositDescriptionAssistance = (
  <div className="vads-u-margin-top--2 vads-u-margin-bottom--2">
    <p>
      Direct deposit information is not mandatory at this time. However,
      benefits cannot be awarded without this information per U.S. Treasury
      regulation 31 C.F.R. § 208.3.
    </p>
    <p>For assistance call 1-888-442-4551 (1-888-GIBILL-1)</p>
  </div>
);

const bankInfoHelpText = (
  <>
    {directDepositDescriptionAssistance}
    <va-additional-info
      trigger="What if I don’t have a bank account?"
      onClick={gaBankInfoHelpText}
    >
      <span>
        <p>
          The{' '}
          <a href="https://veteransbenefitsbanking.org/">
            Veterans Benefits Banking Program (VBBP)
          </a>{' '}
          provides a list of Veteran-friendly banks and credit unions. They’ll
          work with you to set up an account, or help you qualify for an
          account, so you can use direct deposit. To get started, call one of
          the participating banks or credit unions listed on the VBBP website.
          Be sure to mention the Veterans Benefits Banking Program.
        </p>
        <p>
          Note: Federal regulation, found in 31 C.F.R. § 208.3 provides that,
          subject to section 208.4, “all Federal payments made by an agency
          shall be made by electronic funds transfer” (EFT).
        </p>
      </span>
    </va-additional-info>
  </>
);

const directDepositDescription = (
  <div className="vads-u-margin-top--2 vads-u-margin-bottom--2">
    <img
      src="/img/direct-deposit-check-guide.svg"
      alt="On a personal check, find your bank’s 9-digit routing number listed along the bottom-left edge, and your account number listed beside that."
    />
  </div>
);

const isFieldRequired = formData => {
  return formData.bankAccountChangeUpdate === 'startUpdate';
};
const directDepDescription = (
  <div>
    <p>
      Direct Deposit information is mandatory. Benefits cannot be awarded
      without this information per U.S. Treasury regulation 31 C.F.R. § 208.3.
    </p>

    <va-additional-info
      trigger="What if I don’t have a bank account?"
      onClick={gaBankInfoHelpText}
    >
      <p>
        The{' '}
        <a href="https://veteransbenefitsbanking.org/">
          Veterans Benefits Banking Program (VBBP)
        </a>{' '}
        provides a list of Veteran-friendly banks and credit unions. They’ll
        work with you to set up an account, or help you qualify for an account,
        so you can use direct deposit. To get started, call one of the
        participating banks or credit unions listed on the VBBP website. Be sure
        to mention the Veterans Benefits Banking Program.
      </p>
    </va-additional-info>
    <p>
      Note: Federal regulation, found in 31 C.F.R. § 208.3 provides that,
      subject to section 208.4, “all Federal payments made by an agency shall be
      made by electronic funds transfer” (EFT).
    </p>
    <p>
      Note: Any bank account information you enter here will update all other
      existing Veteran benefits, including Compensation, Pension, and benefits
      for certain children with disabilities (Chapter 18) payments. Information
      entered here WILL NOT change your existing bank account for VA health
      benefits.
    </p>
  </div>
);
export default function createDirectDepositChangePage(schema) {
  const { bankAccountChangeUpdate, bankAccount } = schema.definitions;
  return {
    title: 'Direct deposit',
    path: 'personal-information/direct-deposit',
    initialData: {},
    uiSchema: {
      'ui:title': 'Direct deposit',
      'ui:description': directDepDescription,
      bankAccountChangeUpdate: {
        'ui:title': 'Benefit payment method:',
        'ui:required': formData => formData !== undefined,
        'ui:widget': 'radio',
        'ui:options': {
          labels: bankAccountChangeLabelsUpdate,
        },
      },
      'view:directDepositImageAndText': {
        'ui:description': directDepositDescription,
        'ui:options': {
          hideIf: formData =>
            formData.bankAccountChangeUpdate !== 'startUpdate',
        },
      },
      // bankAccount: merge({}, bankAccountUI, {
      //   'ui:options': {
      //     hideIf: formData => !isStartUpdate(formData),
      //     expandUnder: 'view:directDepositImageAndText',
      //   },
      // }),
      bankAccount: {
        'ui:order': ['accountType', 'routingNumber', 'accountNumber'],
        'ui:options': {
          hideIf: formData => !isStartUpdate(formData),
          expandUnder: 'view:directDepositImageAndText',
          updateSchema: (formData, _schema) =>
            set(
              'required',
              isFieldRequired(formData)
                ? ['accountType', 'routingNumber', 'accountNumber']
                : [],
              _schema,
            ),
        },
        accountType: {
          'ui:title': 'Account type',
          'ui:widget': 'radio',
          'ui:options': {
            labels: {
              checking: 'Checking',
              savings: 'Savings',
            },
          },
        },
        accountNumber: {
          'ui:title': 'Bank account number',
          'ui:errorMessages': {
            required: 'Please enter your bank’s 9-digit routing number',
          },
        },
        routingNumber: {
          'ui:title': 'Bank routing number',
          'ui:validations': [isValidRoutingNumber],
          'ui:errorMessages': {
            pattern: 'Please enter your bank’s 9-digit routing number',
          },
        },
      },
      'view:noneWarning': {
        'ui:description': bankInfoHelpText,
        'ui:options': {
          hideIf: formData => formData.bankAccountChangeUpdate !== 'none',
          expandUnder: 'bankAccountChangeUpdate',
        },
      },
    },
    schema: {
      type: 'object',
      properties: {
        bankAccountChangeUpdate,
        'view:directDepositImageAndText': {
          type: 'object',
          properties: {},
        },
        bankAccount,
        'view:noneWarning': {
          type: 'object',
          properties: {},
        },
      },
    },
  };
}
