import mongoose from 'mongoose';

export default mongoose.model('gameModel', new mongoose.Schema({ 
    tableId: {
        type: String,
        required: false
    },
    player1: {
        board: {
            type: Array,
            required: false
        },
        id: {
            type: String,
            required: true
        }
    },
    player2: {
        type: Object,
        board: {
            type: Array,
            required: false
        },
        id: {
            type: String,
            required: true
        },
        required: false
    }
},{ versionKey: false })  // Disable the version key
)