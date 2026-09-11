# Raintech Stays | Hotel Room Booking

Hotel room booking web application built with React, TypeScript, and Vite. Features real time room availability, date validation, dynamic pricing calculation, and guest capacity filtering.

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Run Tests

```bash
npm test
```

Runs the test suite using Vitest.

### Production Build

```bash
npm run build
```

## Features

### Room Selection and Availability
* Browse 5 room types (Deluxe King, Executive Suite, Ocean Breeze Suite, Presidential Suite, Studio Room).
* Real time conflict check against existing bookings. Rooms booked for the selected dates are automatically disabled.
* Capacity indicator warns when the selected guest count exceeds the maximum limit for a room.

### Date and Stay Calculation
* Check in and check out date pickers with automatic minimum date boundaries.
* Instant nights calculation and total price breakdown.
* Validation checks for past dates, same day bookings, and inverted date ranges.

### Responsive Design
* Desktop: Two column layout with sticky reservation summary sidebar.
* Tablet: Single column view with summary placed above the room grid.
* Mobile: Mobile navigation menu with hamburger toggle, touch friendly controls, and adaptive font sizing.

## Project Structure

```
src/
├── components/
│   ├── BookingSummary.tsx
│   ├── DateGuestFilter.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── HotelShowcase.tsx
│   └── RoomsTable.tsx
├── types/
│   └── booking.ts
├── utils/
│   ├── bookingLogic.ts
│   └── bookingLogic.test.ts
├── App.tsx
├── index.css
└── main.tsx
```

## Business Logic and Unit Tests

Core calculations and validations are isolated in pure TypeScript functions inside `src/utils/bookingLogic.ts`:

* `calculateNights`: Calculates stay duration between check in and check out dates.
* `calculateBooking`: Computes total pricing, itemized tax, and booking summary.
* `validateDates`: Validates date order and prevents reservations in the past.
* `isRoomAvailable`: Verifies room availability against conflicting reservation date ranges.
* `canRoomAccommodate`: Checks room maximum capacity against guest count.

All logic is covered by automated unit tests in `src/utils/bookingLogic.test.ts`.
