# HomeHunt

# HomeHunt - Full Stack House Rental Platform

A full-stack MERN house rental platform where renters can discover and book properties, owners can manage listings, and admins can control platform operations.

---

## Features

- Authentication: JWT-based register/login with bcrypt password hashing
- Role-based access: Admin, Owner, and Renter flows
- Property listings: Browse all available properties
- Owner dashboard: Add, update, and delete property listings
- Booking workflow: Create bookings and manage booking status
- Admin panel: View users, properties, bookings, and handle owner approval
- Image upload: Property image upload via multer with static serving
- Responsive UI: Built with React + Tailwind CSS

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 7, React Router, Axios, Tailwind CSS 4, Ant Design |
| Backend | Node.js, Express 5, JWT, bcrypt, cookie-parser, multer |
| Database | MongoDB (Mongoose) |
| Auth | JWT + HTTP-only cookie / Bearer token |
| API Client | Centralized `apiUrl()` and `assetUrl()` helpers |
| Dev Tools | ESLint, Nodemon |

---

## Project Structure

```text
Nitin/
|- README.md
|- Backend/
|  |- index.js
|  |- package.json
|  |- .env
|  |- config/
|  |  |- connect.js
|  |- controllers/
|  |  |- adminController.js
|  |  |- ownerController.js
|  |  |- userController.js
|  |- middlewares/
|  |  |- authMiddleware.js
|  |- models/
|  |  |- BookingSchema.js
|  |  |- PropertySchema.js
|  |  |- UserSchema.js
|  |- routes/
|  |  |- adminRoutes.js
|  |  |- ownerRoutes.js
|  |  |- userRoutes.js
|  |- uploads/
|
|- Frontend/
   |- package.json
   |- vite.config.js
   |- index.html
   |- src/
      |- App.jsx
      |- main.jsx
      |- config/
      |  |- api.js
      |- context/
      |  |- UserContext.jsx
      |- modules/
         |- admin/
         |- common/
         |- user/
```

---

## Quick Start

### Prerequisites

- Node.js 18+
- npm
- MongoDB Atlas/local MongoDB URI

---

### 1. Clone and Install

```bash
git clone https://github.com/Nkj-718/HomeHunt.git
cd HomeHunt

# Install backend dependencies
cd Backend
npm install

# Install frontend dependencies
cd ../Frontend
npm install
```

---

### 2. Configure Environment Variables

Backend (`Backend/.env`):

```env
MONGO_DB=your_mongodb_connection_string
JWT_KEY=your_jwt_secret_key
PORT=8001
FRONTEND_URL=http://localhost:5173
FRONTEND_ORIGIN=http://127.0.0.1:5173
```

Frontend (`Frontend/.env`) - optional for deployed mode:

```env
VITE_API_URL=http://localhost:8001
```

Notes:
- In local development (`localhost`/`127.0.0.1`), frontend uses Vite proxy for `/api` and `/uploads`.
- In deployed builds, frontend uses `VITE_API_URL` as backend host.

---

### 3. Run Development Servers

```bash
# Terminal 1 - Backend
cd Backend
npm start

# Terminal 2 - Frontend
cd Frontend
npm run dev
```

App URL: `http://localhost:5173`
Backend URL: `http://localhost:8001`

---

## API Reference

Base URL: `http://localhost:8001`

### User APIs (`/api/user`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/user/register` | Register user (Renter/Owner/Admin) |
| POST | `/api/user/login` | Login and issue JWT token |
| POST | `/api/user/forgotpassword` | Reset password |
| GET | `/api/user/getAllProperties` | Get all listed properties |
| POST | `/api/user/getuserdata` | Get current user data (auth required) |
| POST | `/api/user/bookinghandle/:propertyid` | Create booking for property (auth required) |
| GET | `/api/user/getallbookings` | Get renter bookings (auth required) |

### Admin APIs (`/api/admin`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/getallusers` | Get all users (auth required) |
| POST | `/api/admin/handlestatus` | Approve/reject owner status (auth required) |
| GET | `/api/admin/getallproperties` | Get all properties (auth required) |
| GET | `/api/admin/getallbookings` | Get all bookings (auth required) |

### Owner APIs (`/api/owner`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/owner/postproperty` | Add new property with images (auth required) |
| GET | `/api/owner/getallproperties` | Get owner properties (auth required) |
| GET | `/api/owner/getallbookings` | Get owner bookings (auth required) |
| POST | `/api/owner/handlebookingstatus` | Update booking status (auth required) |
| DELETE | `/api/owner/deleteproperty/:propertyid` | Delete owner property (auth required) |
| PATCH | `/api/owner/updateproperty/:propertyid` | Update owner property (auth required) |

---

## Frontend Routes

| Route | Description |
|------|-------------|
| `/` | Landing/home page |
| `/login` | User login |
| `/register` | User registration |
| `/forgotpassword` | Password reset |
| `/adminhome` | Admin dashboard |
| `/ownerhome` | Owner dashboard |
| `/renterhome` | Renter dashboard |
| `/getAllProperties` | Property browsing cards |

---

## Security Features

- bcrypt password hashing
- JWT authentication with expiry
- Auth middleware for protected endpoints
- Cookie-based auth support (`token`) + Bearer token fallback
- CORS allowlist based on environment variables
- Owner approval workflow handled by admin

---

## Database Models

### User

```text
name, email, password, type, granted(optional)
```

### Property

```text
ownerId, ownerName, propertyType, propertyAdType, propertyAddress,
ownerContact, propertyAmt, propertyImage, additionalInfo, isAvailable
```

### Booking

```text
propertyId/propertId, ownerID, userID, userName, phone, bookingStatus
```

---

## Available Scripts

### Backend (`Backend/package.json`)

- `npm start` - run backend using nodemon
- `npm test` - placeholder test script

### Frontend (`Frontend/package.json`)

- `npm run dev` - start Vite dev server
- `npm run build` - create production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint

---

## Troubleshooting

- If backend fails to start, confirm `.env` exists in `Backend/` and `MONGO_DB` is valid.
- If frontend cannot call APIs, verify backend is running on `8001` and CORS origins match.
- On Windows, folder names are case-sensitive in commands here; use exactly `Backend` and `Frontend`.
- If images do not render, ensure files exist under `Backend/uploads` and backend static route is active.

---

## Deployment

### Backend

- Deploy `Backend/` to any Node hosting (Render, Railway, EC2, VPS)
- Set environment variables from `Backend/.env`
- Start command: `npm start`

### Frontend

- Deploy `Frontend/` to Vercel/Netlify
- Set `VITE_API_URL` to your deployed backend URL
- Build command: `npm run build`

---

## License

MIT License - free to use for educational and personal projects.
