// libs
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { get } from 'lodash';
import {
  VaCheckbox,
  VaPrivacyAgreement,
  VaTextInput,
} from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import Checkbox from '@department-of-veterans-affairs/component-library/Checkbox';

// platform - forms - selectors
import { preSubmitSelector } from 'platform/forms/selectors/review';

// platform - form-system actions
import { setPreSubmit as setPreSubmitAction } from 'platform/forms-system/src/js/actions';
import {
  createFormPageList,
  createPageList,
} from 'platform/forms-system/src/js/helpers';

import SaveFormLink from 'platform/forms/save-in-progress/SaveFormLink';
import { FINISH_APP_LATER_DEFAULT_MESSAGE } from 'platform/forms-system/src/js/constants';
import { saveAndRedirectToReturnUrl as saveAndRedirectToReturnUrlAction } from 'platform/forms/save-in-progress/actions';
import { toggleLoginModal as toggleLoginModalAction } from 'platform/site-wide/user-nav/actions';

/*
*  RenderPreSubmitSection - renders PreSubmitSection by default or presubmit.CustomComponent
*  PreSubmitSection - ~Default component that renders if no CustomComponent is provided~ (this describes a decision in RenderPreSubmitSection- describe what PreSubmitSection is, remove this since it's not a prop, or add it as a prop with a default value)
*  preSubmitInfo.CustomComponent - property that can be added to `preSubmitInfo` object that overwrites `PreSubmitSection`
*/

export function PreSubmitSection(props) {
  const {
    form,
    preSubmit = {},
    setPreSubmit,
    showPreSubmitError,
    formConfig,
    user,
    location,
    showLoginModal,
    saveAndRedirectToReturnUrl,
    toggleLoginModal,
  } = props;

  const { CustomComponent, statementOfTruth } = preSubmit;
  const checked = form?.data[preSubmit?.field] || false;
  const formPages = createFormPageList(formConfig);
  const pageList = createPageList(formConfig, formPages);

  const finishAppLaterMessage =
    formConfig?.customText?.finishAppLaterMessage ||
    FINISH_APP_LATER_DEFAULT_MESSAGE;

  const saveFormLink = (
    <div className="vads-u-margin-top--4">
      <SaveFormLink
        form={form}
        formConfig={formConfig}
        pageList={pageList}
        user={user}
        locationPathname={location?.pathname}
        showLoginModal={showLoginModal}
        saveAndRedirectToReturnUrl={saveAndRedirectToReturnUrl}
        toggleLoginModal={toggleLoginModal}
      >
        {finishAppLaterMessage}
      </SaveFormLink>
    </div>
  );

  if (CustomComponent) {
    return (
      <>
        <CustomComponent
          formData={form?.data}
          preSubmitInfo={preSubmit}
          showError={showPreSubmitError}
          onSectionComplete={value => setPreSubmit(preSubmit?.field, value)}
        />
        {saveFormLink}
      </>
    );
  }

  let statementOfTruthFullName;

  if (statementOfTruth) {
    // use a function for conditionally changing fullName validation
    const fullNamePath =
      typeof statementOfTruth.fullNamePath === 'function'
        ? statementOfTruth.fullNamePath(form?.data)
        : statementOfTruth.fullNamePath;

    const fullName = get(form?.data, fullNamePath || 'veteran.fullName');

    statementOfTruthFullName = fullName.first || '';

    if (fullName.middle) {
      statementOfTruthFullName += ` ${fullName.middle}`;
    }

    statementOfTruthFullName += ` ${fullName.last || ''}`;
  }

  return (
    <>
      {statementOfTruth ? (
        <>
          <p className="vads-u-padding-x--3">
            <strong>Note:</strong> According to federal law, there are criminal
            penalties, including a fine and/or imprisonment for up to 5 years,
            for withholding information or for providing incorrect information
            (See 18 U.S.C. 1001).
          </p>
          <article className="vads-u-background-color--gray-lightest vads-u-padding-bottom--3 vads-u-padding-x--3 vads-u-padding-top--1px vads-u-margin-bottom--3">
            <h3>{statementOfTruth.heading || 'Statement of truth'}</h3>
            {typeof statementOfTruth.body === 'string' ? (
              <p>{statementOfTruth.body}</p>
            ) : (
              statementOfTruth.body
            )}
            <p>
              I have read and accept the{' '}
              <a
                aria-label="Privacy policy, will open in new tab"
                target="_blank"
                href="/privacy-policy/"
              >
                privacy policy
              </a>
              .
            </p>
            <VaTextInput
              id="veteran-signature"
              name="veteran-signature"
              label={statementOfTruth.textInputLabel || 'Your full name'}
              class="signature-input"
              value={form?.data.statementOfTruthSignature}
              onInput={event =>
                setPreSubmit('statementOfTruthSignature', event.target.value)
              }
              type="text"
              error={
                showPreSubmitError &&
                form?.data.statementOfTruthSignature !==
                  statementOfTruthFullName
                  ? `Please enter your name exactly as it appears on your application: ${statementOfTruthFullName}`
                  : undefined
              }
              message-aria-describedby={`${statementOfTruth.heading ||
                'Statement of truth'}: ${
                statementOfTruth.messageAriaDescribedby
              }`}
              required
            />
            <Checkbox
              id="veteran-certify"
              name="veteran-certify"
              label="I certify the information above is correct and true to the best of my knowledge and belief."
              checked={form?.data.statementOfTruthCertified}
              onValueChange={value =>
                setPreSubmit('statementOfTruthCertified', value)
              }
              errorMessage={
                showPreSubmitError && !form?.data.statementOfTruthCertified
                  ? 'You must certify by checking the box'
                  : undefined
              }
              required
            />
            {/* <VaCheckbox
              id="veteran-certify"
              name="veteran-certify"
              label="I certify the information above is correct and true to the best of my knowledge and belief."
              checked={form?.data.statementOfTruthCertified}
              onVaChange={event =>
                setPreSubmit('statementOfTruthCertified', event.target.checked)
              }
              error={
                showPreSubmitError && !form?.data.statementOfTruthCertified
                  ? 'You must certify by checking the box'
                  : undefined
              }
              required
            /> */}
          </article>
        </>
      ) : (
        <div>
          {preSubmit.notice}
          {preSubmit.required &&
            (preSubmit.field.includes('privacyAgreement') ? (
              <VaPrivacyAgreement
                required={preSubmit.required}
                checked={checked}
                name={preSubmit.field}
                showError={
                  showPreSubmitError && !checked
                    ? preSubmit.error || 'Please accept'
                    : undefined
                }
                onVaChange={event =>
                  setPreSubmit(preSubmit?.field, event.target.checked)
                }
              />
            ) : (
              <VaCheckbox
                required={preSubmit.required}
                checked={checked}
                name={preSubmit.field}
                error={
                  showPreSubmitError && !checked
                    ? preSubmit.error || 'Please accept'
                    : undefined
                }
                label={preSubmit.label}
                description={null}
                onVaChange={event =>
                  setPreSubmit(preSubmit?.field, event.target.checked)
                }
              >
                {preSubmit.description && (
                  <p slot="description">{preSubmit.description}</p>
                )}
              </VaCheckbox>
            ))}
        </div>
      )}
      {saveFormLink}
    </>
  );
}

