export default {
  sources: [
    {
      uri: 'stations.csv',
      label: 'stations.csv',
      columns: [
        { uri: 'station_id', data: ['1', '2', '3'] },
        { uri: 'station_name', data: ['Aarau', 'Basel', 'Zurich'] },
        { uri: 'station_measuring_network', data: ['AG', 'BA', 'ZU'] },
        { uri: 'station_canton', data: ['AG', 'BA', 'ZU'] },
        { uri: 'station_y', data: ['646350', '646381', '646811'] },
        { uri: 'station_x', data: ['249400', '249313', '249119'] },
        { uri: 'station_altitude', data: ['383', '649', '700'] },
        { uri: 'area_type_de', data: ['Städtisch'] },
        { uri: 'pollutant_id', data: ['NO2', 'OX4'] },
        { uri: 'station_type_de', data: ['Verkehr'] },
        { uri: 'aggregation_name_de', data: ['95%-Wert der 1/2h-Mittel'] },
        { uri: 'limitvalue', data: ['100'] },
        { uri: 'year', data: ['1986', '2000', '2001'] },
        { uri: 'value', data: ['80,1', '51,3', '62,2'] },
        { uri: 'unit_name_de', data: ['µg/m3'] },
        { uri: 'value_remark', data: ['A textual remark'] },
      ],
    },
    {
      uri: 'pollutants.csv',
      label: 'pollutants.csv',
      columns: [
        { uri: 'pollutant_id', data: ['NO2', 'OX4'] },
        { uri: 'pollutant_name_de', data: ['Stickstoffdioxid'] },
        { uri: 'pollutant_name_en', data: ['Stickstoffdioxid'] },
        { uri: 'pollutant_description_de', data: [] },
        { uri: 'pollutant_description_en', data: [] },
      ],
    },
  ],

  tables: [
    {
      source: 'stations.csv',
      uri: 'Measurement',
      label: 'Measurement',
      color: 'rgb(165, 214, 167)',
      attributes: [
        { uri: 'year', label: 'Year', column: 'year' },
        { uri: 'measurement', label: 'Measurement', column: 'value' },
        { uri: 'value_remark', label: 'Remark', column: 'value_remark' },
        { uri: 'station', label: 'Station', column: 'station_id' },
        { uri: 'pollutant', label: 'Pollutant', column: 'pollutant_id' },
      ]
    },
    {
      source: 'stations.csv',
      uri: 'Station',
      label: 'Station',
      color: 'rgb(129, 212, 250)',
      attributes: [
        { uri: 'id', label: 'Identifier', column: 'station_id' },
        { uri: 'label', label: 'Label', column: 'station_name_de' },
      ]
    },
    {
      source: 'pollutants.csv',
      uri: 'Pollutant',
      label: 'Pollutant',
      color: 'rgb(239, 154, 154)',
      attributes: [
        { uri: 'id', label: 'Identifier', column: 'pollutant_id' },
        { uri: 'label', label: 'Label', column: 'pollutant_name_de' },
      ]
    },
  ],

  cube: {
    type: 'cube',
    label: [{ value: 'Quality of air in Switzerland', language: 'en' }],
    dimensions: [
      {
        type: 'dimension',
        label: [{ value: 'Station', language: 'en' }, { value: 'Station', language: 'de' }],
        description: [],
        uri: 'station',
        scaleOfMeasure: 'nominal',
        color: 'rgb(129, 212, 250)',
      },
      {
        type: 'dimension',
        label: [{ value: 'Pollutant', language: 'en' }],
        description: [],
        uri: 'pollutant',
        scaleOfMeasure: 'nominal',
        color: 'rgb(239, 154, 154)',
        isManaged: true,
      },
      {
        type: 'dimension',
        label: [{ value: 'Year', language: 'en' }],
        description: [],
        uri: 'year',
        scaleOfMeasure: 'temporal'
      },
      {
        type: 'dimension',
        label: [{ value: 'Measurement', language: 'en' }],
        description: [{ value: 'Measures things', language: 'en' }, { value: 'Mesure des trucs', language: 'fr' }],
        uri: 'measurement',
        scaleOfMeasure: 'continuous',
      },
      {
        type: 'dimension',
        label: [{ value: 'Remark', language: 'en' }],
        description: [],
        uri: 'remark',
        scaleOfMeasure: 'none',
      },
    ],
    data: [
      {
        station: { value: 'Basel' },
        pollutant: { value: 'Stickstoffdioxid' },
        year: { value: '2001' },
        measurement: { value: '12.1', unit: 'µg/m³' },
        remark: { value: '' },
      },
      {
        station: { value: 'Basel' },
        pollutant: { value: 'Stickstoffdioxid' },
        year: { value: '2002' },
        measurement: { value: '24.2', unit: 'µg/m³' },
        remark: { value: 'A textual remark' },
      },
      {
        station: { value: 'Basel' },
        pollutant: { value: 'Stickstoffdioxid' },
        year: { value: '2003' },
        measurement: { value: '5.1', unit: 'µg/m³' },
        remark: { value: '' },
      },
      {
        station: { value: 'Aarau' },
        pollutant: { value: 'Stickstoffdioxid' },
        year: { value: '2001' },
        measurement: { value: '3.1', unit: 'µg/m³' },
        remark: { value: '' },
      },
      {
        station: { value: 'Aarau' },
        pollutant: { value: 'Stickstoffdioxid' },
        year: { value: '2002' },
        measurement: { value: '15.1', unit: 'µg/m³' },
        remark: { value: '' },
      },
      {
        station: { value: 'Aarau' },
        pollutant: { value: 'Stickstoffdioxid' },
        year: { value: '2003' },
        measurement: { value: '45.1', unit: 'µg/m³' },
        remark: { value: '' },
      },
    ],
    resources: {
      Basel: {
        type: 'resource',
        label: [{ value: 'Basel', language: 'en' }, { value: 'Basel', language: 'de' }],
        id: [{ value: 1 }],
      },
      Aarau: {
        type: 'resource',
        label: [{ value: 'Aarau', language: 'en' }, { value: 'Aarau', language: 'de' }],
        id: [{ value: 2 }],
      },
      Stickstoffdioxid: {
        type: 'resource',
        label: [{ value: 'Nitrogen dioxide', language: 'en' }, { value: 'Stickstoffdioxid', language: 'de' }],
        id: [{ value: 13344 }],
      },
    }
  },

  languages: [
    { label: 'en', code: 'en' },
    { label: 'fr', code: 'fr' },
    { label: 'de', code: 'de' },
    { label: 'it', code: 'it' },
  ],

  scaleOfMeasures: [
    { uri: 'none', label: 'None', icon: 'minus' },
    { uri: 'continuous', label: 'Continuous', icon: 'ruler-horizontal' },
    { uri: 'nominal', label: 'Nominal', icon: 'list' },
    { uri: 'temporal', label: 'Temporal', icon: 'clock' },
  ]
}
