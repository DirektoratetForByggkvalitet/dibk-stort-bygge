import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { Wizard, StyleProvider, trackEvent, track, state } from 'losen';

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
    <Wizard
      wizard={data}
      exports={{ dataExport }}
      translations={translations}
      showIntro={showIntro}
    />
  );
};

App.propTypes = {
  translations: PropTypes.object,
};

export default App;
