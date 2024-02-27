import { Room } from '../components/room-card/room.modal';

export interface RoomsData {
  rooms: Room[];
  totalRecords: number;
}

export interface RoomsFiltersMetaData {
  roomTypes: string[];
  amenities: string[];
}

export interface FilterAndSortPayload {
  sortBy?: {
    key: string;
    direction: string;
    title?: string;
  };
  type?: string[];
  amenities?: string[];
}

export interface Reservation {
  id: number;
  roomId: number;
  startDate: string;
  endDate: string;
  guestName: string;
}

export type UserReservation = Reservation & {
  roomNumber?: number;
  image?: string;
};

export interface UserReservationResponse {
  totalRecords: number;
  userReservations: UserReservation[];
}

// move to config file or AmenitiesIconMapper.ts file
export const AmenitiesIconMapper: { [key: string]: string } = {
  Kitchen: 'fas fa-utensils',
  'Mini Bar': 'fas fa-glass-martini-alt',
  'Air Conditioning': 'fas fa-snowflake',
  Heating: 'fas fa-thermometer-full',
  'Free Wi-Fi': 'fas fa-wifi',
  TV: 'fas fa-tv',
  'Hair dryer': 'fas fa-wind',
  Iron: 'fas fa-question'
};
