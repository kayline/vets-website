import { useEffect } from 'react';
import { formatDateUtcShort } from '../../utilities/date';

const usePrintTitle = (baseTitle, userDetails, dob, updatePageTitle) => {
  useEffect(
    () => {
      const { first, last, suffix } = userDetails;
      const name = [first, last, suffix]
        .filter(part => part !== undefined && part !== null)
        .join(' ')
        .trim();
      const pageTitle = `${name}${
        name ? '\u2003' : ''
        // eslint-disable-next-line no-irregular-whitespace, max-len
      }​DOB:​${formatDateUtcShort(new Date(dob))}`;

      const beforePrintHandler = () => {
        updatePageTitle(pageTitle);
      };

      const afterPrintHandler = () => {
        updatePageTitle(baseTitle);
      };

      window.addEventListener('beforeprint', beforePrintHandler);
      window.addEventListener('afterprint', afterPrintHandler);

      return () => {
        window.removeEventListener('beforeprint', beforePrintHandler);
        window.removeEventListener('afterprint', afterPrintHandler);
      };
    },
    [baseTitle, userDetails, dob, updatePageTitle],
  );
};

export default usePrintTitle;
