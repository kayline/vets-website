import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

export default function create400247Access(store, widgetType) {
  const root = document.querySelector(`[data-widget-type="${widgetType}"]`);
  if (root) {
    import(/* webpackChunkName: "form-40-0247" */ './App.js').then(module => {
      const App = module.default;
      ReactDOM.render(
        <Provider store={store}>
          <App />
        </Provider>,
        root,
      );
    });
  }
}
