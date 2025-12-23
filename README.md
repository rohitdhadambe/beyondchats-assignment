# BeyondChats – Technical Product Manager Assignment

## Overview

This project demonstrates an end-to-end content processing system for BeyondChats. It includes article ingestion, AI-based enhancement, and a clean frontend for viewing content. The solution is designed with real-world production practices, including graceful handling of empty data and external API limitations.

## Tech Stack

- **Backend:** Laravel (PHP 8.4), REST APIs
- **Database:** PostgreSQL (Render)
- **AI Pipeline:** Node.js (Axios, Cheerio, OpenAI API)
- **Frontend:** React (Vite)
- **Deployment:** Backend & Database → Render, Frontend → Vercel

## System Architecture & Flow

Articles are scraped and stored in the backend database. A Node.js pipeline enhances content using AI (with fallback handling). Backend exposes REST APIs. Frontend fetches and displays articles.
```
BeyondChats Blog
       ↓
Laravel Backend (APIs)
       ↓
PostgreSQL Database
       ↓
Node.js AI Pipeline
       ↓
React Frontend
```

## Phase-wise Implementation

### Phase 1 – Backend
- Scraped BeyondChats blog articles
- Stored articles in PostgreSQL
- Exposed CRUD APIs using Laravel

### Phase 2 – AI Pipeline
- Fetched latest articles from backend
- Searched and scraped reference content
- Integrated OpenAI API for article rewriting
- Implemented fallback logic when API quota is exceeded
- Stored updated articles back into backend

### Phase 3 – Frontend
- Built a React-based UI
- Displays original and updated articles
- Handles empty state gracefully
- Redirects users to BeyondChats blog for full articles

## Live URLs

- **Deployed Link:** https://beyondchats-assignment-six.vercel.app/
- **GitHub Repository:** https://github.com/rohitdhadambe/beyondchats-assignment

## Local Setup (Optional)

### Backend
```bash
cd backend-laravel
composer install
php artisan migrate
php artisan serve
```

### AI Pipeline
```bash
cd node-ai-script
npm install
node index.js
```

### Frontend
```bash
cd frontend-react
npm install
npm run dev
```

## Notes & Design Decisions

- The production database starts empty by design
- Demo articles are shown when no data exists to improve UX
- AI quota limitations are handled gracefully using fallback logic
- The frontend redirects users to the BeyondChats blog hub for full articles
- Focus was placed on clarity, robustness, and production readiness

## Final Remarks

This project reflects real-world system design, clean deployment practices, and thoughtful handling of edge cases. The application is fully deployed and ready for evaluation.