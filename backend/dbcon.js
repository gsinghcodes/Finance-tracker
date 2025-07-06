import mongoose from "mongoose";

const uri = 'mongodb://localhost:27017/finance_tracker'; // Database name in URI

async function connectToMongo(uri) {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB with Mongoose');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

export default connectToMongo
