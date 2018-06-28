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
  const tomtearealByggeomraade = get(state, 'propertyArea') || undefined;
  const tomtearealSomTrekkesFra = get(state, 'nonSettlementArea') || undefined;
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
      undefined,

    arealBebyggelseSomSkalRives: get(state, 'arealBebyggelseSomSkalRives') || undefined,
    arealBebyggelseNytt: get(state, 'newBuiltArea') || undefined,
    parkeringsPlasser: get(state, 'requiredParkingSpotsTerrain'),
    parkeringsPlassAreal: get(state, 'parkingPlaceArea') || undefined,
    parkeringsArealTerreng:
      get(state, 'requiredParkingSpotsTerrain') * get(state, 'parkingPlaceArea'),

    // eslint-disable-next-line no-bitwise
    tillatGradAvUtnyttingKVM: ~~get(state, 'utnyttingsgrad') || undefined,

    planlagtGradAvUtnyttingKVM: get(state, 'planArea2') || undefined,
    beregningsregelGradAvUtnytting: formatPrefix(state.kommuneplanen),
  };

  // don't include percentage based value if user has chosen a non-percentage value
  if (isPercentage && get(state, 'utilizationArea')) {
    jsonExport.tillatGradAvUtnyttingProsent = get(state, 'utilizationArea') || undefined;
  }

  if (get(state, 'planArea')) {
    jsonExport.planlagtGradAvUtnytting = get(state, 'planArea') || undefined;
  }

  return jsonExport;
}
