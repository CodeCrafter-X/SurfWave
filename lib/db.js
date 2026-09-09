import mongoose from 'mongoose';

// Direct replica set URI — avoids SRV DNS lookups which fail on some networks
const DIRECT_URI =
  'mongodb://MohamedIshan:IshanDB123@ac-nnsi3r8-shard-00-00.lkrl8ew.mongodb.net:27017,' +
  'ac-nnsi3r8-shard-00-01.lkrl8ew.mongodb.net:27017,' +
  'ac-nnsi3r8-shard-00-02.lkrl8ew.mongodb.net:27017/' +
  'surfWave_db?ssl=true&replicaSet=atlas-kwkv26-shard-0&authSource=admin&retryWrites=true&w=majority';

const opts = {
  bufferCommands: false,
  serverSelectionTimeoutMS: 15000,
  socketTimeoutMS: 30000,
  tls: true,
};

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(DIRECT_URI, opts).then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
