import mongoose from "mongoose";
import 'dotenv/config';

export const connectDB = async () => {
    try {
        const MONGO_URL = process.env.MONGODB_URL;

        mongoose.connect(MONGO_URL);

        mongoose.connection.on('connected', () => {
            console.log('Connected to MongoDB');
        });

        mongoose.connection.on('error', (err) => {
            console.log('Error:', err);
        });
    } catch (error) {
        console.log(error)
    }
}