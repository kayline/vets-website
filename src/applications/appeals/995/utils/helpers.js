import moment from 'moment';

import {
  SELECTED,
  LEGACY_TYPE,
  EVIDENCE_VA,
  EVIDENCE_PRIVATE,
  EVIDENCE_OTHER,
} from '../constants';

/**
 * @typedef ContestableIssues
 * @type {Array<Object>}
 * @property {ContestableIssueItem|LegacyAppealsItem}
 */
/**
 * @typedef ContestableIssueItem
 * @type {Object}
 * @property {String} type - always set to "contestableIssue"
 * @property {ContestableIssueAttributes} attributes - essential properties
 * @property {Boolean} 'view:selected' - internal boolean indicating that the
 *   issue has been selected by the user
 */
/**
 * @typedef ContestableIssueAttributes
 * @type {Object}
 * @property {String} ratingIssueSubjectText - title of issue
 * @property {String} description - issue description
 * @property {Number} ratingIssuePercentNumber - disability rating percentage
 * @property {String} approxDecisionDate - decision date (YYYY-MM-DD)
 * @property {Number} decisionIssueId - decision id
 * @property {String} ratingIssueReferenceId - issue reference number
 * @property {String} ratingDecisionReferenceId - decision reference id
 */
/**
 * @typedef AdditionalIssues
 * @type {Array<Object>}
 * @property {AdditionalIssueItem}
 */
/**
 * @typedef AdditionalIssueItem
 * @type {Object}
 * @property {String} issue - title of issue
 * @property {String} decisionDate - decision date (YYYY-MM-DD)
 * @returns
 */
/** Filter out ineligible contestable issues:
 * - remove issues more than one year past their decision date
 * - remove issues that are deferred
 * @prop {ContestableIssues} - Array of both eligible & ineligible contestable
 *  issues, plus legacy issues
 * @return {ContestableIssues} - filtered list
 */
export const getEligibleContestableIssues = issues => {
  const today = moment().startOf('day');
  return (issues || []).filter(issue => {
    const {
      approxDecisionDate = '',
      ratingIssueSubjectText = '',
      description = '',
    } = issue?.attributes || {};

    const isDeferred = [ratingIssueSubjectText, description]
      .join(' ')
      .includes('deferred');
    const date = moment(approxDecisionDate);
    if (isDeferred || !date.isValid() || !ratingIssueSubjectText) {
      return false;
    }
    return date.add(1, 'years').isAfter(today);
  });
};

/**
 * @typedef LegacyAppealsItem
 * @type {Object}
 * @property {String} type - always set to "legacyAppeals"
 * @property {LegacyAppealsAttributes} attributes - essential properties
 * @property {Boolean} 'view:selected' - internal boolean indicating that the
 *   issue has been selected by the user
 */
/**
 * @typedef LegacyAppealsAttributes
 * @type {Object}
 * @property {String} decisionDate - decision date (ISO)
 * @property {String} latestSocSsocDate - SOC/SSOC date (ISO)
 * @property {String} veteranFullName - First & Last name
 * @property {LegacyAppealsIssue} issues - list of legacy issues
 */
/**
 * @typedef LegacyAppealsIssue
 * @param {String} summary - issue summary
 */
/** Find legacy appeal array included with contestable issues & return length
 * Note: we are using the length of this array instead of trying to do a 1:1
 * coorelation of contestable issues to legacy issues since we're only getting a
 * summary and not a matching name or date (at least in the mock data).
 * @prop {ContestableIssues} issues - Array of both eligible & ineligible
 *  contestable issues, plus legacy issues
 * @return {Number} - length of legacy array
 */
export const getLegacyAppealsLength = issues =>
  (issues || []).reduce((count, issue) => {
    if (issue.type === LEGACY_TYPE) {
      // add just-in-case there is more than one legacy type entry
      return count + (issue.attributes?.issues?.length || 0);
    }
    return count;
  }, 0);

/**
 * Are there any legacy appeals in the API, or did the Veteran manually add an
 * issue of unknown legacy status?
 * @param {Number} legacyCount - legacy appeal array size
 * @returns {Boolean}
 */
export const mayHaveLegacyAppeals = ({
  legacyCount = 0,
  additionalIssues,
} = {}) => legacyCount > 0 || additionalIssues?.length > 0;

export const someSelected = issues =>
  (issues || []).some(issue => issue[SELECTED]);

export const hasSomeSelected = ({ contestedIssues, additionalIssues } = {}) =>
  someSelected(contestedIssues) || someSelected(additionalIssues);

export const getSelected = formData => {
  const eligibleIssues = (formData?.contestedIssues || []).filter(
    issue => issue[SELECTED],
  );
  const addedIssues = (formData?.additionalIssues || []).filter(
    issue => issue[SELECTED],
  );
  // include index to help with error messaging
  return [...eligibleIssues, ...addedIssues].map((issue, index) => ({
    ...issue,
    index,
  }));
};

// additionalIssues (items) are separate because we're checking the count before
// the formData is updated
export const getSelectedCount = (formData, items) =>
  getSelected({ ...formData, additionalIssues: items }).length;

/**
 * Get issue name/title from either a manually added issue or issue loaded from
 * the API
 * @param {AdditionalIssueItem|ContestableIssueItem}
 */
export const getIssueName = (entry = {}) =>
  entry.issue || entry.attributes?.ratingIssueSubjectText;

