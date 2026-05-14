# User Management App

Full-stack user management monorepo: Web + Mobile + REST API.

## Tech Stack

|             |                                                            |
| ----------- | ---------------------------------------------------------- |
| **Web**     | React 19, Vite 7, Tailwind CSS v4, React Router v7, Motion |
| **Mobile**  | React Native 0.85.3, React Navigation, Reanimated v4       |
| **API**     | Express 5, Prisma, SQLite                                  |
| **Shared**  | Zod v4, Luxon, TypeScript                                  |
| **State**   | Redux Toolkit + TanStack Query v5                          |
| **Forms**   | React Hook Form + Zod                                      |
| **Tooling** | Yarn Workspaces, Husky, lint-staged, ESLint, Prettier      |

## Project Structure

```
user-management-app/
├── apps/
│   ├── web/          # React web app
│   ├── mobile/       # React Native app
│   └── api/          # Express REST API
└── packages/
    └── shared/       # Zod schemas, types, Luxon utils (shared across all apps)
```

---

## Getting Started

### 1. Install dependencies

```bash
yarn install
```

### 2. First-time setup (env + database)

```bash
yarn setup
```

This script automatically:

- Creates all `.env` files from examples
- Creates the SQLite database
- Seeds it with sample data

> **Android emulator?** After setup, open `apps/mobile/.env` and change `API_URL` to `http://10.0.2.2:3001`

### 3. Run the apps

Open **two terminals**:

```bash
# Terminal 1 — API
yarn api
# → http://localhost:3001

# Terminal 2 — Web
yarn web
# → http://localhost:3000
```

---

## Running the Mobile App

### iOS

```bash
# Install CocoaPods (first time only)
cd apps/mobile/ios && bundle exec pod install && cd ../../..

# Terminal 1 — Metro bundler
yarn mobile

# Terminal 2 — Run on simulator
yarn mobile:ios
```

### Android

```bash
# Terminal 1 — Metro bundler
yarn mobile

# Terminal 2 — Run on emulator
yarn mobile:android
```

---

## API Endpoints

| Method   | Endpoint         | Description    |
| -------- | ---------------- | -------------- |
| `GET`    | `/api/users`     | List all users |
| `GET`    | `/api/users/:id` | Get user by ID |
| `POST`   | `/api/users`     | Create user    |
| `PUT`    | `/api/users/:id` | Update user    |
| `DELETE` | `/api/users/:id` | Delete user    |
| `GET`    | `/health`        | Health check   |

---

## Other Commands

```bash
# Run tests
yarn workspace @uma/web test

# Type check all apps
yarn type-check

# Lint all apps
yarn lint

# Prisma Studio (visual database browser)
yarn workspace @uma/api db:studio
```

---

## Branch Strategy

```
main        ← stable
  └── develop
        └── feature/*
```
