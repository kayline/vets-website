/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  VaBreadcrumbs,
  VaModal,
} from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import { focusElement } from '@department-of-veterans-affairs/platform-utilities/ui';
import { isEmpty } from 'lodash';
import appendQuery from 'append-query';
import { browserHistory } from 'react-router';
import SearchControls from '../components/search/SearchControls';
import SearchResultsHeader from '../components/results/SearchResultsHeader';
import ResultsList from '../components/results/ResultsList';
import PaginationWrapper from '../components/results/PaginationWrapper';
import { ErrorTypes } from '../constants';

import {
  clearSearchText,
  clearSearchResults,
  fetchRepresentatives,
  searchWithInput,
  updateSearchQuery,
  updateSortType,
  geolocateUser,
  geocodeUserAddress,
  submitRepresentativeReport,
  updateFromLocalStorage,
  clearError,
} from '../actions';

const SearchPage = props => {
  const searchResultTitleRef = useRef(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisplayingResults, setIsDisplayingResults] = useState(false);

  const updateUrlParams = params => {
    const { location, currentQuery } = props;

    const queryParams = {
      ...location.query,
      address: currentQuery.locationInputString,
      lat: currentQuery.position?.latitude,
      long: currentQuery.position?.longitude,
      page: currentQuery.page || 1,
      perPage: 10,
      sort: currentQuery.sortType.toLowerCase(),
      type: currentQuery.representativeType,
      name: currentQuery.representativeInputString,

      ...params,
    };
    const queryStringObj = appendQuery(
      `/get-help-from-accredited-representative/find-rep${location.pathname}`,
      queryParams,
    );
    browserHistory.push(queryStringObj);
  };

  const handleSearch = async () => {
    clearError(ErrorTypes.geocodeError);
    setIsSearching(true);
    props.geocodeUserAddress(props.currentQuery);
  };

  const handleSearchViaUrl = () => {
    // Check for scenario when results are in the store
    if (!!props.location.search && props.results && props.results.length > 0) {
      return;
    }

    const { location } = props;

    if (!isEmpty(location.query)) {
      setIsSearching(true);

      props.updateSearchQuery({
        id: Date.now(),
        context: {
          location: location.query.address,
          repOrgName: location.query.name,
        },
        locationQueryString: location.query.address,
        locationInputString: location.query.address,
        position: {
          latitude: location.query.lat,
          longitude: location.query.long,
        },
        representativeQueryString: location.query.name,
        representativeInputString: location.query.name,
        representativeType: location.query.type,
        page: location.query.page,
        sortType: location.query.sort,
      });
    }
  };

  const handleSearchOnQueryChange = () => {
    const { currentQuery } = props;
    const {
      context,
      representativeInputString,
      representativeType,
      position,
      sortType,
      page,
    } = currentQuery;

    const { latitude, longitude } = position;

    setIsSearching(true);

    updateUrlParams({
      address: context.location,
      name: representativeInputString || null,
      lat: latitude,
      long: longitude,
      type: representativeType,
      page: page || 1,
      sort: sortType,
    });

    if (!props.searchWithInputInProgress) {
      props.searchWithInput({
        address: currentQuery.context.location,
        lat: latitude,
        long: longitude,
        name: representativeInputString,
        page,
        perPage: 10,
        sort: sortType,
        type: representativeType,
      });

      setIsSearching(false);
      setIsLoading(true);
      setIsDisplayingResults(false);
    }
  };

  const handlePageSelect = e => {
    const { page } = e.detail;
    setIsSearching(true);
    props.updateSearchQuery({ id: Date.now(), page });
  };

  // Trigger request on query update following search
  useEffect(
    () => {
      if (isSearching && !props.errors.isErrorGeocode) {
        handleSearchOnQueryChange();
      }
    },
    [props.currentQuery.id],
  );

  // Trigger request on sort update
  useEffect(
    () => {
      if (props.currentQuery.searchCounter > 0) {
        handleSearchOnQueryChange();
      }
    },
    [props.currentQuery.sortType],
  );

  // Trigger request on page update
  useEffect(
    () => {
      if (props.currentQuery.searchCounter > 0) {
        handleSearchOnQueryChange();
      }
    },
    [props.currentQuery.page],
  );

  useEffect(
    () => {
      if (isSearching && props.errors.isErrorGeocode) {
        setIsSearching(false);
      }
    },
    [props.errors.isErrorGeocode],
  );

  // search complete
  useEffect(
    () => {
      if (props.currentQuery.searchCounter > 0) {
        setIsSearching(false);
        setIsLoading(false);
        setIsDisplayingResults(true);
      }
    },
    [props.currentQuery.searchCounter],
  );

  // jump to results
  useEffect(
    () => {
      if (isDisplayingResults) {
        window.scrollTo(0, 600);
        focusElement('#search-results-subheader');
      }
    },
    [isDisplayingResults],
  );

  // search from query params on page load
  useEffect(() => {
    handleSearchViaUrl();
  }, []);

  const renderBreadcrumbs = () => {
    const breadcrumbs = [
      {
        href: '/',
        label: 'Home',
      },
      {
        href: '/get-help-from-accredited-representative',
        label: 'Get help from a VA accredited representative',
      },
      {
        href: '/get-help-from-accredited-representative/find-rep',
        label: 'Find a VA accredited representative or VSO',
      },
    ];
    return (
      <>
        <div className="row vads-u-padding-left--4">
          <VaBreadcrumbs breadcrumbList={breadcrumbs} uswds />
        </div>
      </>
    );
  };

  const renderSearchSection = () => {
    return (
      <div className="row usa-width-three-fourths search-section">
        <div className="title-section vads-u-padding-y--1">
          <h1>Find a VA accredited representative or VSO</h1>
          <p>
            An accredited attorney, claims agent, or Veterans Service Officer
            (VSO) can help you file a claim or request a decision review. Use
            our search tool to find one of these types of accredited
            representatives to help you.
          </p>
          <p>
            <strong>Note:</strong> You’ll need to contact the accredited
            representative you’d like to appoint to make sure they’re available
            to help you.
          </p>
        </div>

        <SearchControls
          geolocateUser={props.geolocateUser}
          currentQuery={props.currentQuery}
          onChange={props.updateSearchQuery}
          onSubmit={handleSearch}
          clearSearchText={props.clearSearchText}
          geocodeError={props.errors.isErrorGeocode}
          clearError={props.clearError}
        />

        {props.isErrorFetchRepresentatives && (
          <div className="vads-u-margin-y--3">
            <va-alert
              close-btn-aria-label="Close notification"
              status="error"
              uswds
              visible
            >
              <h2 slot="headline">We’re sorry, something went wrong</h2>
              <React.Fragment key=".1">
                <p className="vads-u-margin-y--0">Please try again soon.</p>
              </React.Fragment>
            </va-alert>
          </div>
        )}
      </div>
    );
  };

  const renderResultsSection = () => {
    const {
      currentQuery,
      searchResults,
      pagination,
      isErrorFetchRepresentatives,
    } = props;

    const paginationWrapper = () => {
      const currentPage = pagination ? pagination.currentPage : 1;
      const totalPages = pagination ? pagination.totalPages : 1;

      return (
        <PaginationWrapper
          handlePageSelect={handlePageSelect}
          currentPage={currentPage}
          totalPages={totalPages}
          searchResults={searchResults}
          inProgress={currentQuery.inProgress}
        />
      );
    };

    const resultsList = () => {
      return (
        <ResultsList
          // updateUrlParams={updateUrlParams}
          query={currentQuery}
          inProgress={currentQuery.inProgress}
          searchResults={searchResults}
          sortType={currentQuery.sortType}
          onUpdateSortType={props.updateSortType}
          submitRepresentativeReport={props.submitRepresentativeReport}
        />
      );
    };

    if (isLoading && !isErrorFetchRepresentatives) {
      return (
        <div>
          <va-loading-indicator message="Search in progress" />
        </div>
      );
    }

    return (
      <div className="row usa-width-three-fourths results-section">
        <VaModal
          modalTitle="Were sorry, something went wrong"
          message="Please try again soon."
          onCloseEvent={() =>
            props.clearError(ErrorTypes.reportSubmissionError)
          }
          visible={props.isErrorReportSubmission}
          status="error"
          uswds
        >
          <p>Please try again soon.</p>
        </VaModal>

        <div id="search-results-title" ref={searchResultTitleRef}>
          {isDisplayingResults &&
            !isErrorFetchRepresentatives && (
              <>
                <SearchResultsHeader
                  searchResults={props.searchResults}
                  query={currentQuery}
                  updateSearchQuery={props.updateSearchQuery}
                  pagination={props.pagination}
                />{' '}
                {resultsList()}
                {paginationWrapper()}
              </>
            )}
        </div>
      </div>
    );
  };

  return (
    <>
      {renderBreadcrumbs()}

      <div className="usa-grid use-grid-full">
        {renderSearchSection()}
        {renderResultsSection()}
      </div>
    </>
  );
};

