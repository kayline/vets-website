import { expect } from 'chai';
import sinon from 'sinon';

import { getDate } from '../../utils/dates';
import { maxIssues, maxNameLength } from '../../validations/issues';

import { MAX_LENGTH, SELECTED } from '../../../shared/constants';
import { selectionRequired } from '../../../shared/validations/issues';

describe('maxIssues', () => {
  it('should not show an error when the array length is less than max', () => {
    const errors = { addError: sinon.spy() };
    maxIssues(errors, []);
    expect(errors.addError.called).to.be.false;
  });
  it('should show not show an error when the array length is greater than max', () => {
    const errors = { addError: sinon.spy() };
    const validDate = getDate({ offset: { months: -2 } });
    const template = {
      issue: 'x',
      decisionDate: validDate,
      [SELECTED]: true,
    };
    maxIssues(errors, {
      contestedIssues: new Array(MAX_LENGTH.SELECTIONS + 1).fill(template),
    });
    expect(errors.addError.called).to.be.true;
  });
});

describe('selectionRequired', () => {
  const _ = null;
  const getData = (selectContested = false, selectAdditional = false) => ({
    contestedIssues: [
      {
        attributes: {
          ratingIssueSubjectText: 'test',
          approxDecisionDate: '2021-01-01',
        },
        [SELECTED]: selectContested,
      },
    ],
    additionalIssues: [
      {
        issue: 'test 2',
        decisionDate: '2021-01-01',
        [SELECTED]: selectAdditional,
      },
    ],
  });
  it('should show an error when no issues are selected', () => {
    const errors = { addError: sinon.spy() };
    selectionRequired(errors, _, getData());
    expect(errors.addError.called).to.be.true;
  });
  it('should show not show an error when a contested issue is selected', () => {
    const errors = { addError: sinon.spy() };
    selectionRequired(errors, _, getData(true));
    expect(errors.addError.called).to.be.false;
  });
  it('should show not show an error when an additional issue is selected', () => {
    const errors = { addError: sinon.spy() };
    selectionRequired(errors, _, getData(false, true));
    expect(errors.addError.called).to.be.false;
  });
});

describe('maxNameLength', () => {
  it('should show an error when a name is too long', () => {
    const errors = { addError: sinon.spy() };
    maxNameLength(errors, 'ab '.repeat(MAX_LENGTH.ISSUE_NAME / 2));
    expect(errors.addError.called).to.be.true;
  });
  it('should show an error when a name is not too long', () => {
    const errors = { addError: sinon.spy() };
    maxNameLength(errors, 'test');
    expect(errors.addError.called).to.be.false;
  });
});
