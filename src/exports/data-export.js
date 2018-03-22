import get from 'lodash.get';

export default function exportData(state) {
  const tomtearealByggeomraade = get(state, 'propertyArea');
  const tomtearealSomTrekkesFra = get(state, 'nonSettlementArea');
  const tomtearealBeregnet = tomtearealByggeomraade - tomtearealSomTrekkesFra;

  // if area is calculated in percentage and not m2
  // there should be a more reliable way to do this?
  // eslint-disable-next-line no-unused-vars
  const isPercentage = state.kommuneplanen.substring(0, 1) === 'p';
  return {
    tomtearealByggeomraade,
    tomtearealSomTrekkesFra,
    tomtearealBeregnet,

    arealBebyggelseEksisterende:
      get(state, 'builtResidence') +
      get(state, 'builtOther') +
      get(state, 'builtGarage') +
      get(state, 'builtSmallBuilding'),

    arealBebyggelseSomSkalRives: get(state, 'arealBebyggelseSomSkalRives'),
    arealBebyggelseNytt: get(state, 'newBuiltArea'),
    parkeringsArealTerreng:
      get(state, 'requiredParkingSpotsTerrain') * get(state, 'parkingPlaceArea'),

    arealSumByggesak: isPercentage ? get(state, 'resultGroup') : null,
    beregnetGradAvUtnytting: get(state, 'resultGroup'),
    beregningsregelGradAvUtnytting: state.kommuneplanen,
  };
}
