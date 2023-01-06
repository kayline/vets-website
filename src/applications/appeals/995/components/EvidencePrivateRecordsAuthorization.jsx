import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { VaCheckbox } from '@department-of-veterans-affairs/component-library/dist/react-bindings';

import FormNavButtons from 'platform/forms-system/src/js/components/FormNavButtons';
import { $ } from 'platform/forms-system/src/js/utilities/ui';
import { scrollAndFocus } from 'platform/utilities/ui';

import {
  authorizationLabel,
  authorizationAlertContent,
  authorizationInfo,
} from '../content/evidencePrivateRecordsAuthorization';

const EvidencePrivateRecordsAuthorization = ({
  data = {},
  goBack,
  goForward,
  setFormData,
  contentBeforeButtons,
  contentAfterButtons,
}) => {
  const [hasError, setHasError] = useState(false);

  const handlers = {
    onSubmit: event => {
      // This prevents this nested form submit event from passing to the
      // outer form and causing a page advance
      event.stopPropagation();
    },
    onAnchorClick: () => {
      scrollAndFocus($('va-checkbox'));
    },
    onChange: event => {
      const { checked } = event.target;
      setFormData({ ...data, privacyAgreementAccepted: checked });
      setHasError(!checked);
      if (!checked) {
        scrollAndFocus($('va-alert'));
      }
    },
    onGoForward: () => {
      // Required checkbox
      if (data.privacyAgreementAccepted) {
        setHasError(false);
        goForward(data);
      } else {
        setHasError(true);
        scrollAndFocus($('va-alert'));
      }
    },
  };

  /**
   * We are rendering the va-alert so the focus doesn't need to wait for render
   * Problems that show up include:
   * - focusElement will add -1 if this isn't set; and don't make it tabbable
   *   when hidden
   * - Only render the alert content since the screenreader can still target
   *   the headers inside
   */
  const isTabbable = hasError ? '0' : '-1';
  return (
    <>
      <form>
        <va-alert status="warning" visible={hasError} tabIndex={isTabbable}>
          {hasError && authorizationAlertContent(handlers.onAnchorClick)}
        </va-alert>
        {authorizationInfo}
        <VaCheckbox
          id="privacy-agreement"
          label={authorizationLabel}
          checked={data.privacyAgreementAccepted}
          onVaChange={handlers.onChange}
          required
          tabindex="0" // focusElement will add -1 if this isn't set
        />
        <div className="vads-u-margin-top--4">
          {contentBeforeButtons}
          <FormNavButtons goBack={goBack} goForward={handlers.onGoForward} />
          {contentAfterButtons}
        </div>
      </form>
    </>
  );
};

EvidencePrivateRecordsAuthorization.propTypes = {
  contentAfterButtons: PropTypes.element,
  contentBeforeButtons: PropTypes.element,
  data: PropTypes.shape({
    privacyAgreementAccepted: PropTypes.bool,
  }),
  goBack: PropTypes.func,
  goForward: PropTypes.func,
  setFormData: PropTypes.func,
};

export default EvidencePrivateRecordsAuthorization;
