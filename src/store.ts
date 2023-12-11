/* globals window */

import { createStore, combineReducers, compose } from 'redux';
import { state } from 'losen';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import data from './api/stort-bygge';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
  }
}

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({ [state.NAME]: state.reducer(data) });
const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Create the store with middleware
 */
const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

let persistor = persistStore(store);

export { store, persistor };
