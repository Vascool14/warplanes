import { useEffect, useState } from "react";
import { TileType, PlaneType, RotationType } from "../types";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import { canAddPlaneToBoard, turnValidValuesToBoard, turnBoardToPlanes, generateRandomBoard } from "../utils/Board";
import PlaySound from "../sounds/PlaySound";

export default function SetPlanes() {
    const [ board, setBoard ] = useState<TileType[]>(Array(100).fill({body:false, head:false, hit:false}));
    const [ planes, setPlanes ] = useState<PlaneType[]>([]);
    const [ isError, setError ] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const ROTATIONS:RotationType[] = ['up', 'left', 'down', 'right'];

    function handleSubmit(){
        // allow to go forward only if the board has 3 planes
        if(board.filter(tile => tile.head).length !== 3) return;
        localStorage.setItem('myBoard', JSON.stringify(board))
        localStorage.removeItem('enemyBoard')
        localStorage.removeItem('myTurn')
        navigate(location.pathname.slice(0, location.pathname.lastIndexOf('/')));

        // to 'burn' this page from history, so the user can't go back to it after the game has started, just:

    }

    function handleTileClick(index: number){
        // if hit head, rotate plane 90 degrees if possible
        if(board[index].head) return rotatePlane(index);

        // if hit body, error
        if(board[index].body) return triggerError();
        
        // empty tile, add plane to board:
        for(let i = 0; i < 4; i++){
            let newPlane:PlaneType = {headIndex: index, rotation:ROTATIONS[i]};
            if(canAddPlaneToBoard(board, newPlane)){
                setPlanes([...planes, newPlane]);
                setBoard(turnValidValuesToBoard([...planes, newPlane]));
                return PlaySound('hit');
            }
        }

        // nothing happened, error
        triggerError();
    }

    function rotatePlane(index: number){
        const plane = planes.find(plane => plane.headIndex === index);
        const otherPlanes = planes.filter(plane => plane.headIndex !== index);
        
        // then rotate it (if possible)
        const currentRotation = ROTATIONS.indexOf(plane!.rotation)+1||1;
        for(let i = currentRotation; i < 3+currentRotation; i++){
            let newPlane:PlaneType = {headIndex: index, rotation:ROTATIONS[i%4]};
            if(canAddPlaneToBoard(turnValidValuesToBoard(otherPlanes), newPlane)){
                setPlanes([...otherPlanes, newPlane]);
                setBoard(turnValidValuesToBoard([...otherPlanes, newPlane]));
                return PlaySound('hit');
            }
        }
        triggerError();
    }

    function removePlane(index: number){
        if(!board[index].head) return triggerError();
        PlaySound('head');
        const newPlanes = planes.filter(plane => plane.headIndex !== index);
        setPlanes(newPlanes);
        setBoard(turnValidValuesToBoard(newPlanes));
    }

    function getRandomBoard(){
        const newBoard = generateRandomBoard(true);
        setBoard(newBoard);
        setPlanes(turnBoardToPlanes(newBoard));
    }

    function triggerError(){
        setError(true);
        PlaySound('bad-drop');
    }

    useEffect(() => {
        const timeout = setTimeout(() => {setError(false)}, 400);
        return () => clearTimeout(timeout);
    }, [isError]);
    return (
        <main className="flex items-center justify-center flex-col gap-2 text-center">
            <h1>Set&nbsp;up&nbsp;planes</h1>
            <p>Tap once to add plane<br/>Tap head to rotate<br/>Double-tap head to remove plane</p>
            <section className="board mb-auto mt-4">
                {board.map((tile: TileType, i:number) => ( 
                    <div key={i} className="tile" 
                        style={{background: !tile.body? isError?'#f665':'#1e78d733':
                        tile.body&&tile.hit&&!tile.head?'#1e78d7':tile.head?'#999':'#1e78d7aa',
                        animation: isError?'shake 0.5s':'none'}}
                        onClick={() => handleTileClick(i)}
                        onDoubleClick={() => removePlane(i)}
                    ></div>
                ))}
            </section>
            <div className="flex w-full justify-between absolute bottom-0 p-6">
                <Button onButtonClick={() => getRandomBoard()} text="shuffle" color="yellow" />
                <Button onButtonClick={() => handleSubmit()} text="Start" />
            </div>
        </main>
    )
}