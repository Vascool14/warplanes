const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({ 
    code: {
        type: String,
        required: false
    },
    player1: {
        type: String,
        required: true
    },
    player2: {
        type: String,
        required: true
    },
    player1Board: {
        type: Array,
        required: true
    },
    player2Board: {
        type: Array,
        required: true
    },
},{ versionKey: false });  // Disable the version key

module.exports = mongoose.model('gameModel', gameSchema);