export const getIssueDate = (entry = {}) =>
  entry.decisionDate || entry.attributes?.approxDecisionDate || '';

export const getIssueNameAndDate = (entry = {}) =>
  `${(getIssueName(entry) || '').toLowerCase()}${entry.decisionDate ||
    entry.attributes?.approxDecisionDate ||
    ''}`;

const processIssues = (array = []) =>
  array
    .filter(entry => getIssueName(entry) && getIssueDate(entry))
    .map(entry => getIssueNameAndDate(entry));

export const hasDuplicates = (data = {}) => {
  const contestedIssues = processIssues(data.contestedIssues);
  const additionalIssues = processIssues(data.additionalIssues);
  // ignore duplicate contestable issues (if any)
  const fullList = [...new Set(contestedIssues)].concat(additionalIssues);

  return fullList.length !== new Set(fullList).size;
};

// Simple one level deep check
export const isEmptyObject = obj =>
  obj && typeof obj === 'object' && !Array.isArray(obj)
    ? Object.keys(obj)?.length === 0 || false
    : false;

// getEligibleContestableIssues will remove deferred issues and issues > 1 year
// past their decision date. This function removes issues with no title & sorts
// the list by descending (newest first) decision date
export const processContestableIssues = contestableIssues => {
  const regexDash = /-/g;
  const getDate = entry =>
    (entry.attributes?.approxDecisionDate || '').replace(regexDash, '');

  // remove issues with no title & sort by date - see
  // https://dsva.slack.com/archives/CSKKUL36K/p1623956682119300
  return (contestableIssues || [])
    .filter(issue => getIssueName(issue))
    .sort((a, b) => {
      const dateA = getDate(a);
      const dateB = getDate(b);
      if (dateA === dateB) {
        // If the dates are the same, sort by title
        return getIssueName(a) > getIssueName(b) ? 1 : -1;
      }
      // YYYYMMDD string comparisons will work in place of using moment
      return dateA > dateB ? -1 : 1;
    });
};

export const issuesNeedUpdating = (loadedIssues = [], existingIssues = []) => {
  if (loadedIssues.length !== existingIssues.length) {
    return true;
  }
  // sort both arrays so we don't end up in an endless loop
  const issues = processContestableIssues(existingIssues);
  return !processContestableIssues(loadedIssues).every(
    ({ attributes }, index) => {
      const existing = issues[index]?.attributes || {};
      return (
        attributes.ratingIssueSubjectText === existing.ratingIssueSubjectText &&
        attributes.approxDecisionDate === existing.approxDecisionDate
      );
    },
  );
};

export const appStateSelector = state => ({
  // Validation functions are provided the pageData and not the
  // formData on the review & submit page. For more details
  // see https://dsva.slack.com/archives/CBU0KDSB1/p1614182869206900
  contestedIssues: state.form?.data?.contestedIssues || [],
  additionalIssues: state.form?.data?.additionalIssues || [],
});

export const getItemSchema = (schema, index) => {
  const itemSchema = schema;
  if (itemSchema.items.length > index) {
    return itemSchema.items[index];
  }
  return itemSchema.additionalItems;
};

/**
 * Convert an array into a readable list of items
 * @param {String[]} list - Array of items. Empty entries are stripped out
 * @returns {String}
 * @example
 * readableList(['1', 'two'])
 * // => '1 and two'
 * readableList(['1', '2', '3', '4', 'five'])
 * // => '1, 2, 3, 4, and five'
 */
export const readableList = (list, joiner = 'and') => {
  const cleanedList = list.filter(Boolean);
  if (cleanedList.length < 2) {
    return cleanedList.join('');
  }
  return [cleanedList.slice(0, -1).join(', '), cleanedList.slice(-1)[0]].join(
    `${cleanedList.length === 2 ? '' : ','} ${joiner} `,
  );
};

/**
 * Calculate the index offset for the additional issue
 * @param {Number} index - index of data in combined array of contestable issues
 *   and additional issues
 * @param {Number} contestableIssuesLength - contestable issues array length
 * @returns {Number}
 */
export const calculateIndexOffset = (index, contestableIssuesLength) =>
  index - contestableIssuesLength;

/**
 * Contestable issues loading error check
 * If there's an error, show an alert warning, but if the backend returns a 404
 * error (no issues found), we need to allow the Veteran to start the form
 * anyway
 * @param {Object} error - error object or string (rejected invalid benefit type)
 * @returns {Boolean}
 */
export const checkContestableIssueError = error =>
  (error && error?.errors?.[0]?.status !== '404') || false;

export const hasVAEvidence = formData => formData?.[EVIDENCE_VA];
export const hasPrivateEvidence = formData => formData?.[EVIDENCE_PRIVATE];
export const hasOtherEvidence = formData => formData?.[EVIDENCE_OTHER];

// Update evidence issues if they change
export const evidenceNeedsUpdating = formData => {
  if (hasVAEvidence(formData)) {
    const validIssues = getSelected(formData).map(getIssueName);
    return !formData.locations?.every(({ issues }) =>
      (issues || []).every(issue => validIssues.includes(issue)),
    );
  }
  return false;
};

export const cleanupLocationIssues = formData => {
  const validIssues = getSelected(formData).map(getIssueName);
  return (formData.locations || []).map(location => ({
    ...location,
    issues: (location.issues || []).filter(issue =>
      validIssues.includes(issue),
    ),
  }));
};
