export const AXE_CONTEXT = '.secure-messaging-container';

export const Paths = {
  UI_MAIN: '/my-health/secure-messages',
  UI_PILOT: '/my-health/secure-messages-pilot',
  SM_API_BASE: '/my_health/v1/messaging',
  SM_API_EXTENDED: '/my_health/v1/messaging/messages',
  INBOX: '/inbox/',
  SENT: '/sent/',
  DRAFTS: '/drafts/',
  DRAFT: '/draft/',
  DELETED: '/trash/',
  COMPOSE: '/new-message/',
  MESSAGE: '/message/',
  MESSAGE_THREAD: '/thread/',
  FOLDERS: '/folders',
  SEARCH: '/search/',
  SEARCH_RESULTS: '/search/results/',
  REPLY: '/reply/',
  CATEGORIES: '/categories',
  RECIPIENTS: '/allrecipients',
  SIGNATURE: '/signature',
};

export const Locators = {
  MESSAGE_FAQ: '.secure-messaging-faq',
  MESSAGES: '[data-testid="message-list-item"]',
  TO: '[data-testid="to"]',
  FROM: '[data-testid="from"]',
  MESS_ID: '[data-testid="message-id"]',
  MES_DATE: '[data-testid="message-date"]',
  DATE_RECEIVED: '[data-testid="received-date"]',
  HEADER_FOLDER: '[data-testid*=folder-header]',
  ATTACH_FILE_INPUT: '[data-testid="attach-file-input"]',
  ATTACHMENT_COUNT: '[data-testid="attachments-count"]',
  MESSAGE_SUBJECT: '[data-testid="message-subject-field"]',
  MESSAGES_BODY: '[data-testid="message-body-field"]',
  DROPDOWN: '#sort-order-dropdown',
  CERNER: '[data-testid="cerner-facility"]',
  CERNER_TEXT: '[data-testid="single-cerner-facility-text"]',
  DELET_MES_CONFIRM: '[data-testid="delete-message-confirm-note"] p',
  SELECT: '#select',
  HEADER: 'h1',
  HEADLINE: 'h1[slot="headline"]',
  KEYWORD_SEARCH: '[data-testid="keyword-search-input"]',
  NO_MESS: '[data-testid=alert-no-messages] p',
  FOLDER_MANE: '[data-testid="folder-name"]',
  FOLDERS_LIST: '[data-testid ="my-folders-sidebar"]',
  MESS_LIST: '[data-testid="message-list-item"]',
  THREAD_LIST: '.thread-list-item',
  THREADS: '[data-testid="thread-list-item"]',
  MES_COUNT: '[data-testid="message-count"]',
  REPLY_FORM: '[data-testid="reply-form"]',
  CLEAR_FILTERS: '[text="Clear Filters"]',
  FILTER_INPUT: '#filter-input',
  ADDITIONAL_FILTER: '#additional-filter-accordion',
  ACCORDIONS: '[data-testid="faq-accordion-item"]',
  FOLDERS: {
    FOLDER_NAME: '[label="Folder name"]',
    FOLDER_REMOVE: '[text="Yes, remove this folder"]',
    FOLDER_HEADER: '[data-testid="folder-header"]',
    INBOX: '[data-testid="inbox-sidebar"] > a',
    DRAFTS: '[data-testid="drafts-sidebar"]',
    SENT: '[data-testid="sent-sidebar"]',
    TRASH: '[data-testid="trash-sidebar"]',
    CUSTOM: '[data-testid="my-folders-sidebar"]',
    SIDEBAR: '[data-testid=my-folders-sidebar]',
    NOT_EMP_FOLDER: '[data-testid="error-folder-not-empty"] p',
    FOLDER_INPUT_LABEL: '[data-testid="search-message-folder-input-label"]',
    FOLDER_DROPDOWN: '[data-testid="folder-dropdown"]',
  },
  BUTTONS: {
    TRASH_TEXT: '[data-testid=trash-button-text]',
    TEXT_CONFIRM: 'va-button[text="Confirm"]',
    REPLY: '[data-testid="reply-button-body"]',
    CONTINUE: '[data-testid="continue-button"]',
    TEST2: '[data-testid=radiobutton-TEST2]',
    TESTAGAIN: '[data-testid=radiobutton-TESTAGAIN]',
    RADIO_BUTTON: '[data-testid=folder-list-radio-button]',
    DELET_RADIOBUTTON: '[data-testid=radiobutton-Deleted]',
    BUTTON_MOVE: 'button:contains("Move")',
    BUTTON_TRASH: 'button:contains("Trash")',
    DELETE_DRAFT_BUTT: '[data-testid="delete-draft-button"]',
    BUTTON_TEXT: '[data-testid="trash-button-text"]',
    MOVE_BUTTON_TEXT: '[data-testid="move-button-text"]',
    FILTER: '[data-testid="filter-messages-button"]',
    SEND: '[data-testid="Send-Button"]',
    SAVE_DRAFT_BUTTON: '[data-testid="Save-Draft-Button"]',
    SAVE_DRAFT: '#save-draft-button',
    PRINT_ONE_MESS: '[data-testid="radio-print-one-message"]',
    CREATE_FOLDER: '[data-testid="create-new-folder"]',
    DELETE_DRAFT: '#delete-draft-button',
    EDIT_FOLDER: '[data-testid="edit-folder-button"]',
    DELETE_FOLDER: '[data-testid="remove-folder-button"]',
    PRINT: '[data-testid="print-button"]',
    BUTTON_SORT: '[data-testid="sort-button"]',
    ATTACH_FILE_BUTTON: '[data-testid="attach-file-button"]',
    REMOVE_ATTACHMENT: '.remove-attachment-button',
    CONTINUE_EDITING: 'va-button[text="Continue editing"]',
    CATEG_RADIO_BUTT: '[data-testid="compose-category-radio-button"]',
    CREAT_FOLDER_BUTTON: '[data-testid="create-folder-button"]',
    REMOVE_FOLDER_BUTTON: '[data-testid="remove-folder-button"]',
    PREFER_BUTTON: '[data-testid="edit-preferences-button"]',
    CATEGORY_RADIO_BUTTON: '[data-testid="compose-category-radio-button"]',
  },
  LINKS: {
    GO_TO_INBOX: '[data-testid="inbox-link"]',
    PREFER_LINK: '[data-testid="edit-preferences-link"]',
    CREATE_NEW_MESSAGE: '[data-testid="compose-message-link"]',
  },
  ALERTS: {
    TRIAGE_ALERT: '[data-testid="blocked-triage-group-alert"] > div > a',
    TRIAGE_GROUP: '[data-testid="blocked-triage-group-alert"]>h2',
    CLOSE_NOTIFICATION: '.va-alert',
    REPT_SELECT: '[data-testid="compose-recipient-select"]',
    DRAFT_MODAL: '[data-testid="delete-draft-modal"]',
    THREAD_EXPAND: '[data-testid="thread-expand-all"]',
    SEARCH_DROPDOWN: '#select-search-folder-dropdown',
    TEXT_INPUT: '[data-testid="search-keyword-text-input"]',
    PAGIN_LIST: '.usa-pagination__list li',
    UNREAD_MESS: '[data-testid="unread-messages"]',
    MODAL_POPUP: '[data-testid="print-modal-popup"]',
    CREAT_NEW_TEXT_FOLD: '[text="Create new folder"]',
    LAST_EDIT_DATE: '[data-testid="last-edit-date"]',
    MOVE_MODAL: '[data-testid="move-to-modal"]',
    DELET_MES_MODAL: '[data-testid="delete-message-modal"]',
    NO_MESS: '[data-testid=alert-no-messages] p',
    CREATE_NEW_MESSAGE: '[data-testid="compose-message-link"]',
    CREATE_NEW_FOLDER: '[data-testid="create-new-folder"]',
    DRAFT_MESSAGE: '@draft_message',
    MAIN_CONTENT: '.va-alert',
    PAGE_TITLE: '.page-title',
    EXPANDABLE_TITLE: '[class="alert-expandable-title"]',
    NOTIFICATION: '[close-btn-aria-label="Close notification"]',
    VA_CRISIS_LINE: '[text="Connect with the Veterans Crisis Line"]',
    SAVE_DRAFT: '#messagetext',
    HIGHLIGHTED: '[data-testid="highlighted-text"]',
    SIDEBAR_NAV: '[class="sidebar-navigation-messages-list-header"]',
    INBOX_TEXT: '[text="Go to your inbox"]',
    EDIT_DRAFT: '[text="Edit draft 1"]',
    WELCOME_MESSAGE: '.welcome-message',
    BACK_TOP: 'va-back-to-top',
    ACC_ITEM: '[data-testid="faq-accordion-item"]',
    CERNER_ALERT: '[data-testid="cerner-facilities-alert"]',
    BLOCKED_GROUP: '[data-testid="blocked-triage-group-alert"]',
    RECIP_SELECT: '[data-testid="compose-recipient-select"]',
    MESS_CATAGO: '[data-testid="compose-message-categories"]',
    LIST_HEADER: '.sidebar-navigation-messages-list-header > a',
    SUCCESS_ALERT: '[data-testid="close-success-alert-button"]',
    DELETE_MESSAGE: '[data-testid=delete-message-modal]',
    ERROR_MESSAGE: '[data-testid="file-input-error-message"]',
    ERROR_MODAL: '[data-testid="attach-file-error-modal"]',
    VA_ALERT_WARNING: 'va-alert[status="warning"]',
  },
  FIELDS: {
    RECIPIENT: '#select',
    SUBJECT: '#inputField',
    MESSAGE: '#textarea',
    MESS_SUBJECT: '#message-subject',
    VISIBLE_P: '[visible=""] > p',
    CATEGORY_DROPDOWN: '#category-dropdown',
  },
  INFO: {
    SUBJECT_LIMIT: '#charcount-message',
    MESSAGE: '@message',
  },
};

export const Alerts = {
  NO_ASSOCIATION: {
    AT_ALL_HEADER: `You're not connected to any care teams in this messaging tool`,
    HEADER: 'Your account is no longer connected to',
    PARAGRAPH:
      'If you need to contact your care team, call your VA health facility.',
    LINK: 'Find your VA health facility',
  },
  BLOCKED: {
    HEADER: `You can't send messages to`,
    PARAGRAPH:
      'If you need to contact this care team, call your VA health facility.',
    LINK: 'Find your VA health facility',
  },
  OUTAGE: 'We’re sorry. We couldn’t load this page. Try again later.',
};
