# Khelo Vidya — ଖେଳ ବିଦ୍ୟା 🎮🌱
> **Offline-First Gamified STEM Learning Platform for Rural Odisha**  
> *Developed for Smart India Hackathon (SIH 2025) · Problem Statement ID: **SIH25048** (Govt. of Odisha)*

[![Deployment Backend](https://img.shields.io/badge/Backend%20Live-Render-46E3B7?logo=render&logoColor=white)](https://khelo-vidya.onrender.com)
[![Deployment Frontend](https://img.shields.io/badge/Frontend%20Live-Vercel-000000?logo=vercel&logoColor=white)](https://khelo-vidya.vercel.app)
[![API Health](https://img.shields.io/badge/API%20Health-Passing-brightgreen)](https://khelo-vidya.onrender.com/api/health)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![PWA](https://img.shields.io/badge/PWA-Offline%20Ready-5A0FC8?logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)

---

## 🌐 Live Deployments

| Component | Provider | Live URL | Description |
| :--- | :--- | :--- | :--- |
| **Frontend Web App (PWA)** | Vercel | [khelo-vidya.vercel.app](https://khelo-vidya.vercel.app) | Responsive React PWA with 100% offline support |
| **Backend REST API** | Render | [khelo-vidya.onrender.com](https://khelo-vidya.onrender.com) | Express + TypeScript API with PostgreSQL & in-memory fallback |
| **API Health Status** | Render | [khelo-vidya.onrender.com/api/health](https://khelo-vidya.onrender.com/api/health) | Live service status and database connectivity check |

---

## 🎯 Problem Statement (SIH25048)

In rural Odisha, middle school students (Grades 6–9) face steep hurdles in learning STEM subjects:
1. **Abstract Teaching Methods**: Chalk-and-talk methods lack tactile, intuitive feedback for concepts like Photosynthesis, Electricity, and Cells.
2. **Connectivity Deficit**: Unreliable 2G/3G connectivity prevents standard cloud-only learning apps from functioning.
3. **Language Barrier**: Most high-quality STEM simulations are in English, leaving regional Odia-medium students behind.
4. **Teacher Blindspots**: Rural educators lack automated visibility into which concepts individual students or entire classes struggle with.

---

## 💡 The Solution: Khelo Vidya

**Khelo Vidya (ଖେଳ ବିଦ୍ୟା)** bridges this educational divide with an **offline-first Progressive Web App (PWA)**:
* 📥 **Zero-Connectivity Learning**: Download once via lightweight cache; full lessons, interactive simulations, and quizzes operate 100% offline.
* 🌿 **Interactive STEM Adventures**: Hands-on 2D Canvas mini-games (e.g. Photosynthesis simulation where students balance sunlight, water, and CO₂ to grow plants).
* 🗣️ **Odia-First Bilingual Learning**: Dual Odia (`ଓଡ଼ିଆ`) and English content tailored to the Odisha State Board & NCERT curriculum.
* 🔄 **Idempotent Background Sync**: Automatically syncs completed quiz attempts and badges with the server whenever connectivity returns, preventing duplicate submissions (`attemptUUID`).
* 📊 **Teacher & School Analytics**: Identifies weak topics across classes to empower targeted remediation.

---

## ✨ Key Features

```
┌────────────────────────────────────────────────────────────────────────┐
│                        KHELO VIDYA CORE LOOP                           │
│                                                                        │
│   [ 📖 Read Lesson ] ──> [ 🎮 Play Simulation ] ──> [ 📝 Take Quiz ]   │
│           ▲                                                 │          │
│           │                                                 ▼          │
│   [ 📊 Teacher View ] <── [ 🔄 Background Sync ] <── [ 🏆 Earn XP/Badges]│
└────────────────────────────────────────────────────────────────────────┘
```

- **Offline-First Storage Engine**: Uses `Dexie.js` (IndexedDB) and Workbox Service Workers for local caching of lessons, progress, and pending sync queues.
- **Rule-Based Adaptive Difficulty**: Dynamically adapts subsequent questions between Easy, Medium, and Hard based on student quiz accuracy.
- **Gamified Progression**: Earn XP, level up botanical plant stages, unlock badges (e.g., *Plant Champion*, *Quiz Master*), and maintain daily learning streaks.
- **Optimized for Low-Bandwidth Devices**: Route-level code-splitting reduces initial bundle size to `< 210 kB` (64 kB gzip), ensuring instant loading even on 2G connections.
- **Enterprise-Grade SEO & OpenGraph**: Structured schema, meta tags, and bilingual page descriptions for high search engine visibility.

---

## 🏗️ Architecture & Tech Stack

### Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite 6, React Router 7, Lucide Icons, HTML5 2D Canvas |
| **Offline / PWA** | `vite-plugin-pwa`, Workbox, `Dexie.js` (IndexedDB) |
| **Backend** | Node.js (v22+), Express, TypeScript, `bcryptjs`, `jsonwebtoken`, `cors` |
| **Database** | PostgreSQL (`pg`), Neon Cloud Database, with seamless In-Memory educational store fallback |
| **Hosting** | Vercel (Client PWA) + Render (Node API Service) |

---

## 👥 Demo Accounts (Quick Login)

You can explore Khelo Vidya instantly with seeded demo credentials:

| Role | Username / Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| 🧑‍🎓 **Student** | `subhashree_7` | `password123` | Grade 7 Student (Govt. High School, Khordha) |
| 👨‍🏫 **Teacher** | `teacher_pradeep` | `password123` | STEM Teacher Dashboard & Analytics |
| 🏛️ **Admin** | `admin_odisha` | `password123` | State SME Department Regional View |

*Or click **"Quick Demo Access"** on the login page to sign in with one click.*

---

## 🚀 Local Development Setup

### Prerequisites
- **Node.js**: `v20.x` or higher
- **pnpm** (or `npm` / `yarn`): `pnpm install -g pnpm`

### 1. Clone the Repository
```bash
git clone https://github.com/Mr-Madhukar/Khelo-Vidya.git
cd Khelo-Vidya
```

### 2. Install Dependencies
```bash
# Install workspace dependencies for both client and server
pnpm install
```

### 3. Environment Configuration

**Server Environment** (`server/.env`):
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=super-secret-jwt-key-for-development-only-32chars
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/khelo_vidya
CORS_ORIGIN=http://localhost:5173
```

**Client Environment** (`client/.env`):
```env
VITE_API_URL=http://localhost:5000
```

### 4. Run Locally

**Option A: Run both Client and Server concurrently**
```bash
# In the root directory:
pnpm run dev
```

**Option B: Run separately**
```bash
# Terminal 1: Backend Server
cd server
npm run dev

# Terminal 2: Frontend Client PWA
cd client
npm run dev
```

Frontend will open at: `http://localhost:5173`  
Backend API will be live at: `http://localhost:5000`

---

## 📡 REST API Reference

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Health and database status check | No |
| `POST` | `/api/auth/register` | Register new student or teacher account | No |
| `POST` | `/api/auth/login` | Authenticate user & receive JWT token | No |
| `GET` | `/api/auth/me` | Fetch authenticated user profile | Yes (Bearer) |
| `GET` | `/api/lessons` | List STEM lessons (filter by grade/subject) | No |
| `GET` | `/api/lessons/:id` | Get lesson details with interactive body | No |
| `GET` | `/api/lessons/:id/quiz` | Fetch lesson quiz questions | No |
| `POST` | `/api/attempts` | Submit quiz attempt (idempotent via `attemptUUID`) | Yes (Bearer) |
| `GET` | `/api/progress` | Fetch student progress, XP, and badges | Yes (Bearer) |
| `GET` | `/api/game/progress/:lessonId` | Get STEM simulation stage & XP | Yes (Bearer) |
| `POST` | `/api/game/progress` | Save STEM game stage progress | Yes (Bearer) |

---

## 🔍 SEO & Web Performance

- **Fast First Load**: Minified and chunk-split JavaScript (<65 kB initial gzip).
- **Service Worker Pre-caching**: 100% offline availability of fonts, styles, and UI components.
- **Multilingual Meta Tags**: OpenGraph & Twitter Cards optimized for Odia and English search indexing.
- **Accessible & Semantic HTML**: Keyboard navigability, screen-reader compatible color contrasts, and responsive layout for mobile screens (320px–1440px).

---

## 📜 Research & Institutional References

- **NEP 2020 (National Education Policy, Govt. of India)**: Foundational framework for equitable, tech-enabled regional education.
- **DIKSHA / Sunbird (NCERT / Ministry of Education)**: Curriculum-aligned pedagogical content standards.
- **UNESCO (2023)**: *Digital Learning for All: Solutions for Low-Connectivity Contexts*.
- **Project Bhashini (Ministry of Electronics & IT, India)**: Regional Indian language translation and voice standards.

---

## 👨‍💻 Team Binary Beasts

Developed with ❤️ for the students and teachers of Odisha.  
*Submission for Smart India Hackathon (SIH 2025)*
