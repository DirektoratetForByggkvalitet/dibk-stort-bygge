/* globals window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Wizard, StyleProvider, trackEvent, track, state } from 'losen';

import data from './api/stort-bygge.json';
import dataExport from './exports/data-export';
import Intro from './pages/Intro';

class App extends Component {
  static propTypes = {
    translations: PropTypes.object,
    hasData: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    translations: {},
  };

  static trackIntro() {
    track(data.meta.name, 'intro', 'Hvor stort kan du bygge?');
  }

  constructor(props) {
    super(props);
    this.state = { intro: !props.hasData };
  }

  componentWillReceiveProps = ({ hasData }) => {
    this.setState({ intro: !hasData });
  }

  closeIntro = () => {
    this.setState({ intro: false });
    window.scrollTo(0, 0);
    trackEvent('close-intro');
  }

  showIntro = () => {
    this.setState({ intro: true });
    window.scrollTo(0, 0);
  }

  render() {
    const { intro } = this.state;

    if (intro) {
      App.trackIntro();

      return (
        <StyleProvider>
          <Intro close={this.closeIntro} />
        </StyleProvider>
      );
    }

    return (
      <Wizard
        wizard={data}
        exports={{ dataExport }}
        translations={this.props.translations}
        showIntro={this.showIntro}
      />
    );
  }
}

const mapStateToProps = ({ [state.NAME]: { $computed, ...wizardData } }) => ({
  hasData: !!Object.keys(wizardData).length,
});

export default connect(mapStateToProps)(App);
