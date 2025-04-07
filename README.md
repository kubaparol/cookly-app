# 🍳 [Cookly App](https://cookly-app.vercel.app/)

A modern recipe management application built with Next.js and TypeScript.

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![ShadcnUI](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)
![Drizzle](https://img.shields.io/badge/Drizzle-000000?style=for-the-badge&logo=drizzle&logoColor=white)

## 📝 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Authentication](#authentication)
- [Database](#database)
- [Testing](#testing)

## 🧐 About

Cookly is a comprehensive recipe management application that allows users to create, share, and discover recipes. Users can save favorites, comment on recipes, and organize their own recipe collections.

## ✨ Features

- 🔐 User authentication with custom flows
- 📝 Create and edit your own recipes
- ⭐ Save favorite recipes
- 💬 Comment on recipes with nested replies
- 🔍 Advanced search and filtering
- 📱 Responsive design for all devices
- 🌓 Light/dark mode support

## 🛠️ Tech Stack

### Frontend

- **Next.js 14** with App Router
- **TypeScript**
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **@hello-pangea/dnd** for drag-and-drop
- **recharts** for data visualization
- **React Hook Form** with **Zod** for form validation

### Backend

- **Next.js API Routes** with App Router
- **Drizzle ORM** for database management
- **NeonDB PostgreSQL** (serverless)
- **Clerk** for authentication
- **Uploadthing** for file uploads

## 📁 Project Structure

The project follows a modular structure:

```
src/
├── app/                   # Next.js App Router
│   ├── (application)/     # Route group for authenticated app routes
│   ├── (auth)/            # Route group for authentication pages
│   ├── (root)/            # Route group for public pages
│   └── api/               # API routes
├── components/            # React components
│   ├── base/              # Base components like Logo, Header
│   ├── forms/             # Form components
│   ├── layouts/           # Layout components
│   ├── modules/           # Feature-specific components
│   ├── providers/         # Context providers
│   ├── shared/            # Shared components
│   └── ui/                # UI components (shadcn/ui)
├── constants/             # Constants and configuration
├── db/                    # Database related code
│   ├── actions/           # Database actions/queries
│   └── schema/            # Drizzle schema definitions
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── styles/                # Global styles
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- PostgreSQL database (or NeonDB account)
- Clerk account for authentication
- Uploadthing account for file uploads

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Copy `.env.example` to `.env` and fill in your environment variables
4. Run database migrations:
   ```bash
   pnpm drizzle:migrate
   ```
5. Seed the database (optional):
   ```bash
   pnpm drizzle:seed
   ```
6. Start the development server:
   ```bash
   pnpm dev
   ```

## 🔒 Authentication

Cookly uses Clerk for authentication with custom UI components:

- **Custom sign-in flow** with email/password
- **Custom sign-up flow** with email verification
- **Password reset flow** with email code verification
- **OTP input** for verification codes
- **Profile management** integration

## 💾 Database

The application uses Drizzle ORM with a PostgreSQL database (NeonDB):

- **Schema definitions** in `src/db/schema`
- **Database actions** in `src/db/actions`
- **Migrations** managed through Drizzle Kit

### Main Database Entities:

- Users
- Recipes
- Ingredients
- Steps
- Comments
- Favorites
- Equipment
- Tips
- Substitutions

## 🧪 Testing

The project includes end-to-end tests using Playwright:

```bash
pnpm test:e2e
```

## ⚡ Next.js Features Used

- **App Router** for file-based routing
- **Route Groups** for organizing routes by functionality
- **Server Components** for improved performance
- **Suspense** for loading states
- **Parallel Data Fetching** with `Promise.all`
- **Streaming** for progressive rendering
- **Metadata API** for SEO optimization
- **Edge Runtime** support
- **API Routes** for backend functionality

## 🎨 UI Components

The project uses shadcn/ui, a collection of accessible and customizable components built on:

- **Radix UI** for accessible primitives
- **Tailwind CSS** for styling
- **class-variance-authority** for component variants
- **Lucide Icons** for beautiful icons

## 🌟 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
