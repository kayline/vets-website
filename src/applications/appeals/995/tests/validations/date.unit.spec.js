import { expect } from 'chai';

import { getDate } from '../../utils/dates';
import { validateDate, isValidDate } from '../../validations/date';
import { errorMessages, MAX_YEARS_PAST } from '../../constants';

describe('validateDate & isValidDate', () => {
  let errorMessage = '';
  const errors = {
    addError: message => {
      errorMessage = message || '';
    },
  };

  beforeEach(() => {
    errorMessage = '';
  });

  it('should allow valid dates', () => {
    const date = getDate({ offset: { weeks: -1 } });
    validateDate(errors, date);
    expect(errorMessage).to.equal('');
    expect(isValidDate(date)).to.be.true;
  });
  it('should allow valid dates without a leading zero', () => {
    const date = '2020-1-1';
    validateDate(errors, date);
    expect(errorMessage).to.equal('');
    expect(isValidDate(date)).to.be.true;
  });
  it('should throw a invalid date error', () => {
    validateDate(errors, '200');
    expect(errorMessage).to.eq(errorMessages.decisions.missingDate);
    expect(isValidDate('200')).to.be.false;
  });
  it('should throw a range error for dates too old', () => {
    validateDate(errors, '1899-01-01');
    expect(errorMessage).to.eq(errorMessages.decisions.newerDate);
    expect(isValidDate('1899')).to.be.false;
  });
  it('should throw an error for dates in the future', () => {
    const date = getDate({ offset: { weeks: 1 } });
    validateDate(errors, date);
    expect(errorMessage).to.eq(errorMessages.decisions.pastDate);
    expect(isValidDate(date)).to.be.false;
  });
  it('should throw an error for todays date', () => {
    const date = getDate();
    validateDate(errors, date);
    expect(errorMessage).to.eq(errorMessages.decisions.pastDate);
    expect(isValidDate(date)).to.be.false;
  });
  it('should throw an error for dates in the distant past', () => {
    const date = getDate({ offset: { years: -(MAX_YEARS_PAST + 1) } });
    validateDate(errors, date);
    expect(errorMessage).to.contain(errorMessages.decisions.newerDate);
    expect(isValidDate(date)).to.be.false;
  });
  it('should throw a invalid date for truncated dates', () => {
    // Testing 'YYYY-MM-' (contact center reported errors; FE seeing this)
    const date = getDate({ offset: { weeks: 1 } }).substring(0, 8);
    validateDate(errors, date);
    expect(errorMessage).to.eq(errorMessages.decisions.missingDate);
    expect(isValidDate(date)).to.be.false;
  });
  it('should throw a invalid date for truncated dates', () => {
    // Testing 'YYYY--DD' (contact center reported errors; BE seeing this)
    const date = getDate({ offset: { weeks: 1 } }).replace(/-.*-/, '--');
    validateDate(errors, date);
    expect(errorMessage).to.eq(errorMessages.decisions.missingDate);
    expect(isValidDate(date)).to.be.false;
  });
});