SearchPage.propTypes = {
  clearError: PropTypes.func,
  clearSearchResults: PropTypes.func,
  clearSearchText: PropTypes.func,
  currentQuery: PropTypes.object,
  errors: PropTypes.shape({
    isErrorGeocode: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
      PropTypes.oneOf([null]),
    ]),
  }),
  fetchRepresentatives: PropTypes.func,
  geocodeUserAddress: PropTypes.func,
  geolocateUser: PropTypes.func,
  isErrorFetchRepresentatives: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
    PropTypes.oneOf([null]),
  ]),
  isErrorGeocode: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
    PropTypes.oneOf([null]),
  ]),
  isErrorReportSubmission: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
    PropTypes.oneOf([null]),
  ]),
  location: PropTypes.shape({
    pathname: PropTypes.string,
    query: PropTypes.shape({
      address: PropTypes.string,
      name: PropTypes.string,
      lat: PropTypes.number,
      long: PropTypes.number,
      page: PropTypes.number,
      perPage: PropTypes.number,
      sort: PropTypes.string,
      type: PropTypes.string,
    }),
    search: PropTypes.string,
  }),
  pagination: PropTypes.shape({
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    totalEntries: PropTypes.number,
  }),
  reportedResults: PropTypes.array,
  results: PropTypes.array,
  searchResults: PropTypes.array,
  searchWithBounds: PropTypes.func,
  searchWithInput: PropTypes.func,
  searchWithInputInProgress: PropTypes.bool,
  sortType: PropTypes.string,
  submitRepresentativeReport: PropTypes.func,
  updateSearchQuery: PropTypes.func,
  updateSortType: PropTypes.func,
  onSubmit: PropTypes.func,
};

const mapStateToProps = state => ({
  currentQuery: state.searchQuery,
  errors: state.errors,
  searchResults: state.searchResult.searchResults,
  isErrorFetchRepresentatives: state.errors.isErrorFetchRepresentatives,
  isErrorReportSubmission: state.errors.isErrorReportSubmission,
  resultTime: state.searchResult.resultTime,
  pagination: state.searchResult.pagination,
  selectedResult: state.searchResult.selectedResult,
  reportedResults: state.searchResult.reportedResults,
  sortType: state.searchResult.sortType,
  specialties: state.searchQuery.specialties,
});

const mapDispatchToProps = {
  geolocateUser,
  geocodeUserAddress,
  fetchRepresentatives,
  searchWithInput,
  updateSearchQuery,
  updateSortType,
  clearSearchResults,
  clearSearchText,
  submitRepresentativeReport,
  updateFromLocalStorage,
  clearError,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPage);
