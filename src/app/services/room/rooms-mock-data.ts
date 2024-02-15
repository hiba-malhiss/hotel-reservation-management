import { Reservation } from '../../modals/roomsData.modal';

const roomsMockData = {
  rooms: [
    {
      id: 1,
      roomNumber: '101',
      image: 'assets/images/room2.jpeg',
      type: 'Standard',
      price: 120,
      amenities: [
        'Wifi',
        'Kitchen',
        'Mini Bar',
        'Air Conditioning',
        'Heating',
        'Free Wi-Fi',
        'TV',
        'Hair dryer',
        'Iron'
      ],
      availability: [
        { startDate: '2024-12-05', endDate: '2024-12-12' },
        { startDate: '2024-12-18', endDate: '2024-12-25' }
      ]
    },
    {
      id: 2,
      roomNumber: '102',
      image: 'assets/images/room1.jpeg',
      type: 'Deluxe',
      price: 150,
      amenities: ['Free Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar'],
      availability: [
        { startDate: '2024-12-08', endDate: '2024-12-15' },
        { startDate: '2024-12-20', endDate: '2024-12-27' }
      ]
    },
    {
      id: 3,
      roomNumber: '103',
      image: 'assets/images/room2.jpeg',
      type: 'Standard',
      price: 130,
      amenities: ['Free Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar'],
      availability: [
        { startDate: '2024-12-10', endDate: '2024-12-17' },
        { startDate: '2024-12-22', endDate: '2024-12-29' }
      ]
    },
    {
      id: 4,
      roomNumber: '104',
      image: 'assets/images/room1.jpeg',
      type: 'Suite',
      price: 200,
      amenities: ['Free Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar'],
      availability: [
        { startDate: '2024-12-12', endDate: '2024-12-19' },
        { startDate: '2024-12-24', endDate: '2024-12-31' }
      ]
    },
    {
      id: 5,
      roomNumber: '105',
      image: 'assets/images/room2.jpeg',
      type: 'Deluxe',
      price: 160,
      amenities: ['Free Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar'],
      availability: [
        { startDate: '2024-12-15', endDate: '2024-12-22' },
        { startDate: '2024-12-27', endDate: '2024-12-31' }
      ]
    },
    {
      id: 6,
      roomNumber: '106',
      image: 'assets/images/room1.jpeg',
      type: 'Standard',
      price: 140,
      amenities: ['TV'],
      availability: [
        { startDate: '2024-12-18', endDate: '2024-12-25' },
        { startDate: '2024-12-20', endDate: '2024-12-27' }
      ]
    },
    {
      id: 7,
      roomNumber: '107',
      image: 'assets/images/room1.jpeg',
      type: 'Standard',
      price: 120,
      amenities: ['TV', 'Mini Bar'],
      availability: [
        { startDate: '2024-12-21', endDate: '2024-12-28' },
        { startDate: '2024-12-23', endDate: '2024-12-30' }
      ]
    },
    {
      id: 8,
      roomNumber: '108',
      image: 'assets/images/room1.jpeg',
      type: 'Deluxe',
      price: 170,
      amenities: ['Free Wi-Fi', 'Air Conditioning', 'Mini Bar'],
      availability: [
        { startDate: '2024-12-24', endDate: '2024-12-31' },
        { startDate: '2024-12-26', endDate: '2024-12-31' }
      ]
    },
    {
      id: 9,
      roomNumber: '109',
      image: 'assets/images/room2.jpeg',
      type: 'Standard',
      price: 130,
      amenities: ['Free Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar'],
      availability: [
        { startDate: '2024-12-27', endDate: '2024-12-31' },
        { startDate: '2024-12-28', endDate: '2024-12-31' }
      ]
    },
    {
      id: 10,
      roomNumber: '110',
      image: 'assets/images/room1.jpeg',
      type: 'Suite',
      price: 220,
      amenities: ['Free Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar'],
      availability: [
        { startDate: '2024-12-30', endDate: '2024-12-31' },
        { startDate: '2024-12-31', endDate: '2024-12-31' }
      ]
    },
    {
      id: 11,
      roomNumber: '111',
      image: 'assets/images/room2.jpeg',
      type: 'Standard',
      price: 120,
      amenities: ['Free Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar'],
      availability: [
        { startDate: '2024-12-31', endDate: '2024-12-31' },
        { startDate: '2024-12-31', endDate: '2024-12-31' }
      ]
    },
    {
      id: 12,
      roomNumber: '112',
      image: 'assets/images/room1.jpeg',
      type: 'Standard',
      price: 130,
      amenities: ['Free Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar'],
      availability: [
        { startDate: '2024-01-01', endDate: '2024-01-07' },
        { startDate: '2024-01-08', endDate: '2024-01-15' }
      ]
    },
    {
      id: 13,
      roomNumber: '113',
      image: 'assets/images/room1.jpeg',
      type: 'Deluxe',
      price: 150,
      amenities: ['Free Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar'],
      availability: [
        { startDate: '2024-01-02', endDate: '2024-01-09' },
        { startDate: '2024-01-10', endDate: '2024-01-17' }
      ]
    },
    {
      id: 14,
      roomNumber: '114',
      image: 'assets/images/room2.jpeg',
      type: 'Standard',
      price: 140,
      amenities: ['Free Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar'],
      availability: [
        { startDate: '2024-01-03', endDate: '2024-01-10' },
        { startDate: '2024-01-11', endDate: '2024-01-18' }
      ]
    },
    {
      id: 15,
      roomNumber: '115',
      image: 'assets/images/room1.jpeg',
      type: 'Standard',
      price: 144,
      amenities: ['Free Wi-Fi', 'TV', 'Air Conditioning'],
      availability: [
        { startDate: '2024-01-03', endDate: '2024-01-10' },
        { startDate: '2024-01-11', endDate: '2024-01-18' }
      ]
    },
    {
      id: 16,
      roomNumber: '116',
      image: 'assets/images/room1.jpeg',
      type: 'Standard',
      price: 144,
      amenities: ['Free Wi-Fi', 'TV'],
      availability: [{ startDate: '2024-01-03', endDate: '2024-01-10' }]
    }
  ],
  reservations: [
    {
      id: 1,
      roomId: 1,
      startDate: '2024-12-02',
      endDate: '2024-12-08',
      guestName: 'John Doe'
    },
    {
      id: 2,
      roomId: 2,
      startDate: '2024-12-10',
      endDate: '2024-12-15',
      guestName: 'Jane Smith'
    }
  ]
};

