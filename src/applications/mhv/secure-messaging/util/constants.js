/** time to wait (in ms) after the user stops typing before initiating draft auto-save */
export const draftAutoSaveTimeout = 5000;

export const DefaultFolders = {
  INBOX: {
    id: 0,
    header: 'Inbox',
    desc: '',
  },
  SENT: {
    id: -1,
    header: 'Sent messages',
    desc: '',
  },
  DRAFTS: { id: -2, header: 'Drafts', desc: '' },
  DELETED: {
    id: -3,
    header: 'Trash',
    desc: `These are the messages you moved to the trash from your inbox or folders. We won't permanently delete any messages.`,
  },
};

export const ErrorMessages = {
  ComposeForm: {
    RECIPIENT_REQUIRED: 'Please select a recipient.',
    CATEGORY_REQUIRED: 'Please select a category.',
    SUBJECT_REQUIRED: 'Subject cannot be blank.',
    BODY_REQUIRED: 'Message body cannot be blank.',
    UNABLE_TO_SAVE: {
      title: "We can't save this message yet",
      p1: 'We need more information from you before we can save this draft.',
      p2:
        "You can continue editing your draft and then save it. Or you can delete it. If you delete a draft, you can't get it back.",
    },
    UNABLE_TO_SAVE_DRAFT_ATTACHMENT: {
      title: "We can't save attachments in a draft message",
      p1:
        "If you save this message as a draft, you'll need to attach your files again when you're ready to send the message.",
    },
    UNABLE_TO_SAVE_OTHER: 'Something went wrong... Failed to save message.',
    ATTACHMENTS: {
      FILE_EMPTY: 'Your file is empty. Try attaching a different file.',
      INVALID_FILE_TYPE: `We can't attach this file type. Try attaching a DOC, JPG, PDF, PNG, RTF, TXT, or XLS.`,
      FILE_DUPLICATE: 'You have already attached this file.',
      FILE_TOO_LARGE:
        'Your file is too large. Try attaching a file smaller than 6MB.',
      TOTAL_MAX_FILE_SIZE_EXCEEDED:
        'Your files are too large. The total size of all files must be smaller than 10MB.',
    },
  },
  SearchForm: {
    FOLDER_REQUIRED: 'Please select a folder.',
    KEYWORD_REQUIRED: 'Please enter a keyword.',
    START_DATE_REQUIRED: 'Please enter a start date.',
    END_DATE_REQUIRED: 'Please enter an end date.',
    START_DATE_AFTER_END_DATE: 'Start date must be on or before end date.',
    END_DATE_BEFORE_START_DATE: 'End date must be on or after start date.',
    END_YEAR_GREATER_THAN_CURRENT_YEAR:
      'End year must not be greater than current year.',
    NO_FIELDS_SELECTED_MODAL_HEADER:
      "Please use at least one of the following search fields or choose a date range other than 'any'.",
    SEARCH_TERM_REQUIRED: 'Please enter a search term.',
  },
  MoveConversation: {
    FOLDER_REQUIRED: 'Please select a folder to move the message to.',
  },
  ManageFolders: {
    FOLDER_NAME_REQUIRED: 'Folder name cannot be blank',
    FOLDER_NAME_EXISTS: 'Folder name already in use. Please use another name.',
    FOLDER_NAME_INVALID_CHARACTERS:
      'Folder name can only contain letters, numbers, and spaces.',
  },
};

export const Alerts = {
  Message: {
    BLOCKED_MESSAGE_ERROR:
      'You are blocked from sending messages to this recipient.',
    CANNOT_REPLY_BODY:
      "The last message in this conversation is more than 45 days old. If you want to continue this conversation, you'll need to start a new message.",
    CANNOT_REPLY_INFO_HEADER: 'This conversation is too old for new replies',
    GET_MESSAGE_ERROR: 'We’re sorry. Something went wrong on our end.',
    DELETE_MESSAGE_SUCCESS:
      'Message conversation was successfully moved to Trash.',
    DELETE_MESSAGE_ERROR:
      'Message could not be deleted. Try again later. If this problem persists, contact the help desk.',
    DRAFT_CANNOT_REPLY_INFO_HEADER:
      'This conversation is too old for new replies',
    DRAFT_CANNOT_REPLY_INFO_BODY: `The last message in this conversation is more than 45 days old. If you want to continue this conversation, you'll need to start a new message.`,
    MOVE_MESSAGE_SUCCESS: 'Message was successfully moved',
    MOVE_MESSAGE_ERROR:
      'Message could not be moved. Try again later. If this problem persists, contact the help desk.',
    MOVE_MESSAGE_THREAD_SUCCESS: 'Message conversation was successfully moved.',
    MOVE_MESSAGE_THREAD_ERROR:
      'Message conversation could not be moved. Try again later. If this problem persists, contact the help desk.',
    NO_MESSAGES: 'There are no messages in this folder.',
    DELETE_DRAFT_SUCCESS: 'Draft was successfully deleted.',
    DELETE_DRAFT_ERROR:
      'Draft could not be deleted. Try again later. If this problem persists, contact the help desk.',
    SEND_MESSAGE_SUCCESS: 'Secure message was successfully sent.',
    SEND_MESSAGE_ERROR: 'We’re sorry. Something went wrong on our end.',
  },

  Folder: {
    CREATE_FOLDER_MODAL_HEADER: 'Create a new folder',
    CREATE_FOLDER_MODAL_LABEL: 'Folder name',
    CREATE_FOLDER_SUCCESS: 'Folder was successfully created.',
    CREATE_FOLDER_ERROR:
      'Folder could not be created. Try again later. If this problem persists, contact the help desk.',
    CREATE_FOLDER_ERROR_NOT_BLANK: 'Folder name cannot be blank',
    CREATE_FOLDER_ERROR_CHAR_TYPE:
      'Folder name can only contain letters, numbers, and spaces.',
    CREATE_FOLDER_ERROR_EXSISTING_NAME:
      'Folder name already in use. Please use another name.',
    DELETE_FOLDER_CONFIRM_HEADER:
      'Are you sure you want to remove this folder?',
    DELETE_FOLDER_CONFIRM_BODY:
      "If you remove a folder, you can't get it back.",
    DELETE_FOLDER_SUCCESS: 'Folder was successfully removed.',
    DELETE_FOLDER_ERROR:
      'Folder could not be removed. Try again later. If this problem persists, contact the help desk.',
    DELETE_FOLDER_ERROR_NOT_EMPTY_HEADER:
      'Empty this folder before removing it from the list.',
    DELETE_FOLDER_ERROR_NOT_EMPTY_BODY:
      'Before this folder can be removed, all of the messages in it must be moved to another folder, such as Trash, Inbox, or a different custom folder.',
    RENAME_FOLDER_SUCCESS: 'Folder was successfully renamed.',
    RENAME_FOLDER_ERROR:
      'Folder could not be renamed. Try again later. If this problem persists, contact the help desk.',
    FOLDER_NAME_TAKEN:
      'That folder name is already in use. Please use another name.',
  },
  Thread: {
    GET_THREAD_ERROR: 'We’re sorry. Something went wrong on our end.',
    THREAD_NOT_FOUND_ERROR: 'This conversation was not found.',
  },
};

