import { Injectable } from '@angular/core';
import { roomsFilterMetaMockData } from "./rooms-mock-data";
import { FilterAndSortPayload, RoomsData, RoomsFiltersMetaData } from "../modals/roomsData.modal";
import { getHotelRoomsWithFilterAndSort } from "./room-backend.util";

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor() {
  }

  getHotelRooms(page: number, pageSize: number, filters: FilterAndSortPayload): Promise<RoomsData> {
    return new Promise((resolve, reject) => {
      let data = getHotelRoomsWithFilterAndSort(page, pageSize, filters)

      setTimeout(() => {
        resolve(data);
      }, 800);
    });
  }


  getHotelRoomsFiltersMetadata(): Promise<RoomsFiltersMetaData> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(roomsFilterMetaMockData);
      }, 500);
    });
  }
}
