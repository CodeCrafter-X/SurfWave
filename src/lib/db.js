import mongoose from 'mongoose';
import dns from 'dns';

// Configure public DNS servers to resolve MongoDB Atlas SRV records on Windows networks
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // ignore if not supported in certain runtimes
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const DIRECT_URI = 'mongodb://MohamedIshan:IshanDB123@ac-nnsi3r8-shard-00-00.lkrl8ew.mongodb.net:27017,ac-nnsi3r8-shard-00-01.lkrl8ew.mongodb.net:27017,ac-nnsi3r8-shard-00-02.lkrl8ew.mongodb.net:27017/surfWave_db?ssl=true&replicaSet=atlas-kwkv26-shard-0&authSource=admin&retryWrites=true&w=majority';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .catch((err) => {
        // Fallback to direct replica set connection if SRV DNS query fails
        if (err.code === 'ECONNREFUSED' || err.message?.includes('querySrv') || err.name === 'MongooseServerSelectionError') {
          console.warn('SRV DNS lookup failed, falling back to direct MongoDB replica set connection...');
          return mongoose.connect(DIRECT_URI, opts);
        }
        throw err;
      })
      .then((mongoose) => {
        return mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  
  return cached.conn;
}
