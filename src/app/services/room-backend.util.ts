import { FilterAndSortPayload, RoomsData } from "../modals/roomsData.modal";
import { roomsMockData } from "./rooms-mock-data";
import { Room } from "../components/room-card/room.modal";

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