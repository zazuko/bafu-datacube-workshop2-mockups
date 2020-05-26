export default {
  sources: [
    {
      uri: 'stations.csv',
      label: 'stations.csv',
      columns: ['station_id', 'pollutant_id'],
    },
    {
      uri: 'pollutants.csv',
      label: 'pollutants.csv',
      columns: ['pollutant_id', 'pollutant_name_de', 'pollutant_name_en'],
    },
  ],

  tables: [
    {
      uri: 'Measurement',
      label: 'Measurement',
      color: 'rgb(165, 214, 167)',
      attributes: [
        { uri: 'year', label: 'Year' },
        { uri: 'measurement', label: 'Measurement' },
        { uri: 'station', label: 'Station' },
        { uri: 'pollutant', label: 'Pollutant' },
      ]
    },
    {
      uri: 'Station',
      label: 'Station',
      color: 'rgb(129, 212, 250)',
      attributes: [
        { uri: 'id', label: 'ID' },
      ]
    },
    {
      uri: 'Pollutant',
      label: 'Pollutant',
      color: 'rgb(239, 154, 154)',
      attributes: [
        { uri: 'id', label: 'ID' },
      ]
    },
  ],

  cube: {
    type: 'cube',
    label: [{ value: 'Quality of air in Switzerland', language: 'en' }],
    dimensions: [
      {
        type: 'dimension',
        label: [{ value: 'Station', language: 'en' }],
        uri: 'station',
        scaleOfMeasure: 'concept',
        color: 'rgb(165, 214, 167)',
      },
      {
        type: 'dimension',
        label: [{ value: 'Pollutant', language: 'en' }],
        uri: 'pollutant',
        scaleOfMeasure: 'concept',
        color: 'rgb(239, 154, 154)',
        isManaged: true,
      },
      {
        type: 'dimension',
        label: [{ value: 'Year', language: 'en' }],
        uri: 'year',
        scaleOfMeasure: 'temporal'
      },
      {
        type: 'dimension',
        label: [{ value: 'Measurement', language: 'en' }],
        description: [{ value: 'Measures things', language: 'en' }],
        uri: 'measurement',
        scaleOfMeasure: 'continuous',
      },
    ],
    data: [
      {
        station: { value: 'Basel' },
        pollutant: { value: 'Stickstoffdioxid' },
        year: { value: '2001' },
        measurement: { value: '12.1', unit: 'µg/m³' },
      },
      {
        station: { value: 'Basel' },
        pollutant: { value: 'Stickstoffdioxid' },
        year: { value: '2002' },
        measurement: { value: '24.2', unit: 'µg/m³' },
      },
      {
        station: { value: 'Basel' },
        pollutant: { value: 'Stickstoffdioxid' },
        year: { value: '2003' },
        measurement: { value: '5.1', unit: 'µg/m³' },
      },
      {
        station: { value: 'Aarau' },
        pollutant: { value: 'Stickstoffdioxid' },
        year: { value: '2001' },
        measurement: { value: '3.1', unit: 'µg/m³' },
      },
      {
        station: { value: 'Aarau' },
        pollutant: { value: 'Stickstoffdioxid' },
        year: { value: '2002' },
        measurement: { value: '15.1', unit: 'µg/m³' },
      },
      {
        station: { value: 'Aarau' },
        pollutant: { value: 'Stickstoffdioxid' },
        year: { value: '2003' },
        measurement: { value: '45.1', unit: 'µg/m³' },
      },
    ],
  },

  languages: [
    { label: 'en', code: 'en' },
    { label: 'fr', code: 'fr' },
    { label: 'de', code: 'de' },
    { label: 'it', code: 'it' },
  ],

  scaleOfMeasures: [
    { uri: 'continuous', label: 'Continuous', icon: 'ruler-horizontal' },
    { uri: 'concept', label: 'Concept', icon: 'list' },
    { uri: 'temporal', label: 'Temporal', icon: 'clock' }
  ]
}
