import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
// @ts-ignore
import mapboxgl from 'mapbox-gl';

const ACCESS_TOKEN = "'pk.eyJ1IjoiZHBpZXRyb2NhcmxvIiwiYSI6ImNram9tOGFuMTBvb3oyeXFsdW5uYmJjNGQifQ._zE6Mub0-Vpl7ggMj8xSUQ'";

export interface MarkerOptions {
  lng: number;
  lat: number;
  color?: string;
  info?: string;
}

export interface MapConfig {
  centerLongitude?: number;
  centerLatitude?: number;
  initialZoom?: number;
  markers?: MarkerOptions[];
  style?: 'street' | 'outdoors' | 'satellite'
}

const MapStyles = {
  street: 'mapbox://styles/mapbox/streets-v12',
  outdoors: 'mapbox://styles/mapbox/outdoors-v12',
  satellite: 'mapbox://styles/mapbox/satellite-v9',
};

@Component({
  selector: 'hrm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnChanges {
  @ViewChild('mapContainer', { static: true })
  mapContainer?: ElementRef;

  @Input()
  public mapConfig?: MapConfig;

  ngOnChanges(): void {
    this.setupMap();
  }

  private setupMap(): void {
    mapboxgl.accessToken = ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: this.mapConfig?.style
        ? MapStyles[this.mapConfig.style]
        : MapStyles['outdoors'],
      center: [
        this.mapConfig?.centerLongitude ?? 12,
        this.mapConfig?.centerLatitude ?? 20
      ], // starting position [lng, lat]
      zoom: this.mapConfig?.initialZoom ?? 9, // starting zoom
      interactive: true
    });

    // Add a fullscreen control to a map
    map.addControl(new mapboxgl.FullscreenControl());

    // Add markers
    if (this.mapConfig?.markers) {
      this.mapConfig.markers.forEach(marker => {
        new mapboxgl.Marker({
          color: marker.color ?? '#3FB1CE',
          draggable: false
        })
        .setLngLat([marker.lng, marker.lat])
        .addTo(map);
      });
    }

    // Add a NavigationControl control contains zoom buttons and a compass.
    const nav = new mapboxgl.NavigationControl({
      showCompass: true,
      showZoom: true,
      visualizePitch: false
    });
    map.addControl(nav, 'bottom-right');
  }
}
