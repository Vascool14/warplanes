import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({ 
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
    wins: {
        type: Number,
        required: false
    }
});  // Disable the version key

export default mongoose.model('userModel', userSchema);