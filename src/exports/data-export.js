import get from 'lodash.get';

export default function exportData(state) {
  return {
    fraSluttbrukersystem: 'katteveiviser',
    eiendomByggested: {
      etasje: parseInt(get(state, 'living.floor'), 10),
    },
    ansvarsrett: {
      noeGreier: 'her',
    },
    tomtearealByggeområde: get(state, 'sum-bruktAreal'),
    // tomtearealSomTrekkesFra: get(state, '')
  };
}
