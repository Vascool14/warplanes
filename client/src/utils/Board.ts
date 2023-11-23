import { TileType, PlaneType, RotationType } from '../types';

function positionsUp(h: number){if(h%10<2 || h%10>8 || h>70) return [-1];  return [h, h+8, h+9, h+10, h+11, h+12, h+20, h+29, h+30, h+31] }
function positionsDown(h: number){ if(h%10<2 || h%10>8 || h<30) return [-1];  return [h, h-8, h-9, h-10, h-11, h-12, h-20, h-29, h-30, h-31] }
function positionsRight(h: number){ if(h%10<3 || h>79 || h<20) return [-1];  return [h, h-21, h-11, h-1, h+9, h+19, h-2, h-13, h-3, h+7] }
function positionsLeft(h: number){ if(h%10>6 || h>79 || h<20) return [-1];  return [h, h-19, h-9, h+1, h+11, h+21, h+2, h-7, h+3, h+13] }

export function turnValidValuesToBoard(values: PlaneType[]): TileType[]{
    let board: TileType[] = [];
    for(let i = 0; i < 100; i++){ board.push({head: false, body: false, hit: false}) }
    values.forEach((plane: PlaneType) => {
        const head = plane.headIndex
        const rotation = plane.rotation;
        if(rotation == 'up'){
            positionsUp(head).forEach((pos) => { board[pos].body = true; })
            board[head].head = true;
        }
        if(rotation == 'down'){
            positionsDown(head).forEach((pos) => { board[pos].body = true; })
            board[head].head = true;
        }
        if(rotation == 'right'){
            positionsRight(head).forEach((pos) => { board[pos].body = true; })
            board[head].head = true;
        }
        if(rotation == 'left'){
            positionsLeft(head).forEach((pos) => { board[pos].body = true; })
            board[head].head = true;
        }
    })
    return board;
}

//////////////////////////////// BOT LOGIC ///////////////////////////////////////
const INVALID_HEAD_INDEXES = [0,1,8,9,10,11,18,19,80,81,88,89,90,91,98,99];
const ROTATIONS:RotationType[] = ['up','down','right','left'];

export function canAddPlaneToBoard(board: TileType[], plane: PlaneType): boolean {
    const head = plane.headIndex;
    if (INVALID_HEAD_INDEXES.includes(head)) return false;

    const rotation = plane.rotation;
    if (rotation === 'up') { return positionsUp(head).every((pos) => pos !== -1 && !board[pos].body); }
    if (rotation === 'down') { return positionsDown(head).every((pos) => pos !== -1 && !board[pos].body); }
    if (rotation === 'right') { return positionsRight(head).every((pos) => { pos !== -1 && !board[pos].body; }) }
    if (rotation === 'left') { return positionsLeft(head).every((pos) => pos !== -1 && !board[pos].body); }
    return true;
}

export function getValidPlane(planes: PlaneType[]): [number, RotationType] {
    while (true) {
        const headIndex = getRandomValidHeadIndex(turnValidValuesToBoard(planes));
        let rotation = ROTATIONS[Math.floor(Math.random() * 4)];
        for(let i = 0; i < 4; i++){
            if(canAddPlaneToBoard(turnValidValuesToBoard(planes), { headIndex, rotation }))
                return [ headIndex, rotation ]
            else rotation = ROTATIONS[(ROTATIONS.indexOf(rotation)+1)%4];
        }
    }
}

export function generateValidRandomBoard():TileType[]{
    let board: TileType[] = [];
    for(let i = 0; i < 100; i++){ board.push({head: false, body: false, hit: false}) }

    const [ plane1Head, plane1Rotation ] = getValidPlane([])
    const [ plane2Head, plane2Rotation ] = getValidPlane([{headIndex: plane1Head, rotation: plane1Rotation}])
    const [ plane3Head, plane3Rotation ] = getValidPlane([{headIndex: plane1Head, rotation: plane1Rotation}, {headIndex: plane2Head, rotation: plane2Rotation}])

    return turnValidValuesToBoard([
        {headIndex: plane1Head, rotation: plane1Rotation},
        {headIndex: plane2Head, rotation: plane2Rotation},
        {headIndex: plane3Head, rotation: plane3Rotation}
    ])
}

export function getRandomValidHeadIndex(board: TileType[]){
    let randomIndex;
    while(true){
        randomIndex = Math.floor(11+ Math.random() * 78); // from 
        if(!board[randomIndex].hit && randomIndex !== 9 && randomIndex !== 90 && randomIndex%10!==0 && randomIndex%10!==9){ 
            return randomIndex;
        }
    }
};