export interface Room {
  id: number;
  roomNumber: number;
  type: 'Standard' | 'Deluxe';
  price: number;
  amenities: string[];
  image: string;
  availability: { startDate: string; endDate: string }[];
}
