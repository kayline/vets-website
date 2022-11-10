import ContestableIssuesWidget from '../components/ContestableIssuesWidget';

import {
  ContestableIssuesTitle,
  ContestableIssuesAdditionalInfo,
} from '../content/contestableIssues';

import { selectionRequired, maxIssues } from '../validations/issues';
import { SELECTED } from '../constants';

/**
 * contestable issues with add issue link (list loop)
 */
const contestableIssues = {
  uiSchema: {
    'ui:title': ContestableIssuesTitle,
    'ui:options': {
      itemName: 'issues eligible for review',
    },
    contestedIssues: {
      'ui:title': ' ',
      'ui:field': 'StringField',
      'ui:widget': ContestableIssuesWidget,
      'ui:options': {
        keepInPageOnReview: true,
      },
      'ui:validations': [selectionRequired, maxIssues],
    },
    'view:issueNotListed': {
      'ui:description': ContestableIssuesAdditionalInfo,
    },
  },

  schema: {
    type: 'object',
    properties: {
      contestedIssues: {
        type: 'array',
        items: {
          type: 'object',
          properties: {},
          [SELECTED]: 'boolean',
        },
      },
      'view:issueNotListed': {
        type: 'object',
        properties: {},
      },
    },
  },
};

export default contestableIssues;
