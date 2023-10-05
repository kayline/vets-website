import moment from 'moment';

import { AMA_DATE } from '../constants';

import { FORMAT_YMD } from '../../shared/constants';
import {
  getSelected,
  processContestableIssues,
} from '../../shared/utils/issues';
import '../../shared/definitions';

/**
 * Filter out ineligible contestable issues:
 * - remove issues with an invalid decision date
 * - remove issues that are deferred
 * @param {ContestableIssues} - Array of both eligible & ineligible contestable
 *  issues, plus legacy issues
 * @return {ContestableIssues} - filtered list
 */
export const getEligibleContestableIssues = issues => {
  const result = (issues || []).filter(issue => {
    const {
      approxDecisionDate,
      ratingIssueSubjectText = '',
      description = '',
    } = issue?.attributes || {};

    const isDeferred = [ratingIssueSubjectText, description]
      .join(' ')
      .includes('deferred');
    return (
      !isDeferred &&
      ratingIssueSubjectText &&
      approxDecisionDate &&
      moment(approxDecisionDate, FORMAT_YMD).isValid()
    );
  });
  return processContestableIssues(result);
};

const amaCutoff = moment(AMA_DATE).startOf('day');
/**
 * Are there any legacy appeals in the API, or did the Veteran manually add an
 * issue of unknown legacy status?
 * @param {Number} legacyCount - legacy appeal array size
 * @returns {Boolean}
 */
export const mayHaveLegacyAppeals = ({
  legacyCount = 0,
  contestedIssues = [],
  additionalIssues = [],
} = {}) => {
  if (legacyCount > 0 || additionalIssues?.length > 0) {
    return true;
  }
  return contestedIssues?.some(issue => {
    const decisionDate = moment(issue.attributes.approxDecisionDate).startOf(
      'day',
    );
    return decisionDate.isBefore(amaCutoff);
  });
};

// additionalIssues (items) are separate because we're checking the count before
// the formData is updated
export const getSelectedCount = (formData, items) =>
  getSelected({ ...formData, additionalIssues: items }).length;

/**
 * Calculate the index offset for the additional issue
 * @param {Number} index - index of data in combined array of contestable issues
 *   and additional issues
 * @param {Number} contestableIssuesLength - contestable issues array length
 * @returns {Number}
 */
export const calculateIndexOffset = (index, contestableIssuesLength) =>
  index - contestableIssuesLength;
