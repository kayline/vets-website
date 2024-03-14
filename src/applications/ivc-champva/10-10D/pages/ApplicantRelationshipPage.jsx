import React, { useState, useEffect } from 'react';
import {
  VaButton,
  VaRadio,
  VaTextInput,
} from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import { titleUI } from 'platform/forms-system/src/js/web-component-patterns';
import FormNavButtons from 'platform/forms-system/src/js/components/FormNavButtons';
import PropTypes from 'prop-types';

import { applicantWording } from '../helpers/wordingCustomization';

const KEYNAME = 'applicantRelationshipToSponsor';

export function appRelBoilerplate({ data, pagePerItemIndex }) {
  const { keyname = KEYNAME } = data;
  const currentListItem = data?.applicants?.[pagePerItemIndex];
  const personTitle = 'Sponsor';
  const applicant = applicantWording(currentListItem, undefined, false);

  // Determine what tense/person the phrasing should be in
  const useFirstPerson =
    data?.certifierRole === 'applicant' && +pagePerItemIndex === 0;

  const relative = `${useFirstPerson ? 'I' : applicant}`;
  const beingVerbPresent = useFirstPerson ? 'am' : 'is';

  const relativePossessive = applicantWording(
    currentListItem,
    undefined,
    true,
    false,
  );

  return {
    keyname,
    currentListItem,
    personTitle,
    applicant,
    useFirstPerson,
    relative,
    beingVerbPresent,
    relativePossessive,
  };
}

function generateOptions({ data, pagePerItemIndex }) {
  const {
    keyname,
    currentListItem,
    personTitle,
    applicant,
    useFirstPerson,
    relative,
    beingVerbPresent,
    relativePossessive,
  } = appRelBoilerplate({ data, pagePerItemIndex });

  const marriedDeceased = `${relative} was married to the ${personTitle} at any time`;
  const marriedLiving = `${relative} ${beingVerbPresent} the ${personTitle}’s spouse`;
  const marriedLivingDivorced = `${relative} was the ${personTitle}’s spouse, but ${beingVerbPresent} no longer married to the ${personTitle}`;

  const marriageOptions = [];
  if (data.sponsorIsDeceased) {
    marriageOptions.push({ label: marriedDeceased, value: 'spouse' });
  } else {
    marriageOptions.push({ label: marriedLiving, value: 'spouse' });
    marriageOptions.push({
      label: marriedLivingDivorced,
      value: 'spouseSeparated',
    });
  }

  // Create dynamic radio labels based on above phrasing
  const options = [
    ...marriageOptions,
    {
      label: `${relative} ${beingVerbPresent} the ${personTitle}’s ${
        data.sponsorIsDeceased ? 'surviving' : ''
      } child (including adopted children and stepchildren)`,
      value: 'child',
    },
    {
      label: `${
        useFirstPerson ? 'Our' : `${applicant}’s`
      } relationship is not listed here`,
      value: 'other',
    },
  ];

  return {
    options,
    useFirstPerson,
    relativePossessive,
    applicant,
    personTitle,
    keyname,
    currentListItem,
    description: `Relationship to ${personTitle}`,
  };
}

const relationshipStructure = {
  relationshipToVeteran: undefined,
  otherRelationshipToVeteran: undefined,
};

export function ApplicantRelationshipReviewPage(props) {
  const { data, keyname = KEYNAME } = props || {};
  const genOps = props.genOp || generateOptions;
  const {
    currentListItem,
    options,
    description,
    useFirstPerson,
    applicant,
    personTitle,
  } = genOps(props);
  const other = currentListItem?.[keyname]?.otherRelationshipToVeteran;
  return data ? (
    <div className="form-review-panel-page">
      <div className="form-review-panel-page-header-row">
        <h4 className="form-review-panel-page-header vads-u-font-size--h5">
          {props.title(currentListItem)}
        </h4>
        <VaButton secondary onClick={props.editPage} text="Edit" uswds />
      </div>
      <dl className="review">
        <div className="review-row">
          <dt>{description}</dt>
          <dd>
            {options.map(
              opt =>
                opt.value === currentListItem?.[keyname]?.relationshipToVeteran
                  ? opt.label
                  : '',
            )}
          </dd>
        </div>

        {other ? (
          <div className="review-row">
            <dt>
              Since {useFirstPerson ? 'your' : `${applicant}’s `} relationship
              with the {personTitle} was not listed, please describe it here
            </dt>
            <dd>{other}</dd>
          </div>
        ) : null}
      </dl>
    </div>
  ) : null;
}

