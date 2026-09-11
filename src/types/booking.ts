export interface Room {
  code: string;
  type: string;
  pricePerNight: number;
  maxGuests: number;
  description: string;
  amenities: string[];
  image: string;
}

export interface ExistingBooking {
  id: string;
  roomCode: string;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  guestName?: string;
}

export interface DateValidationResult {
  isValid: boolean;
  message: string | null;
  errorType?: 'PAST_DATE' | 'INVALID_RANGE' | 'MISSING_DATE';
}

export interface BookingCalculation {
  nights: number;
  pricePerNight: number;
  totalPrice: number;
}

export interface GuestDetails {
  fullName: string;
  email: string;
  phone: string;
  guests?: number;
  adults?: number;
  children?: number;
  specialRequests?: string;
}
