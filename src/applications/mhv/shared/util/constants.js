import { formatDateLong } from '@department-of-veterans-affairs/platform-utilities/exports';

// separator used in txt files
export const txtLine = '_____________________________________________________';

// dotted separator
export const txtLineDotted =
  '-----------------------------------------------------';

// the crisis line header that must go at the top of all txt files
export const crisisLineHeader =
  "If you're ever in crisis and need to talk with someone right away, call the Veterans Crisis line at 988. Then select 1.";

// line used by all PDFs and txt files to denote the file origin
export const reportGeneratedBy = `Report generated by My HealtheVet on VA.gov on ${formatDateLong(
  new Date(),
)}`;
