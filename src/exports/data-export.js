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

export default function exportstate(state) {
  const tomtearealByggeomraade = get(state, 'propertyArea') || null;
  const tomtearealSomTrekkesFra = get(state, 'nonSettlementArea') || null;
  const tomtearealBeregnet = tomtearealByggeomraade - tomtearealSomTrekkesFra;

  // is area based on percentage based values?
  const isPercentage = state.kommuneplanen.substring(0, 1) === 'p';

  const jsonExport = {
    tomtearealByggeomraade,
    tomtearealSomTrekkesFra,
    tomtearealBeregnet,

    arealBebyggelseEksisterende:
      get(state, 'builtResidence') ||
      0 + get(state, 'builtOther') ||
      0 + get(state, 'builtGarage') ||
      0 + get(state, 'builtSmallBuilding') ||
      null,

    arealBebyggelseSomSkalRives: get(state, 'arealBebyggelseSomSkalRives') || null,
    arealBebyggelseNytt: get(state, 'newBuiltArea') || null,
    parkeringsPlasser: get(state, 'requiredParkingSpotsTerrain'),
    parkeringsPlassAreal: get(state, 'parkingPlaceArea') || null,
    parkeringsArealTerreng:
      get(state, 'requiredParkingSpotsTerrain') * get(state, 'parkingPlaceArea'),

    // eslint-disable-next-line no-bitwise
    tillatGradAvUtnyttingKVM: ~~get(state, 'utnyttingsgrad') || null,

    planlagtGradAvUtnyttingKVM: get(state, 'planArea2') || null,
    beregningsregelGradAvUtnytting: formatPrefix(state.kommuneplanen),
  };

  // don't include percentage based value if user has chosen a non-percentage value
  if (isPercentage && get(state, 'utilizationArea')) {
    jsonExport.tillatGradAvUtnyttingProsent = get(state, 'utilizationArea') || null;
  }

  if (get(state, 'planArea')) {
    jsonExport.planlagtGradAvUtnytting = get(state, 'planArea') || null;
  }

  return jsonExport;
}
