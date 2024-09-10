import React from 'react';
import { connect } from 'react-redux';

import scrollToTop from 'platform/utilities/ui/scrollToTop';
import PropTypes from 'prop-types';

import { setSubmission as setSubmissionAction } from 'platform/forms-system/src/js/actions';
import appendQuery from 'append-query';
import { browserHistory } from 'react-router';
import { displayResults as displayResultsAction } from '../reducers/actions';
import BenefitCard from '../components/BenefitCard';
import AdditionalSupport from '../components/AdditionalSupport';
import GetFormHelp from '../components/GetFormHelp';
import ShareResultsModal from '../components/ShareResultsModal';

export class ConfirmationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      benefits: [], // Initial state for benefits
    };
  }

  componentDidMount() {
    scrollToTop('topScrollElement');
    // Update query string based on results.
    if (this.props.results.data && this.props.results.data.length > 0) {
      const benefits = this.props.results.data.map(r => r.id).join(',');
      const queryParams = { benefits };
      const queryStringObj = appendQuery(
        `${this.props.location.basename}${this.props.location.pathname}`,
        queryParams,
      );
      browserHistory.replace(queryStringObj);

      const benefitsState = this.props.results.data.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      this.setState({ benefits: benefitsState });
    } else if (
      this.props.location.query &&
      Object.keys(this.props.location.query).length > 0
    ) {
      // Display results based on query string.
      const { benefits } = this.props.location.query;
      const benefitIds = benefits.split(',');
      this.props.displayResults(benefitIds);
    }
  }

  sortBenefits = e => {
    const key = e.target.value || 'alphabetical';

    this.setState(prevState => {
      const sortedBenefits = prevState.benefits.sort((a, b) => {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      });
      return { benefits: sortedBenefits };
    });
  };

  filterBenefits = e => {
    const key = e.target.value;

    if (key === 'All') {
      this.setState(() => ({
        benefits: this.props.results.data,
      }));
      return;
    }

    this.setState(() => {
      const filteredBenefits = this.props.results.data.filter(benefit => {
        return benefit.category === key;
      });
      return { benefits: filteredBenefits };
    });
  };

  handleClick = e => {
    e.preventDefault();
    const now = new Date().getTime();

    this.props.setSubmission('status', false);
    this.props.setSubmission('hasAttemptedSubmit', false);
    this.props.setSubmission('timestamp', now);
    this.props.router.goBack();
  };

  render() {
    const hasResults = !!this.props.results.data;
    const resultsCount = hasResults ? this.props.results.data.length : 0;
    const resultsText = resultsCount === 1 ? 'result' : 'results';
    return (
      <div>
        <p>
          Based on your answers, you may be eligible for these benefits and
          services. Learn more about each benefit. And check your eligibility
          before you apply.
        </p>
        <p>
          Please note that this is a recommendation tool, not an eligibility
          determination tool. VA determines your eligibility once you apply for
          a benefit. You'll need to review the eligibility requirements before
          applying for VA bebefits.
        </p>

        <ShareResultsModal />

        <div id="results-container">
          <div id="filters-section-desktop">
            <b>Filters</b>
            <p>Filter by benefit type</p>
            <select onChange={this.filterBenefits}>
              <option value="All">All</option>
              <option value="Education">Education</option>
              <option value="Employment">Employment</option>
            </select>
            <b>Sort</b>
            <p>Sort results by</p>
            <select onChange={this.sortBenefits}>
              <option value="alphabetical">Alphabetical</option>
              <option value="goal">Goal</option>
              <option value="type">Type</option>
            </select>
          </div>

          <div id="filters-section-mobile">
            <va-link-action
              href="#"
              message-aria-describedby="Filter and sort"
              text="Filter and sort"
              type="secondary"
            />
          </div>

          <div id="results-section">
            <b>
              {hasResults &&
                `Showing ${resultsCount} ${resultsText}, filtered to show all results, sorted alphabetically`}
            </b>

            <p>
              <va-link
                href="#"
                onClick={this.handleClick}
                text="Go back and review your entries"
              />
            </p>

            <div className="vads-u-margin-y--2">
              <va-alert-expandable
                status="info"
                trigger="Time-sensitive benefits"
              />
            </div>

            <div>
              {this.props.results.isLoading ? (
                <va-loading-indicator
                  label="Loading"
                  message="Loading results..."
                />
              ) : (
                this.state &&
                this.state.benefits.map(benefit => (
                  <BenefitCard
                    key={benefit.id}
                    benefit={benefit}
                    className="vads-u-margin-bottom--2"
                  />
                ))
              )}
            </div>

            <va-accordion>
              <va-accordion-item
                header="Show benefits that I may not qualify for"
                id="show"
              />
            </va-accordion>
          </div>
        </div>

        <AdditionalSupport />

        <div className="row vads-u-margin-bottom--2">
          <div className="usa-width-one-whole medium-8 columns">
            <va-need-help>
              <div slot="content">
                <GetFormHelp formConfig={this.props.formConfig} />
              </div>
            </va-need-help>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setSubmission: setSubmissionAction,
  displayResults: displayResultsAction,
};

function mapStateToProps(state) {
  return {
    form: state.form,
    results: state.results,
  };
}

ConfirmationPage.propTypes = {
  displayResults: PropTypes.func,
  formConfig: PropTypes.object,
  location: PropTypes.shape({
    basename: PropTypes.string,
    pathname: PropTypes.string,
    query: PropTypes.object,
  }),
  results: PropTypes.shape({
    isLoading: PropTypes.bool,
    isError: PropTypes.bool,
    data: PropTypes.array,
    error: PropTypes.object,
  }),
  route: PropTypes.shape({
    pageList: PropTypes.array,
    formConfig: PropTypes.shape({
      prefillEnabled: PropTypes.bool,
      downtime: PropTypes.object,
    }),
  }),
  router: PropTypes.object,
  setSubmission: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfirmationPage);
