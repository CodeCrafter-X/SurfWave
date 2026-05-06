import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User.js';
import { Boat } from '../models/Boat.js';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data (optional - comment out to preserve data)
    // await User.deleteMany({});
    // await Boat.deleteMany({});

    // Create admin user
    const adminEmail = 'ishan123@gmail.com';
    let admin = await User.findOne({ email: adminEmail });

    if (!admin) {
      admin = await User.create({
        name: 'Ishan Admin',
        email: adminEmail,
        password: 'password123', // Change this in production!
        role: 'admin',
      });
      console.log('Admin user created:', admin.email);
    } else {
      console.log('Admin user already exists');
    }

    // Sample boats data
    const boatSamples = [
      {
        title: 'Luxury Sunset Cruiser',
        description: 'Experience luxury on the pristine waters with our premium sunset cruiser. Features comfortable seating for 6 people, premium sound system, and a fully stocked bar.',
        category: 'Luxury',
        type: 'rent',
        pricePerHour: 75,
        location: 'Pottuvil Arugambe Beach',
        images: ['https://via.placeholder.com/400x300?text=Luxury+Cruiser'],
        discountPercentage: 15,
        discountStartDate: new Date(),
        discountEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        createdBy: admin._id,
      },
      {
        title: 'Speed Boat Adventure',
        description: 'Fast-paced adventure boat perfect for thrill-seekers. High-speed capability with safety equipment and professional guides included.',
        category: 'Speed Boat',
        type: 'rent',
        pricePerHour: 60,
        location: 'Pottuvil Arugambe Beach',
        images: ['https://via.placeholder.com/400x300?text=Speed+Boat'],
        createdBy: admin._id,
      },
      {
        title: 'Family Fishing Boat',
        description: 'Perfect family boat with fishing equipment included. Spacious, comfortable, and equipped with modern fishing gear.',
        category: 'Fishing',
        type: 'rent',
        pricePerHour: 45,
        location: 'Pottuvil Arugambe Beach',
        images: ['https://via.placeholder.com/400x300?text=Fishing+Boat'],
        createdBy: admin._id,
      },
      {
        title: 'Premium Yacht',
        description: 'Stunning premium yacht for special occasions. Complete with luxury amenities, professional crew, and catering services.',
        category: 'Luxury',
        type: 'sale',
        price: 450000,
        location: 'Pottuvil Arugambe Beach',
        images: ['https://via.placeholder.com/400x300?text=Premium+Yacht'],
        discountPercentage: 10,
        discountStartDate: new Date(),
        discountEndDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        createdBy: admin._id,
      },
      {
        title: 'Classic Fishing Vessel',
        description: 'Reliable fishing vessel with proven track record. Fully equipped for commercial or recreational fishing.',
        category: 'Fishing',
        type: 'sale',
        price: 85000,
        location: 'Pottuvil Arugambe Beach',
        images: ['https://via.placeholder.com/400x300?text=Fishing+Vessel'],
        createdBy: admin._id,
      },
      {
        title: 'Adventure Rib Boat',
        description: 'Rugged and durable RIB boat perfect for island hopping and water sports. High-performance with impressive maneuverability.',
        category: 'Adventure',
        type: 'rent',
        pricePerHour: 55,
        location: 'Pottuvil Arugambe Beach',
        images: ['https://via.placeholder.com/400x300?text=Adventure+RIB'],
        createdBy: admin._id,
      },
      {
        title: 'Family Speedboat',
        description: 'Fun and safe speedboat for family outings. Perfect for weekend getaways with comfortable seating and modern amenities.',
        category: 'Speed Boat',
        type: 'rent',
        pricePerHour: 50,
        location: 'Pottuvil Arugambe Beach',
        images: ['https://via.placeholder.com/400x300?text=Family+Speedboat'],
        discountPercentage: 20,
        discountStartDate: new Date(),
        discountEndDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        createdBy: admin._id,
      },
      {
        title: 'Catamaran Sailing Boat',
        description: 'Luxurious catamaran with incredible stability. Perfect for sailing enthusiasts and couples looking for a romantic escape.',
        category: 'Luxury',
        type: 'sale',
        price: 320000,
        location: 'Pottuvil Arugambe Beach',
        images: ['https://via.placeholder.com/400x300?text=Catamaran'],
        createdBy: admin._id,
      },
    ];

    // Check if boats already exist
    const existingBoats = await Boat.countDocuments();
    if (existingBoats === 0) {
      await Boat.insertMany(boatSamples);
      console.log('Sample boats created successfully');
    } else {
      console.log('Boats already exist in database');
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
