import get from 'lodash.get';
import sum from './sum';

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
  // summering av utnyttingsgrad
  const valuesUtnytting = ['propertyArea', 'nonSettlementArea', 'utilizationArea', 0.01];
  const operationsUtnytting = ['+', '-', '*', '%'];

  // eslint-disable-next-line no-unused-vars
  const utnyttingsgrad = sum(state, valuesUtnytting, operationsUtnytting);

  // summering av arealer
  const valuesplanArea = ['propertyArea', 'nonSettlementArea', 'sum2-planArea', 100];
  const operationsplanArea = ['+', '-', '-/', '%'];

  // eslint-disable-next-line no-unused-vars
  const planArea = sum(state, valuesplanArea, operationsplanArea);

  const tomtearealByggeomraade = get(state, 'propertyArea') || 0;
  const tomtearealSomTrekkesFra = get(state, 'nonSettlementArea') || 0;
  const tomtearealBeregnet = tomtearealByggeomraade - tomtearealSomTrekkesFra;

  // if area is calculated in percentage and not m2
  // there should be a more reliable way to do this?
  // const isPercentage = state.kommuneplanen.substring(0, 1) === 'p';

  const arealSumByggesak = get(state, 'sum-utnyttingsgrad') - get(state, 'sum-bruktAreal');

  return {
    tomtearealByggeomraade,
    tomtearealSomTrekkesFra,
    tomtearealBeregnet,

    arealSumByggesak,

    arealBebyggelseEksisterende:
      get(state, 'builtResidence') ||
      0 + get(state, 'builtOther') ||
      0 + get(state, 'builtGarage') ||
      0 + get(state, 'builtSmallBuilding') ||
      0,

    arealBebyggelseSomSkalRives: get(state, 'arealBebyggelseSomSkalRives') || 0,
    arealBebyggelseNytt: get(state, 'newBuiltArea') || 0,
    parkeringsPlasser: get(state, 'requiredParkingSpotsTerrain'),
    parkeringsPlassAreal: get(state, 'parkingPlaceArea') || 0,
    parkeringsArealTerreng:
      get(state, 'requiredParkingSpotsTerrain') * get(state, 'parkingPlaceArea'),

    // eslint-disable-next-line no-bitwise
    tillatGradAvUtnyttingKVM: ~~get(state, 'sum-utnyttingsgrad') || 0,
    tillatGradAvUtnyttingProsent: get(state, 'utilizationArea') || 0,
    planlagtGradAvUtnytting: get(state, 'sum-planArea') || 0,
    beregningsregelGradAvUtnytting: formatPrefix(state.kommuneplanen),
  };
}
