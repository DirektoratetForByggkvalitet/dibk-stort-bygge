import get from 'lodash.get';

export default function exportData(state) {
  const tomtearealByggeområde = get(state, 'propertyArea');
  const tomtearealSomTrekkesFra = get(state, 'nonSettlementArea');
  const tomtearealBeregnet = tomtearealByggeområde - tomtearealSomTrekkesFra;

  const arealBebyggelseSomSkalRives = get(state, 'arealBebyggelseSomSkalRives');
  const arealBebyggelseNytt = get(state, 'newBuiltArea');
  const parkeringsArealTerreng = arealBebyggelseSomSkalRives * arealBebyggelseNytt;

  // if area is calculated in percentage and not m2
  // there should be a more reliable way to do this?
  // eslint-disable-next-line no-unused-vars
  const isPercentage = state.kommuneplanen.substring(0, 1) === 'p';

  return {
    fraSluttbrukersystem: 'katteveiviser',
    eiendomByggested: {
      etasje: parseInt(get(state, 'living.floor'), 10),
    },
    ansvarsrett: {
      noeGreier: 'her',
    },
    tomtearealByggeområde,
    tomtearealSomTrekkesFra,
    tomtearealBeregnet,

    arealBebyggelseEksisterende: (
      get(state, 'builtResidence')
      + get(state, 'builtOther')
      + get(state, 'builtGarage')
      + get(state, 'builtSmallBuilding')
    ),

    arealBebyggelseSomSkalRives,
    arealBebyggelseNytt,
    parkeringsArealTerreng,

    arealSumByggesak: get(state, 'resultGroup'),
    beregnetGradAvUtnytting: get(state, 'sum2-planArea'),
  };
}