export default function ApplicantRelationshipPage({
  data,
  genOp,
  setFormData,
  goBack,
  goForward,
  keyname = KEYNAME,
  pagePerItemIndex,
  updatePage,
  onReviewPage,
}) {
  const [checkValue, setCheckValue] = useState(
    data?.applicants?.[pagePerItemIndex]?.[keyname] || relationshipStructure,
  );
  const [checkError, setCheckError] = useState(undefined);
  const [inputError, setInputError] = useState(undefined);
  const [dirty, setDirty] = useState(false);
  const navButtons = <FormNavButtons goBack={goBack} submitToContinue />;
  // eslint-disable-next-line @department-of-veterans-affairs/prefer-button-component
  const updateButton = <button type="submit">Update page</button>;
  const genOps = genOp || generateOptions;
  const {
    options,
    relativePossessive,
    useFirstPerson,
    applicant,
    personTitle,
    customTitle,
    description,
  } = genOps({
    data,
    pagePerItemIndex,
  });

  const handlers = {
    validate() {
      let isValid = true;
      if (!checkValue.relationshipToVeteran) {
        setCheckError('This field is required');
        isValid = false;
      } else {
        setCheckError(null); // Clear any existing err msg
      }
      if (
        checkValue.relationshipToVeteran === 'other' &&
        !checkValue.otherRelationshipToVeteran
      ) {
        setInputError('This field is required');
        isValid = false;
      } else {
        setInputError(null);
      }
      return isValid;
    },
    radioUpdate: ({ detail }) => {
      const val =
        detail.value === 'other'
          ? {
              relationshipToVeteran: detail.value,
              otherRelationshipToVeteran: undefined,
            }
          : { relationshipToVeteran: detail.value };
      setDirty(true);
      setCheckValue(val);
      handlers.validate();
    },
    inputUpdate: ({ target }) => {
      const val = checkValue;
      val.otherRelationshipToVeteran = target.value;
      setDirty(true);
      setCheckValue(val);
      handlers.validate();
    },
    onGoForward: event => {
      event.preventDefault();
      if (!handlers.validate()) return;
      const testVal = { ...data };
      testVal.applicants[pagePerItemIndex][keyname] = checkValue;
      setFormData(testVal);
      if (onReviewPage) updatePage();
      goForward(data);
    },
  };

  useEffect(
    () => {
      if (dirty) handlers.validate();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, checkValue],
  );
  return (
    <>
      {
        titleUI(
          customTitle ||
            `${
              useFirstPerson ? `Your` : `${applicant}’s`
            } relationship to the ${personTitle}`,
        )['ui:title']
      }

      <form onSubmit={handlers.onGoForward}>
        <VaRadio
          class="vads-u-margin-y--2"
          label={
            description ||
            `What ${data.sponsorIsDeceased ? 'was' : 'is'} ${
              useFirstPerson ? `your` : `${applicant}’s`
            } relationship to the ${personTitle}?`
          }
          hint="Depending on your response, you may need to submit additional documents with this application."
          required
          error={checkError}
          onVaValueChange={handlers.radioUpdate}
        >
          {options.map(option => (
            <va-radio-option
              key={option.value}
              name="describes-you"
              label={option.label}
              value={option.value}
              checked={checkValue.relationshipToVeteran === option.value}
              uswds
              aria-describedby={
                checkValue.relationshipToVeteran === option.value
                  ? option.value
                  : null
              }
            />
          ))}
        </VaRadio>
        {checkValue.relationshipToVeteran === 'other' && (
          <div
            className={
              checkValue.relationshipToVeteran === 'other'
                ? 'form-expanding-group form-expanding-group-open'
                : ''
            }
          >
            <div className="form-expanding-group-inner-enter-done">
              <div className="schemaform-expandUnder-indent">
                <VaTextInput
                  label={`Since ${relativePossessive} relationship with the ${personTitle} was not listed, please describe it here`}
                  onInput={handlers.inputUpdate}
                  required={checkValue.relationshipToVeteran === 'other'}
                  error={inputError}
                  value={checkValue.otherRelationshipToVeteran}
                  uswds
                />
              </div>
            </div>
          </div>
        )}
        {onReviewPage ? updateButton : navButtons}
      </form>
    </>
  );
}

ApplicantRelationshipReviewPage.propTypes = {
  data: PropTypes.object,
  editPage: PropTypes.func,
  genOp: PropTypes.func,
  keyname: PropTypes.string,
  title: PropTypes.func,
};

ApplicantRelationshipPage.propTypes = {
  data: PropTypes.object,
  genOp: PropTypes.func,
  goBack: PropTypes.func,
  goForward: PropTypes.func,
  keyname: PropTypes.string,
  pagePerItemIndex: PropTypes.string || PropTypes.number,
  setFormData: PropTypes.func,
  updatePage: PropTypes.func,
  onReviewPage: PropTypes.bool,
};
