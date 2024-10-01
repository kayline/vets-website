import {
  parse,
  format,
  isValid,
  getMonth,
  getHours,
  getMinutes,
  setYear,
  setMonth,
  setDate,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  addMilliseconds,
} from 'date-fns';

import {
  zonedTimeToUtc,
  formatInTimeZone,
  getTimezoneOffset,
} from 'date-fns-tz';

/**
 * Returns a valid Date object or null based on input string.
 * Ignores any offset information in the string. Retains time information.
 *
 * @param {string|null} dateTimeString  A date string in either ISO8601 format or YYYY-MM-DD, or null.
 * @returns {Date|null} Date instance
 */

export function parseZonedStringToLocalDateTime(dateTimeString, timezone) {
  let formattedString;
  let date;

  if (dateTimeString.includes('T')) {
    formattedString = dateTimeString.slice(0, -6); // ignore the time zone offset
    date = zonedTimeToUtc(formattedString, timezone);
  } else {
    formattedString = dateTimeString;
    const localMidnight = parse(formattedString, "yyyy'-'M'-'d", new Date());
    date = zonedTimeToUtc(localMidnight, timezone);
  }

  return isValid(date) ? date : null;
}

/**
 * Turns an object with date values into a Date instance. It requires a year
 * and defaults to January 1 for month and day. Year can be a string, month and day must be integers.
 * Assumes input date is midnight UTC.
 *
 * @param {obj} dateField  A JS object with entries for year, and optional day and month.
 * @returns {Date} Date instance
 */
export function utcDateFieldToLocalDate(dateField) {
  let date = new Date(2024, 0, 1);
  date = setYear(date, parseInt(dateField.year.value, 10));
  if (dateField.month && dateField.month.value) {
    date = setMonth(date, dateField.month.value - 1); // zero-offset months
  }
  if (dateField.day && dateField.day.value) {
    date = setDate(date, dateField.day.value);
  }

  return zonedTimeToUtc(date, 'Etc/GMT');
}

/**
 * Returns a formatted date string based on an input date string or null (defaults to current datetime).
 * Ignores any offset information in the input string.
 * Treats input string and output date as UTC.
 *
 * @param {string|null} dateString  A date string in either ISO8601 format or YYYY-MM-DD, or null.
 * @returns {string} Formatted string in given form
 */
function formatDateString(dateString = null, displayFormat) {
  let formattedDate;
  if (dateString) {
    formattedDate = formatInTimeZone(
      parseZonedStringToLocalDateTime(dateString, 'Etc/GMT'),
      'Etc/GMT',
      displayFormat,
    );
  } else {
    formattedDate = format(new Date(), displayFormat);
  }

  return formattedDate;
}

/**
 * Returns a formatted date string based on an input date string or null (defaults to current datetime).
 * Ignores any offset information in the input string.
 * Treats input string and output date as UTC.
 *
 * @param {string|null} dateString  A date string in either ISO8601 format or YYYY-MM-DD, or null.
 * @returns {string} Formatted string in the form January 1, 1995
 */
export function formatDateUtcLong(dateString) {
  return formatDateString(dateString, 'MMMM d, yyyy');
}

/**
 * Returns a formatted date string based on an input date string or null (defaults to current datetime).
 * Ignores any offset information in the input string.
 *
 * @param {string|null} dateString  A date string in either ISO8601 format or YYYY-MM-DD, or null.
 * @returns {string} Formatted string in the form 1/3/2006
 */
export function formatDateUtcShort(dateString) {
  return formatDateString(dateString, 'MM/dd/yyyy');
}

function formatDiff(diff, desc) {
  return `${diff} ${desc}${diff === 1 ? '' : 's'}`;
}

/**
 * Returns the number of days, hours, or minutes until
 * the provided date occurs.
 *
 * @param date {Date} The future date to check against
 * @param userFromDate {Date} The earlier date in the range. Defaults to today.
 * @returns {string} The string description of how long until date occurs
 */
export function timeFromNow(date, userFromDate = null) {
  // Not using defaulting because we want today to be when this function
  // is called, not when the file is parsed and run
  const fromDate = userFromDate || new Date();
  const dayDiff = differenceInDays(date, fromDate);

  if (dayDiff >= 1) {
    return formatDiff(dayDiff, 'day');
  }

  const hourDiff = differenceInHours(date, fromDate);

  if (hourDiff >= 1) {
    return formatDiff(hourDiff, 'hour');
  }

  const minuteDiff = differenceInMinutes(date, fromDate);

  if (minuteDiff >= 1) {
    return formatDiff(minuteDiff, 'minute');
  }

  const secondDiff = differenceInSeconds(date, fromDate);

  if (secondDiff >= 1) {
    return formatDiff(secondDiff, 'second');
  }

  return 'a moment';
}

/**
 * Checks if the passed-in arg is a valid date string, meaning it can be parsed
 * by Date.parse()
 *
 * @param {string} dateString The string to validate
 * @returns {boolean} If the string is a valid date string
 */
export function isValidDateString(dateString) {
  return !Number.isNaN(Date.parse(dateString));
}

const monthIndices = {
  JAN: 0,
  FEB: 1,
  MAR: 2,
  APR: 3,
  MAY: 4,
  JUN: 5,
  JUL: 6,
  AUG: 7,
  SEP: 8,
  OCT: 9,
  NOV: 10,
  DEC: 11,
};

const LONG_FORM_MONTHS = [
  monthIndices.MAR,
  monthIndices.APR,
  monthIndices.MAY,
  monthIndices.JUN,
  monthIndices.JUL,
];

/**
 * Formats the given date-time into a string that is intended for use in
 * downtime notifications
 *
 * @param {string} dateTime The date-time as a string in Eastern time
 * @returns {string} The formatted date-time string
 */
export const formatDowntime = dateTimeString => {
  const dtLocal = parseZonedStringToLocalDateTime(
    dateTimeString,
    'America/New_York',
  );
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localOffSetMilliseconds = -getTimezoneOffset(timezone, dtLocal);
  const easternOffSetMilliseconds = -getTimezoneOffset(
    'America/New_York',
    dtLocal,
  );
  const offSetMilliseconds =
    localOffSetMilliseconds - easternOffSetMilliseconds;
  const dtEastern = addMilliseconds(dtLocal, offSetMilliseconds); // the equivalent eastern time, but the object still thinks it is in local time
  const dtHour = getHours(dtEastern);
  const dtMinute = getMinutes(dtEastern);

  const monthFormat = LONG_FORM_MONTHS.includes(getMonth(dtEastern))
    ? 'MMMM'
    : "MMM'.'";

  let timeFormat;

  if (dtHour === 0 && dtMinute === 0) {
    timeFormat = "'midnight'";
  } else if (dtHour === 12 && dtMinute === 0) {
    timeFormat = "'noon'";
  } else {
    const amPmFormat = dtHour < 12 ? "'a.m.'" : "'p.m.'";
    timeFormat = `h:mm ${amPmFormat}`;
  }

  return formatInTimeZone(
    dtLocal,
    'America/New_York',
    `${monthFormat} d 'at' ${timeFormat} 'ET'`,
  );
};
