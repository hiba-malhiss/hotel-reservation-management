import { Room } from "../components/room-card/room.modal";

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
