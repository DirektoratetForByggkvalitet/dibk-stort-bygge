import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const root = document.querySelector('div[data-bind], #root');
let translations = JSON.parse(root.getAttribute('data-bind') || '{}');

translations = Object.keys(translations).reduce((res, id) => {
  const { title: heading, ...rest } = translations[id];

  if (!heading) { return res; }

  return {
    ...res,
    [id]: {
      heading,
      ...rest,
    },
  };
}, {});

ReactDOM.render(
  (
    <Provider store={store}>
      <App translations={translations} />
    </Provider>
  ),
  root,
); /* eslint no-undef: 0 */

if (window.location.hostname === 'localhost') {
  registerServiceWorker();
}
