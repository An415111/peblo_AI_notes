# Peblo AI Notes Workspace

An AI-powered full stack notes management application built for the Peblo Full Stack Developer Internship Challenge.

The application allows users to:
- Create and manage notes
- Generate AI summaries
- Search notes instantly
- Store notes securely in MongoDB
- Use protected JWT authentication APIs

---

# Features

## Authentication
- User Signup
- User Login
- JWT Authentication
- Protected Routes

## Notes Management
- Create Notes
- Fetch Notes
- Dynamic Sidebar
- Real-time Dashboard Updates

## AI Features
- AI-generated summaries using OpenRouter API
- Smart note summarization

## Search
- Instant note search functionality

## UI
- Modern responsive dashboard
- Dark theme design
- Tailwind CSS styling

---

# Tech Stack

## Frontend
- React.js
- Tailwind CSS
- Axios
- Vite

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

## AI Integration
- OpenRouter API

---

# Folder Structure

```bash
frontend/
backend/
README.md
```

---

# Installation & Setup

## 1. Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_LINK
```

---

## 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file inside backend folder:

```env
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret_key

OPENROUTER_API_KEY=your_openrouter_api_key
```

Run backend:

```bash
npm run dev
```

---

## 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# API Endpoints

## Authentication

### Signup
```http
POST /api/auth/signup
```

### Login
```http
POST /api/auth/login
```

---

## Notes

### Create Note
```http
POST /api/notes
```

### Get Notes
```http
GET /api/notes
```

### Generate AI Summary
```http
POST /api/notes/ai-summary/:id
```

---

# Screenshots

## Dashboard
- Notes sidebar
- AI summary generation
- Search functionality
- Analytics cards

---

# Future Improvements

- Public note sharing
- Rich text editor
- Tags filtering
- File attachments
- Deployment support
- Team collaboration

---

# Author

Ankit Gupta

BSc Computer Science Student  
Mumbai, India

---

# Assignment Submission

Submitted for:
Peblo Full Stack Developer Internship Challenge