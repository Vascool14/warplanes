import express from 'express';
import gameModel from '../models/gameModel';

const router = express.Router(); 

type PlayerType = {
    board: Array<Object>;
    id: string;
}

router.post('/create', async (req: any, res: any) => {
    try {
        const { player1, player2 }: { player1: PlayerType, player2: PlayerType } = req.body;
        const newGame = new gameModel({ player1, player2 });
        await newGame.save(); // save to DB
        res.status(200).json({newGame});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router; 