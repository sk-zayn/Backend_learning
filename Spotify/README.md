# 🎵 Spotify — Music Upload API

A backend service for uploading and managing music tracks, built with
Node.js and Express. Handles user authentication, file uploads, and
cloud media storage.

## Features
- **User Authentication** — JWT-based auth with secure password hashing (bcryptjs)
- **Music Upload** — Upload audio/image files using Multer middleware
- **Cloud Media Storage** — Uploaded files are stored and served via ImageKit
- **Database** — MongoDB with Mongoose for schema modeling and data persistence
- **RESTful API design** — Clean route/controller structure for scalability

## Tech Stack
| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express |
| Database | MongoDB (Mongoose ODM) |
| Auth | JWT, bcryptjs |
| File Uploads | Multer |
| Media Storage | ImageKit (`@imagekit/nodejs`) |

## Project Structure
```
Spotify/
├── controllers/     # Route handlers (auth, upload, etc.)
├── models/          # Mongoose schemas
├── routes/          # Express route definitions
├── middleware/       # Auth & Multer middleware
├── config/          # DB and ImageKit configuration
└── server.js         # App entry point
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Atlas account (or local MongoDB instance)
- ImageKit account and API keys

### Installation
```bash
git clone https://github.com/sk-zayn/Backend_learning.git
cd Backend_learning/Spotify
npm install
```

### Environment Variables
Create a `.env` file in the project root:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

### Run the server
```bash
npm run dev
```

## What I Learned Building This
- Handling file uploads with Multer and streaming them to a cloud service
  without unnecessary base64 overhead
- Structuring JWT authentication and protecting routes with middleware
- Debugging async/await edge cases and Promise-based errors in Express
  route handlers
- Designing Mongoose schemas for relational-style data (users ↔ tracks)

## Status
Actively in development — next up: playlist support and search functionality.
