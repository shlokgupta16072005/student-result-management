# Student Result Management System

A comprehensive, production-grade full-stack web application designed for academic institutions to manage student records, semester courses, and academic evaluations dynamically. Built using the MERN stack with secure token-based authentication and real-time performance analytics.

## Key Features

### Authentication and Role-Based Security

* Admin Control Center: Secure administrative gateway featuring encrypted registration and login protocols.
* State-Guarded Navigation: Frontend protected routing managed via React Router to prevent unauthorized views.
* Backend Endpoint Protection: Router-level custom authentication middleware utilizing JSON Web Tokens (JWT) for secure HTTP API interactions.

### Dynamic Student and Marks Management

* Full CRUD Lifecycle: Administrative dashboard allowing creation, retrieval, modification, and removal of student data.
* Live Query Optimization: Instant client-side search filtering by unique roll numbers or departments.
* Flexible Grade Entry: Input customized assessment marks for evaluation.

### Automated Performance Analytics

* Server-Side Computations: Instant processing of aggregate marks and precise percentage mapping.
* CGPA Conversion Engine: Structural translation of raw percentages into institutional CGPA metrics.
* Smart Grading System: Algorithmic categorization into academic performance tiers (A+, A, B, C, Fail).

## Architecture and Tech Stack

* Frontend UI: React.js and Tailwind CSS (Component-driven presentation layer featuring high-responsiveness and fluid dashboard styling)
* Backend API: Node.js and Express.js (Modular RESTful architecture with structured error handling and security layers)
* Database: MongoDB and Mongoose (NoSQL document storage utilizing strict schema definition and rapid querying)

## Project Directory Structure

student-result-management/
├── backend/
│   ├── middleware/    # Token validation and route protection logic
│   ├── models/        # Database Schema blue-prints (Student, Admin)
│   ├── routes/        # Server-side API endpoints
│   └── server.js      # Main server configuration and gateway entry
└── frontend/
    └── src/
        ├── components/# Reusable UI items (Navbar, Footer)
        ├── layouts/   # Page layout wrappers
        ├── pages/     # Functional views (Dashboards, Logins, Forms)
        └── services/  # Modular Axios network API calls

## Local Installation and Development Setup

### Prerequisites

Ensure your development environment contains Node.js (v16.x or higher) and MongoDB Community Server installed and running locally.

### Repository Setup

Clone the project locally and enter the root workspace directory:

`https://github.com/shlokgupta16072005/student-result-management.git`

cd student-result-management

### Backend Server Deployment

#### Step 1: Navigate into the server architecture module

cd backend
npm install

#### Step 2: Build a local environment file named .env

Create a .env file in the root of the backend directory and append:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/studentDB
JWT_SECRET=your_super_secure_jwt_secret_key

#### Step 3: Boot the environment in development hot-reload mode

npm run dev

### Frontend Client Configuration

#### Step 1: Navigate into the presentation workspace

Open a separate terminal window or split panel and run:

cd frontend
npm install

#### Step 2: Launch the local React development network node

npm start
