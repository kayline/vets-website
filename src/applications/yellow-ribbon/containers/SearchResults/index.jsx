// Dependencies.
import React, { Component } from 'react';
import AlertBox from '@department-of-veterans-affairs/component-library/AlertBox';
import LoadingIndicator from '@department-of-veterans-affairs/component-library/LoadingIndicator';
import Pagination from '@department-of-veterans-affairs/component-library/Pagination';
import PropTypes from 'prop-types';
import recordEvent from 'platform/monitoring/record-event';
import { connect } from 'react-redux';
import URLSearchParams from 'url-search-params';
// Relative imports.
import SearchResult from '../../components/SearchResult';
import scrollToTop from 'platform/utilities/ui/scrollToTop';
import { fetchResultsThunk, toggleSearchResultsToolTip } from '../../actions';
import { focusElement } from 'platform/utilities/ui';
import { getYellowRibbonAppState } from '../../helpers/selectors';
import { TOOL_TIP_CONTENT, TOOL_TIP_LABEL } from '../../constants';

export class SearchResults extends Component {
  static propTypes = {
    // From mapStateToProps.
    error: PropTypes.string.isRequired,
    fetching: PropTypes.bool.isRequired,
    isToolTipOpen: PropTypes.bool.isRequired,
    results: PropTypes.arrayOf(
      PropTypes.shape({
        city: PropTypes.string.isRequired,
        contributionAmount: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        insturl: PropTypes.string,
        nameOfInstitution: PropTypes.string.isRequired,
        numberOfStudents: PropTypes.number.isRequired,
        state: PropTypes.string.isRequired,
      }).isRequired,
    ),
    page: PropTypes.number.isRequired,
    perPage: PropTypes.number.isRequired,
    totalResults: PropTypes.number,
    // mapDispatchToProps
    toggleAlertToolTip: PropTypes.func,
    fetchResultsThunk: PropTypes.func,
  };

  componentDidUpdate(prevProps) {
    const justRefreshed = prevProps.fetching && !this.props.fetching;

    if (justRefreshed) {
      focusElement('[data-display-results-header]');
    }
  }

  onPageSelect = page => {
    const { fetchResults, perPage } = this.props;

    // Derive the current name params.
    const queryParams = new URLSearchParams(window.location.search);

    // Derive the state values from our query params.
    const city = queryParams.get('city') || '';
    const contributionAmount = queryParams.get('contributionAmount') || '';
    const name = queryParams.get('name') || '';
    const numberOfStudents = queryParams.get('numberOfStudents') || '';
    const state = queryParams.get('state') || '';

    // Refetch results.
    fetchResults({
      city,
      contributionAmount,
      hideFetchingState: true,
      name,
      numberOfStudents,
      page,
      perPage,
      state,
    });

    // Scroll to top.
    scrollToTop();
  };

  deriveResultsEndNumber = () => {
    const { page, perPage, totalResults } = this.props;

    // Derive the end number.
    const endNumber = page * perPage;

    // If the end number is more than the total results, just show the total results.
    if (endNumber > totalResults) {
      return totalResults;
    }

    // Show the end number.
    return endNumber;
  };

  deriveResultsStartNumber = () => {
    const { page, perPage } = this.props;

    // Derive the end number.
    const endNumber = page * perPage;

    // Derive the start number.
    return endNumber - (perPage - 1);
  };

  recordEventOnSearchResultClick = (school = {}) => () => {
    // Derive the current name params.
    const queryParams = new URLSearchParams(window.location.search);

    // Derive the state values from our query params.
    const searchQuery = queryParams.get('name') || '';

    const { page, perPage, totalResults } = this.props;

    recordEvent({
      event: 'onsite-search-results-click',
      'search-result-type': 'cta',
      'search-filters-list': {
        stateOrTerritory: school?.state || undefined,
        city: school?.city || undefined,
        contributionAmount: school?.contributionAmount || undefined,
        numberOfStudents: school?.numberOfStudents || undefined,
      },
      'search-results-top-recommendation': undefined,
      'search-selection': 'Yellow Ribbon',
      'search-result-chosen-page-url': window.location.href,
      'search-result-chosen-title': school?.nameOfInstitution,
      'search-query': searchQuery,
      'search-total-results': totalResults,
      'search-total-result-pages': Math.ceil(totalResults / perPage),
      'search-result-position': school?.positionInResults,
      'search-result-page': page,
    });
  };

