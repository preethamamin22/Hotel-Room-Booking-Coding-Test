import { Room, ExistingBooking } from '../types/booking';

export const SAMPLE_ROOMS: Room[] = [
  {
    code: 'R101',
    type: 'Deluxe Room',
    pricePerNight: 3500,
    maxGuests: 2,
    description: 'Elegant deluxe room with garden views, king bed, and modern marble bathroom.',
    amenities: ['King Bed', 'Free Wi-Fi', 'Garden View', 'Air Conditioning', 'Mini Bar'],
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
  },
  {
    code: 'R102',
    type: 'Deluxe Room',
    pricePerNight: 3500,
    maxGuests: 2,
    description: 'Chic deluxe room featuring twin beds, city view, and dedicated workspace.',
    amenities: ['Twin Beds', 'Free Wi-Fi', 'City View', 'Work Desk', 'Smart TV'],
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
  },
  {
    code: 'R201',
    type: 'Executive Suite',
    pricePerNight: 5800,
    maxGuests: 3,
    description: 'Spacious luxury suite with separate living area, panoramic skyline views, and premium tub.',
    amenities: ['King Bed + Sofa', 'Skyline View', 'Espresso Machine', 'Bathtub', 'Executive Lounge Access'],
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
  },
  {
    code: 'R202',
    type: 'Executive Suite',
    pricePerNight: 5800,
    maxGuests: 3,
    description: 'Contemporary penthouse-style suite featuring a private balcony and luxury rain shower.',
    amenities: ['King Bed + Daybed', 'Private Balcony', 'Rain Shower', 'Complimentary Breakfast', 'Sound System'],
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
  },
  {
    code: 'R301',
    type: 'Family Room',
    pricePerNight: 4200,
    maxGuests: 4,
    description: 'Expansive family room designed for comfort with two double beds and entertainment space.',
    amenities: ['2 Double Beds', 'Family Lounge Area', 'Kids Corner', 'Safe Deposit', '24/7 Room Service'],
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
  },
];

// Mock existing bookings for availability check bonus feature
// Let's use relative offset dates so they remain relevant whenever tested!
const today = new Date();
const formatDate = (date: Date): string => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const addDays = (days: number): string => {
  const d = new Date(today);
  d.setDate(d.getDate() + days);
  return formatDate(d);
};

export const MOCK_EXISTING_BOOKINGS: ExistingBooking[] = [
  {
    id: 'B-101',
    roomCode: 'R101',
    checkIn: addDays(2),
    checkOut: addDays(5),
    guestName: 'Rahul Verma',
  },
  {
    id: 'B-201',
    roomCode: 'R201',
    checkIn: addDays(7),
    checkOut: addDays(10),
    guestName: 'Priya Sharma',
  },
];
