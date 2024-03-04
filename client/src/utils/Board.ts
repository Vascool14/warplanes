import { TileType, PlaneType, RotationType } from '../types';

function positionsUp(i:number){if(i%10<2 || i%10>7 || i>69) return[-1]; return[i, i+8, i+9, i+10, i+11, i+12, i+20, i+29, i+30, i+31]}
function positionsDown(i:number){if(i%10<2 || i%10>7 || i<30) return[-1]; return[i, i-8, i-9, i-10, i-11, i-12, i-20, i-29, i-30, i-31]}
function positionsRight(i:number){if(i%10<3 || i>79 || i<20) return[-1]; return[i, i-21, i-11, i-1, i+9, i+19, i-2, i-13, i-3, i+7]}
function positionsLeft(i:number){if(i%10>6 || i>79 || i<20) return[-1]; return[i, i-19, i-9, i+1, i+11, i+21, i+2, i-7, i+3, i+13]}

export function turnValidValuesToBoard(values: PlaneType[], forBot?:boolean): TileType[]{
    let board: TileType[] = [];
    for(let i = 0; i < 100; i++){ board.push({head: false, body: false, hit: false}) }
    values.forEach((plane: PlaneType, index: number) => {
        const head = plane.headIndex
        const rotation = plane.rotation;
        if(rotation == 'up'){
            positionsUp(head).forEach((pos) => { board[pos].body = true; if(forBot) board[pos].planeNumber = index+1 })
            board[head].head = true;
        }
        if(rotation == 'down'){
            positionsDown(head).forEach((pos) => { board[pos].body = true; if(forBot) board[pos].planeNumber = index+1 })
            board[head].head = true;
        }
        if(rotation == 'right'){
            positionsRight(head).forEach((pos) => { board[pos].body = true; if(forBot) board[pos].planeNumber = index+1 })
            board[head].head = true;
        }
        if(rotation == 'left'){
            positionsLeft(head).forEach((pos) => { board[pos].body = true; if(forBot) board[pos].planeNumber = index+1 })
            board[head].head = true;
        }
    })
    return board;
}

export function turnBoardToPlanes(board: TileType[]): PlaneType[]{
    const planes:PlaneType[] = [];
    const heads = board.filter((tile) => tile.head);
    heads.forEach((head) => {
        const headIndex = board.indexOf(head);
        if(positionsUp(headIndex).every((pos) => pos !== -1 && board[pos].body)) planes.push({headIndex, rotation: 'up'});
        if(positionsDown(headIndex).every((pos) => pos !== -1 && board[pos].body)) planes.push({headIndex, rotation: 'down'});
        if(positionsRight(headIndex).every((pos) => pos !== -1 && board[pos].body)) planes.push({headIndex, rotation: 'right'});
        if(positionsLeft(headIndex).every((pos) => pos !== -1 && board[pos].body)) planes.push({headIndex, rotation: 'left'});
    })
    return planes;

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
    if (rotation === 'right') { return positionsRight(head).every((pos) => pos !== -1 && !board[pos].body); }
    if (rotation === 'left') { return positionsLeft(head).every((pos) => pos !== -1 && !board[pos].body); }
    return true;
}

export function getValidPlane(planes: PlaneType[]): [number, RotationType] {
    while (true) {
        const headIndex = getRandomValidHeadIndex(turnValidValuesToBoard(planes));
        let rotation = ROTATIONS[Math.floor(Math.random() * 4)];
        for(let i = 0; i < 4; ++i){
            if(canAddPlaneToBoard(turnValidValuesToBoard(planes), { headIndex, rotation }))
                return [ headIndex, rotation ]
            else rotation = ROTATIONS[(ROTATIONS.indexOf(rotation)+1)%4];
        }
    }
}

