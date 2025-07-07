import mongoose from "mongoose";

async function connectToMongo(uri) {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB with Mongoose');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

export default connectToMongo
