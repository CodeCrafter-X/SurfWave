const path = require('path');
const projectRoot = path.join(__dirname, '..');
const bcrypt = require(path.join(projectRoot, 'node_modules', 'bcryptjs'));
const { MongoClient } = require(path.join(projectRoot, 'node_modules', 'mongodb'));

const uri =
  'mongodb://MohamedIshan:IshanDB123@ac-nnsi3r8-shard-00-00.lkrl8ew.mongodb.net:27017,' +
  'ac-nnsi3r8-shard-00-01.lkrl8ew.mongodb.net:27017,' +
  'ac-nnsi3r8-shard-00-02.lkrl8ew.mongodb.net:27017/' +
  'surfWave_db?ssl=true&replicaSet=atlas-kwkv26-shard-0&authSource=admin&retryWrites=true&w=majority';

// Your real credentials
const targetEmail = 'isthifa@gmail.com';
const targetPassword = '123456';

async function run() {
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 12000, tls: true });
  await client.connect();
  console.log('Connected!\n');

  const db = client.db('surfWave_db');

  // Show all users in DB
  const allUsers = await db.collection('users').find({}).toArray();
  console.log('=== ALL USERS IN DB ===');
  allUsers.forEach(u => console.log(` - "${u.email}" | role: ${u.role}`));
  console.log('');

  // Check if isthifa@gmail.com exists
  const existing = await db.collection('users').findOne({ email: targetEmail });

  if (existing) {
    // Update password
    const hash = await bcrypt.hash(targetPassword, 10);
    await db.collection('users').updateOne(
      { email: targetEmail },
      { $set: { password: hash, role: 'admin' } }
    );
    console.log(`✅ Updated "${targetEmail}" — password set to: ${targetPassword}`);
  } else {
    // Create the admin account fresh
    const hash = await bcrypt.hash(targetPassword, 10);
    await db.collection('users').insertOne({
      name: 'Isthifa Admin',
      email: targetEmail,
      password: hash,
      role: 'admin',
      createdAt: new Date(),
    });
    console.log(`✅ Created new admin account "${targetEmail}" with password: ${targetPassword}`);
  }

  await client.close();
}

run().catch(console.error);
