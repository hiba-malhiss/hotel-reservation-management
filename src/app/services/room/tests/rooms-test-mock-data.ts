// this is according to the initial server mocked data, should mock getRoomsMockData
import * as moment from 'moment';

export const testRoomAvailabilityDates = [
  '2024-12-08',
  '2024-12-09',
  '2024-12-20',
  '2024-12-21',
  '2024-12-22',
  '2024-12-23',
  '2024-12-24',
  '2024-12-25',
  '2024-12-26',
  '2024-12-27'
].map(d => moment(d));

export const testRoom = {
  id: 2,
  roomNumber: '102',
  image: 'assets/images/room1.jpeg',
  type: 'Deluxe',
  price: 150,
  amenities: ['Free Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar'],
  nextAvailableDate: '2024-12-08',
  availableDates: [],
  availability: [
    { startDate: '2024-12-08', endDate: '2024-12-15' },
    { startDate: '2024-12-20', endDate: '2024-12-27' }
  ]
};

export const testSortedFilteredRooms = {
  rooms: [
    {
      id: 2,
      roomNumber: '102',
      image: 'assets/images/room1.jpeg',
      type: 'Deluxe',
      price: 150,
      amenities: ['Free Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar'],
      availability: [
        {
          startDate: '2024-12-08',
          endDate: '2024-12-15'
        },
        {
          startDate: '2024-12-20',
          endDate: '2024-12-27'
        }
      ],
      nextAvailableDate: '2024-12-08'
    },
    {
      id: 13,
      roomNumber: '113',
      image: 'assets/images/room1.jpeg',
      type: 'Deluxe',
      price: 150,
      amenities: ['Free Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar'],
      availability: [
        {
          startDate: '2024-01-02',
          endDate: '2024-01-09'
        },
        {
          startDate: '2024-01-10',
          endDate: '2024-01-17'
        }
      ],
      nextAvailableDate: '2024-01-02'
    },
    {
      id: 5,
      roomNumber: '105',
      image: 'assets/images/room2.jpeg',
      type: 'Deluxe',
      price: 160,
      amenities: ['Free Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar'],
      availability: [
        {
          startDate: '2024-12-15',
          endDate: '2024-12-22'
        },
        {
          startDate: '2024-12-27',
          endDate: '2024-12-31'
        }
      ],
      nextAvailableDate: '2024-12-15'
    }
  ],
  totalRecords: 3
};
