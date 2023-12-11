import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const container = document.querySelector('div[data-bind], #root');
if (!container) {
  throw new Error('Root element not found');
}
let translations = JSON.parse(container.getAttribute('data-bind') || '{}');

translations = Object.keys(translations).reduce((res, id) => {
  const { title: heading, ...rest } = translations[id];

  if (!heading) {
    return res;
  }

  return {
    ...res,
    [id]: {
      heading,
      ...rest,
    },
  };
}, {});

const root = createRoot(container!);

root.render(
  <Provider store={store}>
    <App translations={translations} />
  </Provider>,
);

if (window.location.hostname === 'localhost') {
  registerServiceWorker();
}