export function generateRandomBoard(forBot?:boolean):TileType[]{
    const [ plane1Head, plane1Rotation ] = getValidPlane([])
    const [ plane2Head, plane2Rotation ] = getValidPlane([{headIndex: plane1Head, rotation: plane1Rotation}])
    const [ plane3Head, plane3Rotation ] = getValidPlane([{headIndex: plane1Head, rotation: plane1Rotation}, {headIndex: plane2Head, rotation: plane2Rotation}])
    return turnValidValuesToBoard([
        {headIndex: plane1Head, rotation: plane1Rotation},
        {headIndex: plane2Head, rotation: plane2Rotation},
        {headIndex: plane3Head, rotation: plane3Rotation}
    ], forBot)
}

export function getRandomValidHeadIndex(board: TileType[]): number {
    let randomIndex;
    for(let i = 0; i < 20; i++){
        randomIndex = Math.floor(11+ Math.random() * 78); // from 11 to 88 ( no restrictions )
        if(!board[randomIndex].hit && randomIndex%10>0 && randomIndex%10<9){
            return randomIndex;
        }
    }
    for(let i = 0; i < 5; i++){
        randomIndex = Math.floor(Math.random() * 100); // from 0 to 99 ( no restrictions )
        if(!board[randomIndex].hit){ 
            return randomIndex;
        }
    }
    return board.findIndex((tile) => !tile.hit);
};

// BOT brain
export function pursueHit(board: TileType[], prevHit: number):number{
    const prevHitTile = board[prevHit];
    if(prevHitTile.head){
        const planeNumber = prevHitTile.planeNumber;
        const planeTiles = board.filter((tile) => tile.planeNumber === planeNumber);
        const planeTilesIndexes = planeTiles.map((tile) => board.indexOf(tile));
        const planeTilesHit = planeTiles.filter((tile) => tile.hit);
        const planeTilesHitIndexes = planeTilesHit.map((tile) => board.indexOf(tile));
        const planeTilesNotHitIndexes = planeTilesIndexes.filter((index) => !planeTilesHitIndexes.includes(index));
        const planeTilesNotHit = planeTilesNotHitIndexes.map((index) => board[index]);
        if(planeTilesNotHit.length === 0) return -1;
        const randomIndex = Math.floor(Math.random() * planeTilesNotHit.length);
        return board.indexOf(planeTilesNotHit[randomIndex]);
    }
    else{
        const prevHitTileIndex = board.indexOf(prevHitTile);
        const prevHitTileRow = Math.floor(prevHitTileIndex/10);
        const prevHitTileCol = prevHitTileIndex%10;
        const possibleTiles = board.filter((tile) => !tile.hit);
        const possibleTilesIndexes = possibleTiles.map((tile) => board.indexOf(tile));
        const possibleTilesRow = possibleTilesIndexes.map((index) => Math.floor(index/10));
        const possibleTilesCol = possibleTilesIndexes.map((index) => index%10);
        const possibleTilesRowDiff = possibleTilesRow.map((row) => Math.abs(row - prevHitTileRow));
        const possibleTilesColDiff = possibleTilesCol.map((col) => Math.abs(col - prevHitTileCol));
        const possibleTilesDiff = possibleTilesRowDiff.map((rowDiff, index) => rowDiff + possibleTilesColDiff[index]);
        const possibleTilesDiffMin = Math.min(...possibleTilesDiff);
        const possibleTilesDiffMinIndexes = possibleTilesDiff.map((diff, index) => diff === possibleTilesDiffMin ? index : -1).filter((index) => index !== -1);
        const possibleTilesDiffMinIndexesFiltered = possibleTilesDiffMinIndexes.filter((index) => possibleTilesRow[index] === prevHitTileRow || possibleTilesCol[index] === prevHitTileCol);
        const possibleTilesDiffMinIndexesFilteredRandomIndex = Math.floor(Math.random() * possibleTilesDiffMinIndexesFiltered[0]);
        return board.indexOf(possibleTiles[possibleTilesDiffMinIndexesFiltered[possibleTilesDiffMinIndexesFilteredRandomIndex]]);
    }
}