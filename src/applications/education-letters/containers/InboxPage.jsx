import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import { HasLetters, NoLetters } from '../components/LetterResults';
import { fetchClaimStatus } from '../actions';

const InboxPage = ({
  claimStatus,
  getClaimStatus,
  user,
  MEBClaimStatusFetchInProgress,
  MEBClaimStatusFetchComplete,
  TOEClaimStatusFetchInProgress,
  TOEClaimStatusFetchComplete,
}) => {
  const [fetchedClaimStatus, setFetchedClaimStatus] = useState(null);

  useEffect(
    () => {
      if (!user?.login?.currentlyLoggedIn) {
        return;
      }

      if (!fetchedClaimStatus) {
        getClaimStatus('MEB');
        getClaimStatus('TOE');
        setFetchedClaimStatus(true);
      }
    },
    [fetchedClaimStatus, getClaimStatus, user?.login?.currentlyLoggedIn],
  );

  const renderInbox = () => {
    if (MEBClaimStatusFetchInProgress || TOEClaimStatusFetchInProgress) {
      return (
        <div className="vads-u-margin-y--5">
          <va-loading-indicator
            label="Loading"
            message="Please wait while we load the application for you."
            set-focus
          />
        </div>
      );
    }

    // let mockClaimStatus = {
    //   claimStatus: 'ELIGIBLE',
    //   receivedDate: '2020-12-12',
    // };
    if (MEBClaimStatusFetchComplete || TOEClaimStatusFetchComplete) {
      if (['ELIGIBLE', 'DENIED'].includes(claimStatus?.claimStatus)) {
        return <HasLetters claimStatus={claimStatus} />;
      }
      return <NoLetters />;
    }

    if (
      MEBClaimStatusFetchComplete &&
      TOEClaimStatusFetchComplete &&
      !claimStatus?.claimStatus
    ) {
      return (
        <va-banner
          headline="There was an error in accessing your decision letters. We’re sorry we couldn’t display your letters.  Please try again later."
          type="error"
          visible
        />
      );
    }
    return false;
  };
  return (
    <Layout
      clsName="inbox-page"
      breadCrumbs={{
        href: '/education/download-letters/letters',
        text: 'Your VA education letter',
      }}
    >
      <article>{renderInbox()}</article>
    </Layout>
  );
};

InboxPage.propTypes = {
  claimStatus: PropTypes.object,
  getClaimStatus: PropTypes.func,
  MEBClaimStatusFetchInProgress: PropTypes.bool,
  MEBClaimStatusFetchComplete: PropTypes.bool,
  TOEClaimStatusFetchInProgress: PropTypes.bool,
  TOEClaimStatusFetchComplete: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = state => {
  const { MEBClaimStatus, TOEClaimStatus } = state?.data;
  let latestClaim;

  if (
    !!MEBClaimStatus?.claimStatus &&
    !['ERROR', 'SUBMITTED'].includes(MEBClaimStatus?.claimStatus) &&
    !!TOEClaimStatus?.claimStatus &&
    !['ERROR', 'SUBMITTED'].includes(TOEClaimStatus?.claimStatus)
  ) {
    latestClaim =
      MEBClaimStatus?.receivedDate > TOEClaimStatus?.receivedDate
        ? { ...MEBClaimStatus }
        : { ...TOEClaimStatus };
  } else if (['ELIGIBLE', 'DENIED'].includes(MEBClaimStatus?.claimStatus)) {
    latestClaim = { ...MEBClaimStatus };
  } else if (['ELIGIBLE', 'DENIED'].includes(TOEClaimStatus?.claimStatus)) {
    latestClaim = { ...TOEClaimStatus };
  }

  return {
    claimStatus: latestClaim,
    MEBClaimStatusFetchInProgress: state?.data?.MEBClaimStatusFetchInProgress,
    MEBClaimStatusFetchComplete: state?.data?.MEBClaimStatusFetchComplete,
    TOEClaimStatusFetchInProgress: state?.data?.TOEClaimStatusFetchInProgress,
    TOEClaimStatusFetchComplete: state?.data?.TOEClaimStatusFetchComplete,
    user: state.user,
  };
};

const mapDispatchToProps = {
  getClaimStatus: fetchClaimStatus,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InboxPage);
