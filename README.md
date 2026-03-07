# RentEase - Full Stack House Rental Project

RentEase is a MERN-style house rental platform with role-based flows for renters, owners, and admins.

- `Frontend/`: React + Vite client app
- `Backend/`: Node.js + Express + MongoDB REST API

## Features

- User registration and login
- Role-based navigation (`Admin`, `Owner`, `Renter`)
- Property listing and browsing
- Owner property management (add, update, delete)
- Booking creation and booking status management
- Admin dashboards for users, properties, and bookings
- Image upload support for property media

## Role Workflows

- `Renter`
  - Register or log in
  - Browse all listed properties
  - Place booking requests
  - Track personal booking status
- `Owner`
  - Register as `Owner` (starts with `granted: ungranted`)
  - Wait for admin approval
  - Add/edit/delete own properties
  - View and update booking status for owned properties
- `Admin`
  - View all users, properties, and bookings
  - Approve/reject owner account status via `handlestatus`

## Tech Stack

### Frontend

- React 19
- Vite 7
- React Router
- Axios
- Tailwind CSS 4

### Backend

- Node.js
- Express 5
- MongoDB + Mongoose
- JWT authentication
- Cookie parser + CORS
- Multer for file uploads

## Project Structure

```text
Nitin/
  Backend/
    config/
    controllers/
    middlewares/
    models/
    routes/
    uploads/
    index.js
    package.json
  Frontend/
    src/
      config/
      context/
      modules/
    index.html
    package.json
    vite.config.js
```

## Frontend Modules

- `src/modules/common/`
  - Public pages: home, login, register, forgot password, toast UI
- `src/modules/user/`
  - Shared property cards and user role features
  - `owner/`: owner dashboard, add/manage properties, bookings
  - `renter/`: renter dashboard and property browsing
- `src/modules/admin/`
  - Admin dashboard, users list, properties list, bookings list
- `src/config/api.js`
  - Centralized API/asset URL builders: `apiUrl()` and `assetUrl()`
- `src/context/UserContext.jsx`
  - Application-level user state context

## Prerequisites

- Node.js 18+
- npm
- MongoDB connection string

## Environment Variables

### Backend (`Backend/.env`)

```env
MONGO_DB=your_mongodb_connection_string
JWT_KEY=your_jwt_secret
PORT=8001
FRONTEND_URL=http://localhost:5173
FRONTEND_ORIGIN=http://127.0.0.1:5173
```

- `MONGO_DB`: MongoDB URI
- `JWT_KEY`: JWT signing key
- `PORT`: API server port (default `8001`)
- `FRONTEND_URL`, `FRONTEND_ORIGIN`: allowed CORS origins

### Frontend (`Frontend/.env`) - optional

```env
VITE_API_URL=http://localhost:8001
```

Notes:
- In local development on `localhost`/`127.0.0.1`, frontend code uses relative API paths and Vite proxy.
- For deployed builds, `VITE_API_URL` is used as API host.

## Installation

### 1. Install backend dependencies

```bash
cd Backend
npm install
```

### 2. Install frontend dependencies

```bash
cd ../Frontend
npm install
```

## Run Locally

Open two terminals.

### Terminal 1: Start backend

```bash
cd Backend
node index.js
```

Current backend `package.json` does not include `start`/`dev` scripts.

### Terminal 2: Start frontend

```bash
cd Frontend
npm run dev
```

Frontend default URL: `http://localhost:5173`

Backend default URL: `http://localhost:8001`

## Frontend Routes (App)

- `/` - Home
- `/login` - Login
- `/register` - Register
- `/forgotpassword` - Forgot Password
- `/adminhome` - Admin dashboard
- `/ownerhome` - Owner dashboard
- `/renterhome` - Renter dashboard
- `/getAllProperties` - Public property cards

## API Overview

Base URL (local): `http://localhost:8001`

### User Routes (`/api/user`)

- `POST /register`
- `POST /login`
- `POST /forgotpassword`
- `GET /getAllProperties`
- `POST /getuserdata` (auth required)
- `POST /bookinghandle/:propertyid` (auth required)
- `GET /getallbookings` (auth required)

### Admin Routes (`/api/admin`)

- `GET /getallusers` (auth required)
- `POST /handlestatus` (auth required)
- `GET /getallproperties` (auth required)
- `GET /getallbookings` (auth required)

### Owner Routes (`/api/owner`)

- `POST /postproperty` (auth + multipart images)
- `GET /getallproperties` (auth required)
- `GET /getallbookings` (auth required)
- `POST /handlebookingstatus` (auth required)
- `DELETE /deleteproperty/:propertyid` (auth required)
- `PATCH /updateproperty/:propertyid` (auth + optional image)

## Backend Data Models

### User (`models/UserSchema.js`)

- `name`, `email`, `password`, `type`
- Uses `strict: false` to allow extra fields like `granted`

### Property (`models/PropertySchema.js`)

- `ownerId`, `ownerName`
- `propertyType`, `propertyAdType`, `propertyAddress`
- `ownerContact`, `propertyAmt`, `additionalInfo`
- `propertyImage` (stored upload metadata)
- Extra runtime fields are used (for example `isAvailable`)

### Booking (`models/BookingSchema.js`)

- Links user/owner/property IDs
- Stores renter details (`userName`, `phone`)
- Tracks `bookingStatus`

## Authentication

Protected API routes use `authMiddleware`.

Token can be sent by either:
- Cookie: `token`
- Header: `Authorization: Bearer <token>`

## Uploads and Static Files

- Uploaded files are stored in `Backend/uploads`
- Public access path: `/uploads/<filename>`

## Development Notes

- CORS is restricted to allowed origins listed in backend config/environment.
- Frontend API helper is centralized in `Frontend/src/config/api.js`.
- Vite proxy forwards `/api` and `/uploads` during local dev.
- Login sets an HTTP-only `token` cookie and also returns a bearer token in response.

## Available Scripts

### Frontend

- `npm run dev` - start Vite dev server
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint

### Backend

- No custom npm scripts are currently defined
- Start server with `node index.js`

## Troubleshooting

- `CORS` errors: verify `FRONTEND_URL`/`FRONTEND_ORIGIN` in backend `.env`
- `401 Unauthorized`: check token storage and request headers/cookies
- Mongo connection issues: verify `MONGO_DB` value and network access
- Image not loading: confirm correct `/uploads/...` path and backend is running
