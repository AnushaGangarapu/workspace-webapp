import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Room from '../src/models/Room';

dotenv.config();

const rooms = [
  { roomId: '101', name: 'Cabin 1', baseHourlyRate: 500, capacity: 4 },
  { roomId: '102', name: 'Cabin 2', baseHourlyRate: 600, capacity: 6 },
  { roomId: '103', name: 'Conference Room A', baseHourlyRate: 800, capacity: 10 },
  { roomId: '104', name: 'Conference Room B', baseHourlyRate: 1000, capacity: 15 },
  { roomId: '105', name: 'Board Room', baseHourlyRate: 1200, capacity: 20 }
];

const seedRooms = async () => {
  try {
    const mongoUri = `${process.env.MONGODB_URI}`
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
    
    // Clear existing rooms
    await Room.deleteMany({});
    console.log('Cleared existing rooms');
    
    // Insert new rooms
    await Room.insertMany(rooms);
    console.log('✅ Successfully seeded rooms:', rooms.length);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding rooms:', error);
    process.exit(1);
  }
};

seedRooms();