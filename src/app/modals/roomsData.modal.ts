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

export interface Reservation {
  id: number;
  roomId: number;
  startDate: string;
  endDate: string;
  guestName: string;
}

export const AmenitiesIconMapper: { [key: string]: string } = {
  "Wifi": "pi pi-wifi",
  "Kitchen": "pi pi-home",
  "Mini Bar": "pi pi-hourglass",
  "Air Conditioning": "pi pi-bolt\n",
  "Heating": "pi pi-hourglass",
  "Free Wi-Fi": "pi pi-wifi",
  "TV": "pi pi-desktop",
  "Hair dryer": "pi pi-user",
  "Iron": "pi pi-circle"
};
