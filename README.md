# 🚤 SurfWave - Boat Rental & Sales Platform

A modern, responsive full-stack web application for renting and buying boats. Built with Next.js, MongoDB, and Tailwind CSS.

## ✨ Features

### 🌐 Public Features

- **Home Page**: Hero section with featured boats and quick navigation
- **Boat Listing**: Browse boats with advanced filtering
  - Search by title (case-insensitive)
  - Filter by price range
  - Filter by category (Luxury, Fishing, Speed Boat, Family, Adventure)
  - Filter by type (Rent/Sale)
  - Pagination support
- **Boat Details**: Full boat information with image gallery
- **Booking System**: Book rental boats with date, time, and duration
- **Contact Page**: Get in touch with WhatsApp integration
- **Responsive Design**: Mobile-first design

### 👤 User Features

- **Authentication**: Secure JWT-based authentication
- **User Dashboard**: View all bookings
- **Booking Management**: Cancel or manage bookings
- **Profile**: View user information

### 🛠️ Admin Features

- **Boat Management**: Create, read, update, and delete boats
- **Bulk Operations**: Update multiple boats at once
- **Discount Management**: Apply discounts to boats
- **Booking Management**: View and approve/cancel bookings
- **Dashboard**: Overview of all bookings

## 🛠️ Tech Stack

- **Frontend**: Next.js 16.2, React 19, Tailwind CSS 4
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT + bcryptjs
- **Image Upload**: Cloudinary (optional)
- **Deployment**: Vercel

## 📦 Quick Start

1. **Install dependencies**:

   ```bash
   npm install --legacy-peer-deps
   ```

2. **Create `.env.local` file** from `.env.local.example`

3. **Configure environment variables** (MongoDB, JWT, etc.)

4. **Seed database**:

   ```bash
   npm run seed
   ```

5. **Start development**:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

Deploy to Vercel with one click:

```bash
vercel
```

## 📚 Documentation

- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Complete setup and deployment guide
- [API Documentation](#-boat-management) - API endpoints and models

## 🔐 Default Credentials

```
Email: ishan123@gmail.com
Password: password123
```

⚠️ **Change in production!**

## 📁 Project Structure

```
src/
├── app/
│   ├── api/          # REST API endpoints
│   ├── boats/        # Boat listing & details
│   ├── admin/        # Admin dashboard
│   ├── dashboard/    # User dashboard
│   └── ...           # Other pages
├── components/       # Reusable components
├── lib/             # Utilities (DB, Auth)
├── models/          # Mongoose schemas
└── middleware/      # Auth middleware
```

## 🛥️ Boat Management

**Endpoints:**

- `GET /api/boats` - Get boats (with filters)
- `POST /api/boats` - Create boat (admin)
- `PUT /api/boats/:id` - Update boat (admin)
- `DELETE /api/boats/:id` - Delete boat (admin)
- `POST /api/boats/bulk-update` - Bulk update (admin)

**Data Model:**

- title, description, category, type (rent/sale)
- pricePerHour (rent) or price (sale)
- discountPercentage, discountStartDate, discountEndDate
- images, location

## 📅 Booking System

- Users can book rental boats
- Admin can confirm or cancel bookings
- Automatic price calculation with discounts
- Booking history in user dashboard

## 💰 Pricing & Discounts

- **Rent**: `pricePerHour × duration`
- **Sale**: Fixed price
- **Discounts**: Applied if date is within discount period
- **UI**: Original price crossed out, discounted price highlighted

## 📞 Contact & Support

- **Email**: ishanknight01@gmail.com
- **WhatsApp**: 0727578276
- **Location**: Pottuvil Arugambe Beach, Sri Lanka

## 📋 Available Scripts

```bash
npm run dev       # Development server
npm run build     # Production build
npm start         # Production server
npm run seed      # Seed database
```

---

**Happy Sailing!** 🚤⛵

For detailed setup: See [SETUP_GUIDE.md](./SETUP_GUIDE.md)
