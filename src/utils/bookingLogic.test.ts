import { describe, it, expect } from 'vitest';
import {
  validateBookingDates,
  calculateNights,
  calculateBooking,
  isRoomAvailable,
  formatCurrency,
} from './bookingLogic';
import { ExistingBooking } from '../types/booking';

describe('Booking Logic Utilities', () => {
  const refDate = new Date('2026-09-10T00:00:00');

  describe('validateBookingDates', () => {
    it('should pass for valid future dates', () => {
      const result = validateBookingDates('2026-09-12', '2026-09-15', refDate);
      expect(result.isValid).toBe(true);
      expect(result.message).toBeNull();
    });

    it('should reject check-in in the past', () => {
      const result = validateBookingDates('2026-09-08', '2026-09-12', refDate);
      expect(result.isValid).toBe(false);
      expect(result.errorType).toBe('PAST_DATE');
      expect(result.message).toBe('Check-in date cannot be in the past.');
    });

    it('should reject check-out on the same day as check-in', () => {
      const result = validateBookingDates('2026-09-12', '2026-09-12', refDate);
      expect(result.isValid).toBe(false);
      expect(result.errorType).toBe('INVALID_RANGE');
      expect(result.message).toBe('Check-out date must be after check-in date.');
    });

    it('should reject check-out before check-in date', () => {
      const result = validateBookingDates('2026-09-15', '2026-09-12', refDate);
      expect(result.isValid).toBe(false);
      expect(result.errorType).toBe('INVALID_RANGE');
      expect(result.message).toBe('Check-out date must be after check-in date.');
    });

    it('should reject missing check-in or check-out date', () => {
      const result = validateBookingDates('', '2026-09-12', refDate);
      expect(result.isValid).toBe(false);
      expect(result.errorType).toBe('MISSING_DATE');
    });
  });

  describe('calculateNights', () => {
    it('should calculate correct number of nights for multi-day stay', () => {
      expect(calculateNights('2026-09-10', '2026-09-13')).toBe(3);
      expect(calculateNights('2026-09-10', '2026-09-11')).toBe(1);
    });

    it('should return 0 when check-out is before or equal to check-in', () => {
      expect(calculateNights('2026-09-10', '2026-09-10')).toBe(0);
      expect(calculateNights('2026-09-12', '2026-09-10')).toBe(0);
    });
  });

  describe('calculateBooking', () => {
    it('should correctly calculate total price (nights x pricePerNight)', () => {
      const calculation = calculateBooking(3500, '2026-09-10', '2026-09-13');
      expect(calculation.nights).toBe(3);
      expect(calculation.pricePerNight).toBe(3500);
      expect(calculation.totalPrice).toBe(10500); // 3500 * 3
    });

    it('should calculate ₹5,800 x 2 nights correctly', () => {
      const calculation = calculateBooking(5800, '2026-09-10', '2026-09-12');
      expect(calculation.nights).toBe(2);
      expect(calculation.totalPrice).toBe(11600); // 5800 * 2
    });

    it('should return 0 total price for invalid date inputs', () => {
      const calculation = calculateBooking(4200, '2026-09-10', '2026-09-08');
      expect(calculation.nights).toBe(0);
      expect(calculation.totalPrice).toBe(0);
    });
  });

  describe('isRoomAvailable (Bonus Feature)', () => {
    const existingBookings: ExistingBooking[] = [
      {
        id: 'B-1',
        roomCode: 'R101',
        checkIn: '2026-09-15',
        checkOut: '2026-09-20',
      },
    ];

    it('should detect overlap when requested dates fall inside existing booking', () => {
      const available = isRoomAvailable('R101', '2026-09-16', '2026-09-18', existingBookings);
      expect(available).toBe(false);
    });

    it('should detect overlap when requested dates partially overlap start of booking', () => {
      const available = isRoomAvailable('R101', '2026-09-12', '2026-09-16', existingBookings);
      expect(available).toBe(false);
    });

    it('should allow booking when requested dates do not overlap', () => {
      const available = isRoomAvailable('R101', '2026-09-10', '2026-09-14', existingBookings);
      expect(available).toBe(true);
    });

    it('should allow check-in on the exact date of another guest check-out', () => {
      const available = isRoomAvailable('R101', '2026-09-20', '2026-09-23', existingBookings);
      expect(available).toBe(true);
    });
  });

  describe('formatCurrency', () => {
    it('should format numbers to Indian Rupee symbol format', () => {
      const formatted = formatCurrency(3500);
      expect(formatted).toContain('3,500');
    });
  });
});
