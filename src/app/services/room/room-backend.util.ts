import { FilterAndSortPayload, RoomsData, Reservation } from "../../modals/roomsData.modal";
import { getRoomsMockData } from "./rooms-mock-data";
import { Room } from "../../components/room-card/room.modal";
import * as moment from "moment";

export function getHotelRoomsWithFilterAndSort(page: number, pageSize: number, filters: FilterAndSortPayload): RoomsData {
  const { sortBy, type, amenities } = filters || {};

  // Apply sorting
  let sortedRooms = [...getRoomsMockData().rooms];
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
  let roomsData = getRoomsMockData()
  let room = roomsData.rooms.find((room: Room) => room.id == id) as Room;
  if (room) {
    let reservations = roomsData.reservations.filter((res: Reservation) => res.roomId == id);
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

export function checkIfValidReservation(reservation: Reservation): boolean {
  const room = getHotelRoomsWithId(reservation.roomId);
  if (room) {
    const startDate = moment(reservation.startDate);
    const endDate = moment(reservation.endDate);
    const list = room.availableDates?.map(date => date.format('YYYY-MM-DD')) || [];
    while (startDate.isSameOrBefore(endDate, 'day')) {
      if(!list.includes(startDate.format('YYYY-MM-DD'))){
        return false;
      }
      startDate.add(1, 'day');
    }
    return true;
  }
  return false;
}