import { Injectable } from '@angular/core';
import { roomsFilterMetaMockData } from './rooms-mock-data';
import {
  FilterAndSortPayload,
  RoomsData,
  RoomsFiltersMetaData
} from '../../modals/roomsData.modal';
import {
  getHotelRoomsWithFilterAndSort,
  getHotelRoomsWithId
} from './room-backend.util';
import { Room } from '../../components/room-card/room.modal';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  constructor() {}

  getHotelRoomById(roomId: number): Promise<Room | null> {
    return new Promise((resolve, reject) => {
      let data = getHotelRoomsWithId(roomId);

      setTimeout(() => {
        resolve(data);
      }, 800);
    });
  }

  getHotelRooms(
    page: number,
    pageSize: number,
    filters: FilterAndSortPayload
  ): Promise<RoomsData> {
    return new Promise((resolve, reject) => {
      let data = getHotelRoomsWithFilterAndSort(page, pageSize, filters);

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
