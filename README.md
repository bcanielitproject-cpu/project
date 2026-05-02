# Nagaland Tourism Full-Stack App

A React, Node.js, Express, MongoDB, and Mongoose tourism web application for Nagaland, India.

## Folder Structure

```text
nagaland-tourism-app/
  backend/
    src/
      config/db.js
      controllers/
      middleware/
      models/
      routes/
      app.js
      seed.js
      server.js
    .env.example
    package.json
  frontend/
    src/
      App.jsx
      api.js
      main.jsx
      styles.css
    .env.example
    index.html
    package.json
  package.json
```

## Backend Features

- Phone number and password registration
- Login with JWT generation
- Password hashing with bcrypt
- JWT middleware for protected routes
- MongoDB schemas for users, tourist places, taxis, hotels, hotel bookings, restaurants, and reviews
- Seed data for Kohima, Dzukou Valley, Kisama Heritage Village, hotels, homestays, and restaurants

## API Routes

### Authentication

- `POST /api/auth/register`
  - Body: `{ "phone": "9876543210", "password": "secret123" }`
- `POST /api/auth/login`
  - Body: `{ "phone": "9876543210", "password": "secret123" }`
- `GET /api/auth/me`
  - Protected with `Authorization: Bearer <token>`

### Tourist Places

- `GET /api/places`
- `GET /api/places/:id`

### Taxi Booking

- `POST /api/taxis`
  - Protected
  - Body: `{ "pickup": "Kohima", "drop": "Dzukou Valley", "date": "2026-05-10", "time": "08:30", "phone": "9876543210" }`
- `GET /api/taxis/mine`
  - Protected

### Hotel & Homestay Booking

- `GET /api/hotels`
- `POST /api/hotels/bookings`
  - Protected
  - Body: `{ "hotelId": "<hotelId>", "checkIn": "2026-05-10", "checkOut": "2026-05-12" }`
- `GET /api/hotels/bookings/mine`
  - Protected

### Restaurants & Reviews

- `GET /api/restaurants`
- `POST /api/restaurants/:id/reviews`
  - Protected
  - Body: `{ "rating": 5, "comment": "Excellent local food." }`

## Run Locally

1. Install dependencies:

```bash
npm run install:all
```

2. Create backend environment file:

```bash
cp backend/.env.example backend/.env
```

3. Edit `backend/.env` with your MongoDB URI and JWT secret.

4. Optional seed data:

```bash
npm run seed --prefix backend
```

5. Start frontend and backend:

```bash
npm run dev
```

Frontend: `http://localhost:5174`

Backend: `http://localhost:5000`
