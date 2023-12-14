import mongoose from 'mongoose';

export default mongoose.model('userModel',  new mongoose.Schema({ 
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    gameStats: {
        type: Object,
        gold: {
            type: Number,
            required: true,
            default: 1000
        },
        wins: {
            type: Number,
            required: true,
            default: 0
        },
        losses: {
            type: Number,
            required: true,
            default: 0
        }
    }
})
)