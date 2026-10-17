# SLIET Hostel – Hostel Management System

A simple hostel management website built with **React + JavaScript** and plain CSS.
No backend – all data is mock data saved in the browser's **LocalStorage**.

## How to run

```bash
npm install      # first time only
npm run dev      # then open the URL shown (usually http://localhost:5173)
```

- **Warden login:** `admin / Sliet@Admin#2026` (or `warden / Sliet@Warden#2026`)
- **Student section:** choose "Student" on the login page and click "Continue as Student" (no password)

Other commands: `npm run build` (production build), `npm run preview` (serve the build).

## Features

- **Login** – checks against mock users; stays logged in after refresh.
- **Dashboard** – stats, floor-wise occupancy, today's menu, recent complaints and notices.
- **Students** – search, add, edit, delete, toggle fee status (click the badge).
- **Room Allocation** – 3 floors × 32 rooms (3 beds each). Approve/reject student room requests, allot rooms, vacate beds, view by floor with pagination.
- **Complaints** – register complaints, change status, filter by status, delete.
- **Mess Menu** – weekly table with today highlighted; edit any day.
- **Announcements** – post, pin/unpin, filter by category, delete.
- **Student section** – request a room (name, registration no, branch, father's name, address) or raise a complaint. The warden picks a room and approves the request on the Room Allocation page.

## Where the code is

```
src/
├── main.jsx              # Entry point, loads App and style.css
├── App.jsx               # Holds all data, login check, and page switching
├── style.css             # All styles (colors are CSS variables at the top)
├── useLocalStorage.js    # useState that also saves to LocalStorage
├── utils.js              # Date and class-name helpers
├── data/mockData.js      # Mock users, students, rooms, complaints, menu, notices
├── components/Sidebar.jsx
└── pages/
    ├── Login.jsx
    ├── Dashboard.jsx
    ├── Students.jsx
    ├── Rooms.jsx
    ├── Complaints.jsx
    ├── MessMenu.jsx
    ├── Announcements.jsx
    └── StudentPortal.jsx  # Student page: room booking + complaints
```

A student's room is stored on the student (`room: "101"`), so room occupancy
is always worked out from the student list – no duplicated data to keep in sync.
# Phantom-Pixels
