import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    month: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true,
});

const Budget =  mongoose.model('Budget', budgetSchema);

export default Budget