import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
// @ts-ignore
import * as mapboxgl from 'mapbox-gl';

export interface MarkerOptions {
  lng: number;
  lat: number;
  color?: string;
  popupInfo?: string;
  element?: HTMLElement;
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
    mapboxgl.accessToken = 'pk.eyJ1IjoiZHBpZXRyb2NhcmxvIiwiYSI6ImNram9tOGFuMTBvb3oyeXFsdW5uYmJjNGQifQ._zE6Mub0-Vpl7ggMj8xSUQ';
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: this.mapConfig?.style
        ? MapStyles[this.mapConfig.style]
        : MapStyles['street'],
      center: [
        this.mapConfig?.centerLongitude ?? 12,
        this.mapConfig?.centerLatitude ?? 20
      ], // starting position [lng, lat]
      zoom: this.mapConfig?.initialZoom ?? 12, // starting zoom
      interactive: true
    });

    // Add a fullscreen control to a map
    map.addControl(new mapboxgl.FullscreenControl());

    // Add markers
    this.addMarkers(map)

    // Add a NavigationControl control contains zoom buttons and a compass.
    const nav = new mapboxgl.NavigationControl({
      showCompass: true,
      showZoom: true,
      visualizePitch: false
    });
    map.addControl(nav, 'bottom-right');
  }

  addMarkers(map: any) {
    if (this.mapConfig?.markers) {
      const popup = new mapboxgl.Popup({ offset: 25 });

      this.mapConfig.markers.forEach(marker => {
        let markerObj = new mapboxgl.Marker({
          color: marker.color ?? '#3FB1CE',
          element: marker.element,
          draggable: false
        })
        .setLngLat([marker.lng, marker.lat])
        .addTo(map);

        if (marker.popupInfo) {
          markerObj.getElement().addEventListener('mouseenter', () => {
            popup.setLngLat([marker.lng, marker.lat])
            .setHTML(
              '<div class="Map-markerInfo">' + marker.popupInfo + '</div>' +
              '<div class="Map-markerInfo">[' + marker.lng + ',' + marker.lat + ']</div>'
            )
            .addTo(map);
          });

          markerObj.getElement().addEventListener('mouseleave', () => {
            popup.remove();
          });
        }
      });
    }
  }
}
