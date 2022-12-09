import React from 'react';
import PropTypes from 'prop-types';

import { MAX_FILE_SIZE_MB, SUPPORTED_UPLOAD_TYPES } from '../constants';
import { readableList } from '../utils/helpers';

export const uploadTitle = (
  <h3 className="vads-u-margin-top--0">Upload your supporting evidence</h3>
);

export const UploadDescription = () => {
  const types = readableList(SUPPORTED_UPLOAD_TYPES, 'or');
  return (
    <div className="vads-u-margin-top--2">
      <va-additional-info trigger="Evidence upload instructions" disable-border>
        <div>
          <p className="vads-u-margin-top--0">
            You’ll need to upload new and relevant evidence for your
            Supplemental Claim. This may include supporting statements
            (sometimes called "lay statements" or "buddy statements"), and other
            types of evidence. We’ll prompt you to upload each document from
            your device. But you may need to scan your document first, then save
            each file as a PDF before you can upload it.
          </p>
          <p>You can do this one of 2 ways:</p>
          <p>
            If you have access to a computer connected to a scanner, you can
            scan each document onto the computer. Save the file as a PDF.
          </p>
          <p className="vads-u-margin-bottom--0">
            If you have access to a smartphone, you can download or use the
            Notes app (for an iPhone) or the Google Drive app (for an Android
            phone) to scan each document onto the phone. The file will
            automatically save as a PDF when you’re done scanning.
          </p>
        </div>
      </va-additional-info>

      <ul>
        <li>{`File types you can upload: ${types}`}</li>
        <li>{`Maximum file size: ${MAX_FILE_SIZE_MB}MB`}</li>
      </ul>
      <p>
        <em>
          A 1MB file equals about 500 pages of text. A photo is usually about
          6MB. Large files can take longer to upload with a slow Internet
          connection.
        </em>
      </p>
    </div>
  );
};

UploadDescription.propTypes = {
  uploadTitle: PropTypes.string,
};

export const evidencePrivateText = {
  label: 'Upload your private medical records',
  description: ' ',
};

export const evidenceOtherText = {
  label: 'Supporting (lay) statements or other evidence',
  description: 'You’re adding this evidence:',
};
