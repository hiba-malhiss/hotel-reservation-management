import {
  FilterAndSortPayload,
  RoomsData,
  Reservation,
  UserReservation,
  UserReservationResponse
} from '../../modals/roomsData.modal';
import { getRoomsMockData } from './rooms-mock-data';
import { Room } from '../../components/room-card/room.modal';
import * as moment from 'moment';

export const DATE_FORMAT = 'YYYY-MM-DD';

export function getHotelRoomsWithFilterAndSort(
  page: number,
  pageSize: number,
  filters: FilterAndSortPayload
): RoomsData {
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
    sortedRooms = sortedRooms.filter(room =>
      amenities.every(amenity => room.amenities.includes(amenity))
    );
  }

  // Handle pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  let paginatedRooms = sortedRooms.slice(startIndex, endIndex);
  paginatedRooms = paginatedRooms.map(room => ({
    ...room,
    nextAvailableDate: getRoomNextAvailableDate(room)
  }));

  return {
    rooms: paginatedRooms as Room[],
    totalRecords: sortedRooms.length
  };
}

function getRoomNextAvailableDate(room: Room): string | null {
  let availableDates = getRoomAvailabilityDates(room);
  const minDate = moment.min(availableDates);
  return availableDates.length ? minDate.format(DATE_FORMAT) : null;
}

export function getHotelRoomsWithId(id: number): Room | null {
  let roomsData = getRoomsMockData();
  let room = roomsData.rooms.find((room: Room) => room.id == id) as Room;
  if (room) {
    room.availableDates = getRoomAvailabilityDates(room);
    const minDate = moment.min(room.availableDates);
    room.nextAvailableDate = room.availableDates.length
      ? minDate.format(DATE_FORMAT)
      : null;
  }
  return room || null;
}

// return array of dates: all availability dates - reserved dates
export function getRoomAvailabilityDates(room: Room): moment.Moment[] {
  let roomsData = getRoomsMockData();
  let reservations = roomsData.reservations.filter(
    (res: Reservation) => res.roomId == room.id
  );

  const reservationDates: string[] = getRangeDatesArray(reservations);
  const availabilityDates: string[] = getRangeDatesArray(
    room.availability || []
  );

  return availabilityDates
    .filter(date => !reservationDates.includes(date))
    .map(date => moment(date));
}

function getRangeDatesArray(
  dateRanges: { startDate: string; endDate: string }[]
): string[] {
  const dates: string[] = [];
  for (const dateRange of dateRanges) {
    const startDate = moment(dateRange.startDate);
    const endDate = moment(dateRange.endDate);

    while (startDate.isSameOrBefore(endDate, 'day')) {
      dates.push(startDate.format(DATE_FORMAT));
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
    const list =
      room.availableDates?.map(date => date.format(DATE_FORMAT)) || [];
    while (startDate.isSameOrBefore(endDate, 'day')) {
      if (!list.includes(startDate.format(DATE_FORMAT))) {
        return false;
      }
      startDate.add(1, 'day');
    }
    return true;
  }
  return false;
}

export function getUserReservations(
  userName: string,
  page: number,
  pageSize: number
): UserReservationResponse {
  const roomsData = getRoomsMockData();
  let userReservations = roomsData.reservations.filter(
    (reservation: Reservation) => reservation.guestName == userName
  );

  const filteredUserReservations = userReservations.map(
    (reservation: Reservation) => {
      const room = roomsData.rooms.find(
        (room: Room) => room.id === reservation.roomId
      );
      const currentDate = moment();
      const isPastReservation = moment(reservation.endDate).isBefore(
        currentDate,
        'day'
      );

      return {
        ...reservation,
        image: room.image,
        roomNumber: room.roomNumber,
        status: isPastReservation ? 'Completed' : 'In Progress'
      } as UserReservation;
    }
  );

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return {
    totalRecords: userReservations.length,
    userReservations: filteredUserReservations.slice(startIndex, endIndex)
  };
}
