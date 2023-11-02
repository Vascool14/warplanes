import { TileType } from "../types"
import { useEffect, useState } from "react"
import VanillaTilt from 'vanilla-tilt'
import isMobile from "is-mobile"
import { getRandomValidIndex } from "../utils/BotLogic"
import { COLORS } from "../utils/Constants"

export default function BotGame({bot}:{bot:'vasile'|'ioana'}){
    const [ myTurn , setMyTurn ] = useState(true)
    const [ myBoard, setMyBoard ] = useState([
        {hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},
        {hit:false, head: false, body: false},{hit:false, head: false, body: false}, {hit:true, head: true, body: true},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},
        {hit:true, head: false, body: true}, {hit:false, head: false, body: true}, {hit:true, head: false, body: true}, {hit:true, head: false, body: true}, {hit:false, head: false, body: true},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},
        {hit:true, head: false, body: false},{hit:false, head: false, body: false}, {hit:false, head: false, body: true},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false}, {hit:false, head: true, body: true},{hit:false, head: false, body: false},{hit:false, head: false, body: false},
        {hit:false, head: false, body: false}, {hit:false, head: false, body: true}, {hit:false, head: false, body: true}, {hit:false, head: false, body: true},{hit:false, head: false, body: false}, {hit:false, head: false, body: true}, {hit:false, head: false, body: true}, {hit:false, head: false, body: true}, {hit:false, head: false, body: true}, {hit:false, head: false, body: true},
        {hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false}, {hit:false, head: false, body: true},{hit:false, head: false, body: false},{hit:false, head: false, body: false},
        {hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:true, head: false, body: true}, {hit:false, head: false, body: true},{hit:false, head: false, body: true},{hit:false, head: false, body: false}, {hit:false, head: false, body: true}, {hit:false, head: false, body: true}, {hit:false, head: false, body: true},{hit:false, head: false, body: false},
        {hit:false, head: false, body: false}, {hit:false, head: false, body: false}, {hit:true, head: false, body: false}, {hit:false, head: false, body: true}, {hit:false, head: false, body: false}, {hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},
        {hit:false, head: false, body: false},{hit:false, head: false, body: true},{hit:false, head: false, body: true}, {hit:false, head: false, body: true},{hit:false, head: false, body: true},{hit:false, head: false, body: true},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},
        {hit:false, head: false, body: false},{hit:false, head: false, body: false}, {hit:false, head: false, body: false}, {hit:false, head: true, body: true}, {hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},
    ])
    const [ botSelectedTile , setBotSelectedTile ] = useState(100)
    // const [ botPastHit , setBotPastHit ] = useState<boolean>(false)
    const [ enemyBoard, setEnemyBoard ] = useState([
        {hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},
        {hit:false, head: false, body: false},{hit:false, head: false, body: false}, {hit:true, head: true, body: true},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},
        {hit:true, head: false, body: true}, {hit:false, head: false, body: true}, {hit:true, head: false, body: true}, {hit:true, head: false, body: true}, {hit:false, head: false, body: true},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},
        {hit:true, head: false, body: false},{hit:false, head: false, body: false}, {hit:false, head: false, body: true},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false}, {hit:false, head: true, body: true},{hit:false, head: false, body: false},{hit:false, head: false, body: false},
        {hit:false, head: false, body: false}, {hit:false, head: false, body: true}, {hit:false, head: false, body: true}, {hit:false, head: false, body: true},{hit:false, head: false, body: false}, {hit:false, head: false, body: true}, {hit:false, head: false, body: true}, {hit:false, head: false, body: true}, {hit:false, head: false, body: true}, {hit:false, head: false, body: true},
        {hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false}, {hit:false, head: false, body: true},{hit:false, head: false, body: false},{hit:false, head: false, body: false},
        {hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:true, head: false, body: false}, {hit:false, head: true, body: true},{hit:false, head: false, body: false},{hit:false, head: false, body: false}, {hit:false, head: false, body: true}, {hit:false, head: false, body: true}, {hit:false, head: false, body: true},{hit:false, head: false, body: false},
        {hit:false, head: false, body: false}, {hit:false, head: false, body: true}, {hit:true, head: false, body: true}, {hit:false, head: false, body: true}, {hit:false, head: false, body: true}, {hit:false, head: false, body: true},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},
        {hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false}, {hit:false, head: false, body: true},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},
        {hit:false, head: false, body: false},{hit:false, head: false, body: false}, {hit:false, head: false, body: true}, {hit:false, head: false, body: true}, {hit:false, head: false, body: true},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},
    ])
    const [ timer , setTimer ] = useState(10)
    useEffect(() => {
        const interval = setInterval(() => {
            if(timer > 0) setTimer(prev => prev - 1)
        }, 1000);
        return () => clearInterval(interval)
    }, [])
    useEffect(() => {
        if(timer <= 0){
            setMyTurn(false)
            handleBotTurn()
        }
    }, [timer])
    const mobile = isMobile()
    function handleTileClick(tile: TileType, i:number){
        setTimer(10)
        if(!myTurn) return
        if(tile.hit) return
        const newBoard = [...enemyBoard]
        newBoard[i].hit = true
        setEnemyBoard(newBoard)
        if(checkIfWon(newBoard)){ 
            const winTimeout = setTimeout(() => {
                alert('You won against bot-' + bot + '!')
                return resetGame()
            }, 500);
            return () => clearTimeout(winTimeout)
        }
        setMyTurn(false)
        handleBotTurn()
    }
    function handleBotTurn(){
        setTimer(10)
        const timeout = setTimeout(() => {
            const newBoard = [...myBoard]
            const randomTile = getRandomValidIndex(newBoard)
            if(randomTile%6 == 0) setBotSelectedTile(getRandomValidIndex(newBoard))
            setTimeout(() => { if(randomTile%2 == 0) setBotSelectedTile(getRandomValidIndex(newBoard))}, 1000)
            setTimeout(() => { setBotSelectedTile(randomTile)}, 1700)
            setTimeout(() => {  
                newBoard[randomTile].hit = true
                setMyBoard(newBoard)
                setTimeout(() => { setMyTurn(true); setTimer(10) }, 1000)
                if(checkIfWon(newBoard)) {
                    const winTimeout = setTimeout(() => {
                        alert('You lost against bot-' + bot + '!')
                        return resetGame()
                    }, 500);
                    return () => clearTimeout(winTimeout)
                }
                setBotSelectedTile(100)
            }, 2500)
        }, 500)
        return () =>  clearTimeout(timeout)
    }
    function checkIfWon(board: TileType[]){
        let hitHeads = 0;
        board.map(tile => { if(tile.hit && tile.head) hitHeads++ })
        return hitHeads === 3
    }
    // TODO: reset game
    function resetGame(){
        setMyBoard([])
        setEnemyBoard([])
        setMyTurn(true)
    }
    if(!mobile){
        const boardsWrapper = document.getElementById('boardWrapper')
        // @ts-ignore
        VanillaTilt.init(boardsWrapper, { max:5, speed:400  });
    }
    return (
        <main className="flex flex-col gap-2 sm:gap-8 items-center justify-center max-sm:justify-between">
            <div className="boardNav gap-4 sm:gap-8 min-h-[4.8rem]">
                <div className="h-full w-full flex gap-6">
                    <h2 className="max-md:hidden mt-auto mb-[-0.9rem] ml-auto">{myTurn?timer:''} {'Vascool'}</h2>
                    <section className="iconWrapper">
                        <div className="icon" style={{backgroundColor: COLORS[9]}}><h1>V</h1></div>
                    </section>
                    <style>{`
                    svg {
                        transform: rotateZ(-0deg) rotateY(180deg);
                        background: var(--text);
                        border-radius: 16px;
                    }
                    svg rect {
                        stroke-dasharray: 135;
                        stroke-dashoffset: 135;
                        stroke-linecap: round;
                        stroke-width: 5px;
                        stroke: green;
                        fill: none;
                        animation: countdown 10s linear infinite forwards;
                    }
                    @keyframes countdown {
                        from { stroke-dashoffset: 135; }
                        to {  stroke-dashoffset: 0; }
                    }`}</style>
                    <svg width="60" height="60" viewBox="0 0 40 40">
                        <rect x="2" y="2" width="36" height="36" rx={8} ry={8} />
                    </svg>
                </div>
                <div className="h-full w-full flex gap-6">
                    <section className="iconWrapper">
                        <svg width="60" height="60" viewBox="0 0 40 40">
                            <rect x="2" y="2" width="36" height="36" rx={8} ry={8} />
                        </svg>
                        <div className="icon" style={{backgroundColor: 'var(--sky)'}}><h1>{bot == 'ioana'?"🤷🏼‍♀️":"🙋🏽‍♂️"}</h1></div>
                    </section>
                    <h2 className="max-md:hidden mt-auto mb-[-0.9rem]">{myTurn?'':timer} {bot}</h2>
                </div>
            </div>
            <div className="w-full h-full flex max-sm:flex-col items-center justify-center gap-6 sm:gap-8" id="boardWrapper">
                <section className="board" style={{filter: !myTurn?'brightness(1.3)':'brightness(0.8)'}}>
                    {myBoard.map((tile, i) => ( 
                        <div key={i} className="tile"
                        style={{background: botSelectedTile===i?'#f33a':!tile.body?'#38f3':
                        tile.body&&tile.hit&&!tile.head?'#16d':tile.head?'#777':'#38f',
                        transform: tile.hit && !tile.body?'scale(0.01)':'scale(1)'}}
                        >
                            {tile.hit && tile.body && <h3>x</h3>}
                        </div>
                    ))}
                </section>
                <section className="board" style={{filter: myTurn?'brightness(1.2)':'brightness(0.8)'}}>
                    {enemyBoard.map((tile, i) => (
                        <div key={i} className="tile cursor-pointer enemy" 
                        style={{background: tile.hit&&tile.head?'#777':tile.hit&&tile.body?'#e72':'#f334',
                        transform: tile.hit&&!tile.body?'scale(0.01)':'scale(1)'}}
                        onClick={() => handleTileClick(tile, i)}
                        >
                            {tile.hit && tile.body && <h3>x</h3>}
                        </div>
                        ))}
                </section>
            </div>
        </main>
    )
}