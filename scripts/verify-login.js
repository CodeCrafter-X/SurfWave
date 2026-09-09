const path = require('path');
const projectRoot = path.join(__dirname, '..');
const bcrypt = require(path.join(projectRoot, 'node_modules', 'bcryptjs'));
const { MongoClient } = require(path.join(projectRoot, 'node_modules', 'mongodb'));

const uri =
  'mongodb://MohamedIshan:IshanDB123@ac-nnsi3r8-shard-00-00.lkrl8ew.mongodb.net:27017,' +
  'ac-nnsi3r8-shard-00-01.lkrl8ew.mongodb.net:27017,' +
  'ac-nnsi3r8-shard-00-02.lkrl8ew.mongodb.net:27017/' +
  'surfWave_db?ssl=true&replicaSet=atlas-kwkv26-shard-0&authSource=admin&retryWrites=true&w=majority';

async function verify() {
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 12000, tls: true });
  await client.connect();

  const db = client.db('surfWave_db');
  const user = await db.collection('users').findOne({ email: 'isthifa@gmail.com' });

  if (!user) { console.log('❌ User not found!'); process.exit(1); }

  const passwordOk = await bcrypt.compare('123456', user.password);
  console.log('Email:   ', user.email);
  console.log('Role:    ', user.role);
  console.log('Password match:', passwordOk ? '✅ CORRECT' : '❌ WRONG');

  await client.close();
}

verify().catch(console.error);
