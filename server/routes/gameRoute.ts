import express from 'express';
const gameModel = require('../models/gameModel');

const router = express.Router(); 

router.post('/create', async (req: any, res: any) => {
    try {
        const { player1, player2, player1Board, player2Board } = req.body;
        const newGame = new gameModel({ player1, player2, player1Board, player2Board });
        await newGame.save(); // save to DB
        res.status(200).json({newGame});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router; 