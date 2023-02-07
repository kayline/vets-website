import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

// eslint-disable-next-line import/no-unresolved
import { recordEvent } from '@department-of-veterans-affairs/platform-monitoring/exports';

import { createAnalyticsSlug } from '../utils/analytics';
import { useFormRouting } from '../hooks/useFormRouting';
import { URLS } from '../utils/navigation';

const BackButton = props => {
  const { action, prevUrl, router, text = null } = props;
  const {
    getCurrentPageFromRouter,
    getPreviousPageFromRouter,
  } = useFormRouting(router);
  const { t } = useTranslation();

  const currentPage = getCurrentPageFromRouter();
  const previousPage = getPreviousPageFromRouter();

  const handleClick = useCallback(
    e => {
      e.preventDefault();
      recordEvent({
        event: createAnalyticsSlug('back-button-clicked', 'nav'),
        fromPage: currentPage,
      });
      action();
    },
    [currentPage, action],
  );

  if (previousPage && previousPage === URLS.LOADING) {
    return '';
  }
  return (
    <>
      <nav
        aria-label={t('breadcrumb')}
        aria-live="polite"
        className="va-nav-breadcrumbs va-nav-breadcrumbs--mobile"
      >
        <ul className="row va-nav-breadcrumbs-list columns">
          <li>
            <Link onClick={handleClick} to={prevUrl} data-testid="back-button">
              {text || t('back-to-last-screen')}
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

BackButton.propTypes = {
  action: PropTypes.func,
  prevUrl: PropTypes.string,
  router: PropTypes.object,
  text: PropTypes.string,
};

export default BackButton;
