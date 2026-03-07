# HouseRent Backend

Express + MongoDB backend for the HouseRent MERN project.

## Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- JWT authentication
- Cookie-based auth support
- Multer (file uploads)

## Prerequisites

- Node.js 18+
- npm
- MongoDB connection string

## Environment Variables

Create `Backend/.env`:

```env
MONGO_DB=your_mongodb_connection_string
JWT_KEY=your_jwt_secret
PORT=8001
FRONTEND_URL=http://localhost:5173
# optional
FRONTEND_ORIGIN=http://127.0.0.1:5173
```

Variable summary:

- `MONGO_DB`: MongoDB connection URI.
- `JWT_KEY`: secret key for signing/verifying JWT tokens.
- `PORT`: backend server port.
- `FRONTEND_URL`, `FRONTEND_ORIGIN`: allowed frontend origins for CORS.

## Installation

```bash
cd Backend
npm install
```

## Run Server

Current `package.json` does not include a start/dev script.

Use:

```bash
node index.js
```

Recommended scripts to add later:

```json
"scripts": {
  "dev": "nodemon index.js",
  "start": "node index.js"
}
```

## API Base URL

Local: `http://localhost:8001`

## Route Groups

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

- `POST /postproperty` (auth required, multipart files)
- `GET /getallproperties` (auth required)
- `GET /getallbookings` (auth required)
- `POST /handlebookingstatus` (auth required)
- `DELETE /deleteproperty/:propertyid` (auth required)
- `PATCH /updateproperty/:propertyid` (auth required, optional image)

## Authentication

- Login issues a JWT.
- Auth middleware accepts token from:
  - cookie `token`
  - `Authorization: Bearer <token>` header
- Protected routes use `authMiddleware`.

## Uploads

- Uploaded files are saved to `Backend/uploads`.
- Static access path: `/uploads/<filename>`.

## Security and Production Notes

- Do not commit real secrets in `.env`.
- Ensure strong `JWT_KEY` in production.
- Restrict CORS origins to trusted frontend URLs.
- Exclude sensitive fields (like password hash) from admin/user list responses.

## Folder Overview

- `config/`: DB connection
- `controllers/`: route handlers
- `middlewares/`: auth middleware
- `models/`: Mongoose schemas
- `routes/`: route definitions
- `uploads/`: uploaded property images
