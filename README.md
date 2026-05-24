# College Library Management System

A complete full-stack web application for managing library resources, equipped with Student and Admin portals. Built to simulate a production-like environment with a clean REST API and a robust frontend UI.

## Features
*   **Student Portal**: View available books, issue requests, track return dates, and view fine details. Includes a simulated downloadable library card.
*   **Admin Panel**: Full CRUD control to manage books. Approve issues, process returns, track overdue penalties, and visualize library statistics via charts.
*   **Mock Backend Data Layer**: Implemented using an in-memory database simulation inside an Express.js Node backend (so it works independently without requiring an external MongoDB URI, while maintaining standard `/api` route compatibility).
*   **Aesthetics**: Glassmorphism login UI, fluid animations (motion), modern Dark/Light mode support, and fully responsive multi-view layout using Tailwind CSS.

## Setup Instructions

This app is designed to run automatically in standard Node environments.
1. Run `npm install` to fulfill dependencies.
2. The dev server runs seamlessly via `npm run dev` containing both the API and Vite asset provider.
3. Access at `localhost:3000`.

## Dummy Credentials (For Testing)
Because this is a simulated demo, no strict schema validation restricts login.
*   **Student Login**: Enter `student` / `student`
*   **Admin Login**: Enter `admin` / `admin`

## Viva Questions & Answers

**Q1: What architecture does this application follow?**
*A1:* It follows a modern Full-Stack Monolithic architecture, where the React SPA (frontend) is served by and interacts with an Express.js API (backend) via RESTful boundaries.

**Q2: How does the application store data?**
*A2:* In a real-world scenario, the endpoints would connect linearly to MongoDB via Mongoose. For this portable deployment, we simulate NoSQL collections (Books, Users, Issues) using stateful in-memory structures running within the Node.js server lifecycle—guaranteeing perfect local execution.

**Q3: How are asynchronous interface updates handled?**
*A3:* The application utilizes React hooks (`useState`, `useEffect`) alongside controlled functional components to trigger asynchronous `fetch` calls to the `/api/*` routes, mapping the returned Promises directly safely into the DOM.

**Q4: How was routing managed without a heavy frontend Router plugin?**
*A4:* By using state-driven conditional component rendering (the `currentView` schema in `App.tsx`) to switch out root-level DOM nodes intuitively, ensuring a 100% Client-Side Rendered (CSR) experience without the footprint of heavy JS router libraries.

**Q5: What are the security benefits of full-stack implementations like this?**
*A5:* Processing business logic securely out-of-sight in Node (such as fine calculations) removes the possibility of client-side manipulation. It establishes an authoritative server state. 

---
_Developed for final year college project submission._
