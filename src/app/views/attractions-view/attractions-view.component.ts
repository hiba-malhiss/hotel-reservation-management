import { Component, OnInit } from '@angular/core';
import { AttractionsService } from "../../services/attractions.service";
import { Attraction } from "../../modals/attractions.modal";
import { AttractionsIconMapper } from "./atraction-icon-mapper";
import { MapConfig } from "../../../ui-kit/components/map/map.modals";

@Component({
  selector: 'app-attractions-view',
  templateUrl: './attractions-view.component.html',
  styleUrls: ['./attractions-view.component.scss']
})
export class AttractionsViewComponent implements OnInit {
  isMapConfigsInitialized = false;
  mapConfigs: MapConfig = { markers: [] };

  constructor(private attractionsService: AttractionsService) {
  }

  ngOnInit(): void {
    this.attractionsService.getHotelAttractionsMetadata().then((attractions: Attraction[]) => {
      attractions.map((attraction) => this.mapConfigs?.markers?.push({
        lng: attraction.location.lng,
        lat: attraction.location.lat,
        popupInfo: attraction.name,
        connections: attraction.connections,
        id: attraction.id,
        element: this.getAttractionsMarkerElement(attraction.name)
      }))

      // get center location - should be returned from the backend
      this.mapConfigs.centerLatitude = attractions.reduce((sum, attraction) => sum + attraction.location.lat, 0) / attractions.length;
      this.mapConfigs.centerLongitude = attractions.reduce((sum, attraction) => sum + attraction.location.lng, 0) / attractions.length;
      this.isMapConfigsInitialized = true;
    })
  }

  getAttractionsMarkerElement(attractionName: string) {
    const icon = AttractionsIconMapper[attractionName];
    const markerElement = document.createElement('div');
    markerElement.className = "Map-marker " + icon;
    return markerElement
  }
}
