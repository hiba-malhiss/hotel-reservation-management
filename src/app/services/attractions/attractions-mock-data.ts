const attractionsData = [
  {
    id: 1,
    name: 'SWIMMING POOL',
    location: { lat: 40.785091, lng: -73.968285 },
    connections: [2, 3, 4, 5]
  },
  {
    id: 2,
    name: 'SAUNA',
    location: { lat: 40.779437, lng: -73.963244 },
    connections: [1, 3, 5]
  },
  {
    id: 3,
    name: 'BICYCLES YARD',
    location: { lat: 40.758896, lng: -73.98513 },
    connections: [1, 2, 5]
  },
  {
    id: 4,
    name: 'Adventure activities',
    location: { lat: 40.748817, lng: -73.985428 },
    connections: [1, 6, 5]
  },
  {
    id: 5,
    name: 'Movie nights',
    location: { lat: 40.689247, lng: -74.044502 },
    connections: [1, 2, 3, 4]
  },
  {
    id: 6,
    name: 'Bar',
    location: { lat: 40.689247, lng: -74.054502 },
    connections: [4]
  }
];

export function getAttractionsMockData() {
  return attractionsData;
}
