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
    tomtearealByggeområde: get(state, 'propertyArea'),
    tomtearealSomTrekkesFra: get(state, 'nonSettlementArea'),
    tomtearealBeregnet: get(state, 'propertyArea') - get(state, 'nonSettlementArea'),

    arealBebyggelseEksisterende: (
      get(state, 'builtResidence')
      + get(state, 'builtOther')
      + get(state, 'builtGarage')
      + get(state, 'builtSmallBuilding')
    ),
    arealBebyggelseSomSkalRives: get(state, 'arealBebyggelseSomSkalRives'),
    arealBebyggelseNytt: get(state, 'newBuiltArea'),

    parkeringsArealTerreng: get(state, 'requiredParkingSpotsTerrain') * get(state, 'parkingPlaceArea'),
    // arealSumByggesak: get(state, ersultGroup)

  };
}
