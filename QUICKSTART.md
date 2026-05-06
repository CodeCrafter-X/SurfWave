# 🚀 SurfWave - Quick Start Guide

Welcome! Your full-stack boat rental & sales platform is ready. Here's what you need to do next.

## ✅ What's Already Done

✨ **Complete Full-Stack Application**

- ✅ Frontend pages (Home, Boats, Details, Contact, Login, Register, Dashboard, Admin)
- ✅ Backend API routes (Auth, Boats, Bookings, Contact)
- ✅ Database models (User, Boat, Booking, Contact)
- ✅ Authentication system (JWT + bcryptjs)
- ✅ Admin panel with bulk operations
- ✅ Responsive design (mobile & desktop)
- ✅ Sample data seeding script

## 🎯 Next Steps (5 Minutes)

### Step 1: Create `.env.local` File

Copy the template and fill in your credentials:

```bash
cp .env.local.example .env.local
```

### Step 2: Get Your Credentials

#### **MongoDB (Required)**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account → Create cluster → Click "Connect"
3. Select "Connect your application"
4. Copy connection string
5. Update `.env.local`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/surfboat?retryWrites=true&w=majority
   ```

#### **JWT Secret (Required)**

Run this to generate a secure key:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Add to `.env.local`:

```
JWT_SECRET=<paste the generated key here>
```

#### **Cloudinary (Optional - for image uploads)**

1. Sign up at https://cloudinary.com
2. Get credentials from Dashboard
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

### Step 3: Seed Database

```bash
npm run seed
```

This creates:

- 1 admin user (ishan123@gmail.com / password123)
- 8 sample boats

### Step 4: Start Development Server

```bash
npm run dev
```

Visit: **http://localhost:3000**

## 🎮 Try It Out

### As Regular User

1. Go to http://localhost:3000/register
2. Create an account
3. Browse boats at /boats
4. Click a boat to view details
5. Book a rental boat
6. Check your bookings at /dashboard

### As Admin

1. Go to http://localhost:3000/login
2. Use credentials:
   - Email: `ishan123@gmail.com`
   - Password: `password123`
3. Click "Admin" button in nav
4. Create/edit boats
5. Apply bulk discounts
6. View all bookings

## 📄 File You Created

Your `.env.local` file should look like:

```env
# MongoDB Connection (REQUIRED)
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/surfboat?retryWrites=true&w=majority

# JWT Secret (REQUIRED - use generated key)
JWT_SECRET=your_generated_hex_string_here

# Cloudinary (OPTIONAL)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

# API URL
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 🌐 Deploy to Vercel (When Ready)

1. Push code to GitHub
2. Go to https://vercel.com
3. Click "New Project" → Select GitHub repo
4. Add all environment variables from `.env.local`
5. Click "Deploy"

See [SETUP_GUIDE.md](./SETUP_GUIDE.md#🌐-deployment-to-vercel) for details.

## 🔗 Important Links

- 📖 **Full Setup Guide**: [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- 📚 **Project README**: [README.md](./README.md)
- 🗂️ **Project Structure**: See README.md section
- 🐛 **Troubleshooting**: See SETUP_GUIDE.md section

## 🆘 Troubleshooting

### MongoDB Connection Error

- ✅ Copy connection string correctly
- ✅ IP Whitelist: In MongoDB Atlas, go to "Network Access" → "Add Current IP" (or 0.0.0.0/0 for dev)
- ✅ Database name: Use `surfboat` at end of URI
- ✅ Username/Password: Must match MongoDB credentials

### Port 3000 Already in Use

```bash
npx kill-port 3000
npm run dev
```

### Dependencies Error

```bash
rm -rf node_modules .next
npm install --legacy-peer-deps
npm run dev
```

## 📞 Support

- **Email**: ishanknight01@gmail.com
- **WhatsApp**: 0727578276

## 🎨 Customization

### Update Business Info

Edit `src/components/Footer.js`:

- WhatsApp number: `0727578276` → your number
- Email: `ishanknight01@gmail.com` → your email
- Location: `Pottuvil Arugambe Beach` → your location

### Change Admin Password

1. Login with current credentials
2. (Profile feature - can be added later)
3. Or reset in database directly

### Customize Colors

Edit Tailwind classes in components or update `tailwind.config.js`

## 📊 Database Schema

### User

```
- name, email, password, role (user/admin), createdAt
```

### Boat

```
- title, description, category, type (rent/sale)
- pricePerHour (rent) or price (sale)
- discountPercentage, discountStartDate, discountEndDate
- images (array), location, available
- createdBy (admin), createdAt
```

### Booking

```
- userId, boatId, date, time, duration
- totalPrice, status (pending/confirmed/cancelled)
- createdAt
```

## ✨ Key Features Built-In

✅ User registration & authentication
✅ Email/password with JWT tokens
✅ Boat search & advanced filtering
✅ Boat rental booking system
✅ Admin boat management (CRUD)
✅ Bulk discount application
✅ Multi-image support
✅ Contact form
✅ Responsive design
✅ Mobile-friendly
✅ User bookings dashboard
✅ Admin dashboard
✅ Automatic price calculation
✅ Discount management
✅ WhatsApp integration

## 🎓 Architecture Overview

```
User Request
    ↓
Next.js App Router
    ↓
React Components (Frontend)
    ↓
Next.js API Routes (Backend)
    ↓
MongoDB Database
    ↓
Response Back to User
```

## 🎯 What to Do Now

1. ✅ Create `.env.local` file
2. ✅ Add MongoDB connection string
3. ✅ Add JWT secret
4. ✅ Run `npm run seed`
5. ✅ Start with `npm run dev`
6. ✅ Test at http://localhost:3000
7. ✅ Deploy to Vercel when ready

## 📝 Notes

- All timestamps are in UTC
- Passwords are hashed with bcryptjs
- JWT tokens expire in 7 days
- Images are optional (placeholders shown)
- Multiple images per boat supported
- Discounts apply only within date range
- Admin can bulk update boats

---

**You're all set!** 🚀

Start your development server:

```bash
npm run dev
```

Then open: http://localhost:3000

Happy coding! 💻⛵
