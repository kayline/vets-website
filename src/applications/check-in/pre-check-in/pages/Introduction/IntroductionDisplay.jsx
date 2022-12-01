import React, { useMemo, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { VaModal } from '@department-of-veterans-affairs/web-components/react-bindings';

import AppointmentBlock from '../../../components/AppointmentBlock';

import { useFormRouting } from '../../../hooks/useFormRouting';

import { makeSelectVeteranData } from '../../../selectors';

import ExternalLink from '../../../components/ExternalLink';
import Wrapper from '../../../components/layout/Wrapper';

const IntroductionDisplay = props => {
  const { router } = props;
  const { t } = useTranslation();
  const { goToNextPage } = useFormRouting(router);
  const selectVeteranData = useMemo(makeSelectVeteranData, []);
  const { appointments } = useSelector(selectVeteranData);

  const [privacyActModalOpen, setPrivacyActModalOpen] = useState(false);

  const accordionContent = [
    {
      header: t('will-va-protect-my-personal-health-information'),
      body: (
        <>
          <p>
            {t(
              'we-make-every-effort-to-keep-your-personal-information-private-and-secure',
            )}
          </p>
          <p>
            <ExternalLink href="/privacy-policy/" hrefLang="en">
              {t('read-more-about-privacy-and-security-on-va-gov')}
            </ExternalLink>
          </p>
          <p>
            {t(
              'youre-also-responsible-for-protecting-your-personal-health-information-if-you-print-or-download-your-information-or-share-it-electronically-with-others-youll-need-to-take-steps-to-protect-it',
            )}
          </p>
          <p>
            <ExternalLink
              href="https://www.myhealth.va.gov/mhv-portal-web/web/myhealthevet/protecting-your-personal-health-information"
              hrefLang="en"
            >
              {t('get-tips-for-protecting-your-personal-health-information')}
            </ExternalLink>
          </p>
        </>
      ),
    },
  ];

  const StartButton = () => (
    <div
      className="vads-u-margin-bottom--4 vads-u-display--block"
      data-testid="start-button"
    >
      <a
        className="vads-c-action-link--green"
        href="#answer"
        onKeyDown={useCallback(e => {
          if (e.key === ' ') {
            e.preventDefault();
            goToNextPage();
          }
        }, [])}
        onClick={useCallback(e => {
          e.preventDefault();
          goToNextPage();
        }, [])}
      >
        {t('answer-questions')}
      </a>
    </div>
  );
  return (
    <Wrapper
      testID="intro-wrapper"
      pageTitle={t('answer-pre-check-in-questions')}
    >
      <p className="vads-u-font-family--serif">
        {t('your-answers-will-help-us-better-prepare-for-your-needs')}
      </p>
      <AppointmentBlock appointments={appointments} page="intro" />

      <h2 className="vads-u-margin-top--6">{t('start-here')}</h2>
      <StartButton />
      {accordionContent && accordionContent.length ? (
        <va-accordion
          bordered
          className="vads-u-margin-top--1"
          data-testid="intro-accordion-group"
          open-single={accordionContent.length === 1}
        >
          {accordionContent.map((accordionItem, index) => (
            <va-accordion-item
              level="2"
              header={accordionItem.header}
              key={index}
              data-testid="intro-accordion-item"
            >
              {accordionItem.body}
            </va-accordion-item>
          ))}
        </va-accordion>
      ) : (
        ''
      )}
      <div className="vads-u-margin-top--4">
        <a
          href="#privacy-modal"
          onClick={useCallback(
            e => {
              e.preventDefault();
              setPrivacyActModalOpen(true);
            },
            [setPrivacyActModalOpen],
          )}
        >
          {t('privacy-act-statement')}
        </a>
      </div>
      <VaModal
        modalTitle={t('privacy-act-statement')}
        onCloseEvent={useCallback(() => setPrivacyActModalOpen(false), [
          setPrivacyActModalOpen,
        ])}
        visible={privacyActModalOpen}
        initialFocusSelector="button"
      >
        <p>
          {t(
            'we-ask-you-to-provide-the-information-in-this-questionnaire-to-help-with-your-medical-care-under-law-38-u-s-c-chapter-17-its-your-choice-if-you-want-to-provide-this-information-if-you-choose-not-to-provide-this-information-it-may-make-it-harder-for-us-to-prepare-for-your-visit-but-it-wont-have-any-effect-on-your-eligibility-for-any-va-benefits-or-services-we-may-use-and-share-the-information-you-provide-in-this-questionnaire-in-the-ways-were-allowed-to-by-law-we-may-make-a-routine-use-disclosure-of-the-information-as-outlined-in-the-privacy-act-system-of-records-notice-in-24va10a7-patient-medical-record-va-and-following-the-veterans-health-administration-vha-notice-of-privacy-practices',
          )}
        </p>
      </VaModal>
    </Wrapper>
  );
};

IntroductionDisplay.propTypes = {
  router: PropTypes.object,
};

export default IntroductionDisplay;
