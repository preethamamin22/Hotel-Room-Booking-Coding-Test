# Hotel Room Booking — Developer Skills Assessment

**Raintech Software Limited — Front-End Developer Coding Test**

A modern, responsive, single-page Hotel Room Booking application built with **React**, **TypeScript**, **Vite**, and **Vitest**. The application allows users to select stay dates, pick a room, view real-time night and price calculations, and receive instant validation feedback.

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation & Running Locally

1. **Clone the repository** (or navigate to project directory):
   ```bash
   git clone <repository-url>
   cd "Hotel Room Booking — Coding Test"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173` to interact with the application.

4. **Run Automated Unit Tests**:
   ```bash
   npm test
   ```
   This executes the Vitest test suite covering date validation, price calculation math, and room overlap checks.

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🛠️ Tech Stack & Framework Choices

- **React 18 + TypeScript**: Selected for strong type safety, component modularity, clear separation of UI vs. core calculation logic, and rapid UI state synchronization.
- **Vite**: Ultra-fast build tool and local dev server with HMR.
- **Vanilla CSS (CSS Variables & Glassmorphism Design System)**: Built from scratch to deliver a premium, modern aesthetic with smooth animations without relying on heavy UI frameworks.
- **Vitest**: Fast, Vite-native test runner used for continuous verification of calculation and validation business rules.
- **Lucide React**: Crisp SVG icons for enhanced user experience.

---

## ✨ Features Implemented

### 🌟 Core Requirements
1. **Sample Room Listing**: Displays all 5 sample hotel rooms (`R101`, `R102`, `R201`, `R202`, `R301`) with room code, type, price/night (in ₹), max guests, amenities, and room photos.
2. **Date Selection**: Native HTML5 date pickers for Check-in and Check-out with automatic minimum date bounds.
3. **Room Selection**: Interactive room selection cards with visual high-lighting and selected badges.
4. **Dynamic Price Calculation**:
   - Computes **number of nights** (`Check-out - Check-in`).
   - Computes **total price** (`Nights × Price per night`).
   - Itemized pricing math breakdown shown in real-time.
5. **Strict Date Validation**:
   - Check-in date cannot be in the past (`checkIn < today`).
   - Check-out date must be strictly after check-in date (`checkOut <= checkIn`).
   - Prominent, user-friendly alert banners instead of silent failures.

### 🎁 Bonus Features Included
1. **Prevent Booking Overlap against Mock Reservations**:
   - Checks requested stay dates against pre-existing bookings (`R101` and `R201`).
   - Highlights rooms as **"Booked for selected dates"** with disabled selection state if dates conflict.
   - Allows standard hotel checkout day overlap (Guest A checkout date = Guest B checkin date).
2. **Max Guests Filter**:
   - Live dropdown selector for guest count (1 to 4 guests).
   - Shows clear warning badge on rooms where requested guest count exceeds capacity (`Max 2 Guests`).
3. **Automated Unit Tests**:
   - 15 comprehensive unit tests covering date math, edge cases, currency formatting, and availability checks in `src/utils/bookingLogic.test.ts`.

---

## 🔍 Validation & Edge Cases Handled

| Scenario | Behavior / Feedback |
|---|---|
| **Same-day check-in & check-out** | Validation Error: *"Check-out date must be after check-in date."* (0 nights calculated). |
| **Check-out date before Check-in** | Validation Error: *"Check-out date must be after check-in date."* |
| **Check-in date in the past** | Validation Error: *"Check-in date cannot be in the past."* |
| **Missing check-in or check-out date** | Info Notice: *"Please select both check-in and check-out dates."* |
| **Overlapping existing reservation** | Status Badge: *"Booked for selected dates"* with disabled card interaction. |
| **Guest count > Room Capacity** | Capacity Warning: *"Exceeds guest limit (3 requested)"*. |

---

## 🧬 Git Process & Commit History

Commits were made in structured logical steps to reflect the development process:
1. `chore: initial project setup with Vite, React, TypeScript, Vitest, and styles`
2. `feat: implement data models, sample room data, and mock existing bookings`
3. `feat: implement date validation, night & price calculation logic, and room availability checker`
4. `test: add Vitest unit test suite for date validation, calculation math, and booking overlap`
5. `feat: build UI components (Header, DateGuestFilter, RoomCard, BookingSummary) with responsive design`
6. `docs: add comprehensive README documentation`

---

## 🔮 What I Would Improve With More Time

1. **Persistent State / Mock API Backend**: Connect to a Mock Service Worker (MSW) or Node.js server to allow adding new reservations and persisting them in `localStorage`.
2. **Multi-Room Selection & Add-ons**: Allow users to reserve multiple rooms in a single transaction or select extra add-ons (breakfast, airport transfer, spa package).
3. **Interactive Calendar Range Picker**: Replace standard HTML date inputs with an integrated dual-month visual calendar highlighting unavailable dates in red.
4. **Localization & Currency Toggle**: Support multi-currency switching (USD, EUR, INR) and localized date formats.
