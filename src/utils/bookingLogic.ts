import { DateValidationResult, BookingCalculation, ExistingBooking } from '../types/booking';

/**
 * Normalizes a date or date string to midnight (00:00:00.000) for accurate day comparison.
 */
export function normalizeDate(dateInput: string | Date): Date {
  const date = typeof dateInput === 'string' ? new Date(dateInput + 'T00:00:00') : new Date(dateInput);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * Validates check-in and check-out dates according to business rules:
 * 1. Both dates must be selected.
 * 2. Check-in date cannot be in the past (relative to standard reference date or today).
 * 3. Check-out date must be strictly after check-in date.
 */
export function validateBookingDates(
  checkInStr: string,
  checkOutStr: string,
  referenceDate: Date = new Date()
): DateValidationResult {
  if (!checkInStr || !checkOutStr) {
    return {
      isValid: false,
      message: 'Please select both check-in and check-out dates.',
      errorType: 'MISSING_DATE',
    };
  }

  const checkIn = normalizeDate(checkInStr);
  const checkOut = normalizeDate(checkOutStr);
  const today = normalizeDate(referenceDate);

  if (checkIn < today) {
    return {
      isValid: false,
      message: 'Check-in date cannot be in the past.',
      errorType: 'PAST_DATE',
    };
  }

  if (checkOut <= checkIn) {
    return {
      isValid: false,
      message: 'Check-out date must be after check-in date.',
      errorType: 'INVALID_RANGE',
    };
  }

  return {
    isValid: true,
    message: null,
  };
}

/**
 * Calculates the number of nights between check-in and check-out dates.
 * Returns 0 if dates are invalid or invalid range.
 */
export function calculateNights(checkInStr: string, checkOutStr: string): number {
  if (!checkInStr || !checkOutStr) return 0;

  const checkIn = normalizeDate(checkInStr);
  const checkOut = normalizeDate(checkOutStr);

  const diffMs = checkOut.getTime() - checkIn.getTime();
  if (diffMs <= 0) return 0;

  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Calculates total booking price given price per night and number of nights.
 */
export function calculateBooking(
  pricePerNight: number,
  checkInStr: string,
  checkOutStr: string
): BookingCalculation {
  const nights = calculateNights(checkInStr, checkOutStr);
  const totalPrice = nights > 0 ? nights * pricePerNight : 0;

  return {
    nights,
    pricePerNight,
    totalPrice,
  };
}

/**
 * Checks if a specific room is available during the given date interval against existing bookings.
 * Standard hotel rule: Check-in on another booking's check-out date is allowed.
 */
export function isRoomAvailable(
  roomCode: string,
  checkInStr: string,
  checkOutStr: string,
  existingBookings: ExistingBooking[]
): boolean {
  if (!checkInStr || !checkOutStr) return true;

  const newCheckIn = normalizeDate(checkInStr);
  const newCheckOut = normalizeDate(checkOutStr);

  if (newCheckOut <= newCheckIn) return true; // Date range is invalid anyway

  const roomBookings = existingBookings.filter((b) => b.roomCode === roomCode);

  for (const booking of roomBookings) {
    const existingCheckIn = normalizeDate(booking.checkIn);
    const existingCheckOut = normalizeDate(booking.checkOut);

    // Overlap occurs if new stay starts before existing stay ends AND new stay ends after existing stay starts
    if (newCheckIn < existingCheckOut && newCheckOut > existingCheckIn) {
      return false; // Overlap detected
    }
  }

  return true;
}

/**
 * Formats a number to Indian Rupee (₹) currency format.
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
