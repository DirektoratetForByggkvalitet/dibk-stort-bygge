import get from 'lodash.get';

export default function exportData(state) {
  const tomtearealByggeomraade = get(state, 'propertyArea') || 0;
  const tomtearealSomTrekkesFra = get(state, 'nonSettlementArea') || 0;
  const tomtearealBeregnet = tomtearealByggeomraade - tomtearealSomTrekkesFra;

  // if area is calculated in percentage and not m2
  // there should be a more reliable way to do this?
  // eslint-disable-next-line no-unused-vars
  const isPercentage = state.kommuneplanen.substring(0, 1) === 'p';
  const beregningsregelGradAvUtnytting = isPercentage ? `%${state.kommuneplanen.substring(1)}` : state.kommuneplanen;

  return {
    tomtearealByggeomraade,
    tomtearealSomTrekkesFra,
    tomtearealBeregnet,

    arealBebyggelseEksisterende:
      get(state, 'builtResidence') || 0 +
      get(state, 'builtOther') || 0 +
      get(state, 'builtGarage') || 0 +
      get(state, 'builtSmallBuilding') || 0,

    arealBebyggelseSomSkalRives: get(state, 'arealBebyggelseSomSkalRives') || 0,
    arealBebyggelseNytt: get(state, 'newBuiltArea') || 0,
    parkeringsArealTerreng:
      get(state, 'requiredParkingSpotsTerrain') || 0 * get(state, 'parkingPlaceArea') || 0,

    arealSumByggesak: isPercentage ? get(state, 'resultGroup') || 0 : null,
    beregnetGradAvUtnytting: get(state, 'resultGroup') || 0,

    beregningsregelGradAvUtnytting,
  };
}
