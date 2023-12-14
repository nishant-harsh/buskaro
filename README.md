# BusKaro - Bus Booking System

## Overview

BusKaro is a comprehensive bus booking system designed to streamline the process of managing bus routes, bookings, and user interactions. It is built as a full-stack application with a Node.js (Express) backend and a Next.JS frontend. The system allows for efficient handling of bus routes, ticket bookings, and user management.

## Features

### For Users:

- *Account Management:*
  - Users can sign up and log in to manage their bookings.
  - User authentication is handled securely.

- *Bus Booking:*
  - Users can browse available bus routes.
  - Book tickets for preferred routes and timings.

### For Admins:

- *Bus Management:*
  - Add and manage bus details.
  - Schedule buses on different routes.

- *Route Management:*
  - Create and modify bus routes.
  - Manage timings and stops for each route.

- *Booking Management:*
  - View and manage user bookings.
  - Handle ticket cancellations and modifications.

### Authentication:

- *User Authentication:*
  - Secure signup and login functionality.
  - Account management features for users.

- *Admin Authentication:*
  - Separate admin login for managing the system.
  - Admins can manage buses, routes, and bookings.

## Routes

### User Routes:

- *Signup/Login:*
  - Endpoint: /api/user/signup and /api/user/login
  - Methods: POST

- *Book Ticket:*
  - Endpoint: /api/ticket/book
  - Method: POST

### Admin Routes:

- *Add Bus:*
  - Endpoint: /api/bus/add
  - Method: POST

- *Create Route:*
  - Endpoint: /api/route/create
  - Method: POST

- *Manage Bookings:*
  - Endpoint: /api/ticket/user
  - Method: GET

## Getting Started

To get started with BusKaro, follow these steps:

1. Clone the repository:

```bash
   git clone https://github.com/nishant-harsh/buskaro.git

   # Change to project directory
   cd BusKaro
```

3. Install Dependencies for Backend
```bash
   cd BusKaro-backend
   npm install
```

4. Install Dependencies for Frontend
```bash
   cd BusKaro-frontend
   npm install
```

6. Configuration
```bash
# add .env file for Backend
vim BusKaro-backend/.env
```
add Configuration
```
PORT=3001
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.bbbqyfo.mongodb.net/buskaro?retryWrites=true&w=majority"
SECRET_KEY='BusKaro'
FRONTEND_BASE_URL='http://localhost:3000'
```

5. Starting application
```bash
cd BusKaro-backend
npm run start
```
```bash
cd BusKaro-frontend
npm run start
```

6. Start playing the application at `http://localhost:3000/`
