import React from 'react';
import PropTypes from 'prop-types';
import { fromUnixTime, isBefore } from 'date-fns';
import { format } from 'date-fns-tz';
import { connect } from 'react-redux';

import {
  formBenefits,
  formDescriptions,
  formLinks,
} from 'applications/personalization/dashboard/helpers';
import LoadingIndicator from '@department-of-veterans-affairs/component-library/LoadingIndicator';
import { VaModal } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import {
  WIZARD_STATUS,
  WIZARD_STATUS_COMPLETE,
} from 'platform/site-wide/wizard';
import { removeSavedForm } from '../../user/profile/actions';

import {
  APP_ACTION_DEFAULT,
  APP_TYPE_DEFAULT,
  CONTINUE_APP_DEFAULT_MESSAGE,
  START_NEW_APP_DEFAULT_MESSAGE,
} from '../../forms-system/src/js/constants';

export class ApplicationStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      loading: false,
    };
  }

  componentDidUpdate(oldProps) {
    if (oldProps.profile.loading && !this.props.profile.loading) {
      clearTimeout(this.timeout);
    }
  }

  removeForm = formId => {
    this.setState({ modalOpen: false, loading: true });
    this.props
      .removeSavedForm(formId)
      // Swallow any errors and redirect anyway
      .catch(x => x)
      .then(() => {
        // This application status is rendered on the form INFO page, so the
        // stayAfterDelete is used to show the wizard again; this will be
        // obsolete once all wizards are moved to the intro page
        sessionStorage.removeItem(this.props.wizardStatus || WIZARD_STATUS);
        if (!this.props.stayAfterDelete) {
          window.location.href = formLinks[formId];
        } else {
          this.setState({ modalOpen: false, loading: false });
        }
      });
  };

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  handleResume = () => {
    // make sure we skip the wizard on resume
    sessionStorage.setItem(
      this.props.wizardStatus || WIZARD_STATUS,
      WIZARD_STATUS_COMPLETE,
    );
  };

  render() {
    const {
      formIds,
      profile,
      login,
      applyHeading,
      applyText,
      showApplyButton,
      applyRender,
      formType,
      applyLink,
      formConfig,
    } = this.props;
    const {
      appAction = APP_ACTION_DEFAULT,
      appType = APP_TYPE_DEFAULT,
      continueAppButtonText = CONTINUE_APP_DEFAULT_MESSAGE,
      startNewAppButtonText = START_NEW_APP_DEFAULT_MESSAGE,
    } = formConfig?.customText || {};
    let savedForm;
    let { formId } = this.props;
    let multipleForms = false;

    if (profile.loading || this.state.loading) {
      const message = profile.loading
        ? `Checking your ${appType} status.`
        : `Deleting your ${appType}.`;

      return (
        <div className="sip-application-status vads-u-margin-bottom--2 vads-u-margin-top--0">
          <LoadingIndicator message={message} />
        </div>
      );
    }

    if (formIds) {
      const matchingForms = profile.savedForms.filter(({ form }) =>
        formIds.has(form),
      );
      if (matchingForms.length) {
        savedForm = matchingForms.sort(
          ({ metadata }) => -1 * metadata.lastUpdated,
        )[0];
        formId = savedForm.form;
        multipleForms = matchingForms.length > 1;
      }
    } else {
      savedForm = profile.savedForms.find(
        ({ form }) => form === this.props.formId,
      );
    }

    if (login.currentlyLoggedIn && savedForm) {
      const {
        lastUpdated: lastSaved,
        expiresAt: expirationTime,
      } = savedForm.metadata;
      const expirationDate = fromUnixTime(expirationTime);
      const isExpired = isBefore(expirationDate, new Date());

      if (!isExpired) {
        const lastSavedDateTime = lastSaved
          ? format(fromUnixTime(lastSaved), "MMMM d, yyyy', at' h:mm aaaa z")
          : null;

        return (
          <div className="usa-alert usa-alert-info background-color-only sip-application-status vads-u-margin-bottom--2 vads-u-margin-top--0">
            <h5 className="form-title saved">Your {appType} is in progress</h5>
            <span className="saved-form-item-metadata">
              Your {formDescriptions[formId]} is in progress.
            </span>
            <br />
            {lastSavedDateTime && (
              <span className="saved-form-item-metadata">
                Your {appType} was last saved on {lastSavedDateTime}
              </span>
            )}
            <br />
            <div className="expires-container">
              You can continue {appAction} now, or come back later to finish
              your {appType}. Your {appType}{' '}
              <span className="expires">
                will expire on {format(expirationDate, 'MMMM d, yyyy')}.
              </span>
            </div>
            <p>
              <a
                className="usa-button-primary"
                href={`${formLinks[formId]}resume`}
                onClick={this.handleResume}
              >
                {continueAppButtonText}
              </a>
              <button
                className="usa-button-secondary"
                onClick={this.toggleModal}
              >
                {startNewAppButtonText}
              </button>
            </p>
            {multipleForms && (
              <p className="no-bottom-margin">
                You have more than one in-progress {formType} {appType}.{' '}
                <a href="/my-va">
                  View and manage your {appType}s on your Account page
                </a>
                .
              </p>
            )}
            <VaModal
              large
              id="start-over-modal"
              onCloseEvent={this.toggleModal}
              modalTitle={`Starting over will delete your in-progress ${appType}.`}
              visible={this.state.modalOpen}
              onPrimaryButtonClick={() => this.removeForm(formId)}
              primaryButtonText={startNewAppButtonText}
              onSecondaryButtonClick={this.toggleModal}
              secondaryButtonText="Cancel"
            >
              <p>Are you sure you want to start over?</p>
            </VaModal>
          </div>
        );
      }
      return (
        <div className="usa-alert usa-alert-warning background-color-only sip-application-status vads-u-margin-bottom--2 vads-u-margin-top--0">
          <h5 className="form-title saved">Your {appType} has expired</h5>
          <span className="saved-form-item-metadata">
            Your saved {formDescriptions[formId]} has expired. If you want to
            apply for {formBenefits[formId]}, please start a new {appType}.
          </span>
          <br />
          <p>
            <button className="usa-button-primary" onClick={this.toggleModal}>
              {startNewAppButtonText}
            </button>
          </p>
          {multipleForms && (
            <p className="no-bottom-margin">
              You have more than one in-progress {formType} {appType}.{' '}
              <a href="/my-va">
                View and manage your {appType}s on your Account page
              </a>
              .
            </p>
          )}
          <VaModal
            class="va-modal-large"
            id="start-over-modal"
            onCloseEvent={this.toggleModal}
            modalTitle={`Starting over will delete your in-progress ${appType}.`}
            visible={this.state.modalOpen}
            onPrimaryButtonClick={() => this.removeForm(formId)}
            primaryButtonText={startNewAppButtonText}
            onSecondaryButtonClick={this.toggleModal}
            secondaryButtonText="Cancel"
          >
            <p>Are you sure you want to start over?</p>
          </VaModal>
        </div>
      );
    }

    if (showApplyButton && applyRender) {
      return applyRender();
    }
    if (showApplyButton) {
      return (
        <div
          itemProp="steps"
          itemScope
          itemType="http://schema.org/HowToSection"
        >
          <h2 itemProp="name">{applyHeading}</h2>
          <div itemProp="itemListElement">
            {this.props.additionalText && <p>{this.props.additionalText}</p>}
            <div className="sip-application-status vads-u-margin-bottom--2 vads-u-margin-top--0">
              <a
                className="usa-button-primary va-button-primary"
                href={formLinks[formId]}
              >
                {applyText}
              </a>
              {this.props.showLearnMoreLink && (
                <p>
                  <a href={applyLink}>Learn more about how to apply</a>
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }

    return null;
  }
}

ApplicationStatus.propTypes = {
  formId: PropTypes.string,
  formType: PropTypes.string,
  applyHeading: PropTypes.string,
  applyLink: PropTypes.string,
  applyRender: PropTypes.func,
  applyText: PropTypes.string,
  additionalText: PropTypes.string,
  login: PropTypes.shape({
    currentlyLoggedIn: PropTypes.bool.isRequired,
  }),
  profile: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    savedForms: PropTypes.array.isRequired,
  }),
  stayAfterDelete: PropTypes.bool,
  showLearnMoreLink: PropTypes.bool,
  formConfig: PropTypes.shape({
    customText: PropTypes.shape({
      continueAppButtonText: PropTypes.string,
      startNewAppButtonText: PropTypes.string,
    }),
  }),
};

ApplicationStatus.defaultProps = {
  applyHeading: 'Ready to apply?',
};

function mapStateToProps(state, ownProps) {
  const { login, profile } = state.user;

  return {
    login,
    profile,
    formConfig: ownProps.formConfig,
  };
}

const mapDispatchToProps = {
  removeSavedForm,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApplicationStatus);
