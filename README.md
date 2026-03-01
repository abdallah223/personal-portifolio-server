# Portfolio Server (Mentor Notes)

This repository is the backend API for my portfolio project. It is built with **Node.js + Express + TypeScript + MongoDB (Mongoose)** and supports both public portfolio content and private admin content.

## Purpose
- Serve public portfolio data (published projects and profile)
- Provide protected CRUD endpoints for managing portfolio content
- Handle JWT-based authentication for private routes
- Support image uploads for project cover images

## Tech Stack
- Node.js, Express 5
- TypeScript (ESM)
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- Password hashing (`bcrypt`)
- File upload (`multer`)

## Project Structure
```text
src/
  common/
    errors/
      asyncHandler.ts
      errorHandler.ts
    middleware/
      requireAuth.ts
      upload.ts
  configs/
    db.ts
    env.ts
  modules/
    auth/
    profile/
    project/
  index.ts
public/
  uploads/
```

## Environment Variables
Create `.env` in project root with:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_jwt_secret
```

## Run Locally
```bash
npm install
npm run dev
```

Server starts on `http://localhost:3000` by default.

## CORS
Allowed origins are currently hardcoded in `src/index.ts`:
- `http://localhost:4200`
- `http://localhost:4201`

## Authentication
- Login endpoint: `POST /api/v1/auth/login`
- Request body:
```json
{
  "email": "admin@example.com",
  "password": "your_password"
}
```
- Response includes access token:
```json
{
  "accessToken": "..."
}
```
- Private endpoints require:
`Authorization: Bearer <accessToken>`

## API Overview
### Public Routes
- `GET /api/v1/public/projects` -> list published projects
- `GET /api/v1/public/projects/:slug` -> get one published project
- `GET /api/v1/public/profile` -> list published profile(s)

### Private Routes (JWT required)
#### Projects
- `GET /api/v1/private/projects` -> list all projects
- `GET /api/v1/private/projects/:slug` -> get project by slug
- `POST /api/v1/private/projects` -> create project (multipart, optional `coverImage`)
- `PATCH /api/v1/private/projects/:slug` -> update project (multipart, optional `coverImage`)
- `DELETE /api/v1/private/projects/:slug` -> delete project

#### Profile
- `GET /api/v1/private/profile` -> list all profiles
- `PATCH /api/v1/private/profile` -> update published profile

## Data Models
### User
- `email` (unique, validated)
- `password` (hashed, min length 8)

### Project
- `title`, `slug`, `summary`
- `problem`, `solution`
- `impact[]`, `stack[]`
- `links.live`, `links.repo`
- `coverImageUrl`
- `featured` (boolean)
- `status` (`draft` | `published`)

### Profile
- `name`, `headline`, `about`, `location`
- `socials.github`, `socials.linkedin`, `socials.email`, `socials.website`
- `status` (`draft` | `published`)

## Upload Notes
- Upload destination: `public/uploads`
- Accepted image types: `.jpg`, `.jpeg`, `.png`, `.webp`
- Max file size: `5 MB`
- Uploaded files are served statically via `/uploads/...`

## Current Limitations / Notes
- There is no register endpoint yet; users must exist in DB for login.
- Error handler currently returns `500` for unhandled errors with simple message output.
- CORS origins are static and can be moved to environment config later.
- No automated tests yet.

## Suggested Next Improvements
- Add register/seed-admin flow
- Add request validation (e.g., Zod/Joi)
- Add refresh-token strategy
- Add pagination/filtering for projects
- Add test coverage (unit + integration)

## Import Existing DB Data (Mentor)
The repository includes MongoDB export files in `data/exports/`:
- `data/exports/portfolio.projects.json`
- `data/exports/portfolio.profiles.json`

### Prerequisite
Install MongoDB Database Tools so `mongoimport` is available.

### Import Commands
From the project root, run:

```bash
mongoimport --uri "<YOUR_MONGO_URI>" --db portfolio --collection projects --file data/exports/portfolio.projects.json --jsonArray --drop
mongoimport --uri "<YOUR_MONGO_URI>" --db portfolio --collection profiles --file data/exports/portfolio.profiles.json --jsonArray --drop
```

If your database name is not `portfolio`, replace `--db portfolio` with your DB name.

### Verify Import
After running imports, start server:

```bash
npm run dev
```

Then check:
- `GET /api/v1/public/projects`
- `GET /api/v1/public/profile`

You should receive the imported data.
