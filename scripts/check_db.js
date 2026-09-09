const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function check() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully!');
    const db = mongoose.connection.db;

    const boatsCount = await db.collection('boats').countDocuments();
    const boatCount = await db.collection('Boat').countDocuments();
    console.log(`Documents in 'boats': ${boatsCount}`);
    console.log(`Documents in 'Boat': ${boatCount}`);

    if (boatCount > 0) {
      const sampleBoat = await db.collection('Boat').findOne();
      console.log('Sample from "Boat":', JSON.stringify(sampleBoat, null, 2));
    }
    if (boatsCount > 0) {
      const sampleboats = await db.collection('boats').findOne();
      console.log('Sample from "boats":', JSON.stringify(sampleboats, null, 2));
    }

    const users = await db.collection('users').find({}).toArray();
    console.log('Registered users:');
    users.forEach(u => {
      console.log(`- Email: ${u.email}, Name: ${u.name}, Role: ${u.role}, HasPassword: ${!!u.password}`);
    });

  } catch (err) {
    console.error('Check failed:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

check();
