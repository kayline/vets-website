import 'platform/polyfills';
import './sass/benefit-eligibility-questionnaire.scss';

import startApp from 'platform/startup';

import routes from './routes';
import reducer from './reducers';
import manifest from './manifest.json';

startApp({
  entryName: manifest.entryName,
  url: manifest.rootUrl,
  reducer,
  routes,
});
