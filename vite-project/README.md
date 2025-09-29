
# Cyber - E-commerce Web Application

A modern, full-featured e-commerce application built with React 19, TypeScript, and Clerk authentication. Features a complete shopping experience with cart management and multi-step checkout.

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Create a `.env` file with:
   ```env
   VITE_URL_API=http://localhost:7777
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key_here
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Visit `http://localhost:5173`

## 🛠️ Tech Stack

- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 4** - Utility-first styling
- **Clerk** - Authentication & user management
- **TanStack Query** - Server state management
- **React Router DOM v7** - Client-side routing

## ✨ Features

- 🔐 User authentication with Clerk
- 🛒 Shopping cart with persistent state
- 💳 Multi-step checkout process
- 📱 Responsive design
- 🔍 Product search and filtering
- ⭐ Product reviews and ratings
- 📊 Real-time cart totals

## 📝 Available Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run preview` - Preview build
- `npm run lint` - Run linter

## 🔗 Backend Required

Requires the `cyber-web-back` API running on `http://localhost:7777` for full functionality.
