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
      uri: 'station',
      label: 'Station',
      color: 'rgb(165, 214, 167)',
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
        scaleOfMeasure: 'concept'
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
        uri: 'measurement',
        scaleOfMeasure: 'continuous'
      },
    ],
    data: [
      {
        station: { value: 'Basel' },
        year: { value: '2001' },
        measurement: { value: '12.1', unit: 'µg/m³' },
      },
      {
        station: { value: 'Basel' },
        year: { value: '2002' },
        measurement: { value: '24.2', unit: 'µg/m³' },
      },
      {
        station: { value: 'Basel' },
        year: { value: '2003' },
        measurement: { value: '5.1', unit: 'µg/m³' },
      }
    ],
  },

  languages: [
    { label: 'en', code: 'en' },
    { label: 'fr', code: 'fr' },
    { label: 'de', code: 'de' },
    { label: 'it', code: 'it' },
  ],
}
