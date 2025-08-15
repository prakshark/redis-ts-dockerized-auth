import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDB() {
    try {
        const uri = process.env.MONGODB_URI;
        if(!uri) {
            console.log(`MONGODB URI not found`);
            throw console.error(`MONGODB URI not found`);
        }
        await mongoose.connect(uri);
        console.log(`Connected to mongodb`)
    } catch (error) {
        console.error(`Error connecting to mongodb server`);
    }
}