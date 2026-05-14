# User Management App

A full-stack user management application built as a monorepo, featuring a Web app, Mobile app (React Native), and REST API backend.

## Tech Stack

| Layer       | Technology                                                        |
| ----------- | ----------------------------------------------------------------- |
| **Web**     | React 19, Vite, Tailwind CSS v4, React Router v7, Motion          |
| **Mobile**  | React Native 0.85.3, React Navigation, React Native Reanimated v4 |
| **API**     | Express 5, Prisma, SQLite                                         |
| **Shared**  | Zod v4, Luxon, TypeScript                                         |
| **State**   | Redux Toolkit + TanStack Query v5                                 |
| **Forms**   | React Hook Form + Zod                                             |
| **Tooling** | Yarn Workspaces, Husky, lint-staged, ESLint, Prettier             |

## Project Structure

```
user-management-app/
├── apps/
│   ├── web/          # React web application
│   ├── mobile/       # React Native mobile application
│   └── api/          # Express REST API
└── packages/
    └── shared/       # Shared Zod schemas, types, Luxon utils
```

## Prerequisites

- Node.js >= 22
- Yarn 3.6.4+
- For iOS: Xcode, CocoaPods (`gem install cocoapods`)
- For Android: Android Studio, JDK 17+

## Environment Setup

Copy env files and fill in values:

```bash
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
cp apps/mobile/.env.example apps/mobile/.env
```

**apps/api/.env**

```env
API_PORT=3001
DATABASE_URL="file:./dev.db"
```

**apps/web/.env**

```env
VITE_API_URL=http://localhost:3001
```

**apps/mobile/.env**

```env
# iOS Simulator
API_URL=http://localhost:3001

# Android Emulator — use this instead:
# API_URL=http://10.0.2.2:3001
```

## Installation

```bash
yarn install
```

## Running the API

```bash
# Run database migrations
yarn workspace @uma/api db:migrate

# (Optional) Seed with sample data
yarn workspace @uma/api db:seed

# Start API in development mode
yarn api
# → http://localhost:3001
```

## Running the Web App

```bash
yarn web
# → http://localhost:3000
```

## Running the Mobile App

### Install dependencies first

```bash
# iOS pods
cd apps/mobile/ios && bundle exec pod install && cd ../../..
```

### Start Metro bundler

```bash
yarn mobile
```

### Run on device/simulator

```bash
# iOS
yarn mobile:ios

# Android
yarn mobile:android
```

## API Endpoints

| Method   | Endpoint         | Description    |
| -------- | ---------------- | -------------- |
| `GET`    | `/api/users`     | List all users |
| `GET`    | `/api/users/:id` | Get user by ID |
| `POST`   | `/api/users`     | Create user    |
| `PUT`    | `/api/users/:id` | Update user    |
| `DELETE` | `/api/users/:id` | Delete user    |
| `GET`    | `/health`        | Health check   |

## Running Tests

```bash
# Web unit tests
yarn workspace @uma/web test

# Watch mode
yarn workspace @uma/web test --watch
```

## Code Quality

Pre-commit hooks run automatically on `git commit`:

- ESLint with auto-fix
- Prettier formatting
- TypeScript type check

Run manually:

```bash
yarn lint
yarn type-check
```

## Branch Strategy

```
main        ← stable production
  └── develop
        └── feature/*
```
