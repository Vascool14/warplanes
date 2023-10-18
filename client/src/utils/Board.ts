import { TileType, PlaneType } from '../types';

function positionsUp(h: number){ return [h, h+8, h+9, h+10, h+11, h+12, h+20, h+29, h+30, h+31] }
function positionsDown(h: number){ return [h, h-8, h-9, h-10, h-11, h-12, h-20, h-29, h-30, h-31] }
function positionsRight(h: number){ return [h, h-21, h-11, h-1, h+9, h+19, h-2, h-13, h-3, h+7] }
function positionsLeft(h: number){ return [h, h-19, h-9, h+1, h+11, h+21, h+2, h-7, h+3, h+13] }

export function checkValidPlane(board: TileType[], plane: PlaneType){
    const head = plane.head;
    const rotation = plane.rotation;
    if(rotation == 'up'){
        if(head%10 < 2 || head%10 > 8 || head > 70) return false;
        positionsUp(head).forEach((pos) => { if(board[pos].body) return false; })
    }
    if(rotation == 'down'){
        if(head%10 < 2 || head%10 > 8 || head < 30) return false;
        positionsDown(head).forEach((pos) => { if(board[pos].body) return false; })
    }
    if(rotation == 'right'){
        if(head%10 < 3 || head > 79 || head < 20) return false;
        positionsRight(head).forEach((pos) => { if(board[pos].body) return false; })
    }
    if(rotation == 'left'){
        if(head%10 > 6 || head > 79 || head < 20) return false;
        positionsLeft(head).forEach((pos) => { if(board[pos].body) return false; })
    }
    return true;
}