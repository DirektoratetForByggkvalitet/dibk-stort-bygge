import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect, useSelector, Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Wizard, StyleProvider, trackEvent, track, state } from 'losen';
import { store, persistor } from './store';

import data from './api/stort-bygge';
import dataExport from './exports/data-export';
import Intro from './pages/Intro';

const App = ({ translations = {} }) => {
  const hasData = useSelector(
    ({ [state.NAME]: { $computed, ...wizardData } }) =>
      !!Object.keys(wizardData).length,
  );
  const [intro, setIntro] = useState(!hasData);

  useEffect(() => {
    setIntro(!hasData);
  }, [hasData]);

  const closeIntro = () => {
    setIntro(false);
    window.scrollTo(0, 0);
    trackEvent('Close intro');
  };

  const showIntro = () => {
    setIntro(true);
    window.scrollTo(0, 0);
  };

  if (intro) {
    track(data.meta.name, 'intro', 'Hvor stort kan du bygge?');

    return (
      <StyleProvider>
        <Intro close={closeIntro} />
      </StyleProvider>
    );
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Wizard
          wizard={data}
          exports={{ dataExport }}
          translations={translations}
          showIntro={showIntro}
        />
      </PersistGate>
    </Provider>
  );
};

const mapStateToProps = ({ [state.NAME]: { $computed, ...wizardData } }) => ({
  hasData: !!Object.keys(wizardData).length,
});

export default connect(mapStateToProps)(App);
