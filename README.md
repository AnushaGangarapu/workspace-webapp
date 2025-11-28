# Workspace Booking & Pricing System

A full-stack workspace booking application that enables users to book meeting rooms by the hour with dynamic pricing, conflict prevention, and comprehensive analytics.

## 🚀 Live Demo

- **Frontend**: https://workspacebooking.netlify.app
- **Backend API**: https://workspace-service.vercel.app
- **API Health Check**: https://workspace-service.vercel.app/health

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Local Setup](#local-setup)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Testing](#testing)
- [AI Usage](#ai-usage)

## ✨ Features

### Core Functionality
- ✅ **Room Management**: View available meeting rooms with capacity and pricing
- ✅ **Smart Booking**: Create bookings with real-time conflict detection
- ✅ **Dynamic Pricing**: Automatic peak-hour pricing (1.5x base rate)
  - Peak hours: Mon-Fri 10 AM-1 PM, 4 PM-7 PM
  - Off-peak: All other times
- ✅ **Conflict Prevention**: No overlapping bookings allowed
- ✅ **Cancellation Policy**: Cancel bookings >2 hours before start time
- ✅ **Admin Dashboard**: View all bookings with filtering and management
- ✅ **Analytics**: Date-range based revenue and utilization reports

### Technical Features
- 🎯 RESTful API design with proper HTTP status codes
- 🔒 Input validation and error handling
- ⚡ Efficient database queries with indexing
- 📱 Responsive UI with Material-UI
- 🌐 Timezone handling (Asia/Kolkata)
- 📊 Virtualized table rendering for performance

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (Atlas)
- **ODM**: Mongoose
- **Timezone**: date-fns, date-fns-tz
- **Deployment**: Vercel

### Frontend
- **Library**: React 18
- **UI Framework**: Material-UI (MUI) v5
- **Styling**: makeStyles (MUI Styles)
- **Virtualization**: React Virtuoso
- **HTTP Client**: Fetch API
- **Deployment**: Netlify

## 📁 Project Structure
```
workspace-booking-system/
├── README.md
├── ARCHITECTURE.md
├── .gitignore
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── vercel.json
│   ├── .env.example
│   ├── src/
│   │   ├── index.ts              # Express app entry point
│   │   ├── config/
│   │   │   ├── database.ts       # MongoDB connection
│   │   │   └── constants.ts      # App constants
│   │   ├── models/
│   │   │   ├── Room.ts           # Room schema
│   │   │   └── Booking.ts        # Booking schema
│   │   ├── services/
│   │   │   ├── roomService.ts    # Room business logic
│   │   │   ├── bookingService.ts # Booking business logic
│   │   │   ├── pricingService.ts # Pricing calculation
│   │   │   └── analyticsService.ts # Analytics logic
│   │   ├── controllers/
│   │   │   ├── roomController.ts
│   │   │   ├── bookingController.ts
│   │   │   └── analyticsController.ts
│   │   ├── routes/
│   │   │   ├── roomRoutes.ts
│   │   │   ├── bookingRoutes.ts
│   │   │   └── analyticsRoutes.ts
│   │   ├── middleware/
│   │   │   ├── errorHandler.ts
│   │   │   └── validator.ts
│   │   ├── utils/
│   │   │   ├── timeUtils.ts      # Timezone utilities
│   │   │   └── conflictChecker.ts
│   │   └── types/
│   │       └── index.ts          # TypeScript types
│   └── scripts/
│       └── seedRooms.ts          # Database seeding
└── frontend/
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── index.js
        ├── App.js                # Main app component
        ├── api/
        │   └── api.js            # API integration
        ├── components/
        │   ├── RoomsList.js      # Display rooms
        │   ├── BookingForm.js    # Create bookings
        │   ├── AdminView.js      # Admin dashboard
        │   ├── BookingsTable.js  # Virtualized table
        │   └── Analytics.js      # Analytics view
        └── utils/
            └── formatters.js     # Utility functions
```

## 📦 Prerequisites

- Node.js 18.x or higher
- MongoDB Atlas account (free tier)
- npm  manager

## 🚀 Local Setup

### 1. Clone the Repository
```bash
git clone 
cd workspace-webapp
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MongoDB Atlas connection string
# MONGODB_URI=mongodb+srv://:@cluster.mongodb.net/workspace-booking
# PORT=5000
# NODE_ENV=development
# TIMEZONE=Asia/Kolkata

# Seed the database with sample rooms
npm run seed

# Start development server
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file (optional for local development)
# echo "REACT_APP_API_URL=http://localhost:5000" > .env

# Start development server
npm start
```

Frontend will run on `http://localhost:3000`

## 🔐 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/workspace-booking
PORT=5000
NODE_ENV=development
TIMEZONE=Asia/Kolkata
```

### Frontend (.env)
```env
# For local development (uses proxy in package.json)
REACT_APP_API_URL=http://localhost:5000

# For production
REACT_APP_API_URL=https://workspace-service.vercel.app
```

## 📚 API Documentation

### Base URL
- **Local**: `http://localhost:5000`
- **Production**: `https://workspace-service.vercel.app`

### Endpoints

#### 1. Get All Rooms
```http
GET /api/rooms
```

**Response (200)**:
```json
[
  {
    "_id": "...",
    "roomId": "101",
    "name": "Cabin 1",
    "baseHourlyRate": 500,
    "capacity": 4
  }
]
```

#### 2. Create Booking
```http
POST /api/bookings
Content-Type: application/json

{
  "roomId": "101",
  "userName": "Priya Sharma",
  "startTime": "2025-11-20T10:00:00.000Z",
  "endTime": "2025-11-20T12:30:00.000Z"
}
```

**Success Response (201)**:
```json
{
  "bookingId": "a1b2c3d4",
  "roomId": "101",
  "userName": "Priya Sharma",
  "totalPrice": 1875,
  "status": "CONFIRMED"
}
```

**Error Response (400/409)**:
```json
{
  "error": "Room already booked from 10:30 AM to 11:30 AM"
}
```

#### 3. Cancel Booking
```http
POST /api/bookings/:bookingId/cancel
```

**Success Response (200)**:
```json
{
  "bookingId": "a1b2c3d4",
  "status": "CANCELLED",
  "message": "Booking cancelled successfully"
}
```

**Error Response (400)**:
```json
{
  "error": "Cancellation not allowed. Must cancel at least 2 hours before start time"
}
```

#### 4. Get All Bookings
```http
GET /api/bookings
```

**Response (200)**:
```json
[
  {
    "bookingId": "a1b2c3d4",
    "roomId": "101",
    "userName": "Priya Sharma",
    "startTime": "2025-11-20T10:00:00.000Z",
    "endTime": "2025-11-20T12:30:00.000Z",
    "totalPrice": 1875,
    "status": "CONFIRMED",
    "createdAt": "2025-11-15T08:00:00.000Z"
  }
]
```

#### 5. Get Analytics
```http
GET /api/analytics?from=2025-11-01&to=2025-11-30
```

**Response (200)**:
```json
[
  {
    "roomId": "101",
    "roomName": "Cabin 1",
    "totalHours": 15.5,
    "totalRevenue": 8250
  }
]
```

### Validation Rules

- **startTime** must be before **endTime**
- **startTime** cannot be in the past
- Maximum booking duration: 12 hours
- Cancellation allowed only >2 hours before start time


### Test Cases Covered

1. ✅ Create booking successfully
2. ✅ Reject overlapping bookings (conflict detection)
3. ✅ Reject bookings >12 hours duration
4. ✅ Reject bookings in the past
5. ✅ Calculate correct price for peak/off-peak hours
6. ✅ Cancel booking >2 hours before start
7. ✅ Reject cancellation <2 hours before start
8. ✅ Analytics excludes cancelled bookings
9. ✅ Allow back-to-back bookings (end = next start)



1. **Project Scaffolding**
   - Initial file structure setup
   - TypeScript configuration
   - Package.json scripts

2. **Type Definitions**
   - TypeScript interfaces for models
   - Request/response types
   - Service layer types

3. **Algorithm Design**
   - Dynamic pricing calculation logic
   - Conflict detection algorithm
   - Time zone conversion utilities

4. **Component Boilerplate**
   - Material-UI component structure
   - React hooks patterns
   - Form validation logic

5. **Documentation**
   - API documentation structure
   - README templates
   - Code comments



### Key Design Decisions Made by Developer

1. **Architecture**: Clean separation of concerns (Routes → Controllers → Services → Models)
2. **Pricing Logic**: Hour-by-hour calculation to handle partial hours correctly
3. **Conflict Detection**: Optimized database query with compound indexing
4. **Error Handling**: Consistent error messages with appropriate HTTP status codes
5. **Time Zone**: Explicit handling of Asia/Kolkata timezone for all operations

### Learning Outcomes

- TypeScript best practices for Node.js applications
- MongoDB schema design and indexing strategies
- React Material-UI patterns and optimization
- RESTful API design principles
- Serverless deployment considerations (Vercel)



## 📝 License

This project is developed as part of a technical assessment.

---

## 🐛 Known Issues & Future Improvements

### Current Limitations
- No user authentication
- No email notifications
- Basic analytics (could add charts, trends)
- No recurring bookings

### Potential Enhancements
- Add user login/authentication
- Email confirmations for bookings
- Calendar view for bookings
- Room availability calendar
- Advanced analytics with charts
- Booking history per user
- Room amenities and images