export const Errors = {
  Code: {
    BLOCKED_USER: 'SM151',
  },
};

export const Links = {
  Link: {
    CANNOT_REPLY: {
      CLASSNAME: 'fas fa-edit vads-u-margin-right--1 vads-u-margin-top--1',
      TITLE: 'Start a new message',
      TO: '/compose',
    },
  },
};

export const Prompts = {
  Compose: {
    EDIT_LIST_TITLE: 'Edit your contact list',
    EDIT_LIST_CONTENT:
      'You can edit your contact list on the My HealtheVet website. Then refresh this page to review your updated list.',
  },
  Message: {
    DELETE_MESSAGE_CONFIRM:
      'Are you sure you want to move this message to the trash?',
    DELETE_MESSAGE_CONFIRM_NOTE:
      'Messages in the trash folder won’t be permanently deleted.',
  },
  Draft: {
    DELETE_DRAFT_CONFIRM: 'Are you sure you want to delete this draft?',
    DELETE_DRAFT_CONFIRM_NOTE:
      "Drafts are permanently deleted and this action can't be undone. \n\n Deleting a draft won't affect other messages in this conversation.",
  },
};
export const Breadcrumbs = {
  COMPOSE: {
    path: '/compose',
    label: 'Start a new message',
  },
  INBOX: { path: '/inbox', label: 'Inbox' },
  DRAFTS: { path: '/drafts', label: 'Drafts' },
  DRAFT: { path: '/draft', label: 'Drafts' },
  FOLDERS: { path: '/folders', label: 'My folders' },
  SENT: { path: '/sent', label: 'Sent messages' },
  TRASH: { path: '/trash', label: 'Trash' },
  SEARCH: { path: '/search', label: 'Search messages' },
  SEARCH_ADVANCED: { path: '/advanced', label: 'Advanced search' },
  SEARCH_RESULTS: { path: '/results', label: 'Search results' },
  FAQ: { path: '/faq', label: 'Messages FAQs' },
};

export const ALERT_TYPE_ERROR = 'error';
export const ALERT_TYPE_SUCCESS = 'success';
export const ALERT_TYPE_WARNING = 'warning';
export const ALERT_TYPE_INFO = 'info';

export const Categories = {
  OTHER: 'General',
  OTHERS: 'General',
  COVID: 'COVID',
  APPOINTMENTS: 'Appointment',
  MEDICATIONS: 'Medication',
  TEST_RESULTS: 'Test',
  TEST_RESULT: 'Test',
  EDUCATION: 'Education',
};

export const acceptedFileTypes = {
  doc: 'application/msword',
  docx:
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  gif: 'image/gif',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  pdf: 'application/pdf',
  png: 'image/png',
  rtf: 'text/rtf',
  txt: 'text/plain',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};

export const Attachments = {
  MAX_FILE_COUNT: 4,
  MAX_FILE_SIZE: 6000000,
  TOTAL_MAX_FILE_SIZE: 10000000,
};

export const threadSortingOptions = {
  DESCENDING: 'DESC',
  ASCENDING: 'ASC',
  SORT_BY_SENDER: 'SENDER_NAME',
  SORT_BY_RECEPIENT: 'RECIPIENT_NAME',
  SORT_BY_SENT_DATE: 'SENT_DATE',
  SORT_BY_DRAFT_DATE: 'DRAFT_DATE',
};

export const PrintMessageOptions = {
  PRINT_MAIN: 'PRINT_MAIN',
  PRINT_THREAD: 'PRINT_THREAD',
};
