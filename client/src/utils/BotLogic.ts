import { TileType, PlaneType } from '../types';

// make fake bots which just return random tiles until hitting and add a timer for hitting the heads (cheating - easier to implement)
// bot Ioana will hit all heads within ~30±3 hit attempts
// bot Vasile will hit all heads within ~23±3 hit attempts
// bots will randomly choose a tile to hit, and if they hit, Vasile will take another ~3 tries until he hits the head, and Ioana will take another ~5 tries until she hits the head

export function getRandomValidIndex(board: TileType[]){
    let randomIndex;
    while(true){
        randomIndex = Math.floor(11+ Math.random() * 78); // from 
        if(!board[randomIndex].hit && randomIndex !== 9 && randomIndex !== 90 && randomIndex%10!==0 && randomIndex%10!==9){ 
            return randomIndex;
        }
    }
};
