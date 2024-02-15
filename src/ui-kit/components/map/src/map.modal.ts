export interface MarkerOptions {
  id?: number;
  lng: number;
  lat: number;
  color?: string;
  popupInfo?: string;
  connections?: number[]; //id's
  element?: HTMLElement;
}

export interface MapConfig {
  centerLongitude?: number;
  centerLatitude?: number;
  initialZoom?: number;
  markers?: MarkerOptions[];
  style?: 'street' | 'outdoors' | 'satellite';
}

export const MapStyles = {
  street: 'mapbox://styles/mapbox/streets-v12',
  outdoors: 'mapbox://styles/mapbox/outdoors-v12',
  satellite: 'mapbox://styles/mapbox/satellite-v9'
};
