#!/bin/bash

set -e

echo "Setting up User Management App..."

echo ""
echo "Copying env files..."
[ ! -f apps/api/.env ] && cp apps/api/.env.example apps/api/.env && echo "  ✓ apps/api/.env" || echo "  — apps/api/.env already exists"
[ ! -f apps/web/.env ] && cp apps/web/.env.example apps/web/.env && echo "  ✓ apps/web/.env" || echo "  — apps/web/.env already exists"
[ ! -f apps/mobile/.env ] && cp apps/mobile/.env.example apps/mobile/.env && echo "  ✓ apps/mobile/.env" || echo "  — apps/mobile/.env already exists"

echo ""
echo "Setting up database..."
yarn workspace @uma/api db:generate
cd apps/api && npx prisma db push && cd ../..

echo ""
echo "Seeding database with sample data..."
yarn workspace @uma/api db:seed

echo ""
echo "Done! Now run:"
echo "  yarn api   ← start API (terminal 1)"
echo "  yarn web   ← start Web (terminal 2)"
echo ""
echo "Web → http://localhost:3000"
echo "API → http://localhost:3001"
