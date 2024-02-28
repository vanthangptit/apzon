import mongoose from 'mongoose';
import conf from '../config';

const { dbName, dbUsername, dbPassword } = conf;

export const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@${dbName}.nhjl7hw.mongodb.net/?retryWrites=true&w=majority&appName=${dbName}`);
    console.log('MongoDB connected!');
  } catch (err: any) {
    console.log('Error: ' + err.message);
    process.exit(1);
  }
};
