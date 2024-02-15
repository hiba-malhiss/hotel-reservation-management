import { Injectable } from '@angular/core';
import { getAttractionsMockData } from "./attractions-mock-data";
import { Attraction } from "../../modals/attractions.modal";

@Injectable({
  providedIn: 'root'
})
export class AttractionsService {

  constructor() { }

  getHotelAttractionsMetadata(): Promise<Attraction[]> {
    return new Promise((resolve, reject) => {
      let data = getAttractionsMockData()

      setTimeout(() => {
        resolve(data);
      }, 800);
    });
  }
}
