import {
  parseISO,
  format,
  isValid,
  setYear,
  setMonth,
  setDate,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns';

const parseZonedStringToDatetime = dateTimeString => {
  const noOffset = dateTimeString.slice(0, -6);
  const date = parseISO(noOffset);
  return isValid(date) ? date : null;
};

export function dateToMoment(dateField) {
  let date = new Date(2024, 1, 1);
  date = setYear(date, parseInt(dateField.year.value, 10));
  if (dateField.month.value) {
    date = setMonth(date, dateField.month.value);
  }
  if (dateField.day) {
    date = setDate(date, dateField.day.value);
  }
  return date;
}

export function formatDateLong(date) {
  return format(parseZonedStringToDatetime(date), 'MMMM d, yyyy');
}

export function formatDateParsedZoneLong(date) {
  return format(parseZonedStringToDatetime(date), 'MMMM d, yyyy');
}

export function formatDateShort(date) {
  return format(parseZonedStringToDatetime(date), 'MM/dd/yyyy');
}

export function formatDateParsedZoneShort(date) {
  return format(parseZonedStringToDatetime(date), 'MM/dd/yyyy');
}

function formatDiff(diff, desc) {
  return `${diff} ${desc}${diff === 1 ? '' : 's'}`;
}

/**
 * timeFromNow returns the number of days, hours, or minutes until
 * the provided date occurs. It’s meant to be less fuzzy than moment’s
 * timeFromNow so it can be used for expiration dates
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
  return !isNaN(Date.parse(dateString));
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
 * @param {string} dateTime The date-time as a moment or string in Eastern time
 * @returns {string} The formatted date-time string
 */
export const formatDowntime = dateTime => {
  const dtMoment = parseZonedStringToDatetime(dateTime);
  const dtHour = dtMoment.getHours();
  const dtMinute = dtMoment.getMinutes();

  const monthFormat = LONG_FORM_MONTHS.includes(dtMoment.getMonth())
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

  return format(dtMoment, `${monthFormat} d 'at' ${timeFormat} 'ET'`);
};
