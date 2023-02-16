import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@department-of-veterans-affairs/component-library/Checkbox';
import recordEvent from 'platform/monitoring/record-event';
import SignatureInput from './SignatureInput';

const SignatureCheckbox = ({
  children,
  fullName,
  isRequired,
  label,
  setSignatures,
  showError,
  submission,
  isRepresentative,
}) => {
  const [hasError, setError] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const hasSubmittedForm = !!submission.status;
  const representativeLabelId = isRepresentative
    ? `${label}-signature-label`
    : undefined;
  const ariaDescribedbyMessage = isRepresentative
    ? `on behalf of ${fullName.first} ${fullName.middle} ${fullName.last}`
    : undefined;

  useEffect(
    () => {
      setError(showError);

      if (isChecked === true || hasSubmittedForm) setError(false);
    },
    [showError, isChecked, hasSubmittedForm],
  );

  return (
    <fieldset
      data-testid={label}
      className="signature-box vads-u-background-color--gray-lightest vads-u-padding--3 vads-u-margin-bottom--5"
    >
      {!!children && <>{children}</>}

      <SignatureInput
        ariaDescribedBy={ariaDescribedbyMessage}
        label={label}
        fullName={fullName}
        required={isRequired}
        showError={showError}
        hasSubmittedForm={hasSubmittedForm}
        isRepresentative={isRepresentative}
        setSignatures={setSignatures}
        isChecked={isChecked}
      />

      {isRepresentative && (
        <p className="signature-box--representative" id={representativeLabelId}>
          On behalf of
          <strong className="vads-u-font-size--lg">
            {fullName.first} {fullName.middle} {fullName.last}
          </strong>
        </p>
      )}

      <Checkbox
        onValueChange={value => {
          setIsChecked(value);
          recordEvent({
            'caregivers-poa-certification-checkbox-checked': value,
            fullName,
            label,
            isRepresentative,
          });
        }}
        label="I certify the information above is correct and true to the best of my knowledge and belief."
        errorMessage={hasError && 'Must certify by checking box'}
        required={isRequired}
      />
    </fieldset>
  );
};

SignatureCheckbox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  fullName: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  setSignatures: PropTypes.func.isRequired,
  showError: PropTypes.bool.isRequired,
  submission: PropTypes.object.isRequired,
  isRepresentative: PropTypes.bool,
  isRequired: PropTypes.bool,
};

export default SignatureCheckbox;
