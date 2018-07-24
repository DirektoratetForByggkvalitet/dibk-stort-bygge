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

const checkNumber = (state, prop) => {
  const value = get(state, prop);
  // https://github.com/uandi/eslint-config/wiki/29-Standard-Library
  if (Number.isNaN(Number(value))) return undefined;
  return value;
};

export default function exportstate(state) {
  const tomtearealByggeomraade = checkNumber(state, 'propertyArea');
  const tomtearealSomTrekkesFra = checkNumber(state, 'nonSettlementArea');
  const tomtearealBeregnet = tomtearealByggeomraade - tomtearealSomTrekkesFra;

  // is area based on percentage based values?
  const isPercentage = state.kommuneplanen.substring(0, 1) === 'p';

  const jsonExport = {
    tomtearealByggeomraade,
    tomtearealSomTrekkesFra,
    tomtearealBeregnet,

    arealBebyggelseEksisterende:
      checkNumber(state, 'builtResidence') ||
      0 + checkNumber(state, 'builtOther') ||
      0 + checkNumber(state, 'builtGarage') ||
      0 + checkNumber(state, 'builtSmallBuilding') ||
      0,

    arealBebyggelseSomSkalRives: checkNumber(state, 'arealBebyggelseSomSkalRives'),
    arealBebyggelseNytt: checkNumber(state, 'newBuiltArea'),
    parkeringsPlasser: checkNumber(state, 'requiredParkingSpotsTerrain'),
    parkeringsPlassAreal: checkNumber(state, 'parkingPlaceArea'),
    parkeringsArealTerreng:
      get(state, 'requiredParkingSpotsTerrain') * get(state, 'parkingPlaceArea'),

    tillatGradAvUtnyttingKVM: checkNumber(state, 'utnyttingsgrad'),

    planlagtGradAvUtnyttingKVM: checkNumber(state, 'planArea2'),
    beregningsregelGradAvUtnytting: formatPrefix(state.kommuneplanen),
  };

  // don't include percentage based value if user has chosen a non-percentage value
  if (isPercentage && get(state, 'utilizationArea')) {
    jsonExport.tillatGradAvUtnyttingProsent = checkNumber(state, 'utilizationArea');
  }

  if (get(state, 'planArea')) {
    jsonExport.planlagtGradAvUtnytting = checkNumber(state, 'planArea');
  }

  return jsonExport;
}
