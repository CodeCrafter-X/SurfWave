# SurfWave - Boat Rental & Sales Platform Setup Guide

Welcome to SurfWave! This guide will help you set up the complete full-stack application.

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js (v18+) and npm installed
- MongoDB Atlas account (for cloud database)
- Cloudinary account (for image uploads)
- Git

## 🚀 Initial Setup

### 1. Install Dependencies

Dependencies have already been installed. If you need to reinstall:

```bash
npm install --legacy-peer-deps
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory. Copy the contents from `.env.local.example` and fill in your credentials:

```bash
cp .env.local.example .env.local
```

### 3. Configure Environment Variables

Edit `.env.local` with your actual credentials:

#### **MongoDB Setup**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new project and cluster
3. Click "Connect" and select "Connect your application"
4. Copy the connection string
5. Replace `username:password` with your MongoDB credentials
6. Update `MONGODB_URI` in `.env.local`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/surfboat?retryWrites=true&w=majority
```

#### **JWT Secret**

Generate a secure random string and add to `.env.local`:

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

You can generate one using:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### **Cloudinary Setup** (Optional - for image uploads)

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard and copy your credentials:
3. Add to `.env.local`:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### **Payment Gateway** (Optional - for future use)

```env
STRIPE_PUBLIC_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
PAYPAL_CLIENT_ID=xxxxx
PAYPAL_SECRET=xxxxx
```

#### **API Base URL**

```env
NEXT_PUBLIC_API_URL=http://localhost:3000  # For development
```

For production:

```env
NEXT_PUBLIC_API_URL=https://your-domain.com
```

## 📊 Database Seeding

To populate the database with sample boats and create an admin account:

```bash
npm run seed
```

**Default Admin Credentials:**

- Email: `ishan123@gmail.com`
- Password: `password123`

⚠️ **Change these credentials immediately in production!**

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at: **http://localhost:3000**

### Production Build

```bash
npm run build
npm start
```

## 🌐 Deployment to Vercel

Vercel is the recommended hosting platform for Next.js applications.

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [Vercel](https://vercel.com/)
2. Sign in with GitHub
3. Click "New Project"
4. Select your repository
5. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - etc.
6. Click "Deploy"

### 3. Update Environment Variables

After deployment:

1. Go to "Settings" → "Environment Variables"
2. Update `NEXT_PUBLIC_API_URL` to your Vercel domain:
   ```
   https://your-app-name.vercel.app
   ```

## 📁 Project Structure

```
surf-boat/
├── src/
│   ├── app/
│   │   ├── api/               # Backend API routes
│   │   │   ├── auth/         # Authentication endpoints
│   │   │   ├── boats/        # Boat management endpoints
│   │   │   ├── bookings/     # Booking management endpoints
│   │   │   └── contact/      # Contact form endpoint
│   │   ├── boats/            # Boat listing & details pages
│   │   ├── admin/            # Admin dashboard
│   │   ├── dashboard/        # User dashboard
│   │   ├── contact/          # Contact page
│   │   ├── login/            # Login page
│   │   ├── register/         # Registration page
│   │   ├── layout.js         # Root layout
│   │   ├── page.js           # Home page
│   │   └── globals.css       # Global styles
│   ├── components/           # React components
│   │   ├── Navigation.js     # Navigation bar
│   │   ├── Footer.js         # Footer
│   │   └── BoatCard.js       # Boat card component
│   └── hooks/               # Custom React hooks
├── lib/
│   ├── db.js                # MongoDB connection
│   └── auth.js              # JWT authentication utilities
├── models/                  # Mongoose schemas
│   ├── User.js
│   ├── Boat.js
│   ├── Booking.js
│   └── Contact.js
├── middleware/              # Express middleware
│   └── auth.js              # Authentication middleware
├── scripts/
│   └── seed.js              # Database seeding script
├── public/                  # Static files
├── .env.local               # Environment variables (create this!)
├── .env.local.example       # Environment template
├── package.json
├── next.config.mjs
├── jsconfig.json
└── tailwind.config.js       # Tailwind CSS configuration
```

## 🔐 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Boats

- `GET /api/boats` - Get all boats (with filters)
- `GET /api/boats/[id]` - Get boat details
- `POST /api/boats` - Create boat (admin only)
- `PUT /api/boats/[id]` - Update boat (admin only)
- `DELETE /api/boats/[id]` - Delete boat (admin only)
- `POST /api/boats/bulk-update` - Bulk update boats (admin only)

### Bookings

- `GET /api/bookings` - Get user's bookings
- `GET /api/bookings/[id]` - Get booking details
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/[id]` - Update booking

### Contact

- `POST /api/contact` - Submit contact form

## 👥 User Roles

### Regular User

- Browse and search boats
- Rent boats
- View their bookings
- Update profile

### Admin

- Manage all boats (create, update, delete)
- Bulk update boats
- View all bookings
- Apply discounts
- Manage pricing

## 🎨 Customization

### Brand Colors

Edit `tailwind.config.js` to change the primary colors:

```javascript
theme: {
  colors: {
    blue: {
      600: '#your-color-hex',
      // ...
    }
  }
}
```

### Business Information

Update contact details in:

- `src/components/Footer.js` - Footer contact info
- `.env.local` - API configuration
- `scripts/seed.js` - Default location

### Features

- **Discounts**: Enable per boat or bulk
- **Multiple Images**: Upload multiple images per boat
- **Filters**: Customize filter options in boat listing
- **Payment**: Add Stripe/PayPal integration (API ready)

## 🐛 Troubleshooting

### MongoDB Connection Error

- Verify MongoDB connection string in `.env.local`
- Ensure MongoDB Atlas cluster is running
- Check IP whitelist in MongoDB Atlas (allow 0.0.0.0/0 for development)

### Image Upload Issues

- Verify Cloudinary credentials
- Check Cloudinary API rate limits
- Ensure images are under 10MB

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000
npm run dev
```

### Build Errors

```bash
rm -rf .next node_modules
npm install --legacy-peer-deps
npm run build
```

## 📞 Support

For issues or questions:

- Email: ishanknight01@gmail.com
- WhatsApp: 0727578276

## 📝 License

This project is private and proprietary.

---

## ✅ Checklist Before Going Live

- [ ] Changed admin password
- [ ] Updated JWT_SECRET to a secure value
- [ ] Configured MongoDB Atlas properly
- [ ] Set up Cloudinary (if using images)
- [ ] Updated `.env.local` for production
- [ ] Tested all authentication flows
- [ ] Tested booking functionality
- [ ] Tested admin functions
- [ ] Updated contact information
- [ ] Tested WhatsApp integration
- [ ] Set up proper error logging
- [ ] Configured email notifications (optional)
- [ ] Tested on mobile devices
- [ ] Set up monitoring/analytics

---

Happy sailing! 🚤⛵
