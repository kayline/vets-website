import { EMPTY_FIELD } from '../constants';

export const generateNotesIntro = record => {
  return {
    title: `Care summaries and notes: ${record.name}`,
    subject: 'VA Medical Record',
  };
};

export const generateDischargeSummaryContent = record => ({
  details: {
    header: 'Details',
    items: [
      {
        title: 'Location',
        value: record.location,
        inline: true,
      },
      {
        title: 'Admitted on',
        value: record.admissionDate,
        inline: true,
      },
      {
        title: 'Discharged on',
        value: record.dischargeDate,
        inline: true,
      },
      {
        title: 'Discharged by',
        value: record.dischargedBy,
        inline: true,
      },
    ],
  },
  results: {
    header: 'Summary',
    items: [
      {
        items: [
          {
            value: record.summary,
            monospace: true,
          },
        ],
      },
    ],
  },
});

export const generateProgressNoteContent = record => {
  const content = {
    details: {
      header: 'Details',
      items: [
        {
          title: 'Date',
          value: record.date,
          inline: true,
        },
        {
          title: 'Location',
          value: record.location,
          inline: true,
        },
        {
          title: 'Written by',
          value: record.writtenBy,
          inline: true,
        },
        {
          title: 'Signed on',
          value: record.dateSigned,
          inline: true,
        },
      ],
    },
    results: {
      header: 'Notes',
      items: [
        {
          items: [
            {
              value: record.note,
              monospace: true,
            },
          ],
        },
      ],
    },
  };

  if (record.signedBy !== EMPTY_FIELD) {
    content.details.items.splice(3, 0, {
      title: 'Signed by',
      value: record.signedBy,
      inline: true,
    });
  }

  return content;
};
