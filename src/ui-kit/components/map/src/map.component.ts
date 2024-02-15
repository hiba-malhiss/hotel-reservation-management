import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
// @ts-ignore
import * as mapboxgl from 'mapbox-gl';
import { MapConfig, MapStyles, MarkerOptions } from "./map.modal";

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
    // todo: move
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
      zoom: this.mapConfig?.initialZoom ?? 11, // starting zoom
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
    map.on('load', () => {
      if (this.mapConfig?.markers) {
        const popup = new mapboxgl.Popup({ offset: 25 });

        this.mapConfig?.markers.forEach(marker => {
          let markerObj = new mapboxgl.Marker({
            color: marker.color ?? '#3FB1CE',
            element: marker.element,
            draggable: false
          })
          .setLngLat([marker.lng, marker.lat])
          .addTo(map);

          if (marker.popupInfo) {
            this.addMarkerPopup(markerObj, marker, map, popup);
          }

          if (marker.connections) {
            this.addMarkerConnections(marker, map);
          }
        });
      }
    });
  }

  addMarkerPopup(markerObj: any, marker: MarkerOptions, map: any, popup: any) {
    markerObj.getElement().addEventListener('mouseenter', () => {
      popup.setLngLat([marker.lng, marker.lat])
      .setHTML(
        '<div class="Map-markerInfo">' + marker.popupInfo?.toLowerCase() + '</div>' +
        '<div class="Map-markerInfo">[' + marker.lng + ',' + marker.lat + ']</div>'
      )
      .addTo(map);
    });

    markerObj.getElement().addEventListener('mouseleave', () => {
      popup.remove();
    });
  }

  addMarkerConnections(marker: MarkerOptions, map: any) {
    marker?.connections?.forEach(connectionId => {
      const connectedMarker = this.mapConfig?.markers?.find(m => m.id === connectionId);
      const id = connectionId + '' + (marker?.id||'')
      if (connectedMarker) {
        const lineLayer = {
          id,
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: [
                  [marker.lng, marker.lat],
                  [connectedMarker.lng, connectedMarker.lat]
                ]
              }
            }
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#a5a5a5',
            'line-width': 2
          }
        };

        map.addLayer(lineLayer);
      }
    });
  }
}
