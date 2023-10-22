import { TileType } from "../types"
import { useState } from "react"
import VanillaTilt from 'vanilla-tilt'
import isMobile from "is-mobile"
import { getRandomValidIndex } from "../utils/BotLogic"

export default function BotGame({bot}:{bot:'vasile'|'andrei'|'ioana'}){
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
    const [ botPastHit , setBotPastHit ] = useState<boolean>(false)
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
    const mobile = isMobile()
    function handleTileClick(tile: TileType, i:number){
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
        const timeout = setTimeout(() => {
            const newBoard = [...myBoard]
            const randomTile = getRandomValidIndex(newBoard)
            if(randomTile%6 == 0) setBotSelectedTile(getRandomValidIndex(newBoard))
            setTimeout(() => { if(randomTile%2 == 0) setBotSelectedTile(getRandomValidIndex(newBoard))}, 1000)
            setTimeout(() => { setBotSelectedTile(randomTile)}, 1700)
            setTimeout(() => {  
                newBoard[randomTile].hit = true
                setMyBoard(newBoard)
                setTimeout(() => { setMyTurn(true) }, 1000)
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
    const boardsWrapper = document.getElementById('boardWrapper')
    if(!mobile){
        VanillaTilt.init(boardsWrapper, { max: 5, speed: 400  });
    }
    return (
        <main className="flex items-center justify-center pt-12">
            <h2 className="absolute top-4 sm:top-6">{myTurn?"Your turn!":`🤖 ${bot}'s turn`}</h2>
            <div className="w-full h-full flex max-sm:flex-col items-center justify-center gap-6 md:gap-14" id="boardWrapper">
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
                        style={{background: tile.hit&&tile.head?'#777':tile.hit&&tile.body?'#f83':'#f334',
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