  render() {
    const {
      deriveResultsEndNumber,
      deriveResultsStartNumber,
      onPageSelect,
      recordEventOnSearchResultClick,
    } = this;
    const {
      error,
      fetching,
      isToolTipOpen,
      page,
      perPage,
      results,
      totalResults,
      toggleAlertToolTip,
    } = this.props;

    // Show loading indicator if we are fetching.
    if (fetching) {
      return <LoadingIndicator setFocus message="Loading search results..." />;
    }

    // Show the error alert box if there was an error.
    if (error) {
      return (
        <AlertBox
          headline="Something went wrong"
          content={error}
          status="error"
        />
      );
    }

    // Do not render if we have not fetched, yet.
    if (!results) {
      return null;
    }

    // Show no results found message.
    if (!results.length) {
      return (
        <>
          <h2
            className="va-introtext va-u-outline--none vads-u-font-size--lg vads-u-margin-top--1p5 vads-u-font-weight--normal"
            data-display-results-header
          >
            No schools found for your search criteria.
          </h2>
          <AlertBox
            content={TOOL_TIP_CONTENT}
            headline={TOOL_TIP_LABEL}
            onCloseAlert={toggleAlertToolTip}
            isVisible={isToolTipOpen}
            status="info"
          />
        </>
      );
    }

    // Derive values for "Displayed x-x out of x results."
    const resultsStartNumber = deriveResultsStartNumber();
    const resultsEndNumber = deriveResultsEndNumber();

    return (
      <>
        <h2
          className="va-introtext va-u-outline--none vads-u-font-size--lg vads-u-margin-top--1p5 vads-u-font-weight--normal"
          data-display-results-header
        >
          Displaying {resultsStartNumber}
          <span className="vads-u-visibility--screen-reader">through</span>
          <span aria-hidden="true" role="presentation">
            &ndash;
          </span>
          {resultsEndNumber} of {totalResults} results
        </h2>
        <AlertBox
          content={TOOL_TIP_CONTENT}
          headline={TOOL_TIP_LABEL}
          isVisible={isToolTipOpen}
          onCloseAlert={toggleAlertToolTip}
          status="info"
        />

        {/* Table of Results */}
        <ul
          className="search-results vads-u-margin-top--2 vads-u-padding--0"
          data-e2e-id="search-results"
        >
          {results?.map((school, index) => (
            <SearchResult
              key={school?.id}
              school={{ ...school, positionInResults: index + 1 }}
              onSearchResultClick={recordEventOnSearchResultClick}
            />
          ))}
        </ul>

        {/* Pagination */}
        <Pagination
          className="vads-u-border-top--0"
          onPageSelect={onPageSelect}
          page={page}
          pages={Math.ceil(totalResults / perPage)}
          maxPageListLength={perPage}
          showLastPage
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  error: getYellowRibbonAppState(state).error,
  fetching: getYellowRibbonAppState(state).fetching,
  isToolTipOpen: getYellowRibbonAppState(state).isToolTipOpen,
  results: getYellowRibbonAppState(state).results,
  page: getYellowRibbonAppState(state).page,
  perPage: getYellowRibbonAppState(state).perPage,
  totalResults: getYellowRibbonAppState(state).totalResults,
});

const mapDispatchToProps = dispatch => ({
  fetchResults: options => fetchResultsThunk(options)(dispatch),
  toggleAlertToolTip: () => dispatch(toggleSearchResultsToolTip()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResults);
