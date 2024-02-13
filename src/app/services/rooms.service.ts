import { Injectable } from '@angular/core';
import { roomsMockData } from "./rooms-mock-data";
import { Room } from "../components/room-card/room.modal";
import { RoomsData } from "../modals/roomsData.modal";

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor() {
  }

  getHotelRooms(page: number, pageSize: number): Promise<RoomsData> {
    return new Promise((resolve, reject) => {

      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      setTimeout(() => {
        const paginatedRooms = roomsMockData.rooms.slice(startIndex, endIndex);
        resolve({
          rooms: paginatedRooms as Room[],
          totalRecords: roomsMockData.rooms.length
        });
      }, 800);
    });
  }
}
