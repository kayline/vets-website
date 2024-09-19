import { expect } from 'chai';
import { isValid, getYear, getMonth, getDate, add } from 'date-fns';

import {
  dateFieldToDate,
  timeFromNow,
  formatDateShort,
  formatDateLong,
  isValidDateString,
  formatDowntime,
} from '../date';

describe('Helpers unit tests', () => {
  describe('dateFieldToDate', () => {
    it('should convert date to Date', () => {
      const date = dateFieldToDate({
        month: {
          value: 2,
        },
        day: {
          value: 3,
        },
        year: {
          value: '1901',
        },
      });

      expect(isValid(date)).to.be.true;
      expect(getYear(date)).to.equal(1901);
      expect(getMonth(date)).to.equal(2);
      expect(getDate(date)).to.equal(3);
    });
    it('should convert partial date to Date with default Jan 1', () => {
      const date = dateFieldToDate({
        year: {
          value: '1901',
        },
      });

      expect(isValid(date)).to.be.true;
      expect(getYear(date)).to.equal(1901);
      expect(getMonth(date)).to.equal(1);
      expect(getDate(date)).to.equal(1);
    });
  });

  describe('timeFromNow', () => {
    const today = new Date();
    it('should display time in days', () => {
      expect(timeFromNow(add(today, { days: 30 }), today)).to.equal('30 days');
    });
    it('should display time in hours', () => {
      expect(timeFromNow(add(today, { hours: 23 }), today)).to.equal(
        '23 hours',
      );
    });
    it('should display time in minutes', () => {
      expect(timeFromNow(add(today, { minutes: 59 }), today)).to.equal(
        '59 minutes',
      );
    });
    it('should display time in seconds', () => {
      expect(timeFromNow(add(today, { seconds: 59 }), today)).to.equal(
        '59 seconds',
      );
    });
  });

  describe('formatDateShort', () => {
    it('should display the date in the short format', () => {
      const noon = '1995-11-12T12:00:00.000+0000';
      expect(formatDateShort(noon)).to.equal('11/12/1995');
    });

    it('should display the date with padding ', () => {
      const singleDigitDay = '1995-11-02T12:00:00.000+0000';
      expect(formatDateShort(singleDigitDay)).to.equal('11/02/1995');
    });

    it('should return the current date in the short format if no argument is given', () => {
      const today = new Date();
      expect(formatDateShort()).to.include(getYear(today));
    });

    it('should display the date string without regard to the timezone or offset', () => {
      const midnight = '1995-11-12T00:00:00.000+0000';
      const midnightOffsetNegative1 = '1995-11-12T00:00:00.000-1000';
      const sixAMOffset0 = '1995-11-12T06:00:00.000+0000';
      const eightAMOffset0 = '1995-11-12T08:00:00.000+0000';
      const almostMidnightOffset0 = '1995-11-12T23:59:59.999+0000';
      const almostMidnightOffsetNegative1 = '1995-11-12T23:59:59.999-1000';

      expect(formatDateShort(midnight)).to.equal('11/12/1995');
      expect(formatDateShort(midnightOffsetNegative1)).to.equal('11/12/1995');
      expect(formatDateShort(sixAMOffset0)).to.equal('11/12/1995');
      expect(formatDateShort(eightAMOffset0)).to.equal('11/12/1995');
      expect(formatDateShort(almostMidnightOffset0)).to.equal('11/12/1995');
      expect(formatDateShort(almostMidnightOffsetNegative1)).to.equal(
        '11/12/1995',
      );
    });
  });

  describe('formatDateLong', () => {
    it('should display the date in the long format', () => {
      const noon = '1995-11-12T12:00:00.000+0000';
      expect(formatDateLong(noon)).to.equal('November 12, 1995');
    });

    it('should display the date in the long format without padding', () => {
      const singeDigitDay = '1865-03-03T12:00:00.000+0000';
      expect(formatDateLong(singeDigitDay)).to.equal('March 3, 1865');
    });

    it('should display the date string without regard to the timezone or offset', () => {
      const midnight = '1995-11-12T00:00:00.000+0000';
      const midnightOffsetNegative1 = '1995-11-12T00:00:00.000-1000';
      const sixAMOffset0 = '1995-11-12T06:00:00.000+0000';
      const eightAMOffset0 = '1995-11-12T08:00:00.000+0000';
      const almostMidnightOffset0 = '1995-11-12T23:59:59.999+0000';
      const almostMidnightOffsetNegative1 = '1995-11-12T23:59:59.999-1000';
      const nhdvsEightAMOffset0 = '1865-03-03T08:00:00.000+0000';

      expect(formatDateLong(midnight)).to.equal('November 12, 1995');
      expect(formatDateLong(midnightOffsetNegative1)).to.equal(
        'November 12, 1995',
      );
      expect(formatDateLong(sixAMOffset0)).to.equal('November 12, 1995');
      expect(formatDateLong(eightAMOffset0)).to.equal('November 12, 1995');
      expect(formatDateLong(almostMidnightOffset0)).to.equal(
        'November 12, 1995',
      );
      expect(formatDateLong(almostMidnightOffsetNegative1)).to.equal(
        'November 12, 1995',
      );
      expect(formatDateLong(nhdvsEightAMOffset0)).to.equal('March 3, 1865');
    });

    it('should accept a yyyy-M-d string format', () => {
      const dateString = '1984-07-04';
      expect(formatDateLong(dateString)).to.equal('July 4, 1984');
    });

    it('should return the current date in the long format if no argument is given', () => {
      const today = new Date();
      expect(formatDateLong()).to.include(getYear(today));
    });
  });

  describe('isValidDateString', () => {
    it('returns `false` when passed an invalid argument', () => {
      expect(isValidDateString()).to.be.false;
      expect(isValidDateString(false)).to.be.false;
      expect(isValidDateString({})).to.be.false;
    });
    it('returns `false` when passed a string that cannot be parsed as a date', () => {
      expect(isValidDateString('not a date')).to.be.false;
    });
    it('returns `true` when passed a string that can be parsed as a date', () => {
      expect(isValidDateString('1986-05-06')).to.be.true;
      expect(isValidDateString('2018-01-24T00:00:00.000-06:00')).to.be.true;
    });
  });

  describe('formatDowntime', () => {
    it('returns a formatted datetime', () => {
      expect(formatDowntime('2020-02-17T20:04:51-05:00')).to.equal(
        'Feb. 17 at 8:04 p.m. ET',
      );
    });

    it('returns a formatted datetime with full month name', () => {
      expect(formatDowntime('2020-07-03T03:14:00-04:00')).to.equal(
        'July 3 at 3:14 a.m. ET',
      );
    });

    it('returns a formatted datetime at noon', () => {
      expect(formatDowntime('2020-05-24T12:00:30-04:00')).to.equal(
        'May 24 at noon ET',
      );
    });

    it('returns a formatted datetime past noon', () => {
      expect(formatDowntime('2020-08-19T12:15:30-04:00')).to.equal(
        'Aug. 19 at 12:15 p.m. ET',
      );
    });

    it('returns a formatted datetime at midnight', () => {
      expect(formatDowntime('2020-01-02T00:00:30-05:00')).to.equal(
        'Jan. 2 at midnight ET',
      );
    });

    it('returns a formatted datetime past midnight', () => {
      expect(formatDowntime('2020-11-21T00:35:30-05:00')).to.equal(
        'Nov. 21 at 12:35 a.m. ET',
      );
    });
  });
});