PreSubmitSection.propTypes = {
  form: PropTypes.shape({
    submission: PropTypes.shape({
      hasAttemptedSubmit: PropTypes.bool,
    }),
  }).isRequired,
  formConfig: PropTypes.shape({
    preSubmitInfo: PropTypes.object,
  }).isRequired,
  showPreSubmitError: PropTypes.bool,
  setPreSubmit: PropTypes.func.isRequired,
  user: PropTypes.shape({
    login: PropTypes.shape({
      currentlyLoggedIn: PropTypes.bool,
    }),
  }),
  showLoginModal: PropTypes.bool,
  saveAndRedirectToReturnUrl: PropTypes.func,
  toggleLoginModal: PropTypes.func,
  // added by withRouter
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

const mapDispatchToProps = {
  setPreSubmit: setPreSubmitAction,
  saveAndRedirectToReturnUrl: saveAndRedirectToReturnUrlAction,
  toggleLoginModal: toggleLoginModalAction,
};

export default withRouter(
  connect(
    (state, ownProps) => {
      const { form, user } = state;
      const { formConfig } = ownProps || {};

      const preSubmit = preSubmitSelector(formConfig);
      const showPreSubmitError = form?.submission?.hasAttemptedSubmit;
      return {
        form,
        preSubmit,
        showPreSubmitError,
        formConfig,
        user,
        showLoginModal: state.navigation.showLoginModal,
      };
    },
    mapDispatchToProps,
  )(PreSubmitSection),
);
