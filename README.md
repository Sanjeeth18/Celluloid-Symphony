# 🎬 Celluloid Symphony

**Celluloid Symphony** is a modern, high-performance, dynamic web application designed for film and television enthusiasts to explore movies, TV series, actors, and cinema trends. Built with **React 18**, **TailwindCSS**, and **TanStack React Query**, it connects seamlessly to **The Movie Database (TMDb) API** via a secure **Vercel Serverless API Proxy layer**.

---

## 📖 Table of Contents
- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Project Workflow](#-project-workflow)
- [Environment Variables](#-environment-variables)
- [Getting Started & Setup](#-getting-started--setup)
- [Available Scripts](#-available-scripts)
- [Tech Stack](#-tech-stack)

---

## 🌟 Project Overview

Celluloid Symphony brings the world of cinema to life with an interactive, mobile-first single-page application (SPA). Key highlights of the project:

- **Security First**: All TMDb API keys and Bearer Tokens are encapsulated behind serverless API proxy handlers in the [`/api`](file:///e:/Celluloid-Symphony/api) directory, ensuring sensitive credentials are never exposed to the client browser.
- **Smart Data Caching**: Powered by [`@tanstack/react-query`](file:///e:/Celluloid-Symphony/package.json#L7) to cache TMDb API queries, minimize network requests, and manage async loading states effortlessly.
- **Immersive User Experience**: Utilizes **Framer Motion**, **AOS animations**, and **Swiper** sliders for fluid micro-interactions, responsive carousel rails, and cinematic transitions.
- **Responsive Layout**: Designed with a mobile-first philosophy using **TailwindCSS** and custom layout break-point management (`react-responsive`).

---

## 🔥 Key Features

- **🎬 Trending & Discover**: Explore currently trending movies and top-rated TV series with dynamic filters by release year.
- **🔍 Multi-Entity Search**: Real-time unified search across movies, TV series, and cast members.
- **📽️ Rich Media Details**: View comprehensive title details, including overview, cast & crew credits, high-resolution backdrops/posters, official trailers, and user reviews.
- **👤 Cast & Crew Profiles**: Dedicated actor pages detailing biography, personal facts, and complete filmography.
- **⚡ Skeleton Loading & Toast Notifications**: Smooth UI loading states via custom skeleton screens and real-time toast feedback with `react-hot-toast`.

---

## 📐 System Architecture

Celluloid Symphony follows a multi-tier architecture dividing client-side UI rendering, proxy API abstraction, and external TMDb data services.

```
┌─────────────────────────────────────────────────────────┐
│                      Client Browser                     │
│  React 18 SPA + React Router v6 + TanStack React Query  │
└────────────────────────────┬────────────────────────────┘
                             │
                  HTTP Fetch │ /api/*
                             ▼
┌─────────────────────────────────────────────────────────┐
│              Vercel Serverless Proxy Layer              │
│ ┌──────────────┐ ┌──────────────┐ ┌───────────────────┐ │
│ │  movies.js   │ │    tv.js     │ │    details.js     │ │
│ └──────────────┘ └──────────────┘ └───────────────────┘ │
│ ┌──────────────┐ ┌──────────────┐                       │
│ │  person.js   │ │  search.js   │  (Injects API Keys)   │
│ └──────────────┘ └──────────────┘                       │
└────────────────────────────┬────────────────────────────┘
                             │
            Authenticated    │ https://api.themoviedb.org/3
            HTTPS Request    ▼
┌─────────────────────────────────────────────────────────┐
│              TMDb (The Movie Database) API              │
└─────────────────────────────────────────────────────────┘
```

### Architectural Components

1. **Frontend Layer (`/src`)**:
   - [`App.js`](file:///e:/Celluloid-Symphony/src/App.js): Global application entry point configuring React Router, `QueryClientProvider`, context providers, and toast notifications.
   - [`src/services/tmdb.js`](file:///e:/Celluloid-Symphony/src/services/tmdb.js): Centralized API service interfacing between client components and backend proxy routes.
   - [`src/components`](file:///e:/Celluloid-Symphony/src/components): Modular UI components ([`Header.jsx`](file:///e:/Celluloid-Symphony/src/components/Header.jsx), [`Footer.jsx`](file:///e:/Celluloid-Symphony/src/components/Footer.jsx), [`Details.jsx`](file:///e:/Celluloid-Symphony/src/components/Details.jsx), [`MovieSwiper.jsx`](file:///e:/Celluloid-Symphony/src/components/MovieSwiper.jsx)).
   - [`src/components/ui`](file:///e:/Celluloid-Symphony/src/components/ui): Reusable UI primitives ([`MovieCard.jsx`](file:///e:/Celluloid-Symphony/src/components/ui/MovieCard.jsx), [`SkeletonCard.jsx`](file:///e:/Celluloid-Symphony/src/components/ui/SkeletonCard.jsx), [`GlobalLoader.jsx`](file:///e:/Celluloid-Symphony/src/components/ui/GlobalLoader.jsx)).

2. **Serverless Proxy API Layer (`/api`)**:
   - [`/api/movies.js`](file:///e:/Celluloid-Symphony/api/movies.js): Handles movie discovery, trending feeds, and year filters.
   - [`/api/tv.js`](file:///e:/Celluloid-Symphony/api/tv.js): Manages TV series discovery and filters.
   - [`/api/details.js`](file:///e:/Celluloid-Symphony/api/details.js): Fetches movie/TV reviews, videos, credits, and images via TMDb Bearer Token (`TMDB_AUTH_TOKEN`).
   - [`/api/person.js`](file:///e:/Celluloid-Symphony/api/person.js): Retrieves actor bio and movie/TV credits.
   - [`/api/search.js`](file:///e:/Celluloid-Symphony/api/search.js): Executes multi-search queries.

---

## 🔄 Project Workflow

### 1. Development Lifecycle
```
Feature Request / Idea ➔ Local Code Changes ➔ API Proxy Test ➔ Build Verification ➔ Vercel Deployment
```

### 2. End-to-End Data Flow
1. **User Interaction**: User navigates to a movie details page or performs a search query.
2. **Query Hook Trigger**: React Component invokes a query via TanStack React Query.
3. **API Service Dispatch**: Request is routed through [`src/services/tmdb.js`](file:///e:/Celluloid-Symphony/src/services/tmdb.js) pointing to `/api/*`.
4. **Serverless Request Handling**: Vercel function reads server environment variables (`TMDB_API_KEY` / `TMDB_AUTH_TOKEN`), formats the request URL, and queries TMDb API.
5. **Caching & UI Render**: TMDb response is returned, cached in memory by React Query (`staleTime: 5 mins`), and rendered in the component.

---

## 🔑 Environment Variables

The project requires TMDb API credentials to fetch media data. Copy [`.env.example`](file:///e:/Celluloid-Symphony/.env.example) to `.env` in the root directory before running the application:

```bash
cp .env.example .env
```

### Required Variables

| Variable Name | Required | Description |
| :--- | :---: | :--- |
| `TMDB_API_KEY` | **Yes** | Your TMDb API Key (v3 auth) used by `/api/movies`, `/api/tv`, `/api/person`, `/api/search` |
| `TMDB_AUTH_TOKEN` | **Yes** | TMDb v4 Read Access Token (Bearer token) used by `/api/details` |
| `REACT_APP_TMDB_IMAGE_BASE_URL` | No | Optional base URL for images (defaults to `https://image.tmdb.org/t/p/original`) |

---

## 🛠️ Getting Started & Setup

### Prerequisites
Make sure you have the following installed on your machine:
- **Node.js**: `v16.x` or higher
- **npm**: `v8.x` or higher
- **TMDb Account**: Obtain API credentials from [The Movie Database API Settings](https://www.themoviedb.org/settings/api).

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Sanjeeth18/Celluloid-Symphony.git
   cd Celluloid-Symphony
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```
   Open `.env` and fill in your actual TMDb credentials:
   ```env
   TMDB_API_KEY=your_actual_tmdb_api_key
   TMDB_AUTH_TOKEN=your_actual_tmdb_bearer_token
   ```

4. **Run the Application**:

   - **Using Vercel CLI (Recommended for Serverless API testing)**:
     ```bash
     npx vercel dev
     ```
     This runs both the React frontend and Vercel serverless `/api` functions locally.

   - **Standard React Development Server**:
     ```bash
     npm start
     ```
     Runs the app in development mode at `http://localhost:3000`. Note that requests to `/api` proxy through `package.json` proxy configuration.

5. **Build for Production**:
   ```bash
   npm run build
   ```
   Generates optimized production assets in the `build/` folder.

---

## 📜 Available Scripts

In the project directory, you can run:

- `npm start` – Runs the app in development mode.
- `npm run build` – Builds the app for production to the `build` folder.
- `npm test` – Launches the test runner.
- `npm run eject` – Removes single-build dependency configuration (Irreversible).

---

## 💻 Tech Stack

- **Frontend**: React 18, React Router v6, TanStack React Query (`@tanstack/react-query`)
- **Styling**: TailwindCSS, Bootstrap 5, React Bootstrap, Custom CSS
- **Animations & Sliders**: Framer Motion, AOS (Animate on Scroll), Swiper
- **API & State**: Axios, Fetch API, React Context API
- **Backend / Serverless**: Vercel Serverless Functions (`/api`), Node.js
- **Data Source**: [The Movie Database (TMDb) API](https://www.themoviedb.org/documentation/api)

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.