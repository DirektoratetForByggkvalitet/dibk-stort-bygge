/* globals window */

import { createStore, combineReducers, compose } from 'redux';
import { state } from 'losen';
import { persistStore, autoRehydrate } from 'redux-persist';
import stortBygge from './api/stort-bygge.json';

/**
 * Create the store with middleware
 */
const store = createStore(
  combineReducers({ [state.NAME]: state.reducer(stortBygge) }),
  undefined,
  compose(autoRehydrate(), window.devToolsExtension ? window.devToolsExtension() : f => f),
);

persistStore(store);

export default store;
