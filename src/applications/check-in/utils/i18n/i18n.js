import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// import resourcesToBackend from 'i18next-resources-to-backend';
import { format as formatDate, isDate } from 'date-fns';
import { enUS as en, es } from 'date-fns/locale';
import enTranslation from '../../locales/en/translation.json';

/**
 * Helper function to set language on main element for DS component detection.
 *
 * @param {string} language
 */
const setPageLanguage = language => {
  document.getElementById('main')?.setAttribute('lang', language);
};

const locales = { en, es };

i18n
  /*
  .use(
    resourcesToBackend((language, namespace, callback) => {
      import(`../../locales/${language}/${namespace}.json`)
        .then(resources => {
          callback(null, resources);
        })
        .catch(error => {
          callback(error, null);
        });
    }),
  )
  */
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    detection: {
      order: ['localStorage', 'sessionStorage', 'navigator'],
      lookupLocalStorage: 'checkin-i18nextLng',
      lookupSessionStorage: 'checkin-i18nextLng',
    },
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
      format: (value, format, lng) => {
        if (isDate(value)) {
          const locale = locales[lng];
          if (format === 'long') {
            return lng.startsWith('es')
              ? formatDate(value, "dd 'de' MMMM 'de' yyy", { locale })
              : formatDate(value, 'MMMM dd, yyyy', { locale });
          }
          if (format === 'longAtTime') {
            let dateString = formatDate(value, 'PPPppp', { locale });
            // Remove date suffixes. (1st/2nd/etc.)
            dateString = dateString.replace(
              /([0-9]{1,2})([a-z]{2})(, )/,
              '$1$3',
            );
            // Adjust am/pm formatting.
            dateString = dateString.replace(/:[0-9]{2} AM .*$/, ' a.m.');
            dateString = dateString.replace(/:[0-9]{2} PM .*$/, ' p.m.');
            return dateString;
          }
          if (format === 'mdY') {
            return lng.startsWith('es')
              ? formatDate(value, 'dd/M/Y')
              : formatDate(value, 'MM/dd/Y');
          }
          if (format === 'time') {
            return formatDate(value, 'h:mm aaaa', { locale });
          }
          return formatDate(value, format, { locale });
        }
        return value;
      },
    },
    // Load only the english translation.
    // TODO: use resourcesToBackend to dynamically load all translations
    // once translations have been rolled out in production.
    resources: {
      en: { translation: enTranslation },
    },
  });

// This is necessary for DS components to use our language preference on initial load.
setPageLanguage(i18n.language);

// Ugly hack to trigger DS language detection.
window.addEventListener('load', () => {
  setTimeout(() => {
    setPageLanguage(i18n.language);
  }, 10);
});

i18n.on('languageChanged', language => {
  setPageLanguage(language);
});

export default i18n;
