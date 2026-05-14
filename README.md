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

### 2. Create env files

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
cp apps/mobile/.env.example apps/mobile/.env
```

> **Android emulator?** In `apps/mobile/.env` change `API_URL` to `http://10.0.2.2:3001`

### 3. Set up the database (first time only)

```bash
# Generate Prisma client
yarn workspace @uma/api db:generate

# Create SQLite database and tables
cd apps/api && npx prisma db push && cd ../..

# Seed with sample data (optional)
yarn workspace @uma/api db:seed
```

### 4. Run the apps

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

# Start Metro bundler
yarn mobile

# Run on simulator (in a new terminal)
yarn mobile:ios
```

### Android

```bash
# Start Metro bundler
yarn mobile

# Run on emulator (in a new terminal)
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

# Check types across all apps
yarn type-check

# Lint all apps
yarn lint

# Prisma Studio (visual DB browser)
yarn workspace @uma/api db:studio
```

---

## Branch Strategy

```
main        ← stable
  └── develop
        └── feature/*
```
