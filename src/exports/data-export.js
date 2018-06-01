import get from 'lodash.get';

// formats letter-based prefix to it's actual prefix.
// i.e: gets 'pbya' and returns '%bya'
const formatPrefix = (word) => {
  if (word === 'pbya') return '%BYA';
  else if (word === 'pbra') return '%BRA';
  else if (word === 'tbra') return 'T-BRA';
  else if (word === 'ptu') return '%TU';

  return word && word.toUpperCase();
};

export default function exportData(state) {
  const tomtearealByggeomraade = get(state, 'propertyArea') || 0;
  const tomtearealSomTrekkesFra = get(state, 'nonSettlementArea') || 0;
  const tomtearealBeregnet = tomtearealByggeomraade - tomtearealSomTrekkesFra;

  // if area is calculated in percentage and not m2
  // there should be a more reliable way to do this?
  // const isPercentage = state.kommuneplanen.substring(0, 1) === 'p';

  // eslint-disable-next-line no-bitwise
  const arealSumByggesak = ~~(
    get(state, 'sum-utnyttingsgrad') -
    (get(state, 'sum-utnyttingsgrad') *
      (get(state, 'sum-planArea') *
        0.01)));

  return {
    tomtearealByggeomraade,
    tomtearealSomTrekkesFra,
    tomtearealBeregnet,

    arealSumByggesak,

    arealBebyggelseEksisterende: get(state, 'builtResidence') || 0 +
      get(state, 'builtOther') || 0 +
      get(state, 'builtGarage') || 0 +
      get(state, 'builtSmallBuilding') || 0,

    arealBebyggelseSomSkalRives: get(state, 'arealBebyggelseSomSkalRives') || 0,
    arealBebyggelseNytt: get(state, 'newBuiltArea') || 0,
    parkeringsPlasser: get(state, 'requiredParkingSpotsTerrain'),
    parkeringsPlassAreal: get(state, 'parkingPlaceArea') || 0,
    parkeringsArealTerreng: get(state, 'requiredParkingSpotsTerrain') * get(state, 'parkingPlaceArea'),

    // eslint-disable-next-line no-bitwise
    tillatGradAvUtnyttingKVM: ~~get(state, 'sum-utnyttingsgrad') || 0,
    tillatGradAvUtnyttingProsent: get(state, 'utilizationArea') || 0,
    planlagtGradAvUtnytting: get(state, 'sum-planArea') || 0,
    beregningsregelGradAvUtnytting: formatPrefix(state.kommuneplanen),
  };
}