# Cyber - E-commerce Web Application

This is a full-featured e-commerce web application built with React 19, TypeScript, and modern technologies. The application provides a complete shopping experience with user authentication, product browsing, cart management, and a multi-step checkout process.

##  Technologies Used

### Frontend Framework
- **React 19** - Latest React with modern hooks and improved performance
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Icons** - Icon library for React

### State Management & Data Fetching
- **TanStack Query (React Query)** - Server state management
- **React Router DOM v7** - Client-side routing

### Authentication & User Management
- **Clerk** - Complete authentication with user management

### HTTP Client
- **Axios** - Promise-based HTTP client

##  Main Features

### User Authentication
- Sign up and sign in with Clerk
- Protected routes for authenticated users
- User profile management

### Product Management
- Product catalog with categories
- Product detail pages with specifications
- Product search and filtering
- Dynamic pagination

### Shopping Cart
- Add/remove items from cart
- Update item quantities
- Persistent cart state
- Real-time cart totals

### Checkout Process
  1. **Address Step** - Shipping address input
  2. **Shipping Step** - Shipping method selection
  3. **Payment Step** - Payment information and order completion
- Form validation
- Order summary

### Additional Features
- Responsive design for mobile and desktop
- Product reviews and ratings
- Related products suggestions
- Discount products section
- Breadcrumb navigation

##  Setup Instructions

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager
- Backend API running on `http://localhost:7777`

### Installation Steps

1. **Clone the repository**
   git clone https://github.com/eduardobellini/cyber-web-front-Desafio03.git
   cd cyber-web-front-Desafio03
   

2. **Navigate to the project directory**
   cd vite-project
 

3. **Install dependencies**
   npm install
  

4. **Environment Setup**
   Create a `.env` file in the `vite-project` folder with the following content:
   
   VITE_URL_API=http://localhost:7777
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here

5. **Start the development server** 
   npm run dev
  

6. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production
npm run build


### Preview Production Build
npm run preview


##  Backend Integration

This frontend application requires the `cyber-web-back` backend API to be running on `http://localhost:7777` for full functionality.

The backend provides:
- Product data and catalog
- User cart management
- Order processing
- User authentication data

##  Usage

1. **Browse Products**: Visit the home page to see featured products and categories
2. **Search & Filter**: Use the shop page to filter products by brand, category, or price
3. **Product Details**: Click on any product to view detailed specifications and reviews
4. **Add to Cart**: Add products to your cart with selected options (color, memory, etc.)
5. **Checkout**: Complete your purchase through the multi-step checkout process
6. **User Account**: Sign up/in to manage your profile and order history





