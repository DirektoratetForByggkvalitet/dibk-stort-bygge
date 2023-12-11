import { WizardDefinition } from 'losen';

const data: WizardDefinition = {
  meta: {
    title: 'Hvor stort kan du bygge?',
    name: 'stort_bygge',
  },
  computed: {
    areaBuilt: {
      type: 'or',
      clauses: [
        {
          field: 'builtResidence',
          operator: 'gt',
          value: 0,
        },
        {
          field: 'builtGarage',
          operator: 'gt',
          value: 0,
        },
        {
          field: 'builtSmallBuilding',
          operator: 'gt',
          value: 0,
        },
        {
          field: 'builtOther',
          operator: 'gt',
          value: 0,
        },
      ],
    },
  },
  schema: [
    {
      id: 'start',
      type: 'Page',
      heading: 'Regulering av eiendommen',
      children: [
        {
          id: 'regulation',
          property: 'regulation',
          type: 'Radio',
          heading: 'Er eiendommen regulert?',
          text: 'Hvis du fant en reguleringsplan hos kommunen, er eiendommen regulert.',
          options: [
            {
              id: 'regulation.yes',
              type: 'Answer',
              heading: 'Ja, eiendommen er regulert.',
              value: 'yes',
            },
            {
              id: 'regulation.no',
              type: 'Answer',
              heading: 'Nei, eiendommen er ikke regulert.',
              value: 'no',
            },
          ],
        },
        {
          type: 'Branch',
          id: 'regulation.test.finneskommuneplanen',
          branches: [
            {
              test: {
                field: 'regulation',
                operator: 'eq',
                value: 'no',
              },
              children: [
                {
                  id: 'finneskommuneplanen',
                  property: 'finneskommuneplanen',
                  type: 'Radio',
                  heading:
                    'Er det bestemmelser i kommuneplanen eller -delplanen som sier noe om tillatt grad av utnytting?',
                  options: [
                    {
                      id: 'finneskommuneplanen.yes',
                      type: 'Answer',
                      heading: 'Ja',
                      value: 'yes',
                    },
                    {
                      id: 'finneskommuneplanen.no',
                      type: 'Answer',
                      heading: 'Nei',
                      value: 'no',
                    },
                  ],
                },
              ],
            },
            {
              test: {
                field: 'regulation',
                operator: 'eq',
                value: 'yes',
              },
              children: [
                {
                  id: 'isreguleringsplanen',
                  property: 'isreguleringsplanen',
                  type: 'Radio',
                  heading:
                    'Står det noe i kommuneplanen eller delplanen om at den gjelder foran reguleringsplanen?',
                  text: 'Hvis reguleringsplanen er vedtatt senere enn kommuneplanen/-delplanen, er det reguleringsplanen som gjelder, og du kan svare nei.',
                  options: [
                    {
                      id: 'isreguleringsplanen.yes',
                      type: 'Answer',
                      heading: 'Ja, den gjelder foran reguleringsplanen',
                      value: 'yes',
                    },
                    {
                      id: 'isreguleringsplanen.no',
                      type: 'Answer',
                      heading: 'Nei, det står ingenting om det',
                      value: 'no',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'Branch',
          id: 'regulation.test.kommuneplanen',
          branches: [
            {
              test: {
                type: 'and',
                clauses: [
                  {
                    field: 'regulation',
                    operator: 'eq',
                    value: 'no',
                  },
                  {
                    field: 'finneskommuneplanen',
                    operator: 'eq',
                    value: 'yes',
                  },
                ],
              },
              children: [
                {
                  id: 'kommuneplanen',
                  property: 'kommuneplanen',
                  type: 'Radio',
                  heading:
                    'Hvordan defineres grad av utnytting i kommuneplanen?',
                  clear: ['utilizationArea', 'regulationTime'],
                  options: [
                    {
                      id: 'kommuneplanen.bya',
                      type: 'Answer',
                      heading: 'BYA',
                      value: 'bya',
                    },
                    {
                      id: 'kommuneplanen.pbya',
                      type: 'Answer',
                      heading: '%BYA',
                      value: 'pbya',
                    },
                    {
                      id: 'kommuneplanen.bra',
                      type: 'Answer',
                      heading: 'BRA',
                      value: 'bra',
                    },
                    {
                      id: 'kommuneplanen.pbra',
                      type: 'Answer',
                      heading: '%BRA',
                      value: 'pbra',
                    },
                    {
                      id: 'kommuneplanen.tbra',
                      type: 'Answer',
                      heading: 'T-BRA',
                      value: 'tbra',
                    },
                    {
                      id: 'kommuneplanen.ptu',
                      type: 'Answer',
                      heading: '%TU',
                      value: 'ptu',
                    },
                    {
                      id: 'kommuneplanen.none',
                      type: 'Answer',
                      heading: 'Ingen av disse',
                      value: 'none',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'Branch',
          id: 'regulation.test.isreguleringsplanen',
          branches: [
            {
              test: {
                type: 'and',
                clauses: [
                  {
                    field: 'regulation',
                    operator: 'eq',
                    value: 'yes',
                  },
                  {
                    field: 'isreguleringsplanen',
                    operator: 'eq',
                    value: 'yes',
                  },
                ],
              },
              children: [
                {
                  id: 'kommuneplanen',
                  property: 'kommuneplanen',
                  type: 'Radio',
                  heading:
                    'Hvordan defineres grad av utnytting i kommuneplanen?',
                  clear: ['utilizationArea', 'regulationTime'],
                  options: [
                    {
                      id: 'kommuneplanen.bya',
                      type: 'Answer',
                      heading: 'BYA',
                      value: 'bya',
                    },
                    {
                      id: 'kommuneplanen.pbya',
                      type: 'Answer',
                      heading: '%BYA',
                      value: 'pbya',
                    },
                    {
                      id: 'kommuneplanen.bra',
                      type: 'Answer',
                      heading: 'BRA',
                      value: 'bra',
                    },
                    {
                      id: 'kommuneplanen.pbra',
                      type: 'Answer',
                      heading: '%BRA',
                      value: 'pbra',
                    },
                    {
                      id: 'kommuneplanen.tbra',
                      type: 'Answer',
                      heading: 'T-BRA',
                      value: 'tbra',
                    },
                    {
                      id: 'kommuneplanen.ptu',
                      type: 'Answer',
                      heading: '%TU',
                      value: 'ptu',
                    },
                    {
                      id: 'kommuneplanen.none',
                      type: 'Answer',
                      heading: 'Ingen av disse',
                      value: 'none',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'Branch',
          id: 'regulation.test.isreguleringsplanen.kommuneplanen',
          branches: [
            {
              test: {
                type: 'and',
                clauses: [
                  {
                    field: 'regulation',
                    operator: 'eq',
                    value: 'yes',
                  },
                  {
                    field: 'isreguleringsplanen',
                    operator: 'eq',
                    value: 'no',
                  },
                ],
              },
              children: [
                {
                  id: 'kommuneplanen',
                  property: 'kommuneplanen',
                  type: 'Radio',
                  heading:
                    'Hvordan defineres grad av utnytting i reguleringsplanen?',
                  clear: ['utilizationArea', 'regulationTime'],
                  options: [
                    {
                      id: 'kommuneplanen.bya',
                      type: 'Answer',
                      heading: 'BYA',
                      value: 'bya',
                    },
                    {
                      id: 'kommuneplanen.pbya',
                      type: 'Answer',
                      heading: '%BYA',
                      value: 'pbya',
                    },
                    {
                      id: 'kommuneplanen.bra',
                      type: 'Answer',
                      heading: 'BRA',
                      value: 'bra',
                    },
                    {
                      id: 'kommuneplanen.pbra',
                      type: 'Answer',
                      heading: '%BRA',
                      value: 'pbra',
                    },
                    {
                      id: 'kommuneplanen.tbra',
                      type: 'Answer',
                      heading: 'T-BRA',
                      value: 'tbra',
                    },
                    {
                      id: 'kommuneplanen.ptu',
                      type: 'Answer',
                      heading: '%TU',
                      value: 'ptu',
                    },
                    {
                      id: 'kommuneplanen.none',
                      type: 'Answer',
                      heading: 'Ingen av disse',
                      value: 'none',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'Branch',
          id: 'regulation.test.isreguleringsplanen.kommuneplanen.utilizationArea',
          branches: [
            {
              test: {
                type: 'or',
                clauses: [
                  {
                    type: 'and',
                    clauses: [
                      {
                        field: 'regulation',
                        operator: 'eq',
                        value: 'no',
                      },
                      {
                        field: 'finneskommuneplanen',
                        operator: 'eq',
                        value: 'no',
                      },
                    ],
                  },
                  {
                    type: 'and',
                    clauses: [
                      {
                        field: 'regulation',
                        operator: 'eq',
                        value: 'no',
                      },
                      {
                        field: 'finneskommuneplanen',
                        operator: 'eq',
                        value: 'yes',
                      },
                      {
                        field: 'kommuneplanen',
                        operator: 'eq',
                        value: 'none',
                      },
                    ],
                  },
                  {
                    type: 'and',
                    clauses: [
                      {
                        field: 'regulation',
                        operator: 'eq',
                        value: 'yes',
                      },
                      {
                        field: 'isreguleringsplanen',
                        operator: 'is',
                      },
                      {
                        field: 'kommuneplanen',
                        operator: 'eq',
                        value: 'none',
                      },
                    ],
                  },
                ],
              },
              children: [
                {
                  id: 'insufficientKommuneplanen',
                  heading: 'Beklager, da kan du ikke bruke denne veiviseren.',
                  type: 'Error',
                  children: [
                    {
                      id: 'insufficientKommuneplanen',
                      type: 'Text',
                      warning: true,
                      heading:
                        'Beklager, da kan du ikke bruke denne veiviseren. Ta kontakt med kommunen din, så hjelper de deg videre.',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'Branch',
          id: 'regulation.test.isreguleringsplanen.kommuneplanen.utilizationArea',
          branches: [
            {
              test: {
                type: 'and',
                clauses: [
                  {
                    type: 'or',
                    clauses: [
                      {
                        field: 'regulation',
                        operator: 'eq',
                        value: 'yes',
                      },
                      {
                        field: 'finneskommuneplanen',
                        operator: 'eq',
                        value: 'yes',
                      },
                    ],
                  },
                  {
                    type: 'or',
                    clauses: [
                      {
                        field: 'kommuneplanen',
                        operator: 'eq',
                        value: 'bra',
                      },
                      {
                        field: 'kommuneplanen',
                        operator: 'eq',
                        value: 'ptu',
                      },
                    ],
                  },
                ],
              },
              children: [
                {
                  id: 'regulationTime',
                  property: 'regulationTime',
                  type: 'Radio',
                  heading: 'Når er planen vedtatt?',
                  options: [
                    {
                      id: 'regulationTime.before',
                      type: 'Answer',
                      heading: 'Før 1.7.1997',
                      value: 'before',
                    },
                    {
                      id: 'regulationTime.after',
                      type: 'Answer',
                      heading: 'Etter 1.7.1997',
                      value: 'after',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'Branch',
          id: 'regulation.test.isreguleringsplanen.kommuneplanen.utilizationArea.regulationTime',
          branches: [
            {
              test: {
                type: 'and',
                clauses: [
                  {
                    type: 'or',
                    clauses: [
                      {
                        field: 'regulation',
                        operator: 'eq',
                        value: 'yes',
                      },
                      {
                        field: 'finneskommuneplanen',
                        operator: 'eq',
                        value: 'yes',
                      },
                    ],
                  },
                  {
                    type: 'or',
                    clauses: [
                      {
                        field: 'kommuneplanen',
                        operator: 'eq',
                        value: 'bya',
                      },
                      {
                        field: 'kommuneplanen',
                        operator: 'eq',
                        value: 'pbya',
                      },
                    ],
                  },
                ],
              },
              children: [
                {
                  id: 'regulationTime',
                  property: 'regulationTime',
                  type: 'Radio',
                  heading: 'Når er planen vedtatt?',
                  options: [
                    {
                      id: 'regulationTime.before',
                      type: 'Answer',
                      heading: 'Før 1.7.2007',
                      value: 'before',
                    },
                    {
                      id: 'regulationTime.after',
                      type: 'Answer',
                      heading: 'Etter 1.7.2007',
                      value: 'after',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'Branch',
          id: 'regulation.test.isreguleringsplanen.kommuneplanen.utilizationArea.yes',
          branches: [
            {
              test: {
                type: 'and',
                clauses: [
                  {
                    type: 'and',
                    clauses: [
                      {
                        field: 'regulation',
                        operator: 'eq',
                        value: 'yes',
                      },
                      {
                        field: 'isreguleringsplanen',
                        operator: 'eq',
                        value: 'no',
                      },
                    ],
                  },
                  {
                    type: 'or',
                    clauses: [
                      {
                        field: 'kommuneplanen',
                        operator: 'eq',
                        value: 'pbya',
                      },
                      {
                        field: 'kommuneplanen',
                        operator: 'eq',
                        value: 'pbra',
                      },
                      {
                        field: 'kommuneplanen',
                        operator: 'eq',
                        value: 'ptu',
                      },
                    ],
                  },
                ],
              },
              children: [
                {
                  id: 'utilizationArea',
                  property: 'utilizationArea',
                  type: 'Number',
                  heading:
                    'Hva er tillatt grad av utnytting i reguleringsplanen?',
                  unit: '%',
                  minimum: 0,
                  show: {
                    field: 'kommuneplanen',
                    operator: 'eq',
                    value: 'pbra',
                  },
                },
                {
                  id: 'utilizationArea',
                  property: 'utilizationArea',
                  type: 'Number',
                  heading:
                    'Hva er tillatt grad av utnytting i reguleringsplanen?',
                  unit: '%',
                  minimum: 0,
                  maximum: 100,
                  hide: {
                    field: 'kommuneplanen',
                    operator: 'eq',
                    value: 'pbra',
                  },
                },
              ],
            },
          ],
        },
        {
          type: 'Branch',
          id: 'regulation.test.isreguleringsplanen.kommuneplanen.utilizationArea.no',
          branches: [
            {
              test: {
                type: 'and',
                clauses: [
                  {
                    type: 'and',
                    clauses: [
                      {
                        field: 'regulation',
                        operator: 'eq',
                        value: 'yes',
                      },
                      {
                        field: 'isreguleringsplanen',
                        operator: 'eq',
                        value: 'no',
                      },
                    ],
                  },
                  {
                    type: 'or',
                    clauses: [
                      {
                        field: 'kommuneplanen',
                        operator: 'eq',
                        value: 'bya',
                      },
                      {
                        field: 'kommuneplanen',
                        operator: 'eq',
                        value: 'bra',
                      },
                      {
                        field: 'kommuneplanen',
                        operator: 'eq',
                        value: 'tbra',
                      },
                    ],
                  },
                ],
              },
              children: [
                {
                  id: 'utilizationArea',
                  property: 'utilizationArea',
                  type: 'Number',
                  heading:
                    'Hva er tillatt grad av utnytting i reguleringsplanen?',
                  unit: 'm<sup>2</sup>',
                  minimum: 0,
                },
              ],
            },
          ],
        },
        {
          type: 'Branch',
          id: 'regulation.test.isreguleringsplanen.kommuneplanen.utilizationArea.nah',
          branches: [
            {
              test: {
                type: 'and',
                clauses: [
                  {
                    type: 'and',
                    clauses: [
                      {
                        field: 'regulation',
                        operator: 'eq',
                        value: 'yes',
                      },
                      {
                        field: 'isreguleringsplanen',
                        operator: 'eq',
                        value: 'yes',
                      },
                    ],
                  },
                  {
                    type: 'or',
                    clauses: [
                      {
                        field: 'kommuneplanen',
                        operator: 'eq',
                        value: 'pbya',
                      },
                      {
                        field: 'kommuneplanen',
                        operator: 'eq',
                        value: 'pbra',
                      },
                      {
                        field: 'kommuneplanen',
                        operator: 'eq',
                        value: 'ptu',
                      },
                    ],
                  },
                ],
              },
              children: [
                {
                  id: 'utilizationArea',
                  property: 'utilizationArea',
                  type: 'Number',
                  heading: 'Hva er tillatt grad av utnytting i kommuneplanen?',
                  unit: '%',
                  minimum: 1,
                  maximum: 100,
                  hide: {
                    field: 'kommuneplanen',
                    operator: 'eq',
                    value: 'pbra',
                  },
                },
                {
                  id: 'utilizationArea',
                  property: 'utilizationArea',
                  type: 'Number',
                  heading: 'Hva er tillatt grad av utnytting i kommuneplanen?',
                  unit: '%',
                  minimum: 1,
                  show: {
                    field: 'kommuneplanen',
                    operator: 'eq',
                    value: 'pbra',
                  },
                },
              ],
            },
          ],
        },
        {
          type: 'Branch',
          id: 'regulation.test.isreguleringsplanen.kommuneplanen.utilizationArea.maybe',
          branches: [
            {
              test: {
                type: 'and',
                clauses: [
                  {
                    type: 'and',
                    clauses: [
                      {
                        field: 'regulation',
                        operator: 'eq',
                        value: 'yes',
                      },
                      {
                        field: 'isreguleringsplanen',
                        operator: 'eq',
                        value: 'yes',
                      },
                    ],
                  },
                  {
                    type: 'or',
                    clauses: [
                      {
                        field: 'kommuneplanen',
                        operator: 'eq',
                        value: 'bya',
                      },
                      {
                        field: 'kommuneplanen',
                        operator: 'eq',
                        value: 'bra',
                      },
                      {
                        field: 'kommuneplanen',
                        operator: 'eq',
                        value: 'tbra',
                      },
                    ],
                  },
                ],
              },
              children: [
                {
                  id: 'utilizationArea',
                  property: 'utilizationArea',
                  type: 'Number',
                  heading: 'Hva er tillatt grad av utnytting i kommuneplanen?',
                  unit: 'm<sup>2</sup>',
                  minimum: 1,
                },
              ],
            },
          ],
        },
        {
          type: 'Branch',
          id: 'regulation.test.isreguleringsplanen.kommuneplanen.utilizationArea.dontKnow',
          branches: [
            {
              test: {
                type: 'and',
                clauses: [
                  {
                    type: 'and',
                    clauses: [
                      {
                        field: 'regulation',
                        operator: 'eq',
                        value: 'no',
                      },
                      {
                        field: 'finneskommuneplanen',
                        operator: 'eq',
                        value: 'yes',
                      },
                    ],
                  },
                  {
                    type: 'or',
                    clauses: [
                      {
                        field: 'kommuneplanen',
                        operator: 'eq',
                        value: 'pbya',
                      },
                      {
                        field: 'kommuneplanen',
                        operator: 'eq',
                        value: 'pbra',
                      },
                      {
                        field: 'kommuneplanen',
                        operator: 'eq',
                        value: 'ptu',
                      },
                    ],
                  },
                ],
              },
              children: [
                {
                  id: 'utilizationArea',
                  property: 'utilizationArea',
                  type: 'Number',
                  heading: 'Hva er tillatt grad av utnytting i kommuneplanen?',
                  unit: '%',
                  minimum: 1,
                  show: {
                    field: 'kommuneplanen',
                    operator: 'eq',
                    value: 'pbra',
                  },
                },
                {
                  id: 'utilizationArea',
                  property: 'utilizationArea',
                  type: 'Number',
                  heading: 'Hva er tillatt grad av utnytting i kommuneplanen?',
                  unit: '%',
                  minimum: 1,
                  maximum: 100,
                  hide: {
                    field: 'kommuneplanen',
                    operator: 'eq',
                    value: 'pbra',
                  },
                },
              ],
            },
          ],
        },
        {
          type: 'Branch',
          id: 'regulation.test.isreguleringsplanen.kommuneplanen.utilizationArea.dontKnow2',
          branches: [
            {
              test: {
                type: 'and',
                clauses: [
                  {
                    type: 'and',
                    clauses: [
                      {
                        field: 'regulation',
                        operator: 'eq',
                        value: 'no',
                      },
                      {
                        field: 'finneskommuneplanen',
                        operator: 'eq',
                        value: 'yes',
                      },
                    ],
                  },
                  {
                    type: 'or',
                    clauses: [
                      {
                        field: 'kommuneplanen',
                        operator: 'eq',
                        value: 'bya',
                      },
                      {
                        field: 'kommuneplanen',
                        operator: 'eq',
                        value: 'bra',
                      },
                      {
                        field: 'kommuneplanen',
                        operator: 'eq',
                        value: 'tbra',
                      },
                    ],
                  },
                ],
              },
              children: [
                {
                  id: 'utilizationArea',
                  property: 'utilizationArea',
                  type: 'Number',
                  heading: 'Hva er tillatt grad av utnytting i kommuneplanen?',
                  unit: 'm<sup>2</sup>',
                  minimum: 1,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'Branch',
      id: 'regulation.test.isreguleringsplanen.kommuneplanen.utilizationArea.5',
      branches: [
        {
          test: {
            type: 'and',
            clauses: [
              {
                field: 'utilizationArea',
                operator: 'required',
              },
              {
                type: 'or',
                clauses: [
                  {
                    field: 'kommuneplanen',
                    operator: 'eq',
                    value: 'pbya',
                  },
                  {
                    field: 'kommuneplanen',
                    operator: 'eq',
                    value: 'pbra',
                  },
                  {
                    field: 'kommuneplanen',
                    operator: 'eq',
                    value: 'ptu',
                  },
                ],
              },
            ],
          },
          children: [
            {
              id: 'page1',
              type: 'Page',
              heading: 'Størrelse på eiendommen',
              children: [
                {
                  id: 'propertyArea',
                  property: 'propertyArea',
                  type: 'Number',
                  heading: 'Hvor stor er eiendommen?',
                  unit: 'm<sup>2</sup>',
                  minimum: 1,
                  text: '<p>Arealet på eiendommen finner du i et matrikkelbrev (tidligere ble dette kalt målebrev). Matrikkelbrev får du fra kommunen. Du kan også se eiendommens areal på <a href="http://www.seeiendom.no/">Kartverkets nettsted seeiendom.no</a>.</p>',
                },
                {
                  id: 'nonSettlementArea',
                  property: 'nonSettlementArea',
                  type: 'Number',
                  heading:
                    'Hvor stor del av eiendommen er regulert til noe annet enn byggeområde?',
                  minimum: 0,
                  unit: 'm<sup>2</sup>',
                  validator: {
                    test: {
                      field: 'nonSettlementArea',
                      operator: 'lt',
                      value: {
                        fields: ['propertyArea'],
                      },
                    },
                    error:
                      'Størrelsen på det som er regulert til byggeområde må være mindre enn eiendommen',
                  },
                  text: '<p>Hvis eiendommen ikke er regulert til noe annet enn byggeområde, skriver du inn tallet 0 i feltet under.<br /><a href="https://dibk.no/byggeomrade">Hva er byggeområde?</a></p>',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'Page2',
      type: 'Page',
      heading: 'Bebyggelse på eiendommen',
      hide: {
        field: 'utilizationArea',
        operator: 'not',
      },
      children: [
        {
          type: 'Branch',
          id: 'kommueneplanen.test',
          branches: [
            {
              test: {
                type: 'or',
                clauses: [
                  {
                    field: 'kommuneplanen',
                    operator: 'eq',
                    value: 'bra',
                  },
                  {
                    field: 'kommuneplanen',
                    operator: 'eq',
                    value: 'pbra',
                  },
                ],
              },
              children: [
                {
                  id: 'linkText',
                  type: 'Text',
                  text: 'Du skal måle areal i BRA. Det betyr bruksareal. <a href="https://dibk.no/bruksareal">Hva er bruksareal?</a>',
                },
              ],
            },
            {
              test: {
                type: 'or',
                clauses: [
                  {
                    type: 'and',
                    clauses: [
                      {
                        field: 'kommuneplanen',
                        operator: 'eq',
                        value: 'bya',
                      },
                      {
                        field: 'regulationTime',
                        operator: 'eq',
                        value: 'before',
                      },
                    ],
                  },
                  {
                    type: 'and',
                    clauses: [
                      {
                        field: 'kommuneplanen',
                        operator: 'eq',
                        value: 'pbya',
                      },
                      {
                        field: 'regulationTime',
                        operator: 'eq',
                        value: 'before',
                      },
                    ],
                  },
                ],
              },
              children: [
                {
                  id: 'linkText',
                  type: 'Text',
                  text: 'Du skal måle areal i BYA. Det betyr bebygd areal. <a href="https://dibk.no/bya">Hva er bebygd areal?</a>',
                },
              ],
            },
            {
              test: {
                type: 'or',
                clauses: [
                  {
                    type: 'and',
                    clauses: [
                      {
                        field: 'kommuneplanen',
                        operator: 'eq',
                        value: 'bya',
                      },
                      {
                        field: 'regulationTime',
                        operator: 'eq',
                        value: 'after',
                      },
                    ],
                  },
                  {
                    type: 'and',
                    clauses: [
                      {
                        field: 'kommuneplanen',
                        operator: 'eq',
                        value: 'pbya',
                      },
                      {
                        field: 'regulationTime',
                        operator: 'eq',
                        value: 'after',
                      },
                    ],
                  },
                ],
              },
              children: [
                {
                  id: 'linkText',
                  type: 'Text',
                  text: 'Du skal måle areal i BYA. Det betyr bebygd areal. <a href="https://dibk.no/bya_etter_2007">Hva er bebygd areal?</a>',
                },
              ],
            },
            {
              test: {
                type: 'or',
                clauses: [
                  {
                    type: 'and',
                    clauses: [
                      {
                        field: 'kommuneplanen',
                        operator: 'eq',
                        value: 'tbra',
                      },
                      {
                        field: 'regulationTime',
                        operator: 'eq',
                        value: 'before',
                      },
                    ],
                  },
                  {
                    type: 'and',
                    clauses: [
                      {
                        field: 'kommuneplanen',
                        operator: 'eq',
                        value: 'ptu',
                      },
                      {
                        field: 'regulationTime',
                        operator: 'eq',
                        value: 'before',
                      },
                    ],
                  },
                ],
              },
              children: [
                {
                  id: 'linkText',
                  type: 'Text',
                  text: 'Du skal måle areal i BRA. Det betyr bruksareal. <a href="https://dibk.no/t-bra">Hva er bruksareal?</a>',
                },
              ],
            },
            {
              test: {
                type: 'or',
                clauses: [
                  {
                    type: 'and',
                    clauses: [
                      {
                        field: 'kommuneplanen',
                        operator: 'eq',
                        value: 'tbra',
                      },
                      {
                        field: 'regulationTime',
                        operator: 'eq',
                        value: 'after',
                      },
                    ],
                  },
                  {
                    type: 'and',
                    clauses: [
                      {
                        field: 'kommuneplanen',
                        operator: 'eq',
                        value: 'ptu',
                      },
                      {
                        field: 'regulationTime',
                        operator: 'eq',
                        value: 'after',
                      },
                    ],
                  },
                ],
              },
              children: [
                {
                  id: 'linkText',
                  type: 'Text',
                  text: 'Du skal måle areal i BRA. Det betyr bruksareal. <a href="https://dibk.no/t-bra_etter_1997">Hva er bruksareal?</a>',
                },
              ],
            },
          ],
        },
        {
          type: 'Branch',
          id: 'kommueneplanen.test2',
          branches: [
            {
              test: {
                type: 'or',
                clauses: [
                  {
                    field: 'kommuneplanen',
                    operator: 'eq',
                    value: 'bya',
                  },
                  {
                    field: 'kommuneplanen',
                    operator: 'eq',
                    value: 'pbya',
                  },
                ],
              },
              children: [
                {
                  id: 'areaToBeDemolished',
                  type: 'Group',
                  heading: 'Hvor mye av eiendommen din er allerede bebygd?',
                  children: [
                    {
                      id: 'noResidenceToggle',
                      heading: 'Det er ingen bebyggelse på eiendommen',
                      property: 'noResidenceToggle',
                      type: 'Radio',
                      clear: [
                        'builtResidence',
                        'builtGarage',
                        'builtSmallBuilding',
                        'builtOther',
                      ],
                      options: [
                        {
                          id: 'noResidenceToggle.yes',
                          type: 'Answer',
                          heading: 'Det er ingen bebyggelse på eiendommen',
                          value: 'yes',
                        },
                      ],
                    },
                    {
                      type: 'Branch',
                      id: 'noResidenceToggle.test',
                      branches: [
                        {
                          test: {
                            field: 'noResidenceToggle.yes',
                            operator: 'neq',
                            value: true,
                          },
                          children: [
                            {
                              id: 'builtResidence',
                              property: 'builtResidence',
                              type: 'Number',
                              heading: 'Areal bolig målt i BYA',
                              unit: 'm<sup>2</sup>',
                            },
                            {
                              id: 'builtGarage',
                              property: 'builtGarage',
                              type: 'Number',
                              heading: 'Areal frittstående garasje målt i BYA',
                              unit: 'm<sup>2</sup>',
                            },
                            {
                              id: 'builtSmallBuilding',
                              property: 'builtSmallBuilding',
                              type: 'Number',
                              heading:
                                'Areal frittstående bod/uthus/dukkehus målt i BYA',
                              unit: 'm<sup>2</sup>',
                            },
                            {
                              id: 'builtOther',
                              property: 'builtOther',
                              type: 'Number',
                              heading:
                                'Areal for annen frittstående konstruksjon målt i BYA',
                              unit: 'm<sup>2</sup>',
                            },
                            {
                              type: 'Branch',
                              id: 'builtResidence.test',
                              branches: [
                                {
                                  test: {
                                    type: 'and',
                                    clauses: [
                                      {
                                        field: 'builtResidence',
                                        operator: 'required',
                                      },
                                      {
                                        field: 'builtGarage',
                                        operator: 'required',
                                      },
                                      {
                                        field: 'builtSmallBuilding',
                                        operator: 'required',
                                      },
                                      {
                                        field: 'builtOther',
                                        operator: 'required',
                                      },
                                    ],
                                  },
                                  children: [
                                    {
                                      id: 'alreadyBuilt',
                                      property: 'alreadyBuilt',
                                      type: 'Sum',
                                      values: [
                                        'builtResidence',
                                        'builtGarage',
                                        'builtSmallBuilding',
                                        'builtOther',
                                      ],
                                      operations: ['+'],
                                      minimum: 0,
                                      heading: 'Totalt bebygd areal',
                                      unit: 'm<sup>2</sup>',
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              test: {
                type: 'or',
                clauses: [
                  {
                    field: 'kommuneplanen',
                    operator: 'eq',
                    value: 'bra',
                  },
                  {
                    field: 'kommuneplanen',
                    operator: 'eq',
                    value: 'pbra',
                  },
                  {
                    field: 'kommuneplanen',
                    operator: 'eq',
                    value: 'tbra',
                  },
                  {
                    field: 'kommuneplanen',
                    operator: 'eq',
                    value: 'ptu',
                  },
                ],
              },
              children: [
                {
                  id: 'areaToBeDemolished',
                  type: 'Group',
                  heading: 'Hvor mye av eiendommen din er allerede bebygd?',
                  children: [
                    {
                      id: 'noResidenceToggle',
                      property: 'noResidenceToggle',
                      heading: 'Det er ingen bebyggelse på eiendommen',
                      type: 'Radio',
                      clear: [
                        'builtResidence',
                        'builtGarage',
                        'builtSmallBuilding',
                        'builtOther',
                      ],
                      options: [
                        {
                          id: 'noResidenceToggle.yes',
                          heading: 'Det er ingen bebyggelse på eiendommen',
                          type: 'Answer',
                          value: 'yes',
                        },
                      ],
                    },
                    {
                      type: 'Branch',
                      id: 'noResidenceToggle.test.yes',
                      branches: [
                        {
                          test: {
                            field: 'noResidenceToggle.yes',
                            operator: 'neq',
                            value: true,
                          },
                          children: [
                            {
                              id: 'builtResidence',
                              property: 'builtResidence',
                              type: 'Number',
                              heading: 'Areal bolig målt i BRA',
                              unit: 'm<sup>2</sup>',
                              minimum: 0,
                            },
                            {
                              id: 'builtGarage',
                              property: 'builtGarage',
                              type: 'Number',
                              heading: 'Areal frittstående garasje målt i BRA',
                              unit: 'm<sup>2</sup>',
                              minimum: 0,
                            },
                            {
                              id: 'builtSmallBuilding',
                              property: 'builtSmallBuilding',
                              type: 'Number',
                              heading:
                                'Areal frittstående bod/uthus/dukkehus målt i BRA',
                              unit: 'm<sup>2</sup>',
                              minimum: 0,
                            },
                            {
                              id: 'builtOther',
                              property: 'builtOther',
                              type: 'Number',
                              heading:
                                'Areal for annen frittstående konstruksjon målt i BRA',
                              unit: 'm<sup>2</sup>',
                              minimum: 0,
                            },
                            {
                              id: 'alreadyBuilt',
                              property: 'alreadyBuilt',
                              type: 'Sum',
                              operations: ['+'],
                              values: [
                                'builtResidence',
                                'builtGarage',
                                'builtSmallBuilding',
                                'builtOther',
                              ],
                              minimum: 0,
                              heading: 'Totalt bebygd areal',
                              unit: 'm<sup>2</sup>',
                            },
                            {
                              id: 'information',
                              type: 'Information',
                              text: 'Husk å fylle ut alle feltene!',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'Branch',
      id: 'regulation.test.isreguleringsplanen.kommuneplanen.utilizationArea.6',
      branches: [
        {
          test: {
            field: 'utilizationArea',
            operator: 'required',
          },
          children: [
            {
              id: 'Page3',
              type: 'Page',
              heading: 'Planlagte endringer på eiendommen',
              children: [
                {
                  type: 'Branch',
                  id: 'areaToBeDemolished.test',
                  branches: [
                    {
                      test: {
                        type: 'or',
                        clauses: [
                          {
                            field: 'kommuneplanen',
                            operator: 'eq',
                            value: 'bra',
                          },
                          {
                            field: 'kommuneplanen',
                            operator: 'eq',
                            value: 'pbra',
                          },
                        ],
                      },
                      children: [
                        {
                          id: 'linkText',
                          type: 'Text',
                          text: 'Du skal måle areal i BRA. Det betyr bruksareal. <a href="https://dibk.no/bruksareal">Hva er bruksareal?</a>',
                        },
                      ],
                    },
                    {
                      test: {
                        type: 'or',
                        clauses: [
                          {
                            type: 'and',
                            clauses: [
                              {
                                field: 'kommuneplanen',
                                operator: 'eq',
                                value: 'bya',
                              },
                              {
                                field: 'regulationTime',
                                operator: 'eq',
                                value: 'before',
                              },
                            ],
                          },
                          {
                            type: 'and',
                            clauses: [
                              {
                                field: 'kommuneplanen',
                                operator: 'eq',
                                value: 'pbya',
                              },
                              {
                                field: 'regulationTime',
                                operator: 'eq',
                                value: 'before',
                              },
                            ],
                          },
                        ],
                      },
                      children: [
                        {
                          id: 'linkText',
                          type: 'Text',
                          text: 'Du skal måle areal i BYA. Det betyr bebygd areal. <a href="https://dibk.no/bya">Hva er bebygd areal?</a>',
                        },
                      ],
                    },
                    {
                      test: {
                        type: 'or',
                        clauses: [
                          {
                            type: 'and',
                            clauses: [
                              {
                                field: 'kommuneplanen',
                                operator: 'eq',
                                value: 'bya',
                              },
                              {
                                field: 'regulationTime',
                                operator: 'eq',
                                value: 'after',
                              },
                            ],
                          },
                          {
                            type: 'and',
                            clauses: [
                              {
                                field: 'kommuneplanen',
                                operator: 'eq',
                                value: 'pbya',
                              },
                              {
                                field: 'regulationTime',
                                operator: 'eq',
                                value: 'after',
                              },
                            ],
                          },
                        ],
                      },
                      children: [
                        {
                          id: 'linkText',
                          type: 'Text',
                          text: 'Du skal måle areal i BYA. Det betyr bebygd areal. <a href="https://dibk.no/bya_etter_2007">Hva er bebygd areal?</a>',
                        },
                      ],
                    },
                    {
                      test: {
                        type: 'or',
                        clauses: [
                          {
                            type: 'and',
                            clauses: [
                              {
                                field: 'kommuneplanen',
                                operator: 'eq',
                                value: 'tbra',
                              },
                              {
                                field: 'regulationTime',
                                operator: 'eq',
                                value: 'before',
                              },
                            ],
                          },
                          {
                            type: 'and',
                            clauses: [
                              {
                                field: 'kommuneplanen',
                                operator: 'eq',
                                value: 'ptu',
                              },
                              {
                                field: 'regulationTime',
                                operator: 'eq',
                                value: 'before',
                              },
                            ],
                          },
                        ],
                      },
                      children: [
                        {
                          id: 'linkText',
                          type: 'Text',
                          text: 'Du skal måle areal i BRA. Det betyr bruksareal. <a href="https://dibk.no/t-bra">Hva er bruksareal?</a>',
                        },
                      ],
                    },
                    {
                      test: {
                        type: 'or',
                        clauses: [
                          {
                            type: 'and',
                            clauses: [
                              {
                                field: 'kommuneplanen',
                                operator: 'eq',
                                value: 'tbra',
                              },
                              {
                                field: 'regulationTime',
                                operator: 'eq',
                                value: 'after',
                              },
                            ],
                          },
                          {
                            type: 'and',
                            clauses: [
                              {
                                field: 'kommuneplanen',
                                operator: 'eq',
                                value: 'ptu',
                              },
                              {
                                field: 'regulationTime',
                                operator: 'eq',
                                value: 'after',
                              },
                            ],
                          },
                        ],
                      },
                      children: [
                        {
                          id: 'linkText',
                          type: 'Text',
                          text: 'Du skal måle areal i BRA. Det betyr bruksareal. <a href="https://dibk.no/t-bra_etter_1997">Hva er bruksareal?</a>',
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 'arealBebyggelseSomSkalRives',
                  property: 'arealBebyggelseSomSkalRives',
                  type: 'Number',
                  heading: 'Areal som skal rives',
                  unit: 'm<sup>2</sup>',
                  text: '<p>Hvis du ikke skal rive noe skriver du inn tallet 0.</p>',
                  hide: {
                    type: 'or',
                    clauses: [
                      {
                        field: 'noResidenceToggle.yes',
                        operator: 'eq',
                        value: true,
                      },
                      {
                        field: '$computed.areaBuilt',
                        operator: 'eq',
                        value: false,
                      },
                    ],
                  },
                  validator: {
                    test: {
                      field: 'arealBebyggelseSomSkalRives',
                      operator: 'lte',
                      value: {
                        fields: [
                          'builtResidence',
                          'builtGarage',
                          'builtSmallBuilding',
                          'builtOther',
                        ],
                      },
                    },
                    error:
                      'Areal som skal rives må være mindre enn bebygget areal',
                  },
                },
                {
                  id: 'newBuiltArea',
                  property: 'newBuiltArea',
                  type: 'Number',
                  heading: 'Hvor stort blir det nye du skal bygge?',
                  unit: 'm<sup>2</sup>',
                  minimum: 0,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'Branch',
      id: 'regulation.test.isreguleringsplanen.kommuneplanen.utilizationArea.7',
      branches: [
        {
          test: {
            field: 'utilizationArea',
            operator: 'required',
          },
          children: [
            {
              id: 'Page5',
              type: 'Page',
              heading: 'Krav om parkeringsplasser på terreng',
              lead: 'Parkeringsplasser som ligger på terreng (altså ikke i garasje) blir tatt med i grad av utnytting.<p>Du finner som regel kravene som gjelder for din eiendom i planbestemmelsen du har funnet fram tidligere: Enten reguleringsplanen eller kommuneplanen. Du kan også sjekke om kommunen har en parkeringsnorm.</p>',
              details:
                '<p>Det er varierende hvilke krav det er til minimum parkeringsplass på en eiendom. Det er derfor viktig at du sjekker bestemmelsene i din kommune nøye.</p><p>Noen kommuner har spesialbestemmelser om parkering som sier at ikke all parkering på terreng skal regnes med, eller at noe parkering bestandig må regnes med.</p><p>Du finner som regel kravene som gjelder for din eiendom i planbestemmelsen du har funnet fram tidligere: Enten reguleringsplanen eller kommuneplanen. Du kan også sjekke om kommunen har en parkeringsnorm som er gjeldende om du ikke finner noe her.</p><p>Det er veldig viktig at du leser dokumentene svært nøye. Kommunen din kan ha helt spesielle bestemmelser du selv må fortelle denne veiviseren om for å få riktig resultat.</p><p>Typisk kreves det to biloppstillingsplasser per boenhet for eneboliger og tomannsboliger. Disse er ofte definert til 18 m<sup>2</sup>. Det er dog så store variasjoner at du må sjekke nøye med din kommune før du bruker disse verdiene.</p>',
              children: [
                {
                  id: 'requiredParkingSpots',
                  property: 'requiredParkingSpots',
                  type: 'Number',
                  heading:
                    'Hvor mange parkeringsplasser kreves totalt på eiendommen?',
                  minimum: 0,
                  unit: 'stk',
                },
                {
                  type: 'Branch',
                  id: 'regulation.test.isreguleringsplanen.kommuneplanen.utilizationArea.7',
                  branches: [
                    {
                      test: {
                        type: 'and',
                        clauses: [
                          {
                            field: 'regulation',
                            operator: 'eq',
                            value: 'yes',
                          },
                          {
                            field: 'isreguleringsplanen',
                            operator: 'eq',
                            value: 'no',
                          },
                        ],
                      },
                      children: [
                        {
                          id: 'hasRequiredExtraTerrainParkingPlacesInRegPlan',
                          type: 'Radio',
                          property:
                            'hasRequiredExtraTerrainParkingPlacesInRegPlan',
                          heading:
                            'Har reguleringsplanen krav til minimum antall parkeringsplasser på terreng?',
                          options: [
                            {
                              id: 'hasRequiredExtraTerrainParkingPlacesInRegPlan.yes',
                              type: 'Answer',
                              heading: 'Ja',
                              value: 'yes',
                            },
                            {
                              id: 'hasRequiredExtraTerrainParkingPlacesInRegPlan.no',
                              type: 'Answer',
                              heading: 'Nei',
                              value: 'no',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      test: {
                        field: 'requiredParkingSpots',
                        operator: 'required',
                      },
                      children: [
                        {
                          id: 'hasRequiredExtraTerrainParkingPlacesInRegPlan',
                          property:
                            'hasRequiredExtraTerrainParkingPlacesInRegPlan',
                          type: 'Radio',
                          hide: {
                            field: 'requiredParkingSpots',
                            operator: 'eq',
                            value: 0,
                          },
                          heading:
                            'Har kommuneplanen krav til minimum antall parkeringsplasser på terreng?',
                          text: '<p>Hvis dette er et krav, skal det stå i enten kommuneplan eller i reguleringsplan.</p>',
                          options: [
                            {
                              id: 'hasRequiredExtraTerrainParkingPlacesInRegPlan.yes',
                              type: 'Answer',
                              heading: 'Ja',
                              value: 'yes',
                            },
                            {
                              id: 'hasRequiredExtraTerrainParkingPlacesInRegPlan.no',
                              type: 'Answer',
                              heading: 'Nei',
                              value: 'no',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'Branch',
                  id: 'regulation.test.isreguleringsplanen.kommuneplanen.utilizationArea.8',
                  branches: [
                    {
                      test: {
                        type: 'and',
                        clauses: [
                          {
                            field: 'requiredParkingSpots',
                            operator: 'neq',
                            value: 0,
                          },
                          {
                            field:
                              'hasRequiredExtraTerrainParkingPlacesInRegPlan',
                            operator: 'eq',
                            value: 'yes',
                          },
                        ],
                      },
                      children: [
                        {
                          id: 'requiredParkingSpotsTerrain',
                          property: 'requiredParkingSpotsTerrain',
                          type: 'Number',
                          heading:
                            'Hvor mange parkeringsplasser på terreng kreves?',
                          unit: 'stk',
                          minimum: 0,
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'Branch',
                  id: 'regulation.test.isreguleringsplanen.kommuneplanen.utilizationArea.9',
                  branches: [
                    {
                      test: {
                        type: 'or',
                        clauses: [
                          {
                            type: 'and',
                            clauses: [
                              {
                                field: 'requiredParkingSpots',
                                operator: 'required',
                              },
                              {
                                field: 'numberOfParkinglotsInCarport',
                                operator: 'required',
                              },
                              {
                                field: 'numberOfParkinglotsInCarport',
                                operator: 'lt',
                                value: {
                                  field: 'requiredParkingSpots',
                                },
                              },
                            ],
                          },
                          {
                            field:
                              'hasRequiredExtraTerrainParkingPlacesInRegPlan',
                            operator: 'eq',
                            value: 'yes',
                          },
                        ],
                      },
                      children: [
                        {
                          id: 'parkingPlaceArea',
                          property: 'parkingPlaceArea',
                          type: 'Number',
                          hide: {
                            field: 'requiredParkingSpots',
                            operator: 'eq',
                            value: 0,
                          },
                          heading: 'Hvor stor må hver parkeringsplass være?',
                          text: '<p>Sier parkeringsreglene for din eiendom noe om hvor stor hver parkeringsplass må være? Hvis det ikke står noe, er det 18 m2.</p>',
                          minimum: 0,
                          unit: 'm<sup>2</sup>',
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 'numberOfParkinglotsInCarport',
                  property: 'numberOfParkinglotsInCarport',
                  type: 'Number',
                  hide: {
                    field: 'requiredParkingSpots',
                    operator: 'eq',
                    value: 0,
                  },
                  heading: 'Antall parkeringsplasser i garasje/carport',
                  minimum: 0,
                  unit: 'stk',
                },
                {
                  type: 'Branch',
                  id: 'regulation.test.isreguleringsplanen.kommuneplanen.utilizationArea.10',
                  branches: [
                    {
                      test: {
                        type: 'and',
                        clauses: [
                          {
                            field:
                              'hasRequiredExtraTerrainParkingPlacesInRegPlan',
                            operator: 'eq',
                            value: 'no',
                          },
                          {
                            field: 'numberOfParkinglotsInCarport',
                            operator: 'lt',
                            value: {
                              field: 'requiredParkingSpots',
                            },
                          },
                          {
                            field: 'parkingPlaceArea',
                            operator: 'required',
                          },
                        ],
                      },
                      children: [
                        {
                          id: 'numberOfParkinglotsInCarportToFew',
                          heading: 'Du har for få parkeringsplasser',
                          type: 'ErrorOk',
                          children: [
                            {
                              id: 'numberOfParkinglotsInCarportToFewText',
                              type: 'Text',
                              warning: true,
                              text: 'Det totale parkeringskravet er ikke dekket. Det er lagt til manglende parkeringsplasser for å oppfylle minstekravet på din eiendom.',
                            },
                            {
                              id: 'parkingGroup',
                              type: 'Group',
                              children: [
                                {
                                  id: 'parkeringssum',
                                  property: 'parkeringssum',
                                  type: 'Sum',
                                  values: [
                                    'requiredParkingSpots',
                                    'numberOfParkinglotsInCarport',
                                    'parkingPlaceArea',
                                  ],
                                  operations: ['+', '-', '*'],
                                  minimum: 0,
                                  heading:
                                    'Nødvendig parkeringsareal på terreng:',
                                  unit: 'm<sup>2</sup>',
                                },
                                {
                                  id: 'ekstraparkeringssum',
                                  property: 'ekstraparkeringssum',
                                  type: 'Sum',
                                  values: [
                                    'requiredParkingSpots',
                                    'numberOfParkinglotsInCarport',
                                  ],
                                  operations: ['+', '-'],
                                  heading: 'Ekstra parkeringsplasser:',
                                  unit: 'stk',
                                  minimum: 0,
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'Branch',
                  id: 'regulation.test.isreguleringsplanen.kommuneplanen.utilizationArea.11',
                  branches: [
                    {
                      test: {
                        type: 'and',
                        clauses: [
                          {
                            field:
                              'hasRequiredExtraTerrainParkingPlacesInRegPlan',
                            operator: 'eq',
                            value: 'yes',
                          },
                          {
                            field: 'requiredParkingSpots',
                            operator: 'gt',
                            value: {
                              fields: [
                                'numberOfParkinglotsInCarport',
                                'requiredParkingSpotsTerrain',
                              ],
                            },
                          },
                        ],
                      },
                      children: [
                        {
                          id: 'numberOfParkinglotsInCarportToFew',
                          heading: 'Du har for få parkeringsplasser',
                          type: 'ErrorOk',
                          children: [
                            {
                              id: 'numberOfParkinglotsInCarportToFewText',
                              type: 'Text',
                              warning: true,
                              text: 'Det totale parkeringskravet er ikke dekket. Det er lagt til manglende parkeringsplasser for å oppfylle minstekravet på din eiendom.',
                            },
                            {
                              id: 'parkingGroup',
                              type: 'Group',
                              children: [
                                {
                                  id: 'parkeringssum',
                                  property: 'parkeringssum',
                                  type: 'Sum',
                                  values: [
                                    'requiredParkingSpots',
                                    'numberOfParkinglotsInCarport',
                                    'requiredParkingSpotsTerrain',
                                    'requiredParkingSpotsTerrain',
                                    'parkingPlaceArea',
                                  ],
                                  operations: ['+', '-', '-', '+', '*'],
                                  minimum: 0,
                                  heading:
                                    'Nødvendig parkeringsareal på terreng:',
                                  unit: 'm<sup>2</sup>',
                                },
                                {
                                  id: 'ekstraparkeringssum',
                                  property: 'ekstraparkeringssum',
                                  type: 'Sum',
                                  values: [
                                    'requiredParkingSpots',
                                    'numberOfParkinglotsInCarport',
                                    'requiredParkingSpotsTerrain',
                                  ],
                                  operations: ['+', '-', '-'],
                                  heading: 'Ekstra parkeringsplasser:',
                                  unit: 'stk',
                                  minimum: 0,
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'Branch',
                  id: 'regulation.test.isreguleringsplanen.kommuneplanen.utilizationArea.12',
                  branches: [
                    {
                      test: {
                        type: 'and',
                        clauses: [
                          {
                            field:
                              'hasRequiredExtraTerrainParkingPlacesInRegPlan',
                            operator: 'eq',
                            value: 'no',
                          },
                          {
                            field: 'requiredParkingSpots',
                            operator: 'required',
                          },
                          {
                            field: 'numberOfParkinglotsInCarport',
                            operator: 'required',
                          },
                          {
                            field: 'parkingPlaceArea',
                            operator: 'required',
                          },
                          {
                            field: 'numberOfParkinglotsInCarport',
                            operator: 'gte',
                            value: {
                              field: 'requiredParkingSpots',
                            },
                          },
                        ],
                      },
                      children: [
                        {
                          id: 'parkingGroup',
                          type: 'Group',
                          children: [
                            {
                              id: 'parkeringssum',
                              property: 'parkeringssum',
                              type: 'Sum',
                              values: [
                                'requiredParkingSpots',
                                'numberOfParkinglotsInCarport',
                              ],
                              operations: ['+', '-'],
                              minimum: 0,
                              heading:
                                'Du har nok parkeringsplasser i garasje/carport',
                              unit: 'm<sup>2</sup>',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'Branch',
                  id: 'regulation.test.isreguleringsplanen.kommuneplanen.utilizationArea.13',
                  branches: [
                    {
                      test: {
                        type: 'and',
                        clauses: [
                          {
                            field:
                              'hasRequiredExtraTerrainParkingPlacesInRegPlan',
                            operator: 'eq',
                            value: 'yes',
                          },
                          {
                            field: 'requiredParkingSpots',
                            operator: 'required',
                          },
                          {
                            field: 'numberOfParkinglotsInCarport',
                            operator: 'required',
                          },
                          {
                            field: 'parkingPlaceArea',
                            operator: 'required',
                          },
                          {
                            field: 'requiredParkingSpotsTerrain',
                            operator: 'required',
                          },
                          {
                            field: 'requiredParkingSpots',
                            operator: 'lte',
                            value: {
                              fields: [
                                'numberOfParkinglotsInCarport',
                                'requiredParkingSpotsTerrain',
                              ],
                            },
                          },
                        ],
                      },
                      children: [
                        {
                          id: 'parkingGroup',
                          type: 'Group',
                          hide: {
                            field: 'requiredParkingSpots',
                            operator: 'eq',
                            value: 0,
                          },
                          children: [
                            {
                              id: 'parkeringssum',
                              property: 'parkeringssum',
                              type: 'Sum',
                              values: [
                                'requiredParkingSpotsTerrain',
                                'parkingPlaceArea',
                              ],
                              operations: ['+', '*'],
                              minimum: 0,
                              heading: 'Nødvendig parkeringsareal på terreng:',
                              unit: 'm<sup>2</sup>',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'Branch',
      id: 'regulation.test.isreguleringsplanen.kommuneplanen.utilizationArea.14',
      branches: [
        {
          test: {
            type: 'and',
            clauses: [
              {
                field: 'utilizationArea',
                operator: 'required',
              },
              {
                type: 'or',
                clauses: [
                  {
                    field: 'kommuneplanen',
                    operator: 'eq',
                    value: 'pbya',
                  },
                  {
                    field: 'kommuneplanen',
                    operator: 'eq',
                    value: 'pbra',
                  },
                  {
                    field: 'kommuneplanen',
                    operator: 'eq',
                    value: 'ptu',
                  },
                ],
              },
            ],
          },
          children: [
            {
              id: 'hooray',
              type: 'Result',
              heading: {
                complete: 'Ditt resultat',
                incomplete: 'Du har ikke svart på alle spørsmålene',
                incompleteWithError: 'Du har ikke svart på alle spørsmålene',
                completeWithError: 'Du har ikke svart på alle spørsmålene',
              },
              lead: {
                complete:
                  'Husk at det er ditt ansvar at du oppgir riktig informasjon og bygger lovlig. Dersom bygningen er oppført ulovlig kan den i verste fall rives. Hvis du ønsker å endre noe, kan du klikke deg inn på hvert spørsmål i oppsummeringen nedenfor.',
                incomplete:
                  'Vi kan ikke gi deg et ordentlig resultat før du har svart på alle spørsmålene i veiviseren. Du kan se hvilke spørsmål du ikke har svart på i oppsummeringen under. Der kan du også klikke deg inn på hvert steg i veiviseren for å legge til og endre dine svar.',
                incompleteWithError:
                  'Vi kan ikke gi deg et ordentlig resultat før du har svart på alle spørsmålene i veiviseren. Du kan se hvilke spørsmål du ikke har svart på i oppsummeringen under. Der kan du også klikke deg inn på hvert steg i veiviseren for å legge til og endre dine svar.',
                completeWithError:
                  'Husk at det er ditt ansvar at du oppgir riktig informasjon og bygger lovlig. Dersom bygningen er oppført ulovlig kan den i verste fall rives. Hvis du ønsker å endre noe, kan du klikke deg inn på hvert spørsmål i oppsummeringen nedenfor.',
              },
              exporter: 'dataExport',
              children: [
                {
                  id: 'evalish',
                  final: true,
                  type: 'Evaluation',
                  testing: ['utnyttingsgrad', 'planArea2'],
                  sad: 'Du planlegger å bygge mer enn det som er tillatt på eiendommen din.',
                  happy:
                    'Du er innenfor det som er tillatt å bygge på eiendommen din.',
                  optional: true,
                },
                {
                  id: 'resultGroup',
                  type: 'Group',
                  children: [
                    {
                      id: 'planArea2',
                      type: 'Sum',
                      property: 'planArea2',
                      heading: 'Planlagt grad av utnytting i kvm',
                      values: [
                        'builtResidence',
                        'builtGarage',
                        'builtSmallBuilding',
                        'builtOther',
                        'arealBebyggelseSomSkalRives',
                        'newBuiltArea',
                        'parkeringssum',
                      ],
                      operations: ['+', '+', '+', '+', '-', '+', '+'],
                      unit: 'm<sup>2</sup>',
                      final: true,
                    },
                    {
                      id: 'utnyttingsgrad',
                      property: 'utnyttingsgrad',
                      type: 'Sum',
                      values: [
                        'propertyArea',
                        'nonSettlementArea',
                        'utilizationArea',
                        0.01,
                      ],
                      operations: ['+', '-', '*', '%'],
                      heading: 'Tillat grad av utnytting i kvm',
                      final: true,
                      unit: 'm<sup>2</sup>',
                    },
                    {
                      id: 'planArea',
                      property: 'planArea',
                      type: 'Sum',
                      values: [
                        'propertyArea',
                        'nonSettlementArea',
                        'planArea2',
                        100,
                      ],
                      operations: ['+', '-', '-/', '%'],
                      unit: '%',
                      heading: 'Planlagte grad av utnytting i %',
                      final: true,
                    },
                    {
                      id: 'utnyttingsgradProsent',
                      property: 'utnyttingsgradProsent',
                      type: 'Sum',
                      values: ['utilizationArea'],
                      operations: ['+'],
                      heading: 'Tillat grad av utnytting i %',
                      final: true,
                      unit: '%',
                    },
                    {
                      id: 'evalishLeft',
                      final: true,
                      type: 'Evaluation',
                      testing: ['utnyttingsgrad', 'planArea2'],
                      showValue: true,
                      sad: 'Areal du må redusere',
                      happy: 'Gjenstående areal',
                      optional: true,
                      unit: 'm<sup>2</sup>',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'Branch',
      id: 'regulation.test.isreguleringsplanen.kommuneplanen.utilizationArea.15',
      branches: [
        {
          test: {
            type: 'and',
            clauses: [
              {
                field: 'utilizationArea',
                operator: 'required',
              },
              {
                type: 'or',
                clauses: [
                  {
                    field: 'kommuneplanen',
                    operator: 'eq',
                    value: 'bya',
                  },
                  {
                    field: 'kommuneplanen',
                    operator: 'eq',
                    value: 'bra',
                  },
                  {
                    field: 'kommuneplanen',
                    operator: 'eq',
                    value: 'tbra',
                  },
                  {
                    field: 'kommuneplanen',
                    operator: 'eq',
                    value: 'tu',
                  },
                ],
              },
            ],
          },
          children: [
            {
              id: 'hooray',
              type: 'Result',

              heading: {
                complete: 'Ditt resultat',
                incomplete: 'Du har ikke svart på alle spørsmålene',
                incompleteWithError: 'Du har ikke svart på alle spørsmålene',
                completeWithError: 'Du har ikke svart på alle spørsmålene',
              },
              lead: {
                complete:
                  'Husk at det er ditt ansvar at du oppgir riktig informasjon og bygger lovlig. Dersom bygningen er oppført ulovlig kan den i verste fall rives. Hvis du ønsker å endre noe, kan du klikke deg inn på hvert spørsmål i oppsummeringen nedenfor.',
                incomplete:
                  'Vi kan ikke gi deg et ordentlig resultat før du har svart på alle spørsmålene i veiviseren. Du kan se hvilke spørsmål du ikke har svart på i oppsummeringen under. Der kan du også klikke deg inn på hvert steg i veiviseren for å legge til og endre dine svar.',
                incompleteWithError:
                  'Vi kan ikke gi deg et ordentlig resultat før du har svart på alle spørsmålene i veiviseren. Du kan se hvilke spørsmål du ikke har svart på i oppsummeringen under. Der kan du også klikke deg inn på hvert steg i veiviseren for å legge til og endre dine svar.',
                completeWithError:
                  'Husk at det er ditt ansvar at du oppgir riktig informasjon og bygger lovlig. Dersom bygningen er oppført ulovlig kan den i verste fall rives. Hvis du ønsker å endre noe, kan du klikke deg inn på hvert spørsmål i oppsummeringen nedenfor.',
              },
              exporter: 'dataExport',
              children: [
                {
                  id: 'evalish',
                  final: true,
                  type: 'Evaluation',
                  testing: ['utnyttingsgrad', 'bruktAreal'],
                  sad: 'Du planlegger å bygge mer enn det som er tillatt på eiendommen din.',
                  happy:
                    'Du er innenfor det som er tillatt å bygge på eiendommen din.',
                  optional: true,
                },
                {
                  id: 'resultGroup',
                  type: 'Group',
                  children: [
                    {
                      id: 'utnyttingsgrad',
                      property: 'utnyttingsgrad',
                      type: 'Sum',
                      values: ['utilizationArea'],
                      heading: 'Tillatt utnyttingsgrad',
                      final: true,
                      unit: 'm<sup>2</sup>',
                      operations: ['+'],
                    },
                    {
                      id: 'bruktAreal',
                      property: 'bruktAreal',
                      type: 'Sum',
                      values: [
                        'builtResidence',
                        'builtGarage',
                        'builtSmallBuilding',
                        'builtOther',
                        'arealBebyggelseSomSkalRives',
                        'newBuiltArea',
                        'parkeringssum',
                      ],
                      operations: ['+', '+', '+', '+', '-', '+', '+'],
                      heading: 'Planlagt utnyttingsgrad',
                      final: true,
                      unit: 'm<sup>2</sup>',
                    },
                    {
                      id: 'sisteTall',
                      type: 'Evaluation',
                      testing: ['utnyttingsgrad', 'bruktAreal'],
                      happy: 'Gjenstående areal',
                      sad: 'Areal du må redusere',
                      showValue: true,
                      optional: true,
                      final: true,
                      unit: 'm<sup>2</sup>',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default data;
