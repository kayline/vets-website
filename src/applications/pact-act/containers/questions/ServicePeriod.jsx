import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TernaryRadios from './TernaryRadios';
import { updateServicePeriod } from '../../actions';
import { RESPONSES, SHORT_NAME_MAP } from '../../utilities/question-data-map';
import { ROUTES } from '../../constants';
import {
  navigateBackward,
  navigateForward,
} from '../../utilities/display-logic';
import { pageSetup } from '../../utilities/page-setup';

const ServicePeriod = ({
  formResponses,
  router,
  setServicePeriod,
  viewedIntroPage,
}) => {
  const [formError, setFormError] = useState(false);
  const shortName = SHORT_NAME_MAP.SERVICE_PERIOD;
  const H1 = 'Service Period 1';
  const servicePeriod = formResponses[shortName];
  const {
    DURING_BOTH_PERIODS,
    EIGHTYNINE_OR_EARLIER,
    NINETY_OR_LATER,
  } = RESPONSES;

  useEffect(
    () => {
      pageSetup(H1);
    },
    [H1],
  );

  useEffect(
    () => {
      if (!viewedIntroPage) {
        router.push(ROUTES.HOME);
      }
    },
    [router, viewedIntroPage],
  );

  const onContinueClick = () => {
    if (!servicePeriod) {
      setFormError(true);
    } else {
      setFormError(false);
      navigateForward(shortName, formResponses, router);
    }
  };

  const onBackClick = () => {
    navigateBackward(shortName, formResponses, router);
  };

  const onValueChange = event => {
    const { value } = event?.detail;
    setServicePeriod(value);

    if (value) {
      setFormError(false);
    }
  };

  const onBlurInput = () => {
    if (servicePeriod) {
      setFormError(false);
    }
  };

  return (
    <>
      <h1>{H1}</h1>
      <TernaryRadios
        formError={formError}
        formValue={servicePeriod}
        h1={H1}
        onBackClick={onBackClick}
        onBlurInput={onBlurInput}
        onContinueClick={onContinueClick}
        onValueChange={onValueChange}
        responses={[
          NINETY_OR_LATER,
          EIGHTYNINE_OR_EARLIER,
          DURING_BOTH_PERIODS,
        ]}
        shortName={shortName}
        testId="paw-servicePeriod"
      />
    </>
  );
};

const mapStateToProps = state => ({
  formResponses: state?.pactAct?.form,
  viewedIntroPage: state?.pactAct?.viewedIntroPage,
});

const mapDispatchToProps = {
  setServicePeriod: updateServicePeriod,
};

ServicePeriod.propTypes = {
  formResponses: PropTypes.object.isRequired,
  setServicePeriod: PropTypes.func.isRequired,
  viewedIntroPage: PropTypes.bool.isRequired,
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ServicePeriod);
