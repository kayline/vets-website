import React from 'react';
import PropTypes from 'prop-types';

import { recordEvent } from '@department-of-veterans-affairs/platform-monitoring/exports';
import environment from '@department-of-veterans-affairs/platform-utilities/environment';

import { DATE_FORMATS } from '../constants';
import { buildDateFormatter } from '../utils/helpers';

const getDownloadUrl = (id, docType) =>
  `${environment.API_URL}/v0/claim_letters/${id}?document_type=${docType}`;

const formatDate = buildDateFormatter(DATE_FORMATS.LONG_DATE);

const docTypeToDescription = {
  27: 'Board Of Appeals Decision Letter',
  704: '5103 Notice',
  706: '5103 Notice',
  858: '5103 Notice',
  184: 'Notification Letter',
};

const getDescription = docType => {
  const defaultDescription = 'Notification Letter';

  return docTypeToDescription[docType] || defaultDescription;
};

const filename = 'ClaimLetter.pdf';

// NOTE: This simulates some of the property values that get
// auto-generated by Google Tag Manager.
// gtm.elementUrl: {{Click URL}}
// gtm.element.textContent: {{Click Text}}
const downloadHandler = docType => {
  recordEvent({
    event: 'claim-letters-download',
    'gtm.element.textContent': 'Download Claim Letter (PDF)',
    'gtm.elementUrl': `${
      environment.API_URL
    }/v0/claim_letters/[${docType}]:id.pdf`,
  });
};

const ClaimLetterListItem = ({ letter }) => {
  const formattedDate = formatDate(letter.receivedAt);
  const heading = `${formattedDate} letter`;

  return (
    <li className="vads-u-border-bottom--1px vads-u-border-color--gray-lighter vads-u-padding-bottom--2">
      <h2 className="vads-u-font-size--h4">{heading}</h2>
      <div className="vads-u-color--gray-warm-dark vads-u-margin-bottom--0p5">
        {getDescription(letter.docType)}
      </div>
      <va-link
        download
        filename={filename}
        filetype="PDF"
        disable-analytics="true"
        href={getDownloadUrl(letter.documentId, letter.docType)}
        onClick={() => downloadHandler(letter.docType)}
        text={`Download ${formattedDate} letter`}
        uswds="false"
      />
    </li>
  );
};

ClaimLetterListItem.propTypes = {
  letter: PropTypes.object,
};

export default ClaimLetterListItem;
