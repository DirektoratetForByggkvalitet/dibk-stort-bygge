import get from 'lodash.get';

const checkNumber = (state, prop) => {
  const value = get(state, prop);
  // https://github.com/uandi/eslint-config/wiki/29-Standard-Library
  if (Number.isNaN(Number(value))) return undefined;
  return value;
};

export function exportStatePercentageRule(state) {
  const tomtearealByggeomraade = checkNumber(state, 'propertyArea');
  const tomtearealSomTrekkesFra = checkNumber(state, 'nonSettlementArea');
  const tomtearealBeregnet = tomtearealByggeomraade - tomtearealSomTrekkesFra;

  const jsonExport = {
    tomtearealByggeomraade,
    tomtearealSomTrekkesFra,
    tomtearealBeregnet,

    arealBebyggelseEksisterende:
      (checkNumber(state, 'builtResidence') || 0) +
      (checkNumber(state, 'builtOther') || 0) +
      (checkNumber(state, 'builtGarage') || 0) +
      (checkNumber(state, 'builtSmallBuilding') || 0),

    arealBebyggelseSomSkalRives: checkNumber(state, 'arealBebyggelseSomSkalRives'),
    arealBebyggelseNytt: checkNumber(state, 'newBuiltArea'),
    parkeringsarealTerreng:
      get(state, 'requiredParkingSpotsTerrain') * get(state, 'parkingPlaceArea'),

    beregnetMaksByggeareal: checkNumber(state, 'utnyttingsgrad'),

    arealSumByggesak: checkNumber(state, 'planArea2'),
  };

  if (get(state, 'planArea')) {
    jsonExport.beregnetGradAvUtnytting = checkNumber(state, 'planArea');
  }

  return jsonExport;
}

export function exportstateM2Rule(state) {
  const jsonExport = {
    // will always be null since we're not asking for the size of the plot
    tomtearealBeregnet: null,

    arealBebyggelseEksisterende:
      (checkNumber(state, 'builtResidence') || 0) +
      (checkNumber(state, 'builtOther') || 0) +
      (checkNumber(state, 'builtGarage') || 0) +
      (checkNumber(state, 'builtSmallBuilding') || 0),

    arealBebyggelseSomSkalRives: checkNumber(state, 'arealBebyggelseSomSkalRives'),
    arealBebyggelseNytt: checkNumber(state, 'newBuiltArea'),
    parkeringsarealTerreng:
      get(state, 'requiredParkingSpotsTerrain') * get(state, 'parkingPlaceArea'),

    beregnetMaksByggeareal: checkNumber(state, 'utnyttingsgrad'),

    beregnetGradAvUtnytting:
      (
        (
          (checkNumber(state, 'builtResidence') || 0) +
          (checkNumber(state, 'builtGarage') || 0) +
          (checkNumber(state, 'builtSmallBuilding') || 0) +
          (checkNumber(state, 'builtOther') || 0)
        )
        - (checkNumber(state, 'arealBebyggelseSomSkalRives') || 0)
      ) +
      (checkNumber(state, 'newBuiltArea') || 0) +
      (checkNumber(state, 'parkeringssum') || 0),
  };

  return jsonExport;
}

export default function exportstate(state) {
  // is area based on percentage based values?
  const isPercentage = state.kommuneplanen.substring(0, 1) === 'p';

  if (isPercentage) {
    return exportStatePercentageRule(state);
  }

  return exportstateM2Rule(state);
}
