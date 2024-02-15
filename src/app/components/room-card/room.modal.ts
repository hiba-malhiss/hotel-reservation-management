import * as moment from 'moment';

export interface Room {
  id: number;
  roomNumber: number | string;
  type: string;
  price: number;
  amenities: string[];
  image: string;
  availability: { startDate: string; endDate: string }[];
  availableDates?: moment.Moment[];
  nextAvailableDate?: moment.Moment[];
}
