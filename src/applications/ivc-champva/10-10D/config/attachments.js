// Schema for use with fileUploadUI

// Images + pdf
export const fileTypes = ['jpeg', 'jpg', 'png', 'pdf'];
export const maxSize = '20MB'; // This appears to be the current limit
export const minSize = '1.0KB';

export const attachmentsSchema = {
  type: 'array',
  minItems: 1,
  items: {
    type: 'object',
    properties: {
      fileName: {
        type: 'string',
      },
      fileSize: {
        type: 'integer',
      },
      confirmationNumber: {
        type: 'string',
      },
      errorMessage: {
        type: 'string',
      },
      uploading: {
        type: 'boolean',
      },
    },
  },
};

export const fileWithMetadataSchema = possibleFiles => {
  let enu = possibleFiles || [];
  // If we have nested elements in format [{text: 'File Name', ...}]
  // grab the content we care about rendering:
  enu = enu.map(
    el => (typeof el === 'string' || el.text ? el.text || el : undefined),
  );

  return {
    type: 'array',
    minItems: 1,
    items: {
      type: 'object',
      required: ['attachmentId', 'name'],
      properties: {
        name: {
          type: 'string',
        },
        size: {
          type: 'integer',
        },
        errorMessage: {
          type: 'string',
        },
        confirmationCode: {
          type: 'string',
        },
        attachmentId: {
          type: 'string',
          enum: [...enu],
          enumNames: enu,
        },
      },
    },
  };
};
