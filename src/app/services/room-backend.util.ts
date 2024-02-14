import { FilterAndSortPayload, RoomsData, Reservation } from "../modals/roomsData.modal";
import { roomsMockData } from "./rooms-mock-data";
import { Room } from "../components/room-card/room.modal";
import * as moment from "moment";

export function getHotelRoomsWithFilterAndSort(page: number, pageSize: number, filters: FilterAndSortPayload): RoomsData {
  const { sortBy, type, amenities } = filters || {};

  // Apply sorting
  let sortedRooms = [...roomsMockData.rooms];
  if (sortBy && sortBy.key && sortBy.direction) {
    sortedRooms.sort((a, b) => {
      if (sortBy.direction === 'asc') {
        // @ts-ignore
        return a[sortBy.key] - b[sortBy.key];
      } else {
        // @ts-ignore
        return b[sortBy.key] - a[sortBy.key];
      }
    });
  }

  // Apply type filter
  if (type && type.length > 0) {
    sortedRooms = sortedRooms.filter(room => type.includes(room.type));
  }

  // Apply amenities filter
  if (amenities && amenities.length > 0) {
    sortedRooms = sortedRooms.filter(room => amenities.every(amenity => room.amenities.includes(amenity)));
  }

  // Handle pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedRooms = sortedRooms.slice(startIndex, endIndex);

  return {
    rooms: paginatedRooms as Room[],
    totalRecords: sortedRooms.length
  }
}

export function getHotelRoomsWithId(id: number): Room | null {
  let room = roomsMockData.rooms.find(room => room.id == id) as Room;
  if (room) {
    let reservations = roomsMockData.reservations.filter(res => res.roomId == id);
    room.availableDates = getRoomAvailabilityDates(room, reservations);
  }
  return room || null;
}

// return array of dates: all availability dates - reserved dates
export function getRoomAvailabilityDates(room: Room, reservations: Reservation[]): moment.Moment[] {
  const availabilityDates: string[] = getRangeDatesArray(room.availability || []);
  const reservationDates: string[] = getRangeDatesArray(reservations);

  return availabilityDates.filter(date => !reservationDates.includes(date)).map(date => moment(date));
}

function getRangeDatesArray(dateRanges: { startDate: string, endDate: string }[]): string[] {
  const dates: string[] = [];
  for (const dateRange of dateRanges) {
    const startDate = moment(dateRange.startDate);
    const endDate = moment(dateRange.endDate);

    while (startDate.isSameOrBefore(endDate, 'day')) {
      dates.push(startDate.format('YYYY-MM-DD'));
      startDate.add(1, 'day');
    }
  }
  return dates;
}