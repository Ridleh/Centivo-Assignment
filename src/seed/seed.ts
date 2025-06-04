import mongoose from 'mongoose';
import { User } from '../models/User.js';
import * as Config from '../Config.js';

const seedUsers = [
  { name: 'John Doe', email: 'john@doe.com', age: 30 },
  { name: 'Jane Doe', email: 'jane@doe.com', age: 25 },
  { name: 'Billy Doe', email: 'billy@doe.com', age: 18 },
  { name: 'Alex Doe', email: 'alex@doe.com', age: 55 },
];

async function seed() {
  try {
    await mongoose.connect(Config.MONGO_URL);
    console.log('MongoDB connected');

    await User.deleteMany({});
    console.log('Cleared existing users');

    const inserted = await User.insertMany(seedUsers);
    console.log(`Inserted ${inserted.length} users`);

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();