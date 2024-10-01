import { expect } from 'chai';
import {
  isValid,
  getYear,
  getMonth,
  getDate,
  getHours,
  getMinutes,
  add,
  addMilliseconds,
} from 'date-fns';
import { getTimezoneOffset } from 'date-fns-tz';

import {
  utcDateFieldToLocalDate,
  timeFromNow,
  formatDateUtcShort,
  formatDateUtcLong,
  isValidDateString,
  formatDowntime,
  parseZonedStringToLocalDateTime,
} from '../date';

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

describe('Helpers unit tests', () => {
  describe('parseZonedStringToLocalDateTime', () => {
    it('should treat zero offset as given timezone and return the local date and time', () => {
      const midnight = '1995-11-12T00:00:00.000+0000';
      const parsedDate = parseZonedStringToLocalDateTime(midnight, 'Etc/GMT');
      const offSetMilliseconds = -getTimezoneOffset(timezone, parsedDate);
      const utcDate = addMilliseconds(parsedDate, offSetMilliseconds);

      expect(getYear(parsedDate)).to.equal(1995);
      expect(getMonth(parsedDate)).to.equal(10); // zero-index months
      expect(getDate(utcDate)).to.equal(12);
      expect(getHours(utcDate)).to.equal(0);
      expect(getMinutes(utcDate)).to.equal(0);
    });

    it('should ignore other offsets and treat the string as given timezone', () => {
      const midnightOffsetNegative1 = '1995-11-12T00:00:00.000-1000';
      const parsedDate = parseZonedStringToLocalDateTime(
        midnightOffsetNegative1,
        'Etc/GMT',
      );
      const offSetMilliseconds = -getTimezoneOffset(timezone, parsedDate);
      const utcDate = addMilliseconds(parsedDate, offSetMilliseconds);

      expect(getYear(parsedDate)).to.equal(1995);
      expect(getMonth(parsedDate)).to.equal(10); // zero-index months
      expect(getDate(utcDate)).to.equal(12);
      expect(getHours(utcDate)).to.equal(0);
      expect(getMinutes(utcDate)).to.equal(0);
    });

    it('should treat YYYY-M-d format as given timezone and return local date and time', () => {
      const parsedDate = parseZonedStringToLocalDateTime('1995-11-12');
      const offSetMilliseconds = -getTimezoneOffset(timezone, parsedDate);
      const utcDate = addMilliseconds(parsedDate, offSetMilliseconds);

      expect(getYear(parsedDate)).to.equal(1995);
      expect(getMonth(parsedDate)).to.equal(10); // zero-index months
      expect(getDate(utcDate)).to.equal(12);
      expect(getHours(utcDate)).to.equal(0);
      expect(getMinutes(utcDate)).to.equal(0);
    });
  });

  describe('utcDateFieldToLocalDate', () => {
    it('should convert utc date values to local Date', () => {
      const date = utcDateFieldToLocalDate({
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
      const offSetMilliseconds = -getTimezoneOffset(timezone, date);
      const utcDate = addMilliseconds(date, offSetMilliseconds);

      expect(isValid(date)).to.be.true;
      expect(getYear(utcDate)).to.equal(1901);
      expect(getMonth(utcDate)).to.equal(1); // zero-offset months
      expect(getDate(utcDate)).to.equal(3);
    });

    it('should convert partial date to Date with default Jan 1', () => {
      const date = utcDateFieldToLocalDate({
        year: {
          value: '1901',
        },
      });

      const offSetMilliseconds = -getTimezoneOffset(timezone, date);
      const utcDate = addMilliseconds(date, offSetMilliseconds);

      expect(isValid(date)).to.be.true;
      expect(getYear(utcDate)).to.equal(1901);
      expect(getMonth(utcDate)).to.equal(0);
      expect(getDate(utcDate)).to.equal(1);
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

  describe('formatDateUtcShort', () => {
    it('should display the date in the short format', () => {
      const noon = '1995-11-12T12:00:00.000+0000';
      expect(formatDateUtcShort(noon)).to.equal('11/12/1995');
    });

    it('should display the date with padding ', () => {
      const singleDigitDay = '1995-11-02T12:00:00.000+0000';
      expect(formatDateUtcShort(singleDigitDay)).to.equal('11/02/1995');
    });

    it('should return the current date in the short format if no argument is given', () => {
      const today = new Date();
      expect(formatDateUtcShort()).to.include(getYear(today));
    });

    it('should display the date string without regard to the timezone or offset', () => {
      const midnight = '1995-11-12T00:00:00.000+0000';
      const midnightOffsetNegative1 = '1995-11-12T00:00:00.000-1000';
      const sixAMOffset0 = '1995-11-12T06:00:00.000+0000';
      const eightAMOffset0 = '1995-11-12T08:00:00.000+0000';
      const almostMidnightOffset0 = '1995-11-12T23:59:59.999+0000';
      const almostMidnightOffsetNegative1 = '1995-11-12T23:59:59.999-1000';

      expect(formatDateUtcShort(midnight)).to.equal('11/12/1995');
      expect(formatDateUtcShort(midnightOffsetNegative1)).to.equal(
        '11/12/1995',
      );
      expect(formatDateUtcShort(sixAMOffset0)).to.equal('11/12/1995');
      expect(formatDateUtcShort(eightAMOffset0)).to.equal('11/12/1995');
      expect(formatDateUtcShort(almostMidnightOffset0)).to.equal('11/12/1995');
      expect(formatDateUtcShort(almostMidnightOffsetNegative1)).to.equal(
        '11/12/1995',
      );
    });
  });

  describe('formatDateUtcLong', () => {
    it('should display the date in the long format', () => {
      const noon = '1995-11-12T12:00:00.000+0000';
      expect(formatDateUtcLong(noon)).to.equal('November 12, 1995');
    });

    it('should display the date in the long format without padding', () => {
      const singeDigitDay = '1865-03-03T12:00:00.000+0000';
      expect(formatDateUtcLong(singeDigitDay)).to.equal('March 3, 1865');
    });

    it('should display the date string without regard to the timezone or offset', () => {
      const midnight = '1995-11-12T00:00:00.000+0000';
      const midnightOffsetNegative1 = '1995-11-12T00:00:00.000-1000';
      const sixAMOffset0 = '1995-11-12T06:00:00.000+0000';
      const eightAMOffset0 = '1995-11-12T08:00:00.000+0000';
      const almostMidnightOffset0 = '1995-11-12T23:59:59.999+0000';
      const almostMidnightOffsetNegative1 = '1995-11-12T23:59:59.999-1000';
      const nhdvsEightAMOffset0 = '1865-03-03T08:00:00.000+0000';

      expect(formatDateUtcLong(midnight)).to.equal('November 12, 1995');
      expect(formatDateUtcLong(midnightOffsetNegative1)).to.equal(
        'November 12, 1995',
      );
      expect(formatDateUtcLong(sixAMOffset0)).to.equal('November 12, 1995');
      expect(formatDateUtcLong(eightAMOffset0)).to.equal('November 12, 1995');
      expect(formatDateUtcLong(almostMidnightOffset0)).to.equal(
        'November 12, 1995',
      );
      expect(formatDateUtcLong(almostMidnightOffsetNegative1)).to.equal(
        'November 12, 1995',
      );
      expect(formatDateUtcLong(nhdvsEightAMOffset0)).to.equal('March 3, 1865');
    });

    it('should accept a yyyy-M-d string format', () => {
      const dateString = '1984-07-04';
      expect(formatDateUtcLong(dateString)).to.equal('July 4, 1984');
    });

    it('should return the current date in the long format if no argument is given', () => {
      const today = new Date();
      expect(formatDateUtcLong()).to.include(getYear(today));
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
