import { TestBed } from '@angular/core/testing';

import { RoomsService } from '../rooms.service';
import { getRoomAvailabilityDates } from '../room-backend.util';
import {
  testRoom,
  testRoomAvailabilityDates,
  testSortedFilteredRooms
} from './rooms-test-mock-data';

describe('RoomsService', () => {
  let service: RoomsService;
  let roomService: RoomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomsService);
    roomService = new RoomsService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getHotelRoomById', () => {
    it('should return a room by id and return the correct available dates', async () => {
      const room = await roomService.getHotelRoomById(testRoom.id);
      expect(room?.availableDates).toEqual(getRoomAvailabilityDates(room!));
      expect(room?.nextAvailableDate).toEqual(
        testRoomAvailabilityDates[0].format('YYYY-MM-DD')
      );
      room!.availableDates = [];
      expect(room).toEqual(testRoom);
    });

    it('should return null for non-existent room id', async () => {
      const roomId = 999;
      const room = await roomService.getHotelRoomById(roomId);

      expect(room).toBeNull();
    });
  });

  describe('getHotelRooms', () => {
    it('should return the second room', async () => {
      const page = 2;
      const pageSize = 1;
      const response = await roomService.getHotelRooms(page, pageSize, {});
      response.rooms[0].availableDates = []; // skip availableDates texting - tested before (moment list)
      expect(response).toEqual({ totalRecords: 16, rooms: [testRoom] });
    });

    it('should return correct number of rooms based on filters', async () => {
      const response = await roomService.getHotelRooms(1, 10, {
        amenities: ['Hair dryer']
      });
      expect(response.rooms.length).toEqual(1);

      const response2 = await roomService.getHotelRooms(1, 10, {
        amenities: ['TV', 'Air Conditioning'],
        type: ['Deluxe']
      });
      expect(response2.rooms.length).toEqual(3);
    });

    it('should return correct rooms based on filters and sort', async () => {
      const filters = {
        sortBy: { key: 'price', direction: 'asc' },
        type: ['Deluxe'],
        amenities: ['TV', 'Air Conditioning']
      };

      const response = await roomService.getHotelRooms(1, 10, filters);
      expect(response).toEqual(testSortedFilteredRooms);
    });
  });
});
