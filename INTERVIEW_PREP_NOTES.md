# 🎯 Raintech Software Limited — Developer Assessment Interview Cheat Sheet

A comprehensive guide to help you explain your code, justify your architectural decisions, and answer technical questions confidently to get selected!

---

## 1. ⚡ 60-Second Elevator Pitch

> *"For this coding challenge, I built a high-performance, single-page Hotel Room Booking application using **React 18, TypeScript, Vite, and Vitest**.*
>
> *My focus was on **bulletproof business logic**, **clean component architecture**, and a **human-centered luxury hospitality UX**. In addition to all core requirements—such as date validation, night calculations, and instant pricing quotes—I also implemented bonus features including **date overlap prevention against existing bookings**, **guest capacity filtering**, and a **15-test Vitest unit suite**.*
>
> *I structured the codebase by decoupling pure business logic into pure utility functions (`bookingLogic.ts`) so they can be unit-tested independently of the React UI components."*

---

## 2. 🏗️ Architecture & Stack Choice (Why you chose them)

| Choice | Why You Picked It | How to Explain It in Interview |
|---|---|---|
| **React 18 + TypeScript** | Strict type safety, clean component lifecycle, and predictable reactive state updates. | *"TypeScript prevented runtime type errors when passing room objects and date strings between components. React allowed automatic recalculations of stay nights and prices whenever state changed."* |
| **Pure Utility Logic (`bookingLogic.ts`)** | Separation of Concerns (SoC). | *"I separated UI rendering from business calculations. Date math and price formulas live in pure functions without DOM dependencies, making them trivial to test with Vitest."* |
| **Vite** | Lightning-fast ESM dev server and optimized production build (`~160KB` bundle). | *"Vite provides instantaneous HMR during development and clean tree-shaking for production."* |
| **Vanilla CSS (Design Tokens)** | Custom luxury styling without heavy external library overhead. | *"Instead of relying on heavy UI kits, I crafted a custom, clean design system with CSS custom properties, responsive grids, and subtle micro-interactions to deliver a polished hotel folio experience."* |
| **Vitest** | Native Vite integration, fast ESM execution. | *"Vitest runs tests in milliseconds and shares the exact same build pipeline as Vite, ensuring zero config mismatch."* |

---

## 3. 🧠 Core Logic & Edge Cases Deep Dive

### A. Date Validation Logic (`validateBookingDates`)
- **Requirement**: Check-out must be after check-in, check-in cannot be in the past.
- **Implementation**:
  ```ts
  // Normalize both dates to midnight (00:00:00) to ignore time offsets
  const checkIn = normalizeDate(checkInStr);
  const checkOut = normalizeDate(checkOutStr);
  const today = normalizeDate(referenceDate);

  if (checkIn < today) return { isValid: false, message: 'Check-in date cannot be in the past.' };
  if (checkOut <= checkIn) return { isValid: false, message: 'Check-out date must be after check-in date.' };
  ```
- **Interview Detail to Highlight**:
  > *"Notice how I normalize dates to midnight (`00:00:00.000`). This prevents subtle off-by-one errors caused by local time of day or Daylight Saving Time offsets."*

### B. Night & Price Calculation (`calculateNights` & `calculateBooking`)
- **Formula**:
  $$\text{Nights} = \frac{\text{CheckOut Time (ms)} - \text{CheckIn Time (ms)}}{1000 \times 60 \times 60 \times 24}$$
  $$\text{Total Price} = \text{Nights} \times \text{Price per Night}$$
- **Same-day check-in/out edge case**: Returns `0 nights` and `₹0 total`, displaying a human validation error.

### C. Booking Overlap Detection (`isRoomAvailable` - Bonus)
- **Algorithm**: Two date intervals $[A_{\text{start}}, A_{\text{end}}]$ and $[B_{\text{start}}, B_{\text{end}}]$ overlap if:
  $$\text{newCheckIn} < \text{existingCheckOut} \quad \text{AND} \quad \text{newCheckOut} > \text{existingCheckIn}$$
- **Hotel Business Rule**:
  > *"In the hotel industry, Guest A checking out on Sept 15th and Guest B checking in on Sept 15th is **valid** because rooms are cleaned during turnaround hours (11:00 AM - 3:00 PM). My algorithm explicitly allows check-in on another booking's check-out date."*

---

## 4. 💬 Anticipated Interview Questions & Model Answers

### Q1: "Why didn't you use a UI framework like Tailwind or Material UI?"
> **Answer**: *"I wanted complete control over the design system to make the app feel like an authentic, high-end hospitality product rather than a generic boilerplate dashboard. Using custom CSS variables kept the bundle lightweight while giving me maximum flexibility over responsive layouts."*

### Q2: "How would you handle real API integration and database persistence?"
> **Answer**:
> 1. *"I would replace `mockData.ts` with API calls using React Query or Axios to fetch room availability from a backend service (e.g. Node.js/PostgreSQL)."*
> 2. *"For booking creation, I'd implement optimistic UI updates with pessimistic server confirmation to handle race conditions where two users attempt to book the last available room simultaneously."*
> 3. *"I'd use database transactions with row-level locking (`SELECT ... FOR UPDATE`) on the backend to guarantee double-booking prevention under high concurrency."*

### Q3: "How would you handle timezone issues if guests book from different countries?"
> **Answer**: *"Dates should be passed across API boundaries in ISO-8601 UTC strings (`YYYY-MM-DD`). On the front-end, hotel check-in dates are tied to the **hotel's local timezone**, not the user's local timezone (e.g., 3:00 PM in Mumbai time). I would parse date inputs relative to the hotel's location timezone using `Intl.DateTimeFormat` or `date-fns-tz`."*

### Q4: "How did you structure your Git commits?"
> **Answer**: *"I followed conventional commits and committed in logical steps so reviewers can trace my thought process: starting with project setup, followed by core logic models, unit tests, UI components, and documentation."*

---

## 5. 🛠️ Command Reference Cheat Sheet

- **Start Dev Server**: `npm run dev` (Runs on `http://localhost:5173`)
- **Run Unit Tests**: `npm test` or `npx vitest run` (15 passing tests)
- **Production Build**: `npm run build` (TypeScript check + Vite production bundle)
- **Check Git Remote**: `git remote -v` (`https://github.com/preethamamin22/Hotel-Room-Booking-Coding-Test.git`)

---

Good luck with your interview! You have a clean, tested, and beautifully designed project. You've got this! 🚀