const ROOMS_KEY = 'roomsList';

export function getRoomsMockData() {
  const roomsData = localStorage.getItem(ROOMS_KEY);
  if (roomsData) {
    return JSON.parse(roomsData);
  } else {
    localStorage.setItem(ROOMS_KEY, JSON.stringify(roomsMockData));
    return roomsMockData;
  }
}

export function addRoomsReservations(reservations: Reservation) {
  const roomsData = localStorage.getItem(ROOMS_KEY);
  const data = roomsData ? JSON.parse(roomsData) : roomsMockData;
  data.reservations.push(reservations);
  localStorage.setItem(ROOMS_KEY, JSON.stringify(data));
}

export function deleteRoomsReservations(reservationId: number) {
  const roomsData = localStorage.getItem(ROOMS_KEY);
  let data = roomsData ? JSON.parse(roomsData) : roomsMockData;
  data.reservations = data.reservations.filter(
    (res: Reservation) => res.id != reservationId
  );
  localStorage.setItem(ROOMS_KEY, JSON.stringify(data));
}

export const roomsFilterMetaMockData = {
  roomTypes: ['Standard', 'Deluxe'],
  amenities: [
    'Wifi',
    'Kitchen',
    'Mini Bar',
    'Air Conditioning',
    'Heating',
    'Free Wi-Fi',
    'TV',
    'Hair dryer',
    'Iron'
  ]
};
