import { TileType, PlaneType } from "../types"
import { useEffect, useState } from "react"
import VanillaTilt from 'vanilla-tilt'
import isMobile from "is-mobile"
import { COLORS } from "../utils/Constants"
import { turnValidValuesToBoard, generateValidRandomBoard, getRandomValidHeadIndex } from "../utils/Board"
import YouWin from "../components/YouWin"
import PlaySound from "../sounds/PlaySound"

export default function BotGame({bot} : {bot:'vasile'|'ioana'|'andrei'}){
    const [ myTurn , setMyTurn ] = useState(true)
    const [ myBoard, setMyBoard ] = useState(generateValidRandomBoard())
    const [ botSelectedTile , setBotSelectedTile ] = useState(100)
    const [ winner , setWinner ] = useState('')
    const [ isTransparent , setIsTransparent ] = useState(false)
    // const [ botPastHit , setBotPastHit ] = useState<boolean>(false)
    const [ enemyBoard, setEnemyBoard ] = useState(generateValidRandomBoard())
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
    
    // game logic
    function handleTileClick(tile: TileType, i:number){
        setTimer(10)
        if(!myTurn) return
        PlaySound('bubble')
        if(tile.hit) return
        setMyTurn(false)
        const newBoard = [...enemyBoard]
        newBoard[i].hit = true
        setEnemyBoard(newBoard)
        if(checkIfWon(newBoard)){ 
            setIsTransparent(true)
            const winTimeout = setTimeout(() => {
                setWinner('You win!')
                setTimeout(() => {
                    setMyTurn(true); 
                    setTimer(10);
                    resetGame()
                }, 2000)
            }, 100);
            return () => clearTimeout(winTimeout)
        }
        handleBotTurn()
    }
    function handleBotTurn(){
        setTimer(10)
        PlaySound('bubble')
        const newBoard = [...myBoard]
        const randomTile = getRandomValidHeadIndex(newBoard)
        if(randomTile%7 == 0) setBotSelectedTile(getRandomValidHeadIndex(newBoard))
        if(randomTile%4 !== 0) { setTimeout(() => { setBotSelectedTile(getRandomValidHeadIndex(newBoard))}, 800) }
        setTimeout(() => { setBotSelectedTile(randomTile)}, 1500)
        setTimeout(() => {  
            newBoard[randomTile].hit = true
            setMyBoard(newBoard)
            setTimeout(() => { setMyTurn(true); setTimer(10) }, 1000)
            if(checkIfWon(newBoard)) {
                setIsTransparent(true)
                const winTimeout = setTimeout(() => {
                    setWinner('You lose!')
                    setTimeout(() => {
                        setMyTurn(true); 
                        setTimer(10);
                        resetGame()
                    }, 2000)
                }, 500);
                return () => clearTimeout(winTimeout)
            }
            setBotSelectedTile(100)
        }, 1500 + 2500*Math.random())
    }
    function checkIfWon(board: TileType[]){
        let hitHeads = 0;
        board.map(tile => { if(tile.hit && tile.head) hitHeads++ })
        return hitHeads === 3
    }
    // TODO: reset game
    function resetGame(){
        setMyBoard(generateValidRandomBoard())
        setEnemyBoard(generateValidRandomBoard())
        setMyTurn(true)
        setWinner('')
        setIsTransparent(false)
    }
    if(!mobile){
        const boardsWrapper = document.getElementById('boardWrapper')
        // @ts-ignore
        VanillaTilt.init(boardsWrapper, { max:5, speed:400  });
    }
    const user = {
        name: 'ihgfedcbaVascool14',
        email: 'vascul2002@gmail.com',
        color: null
    }
    const userColor = user.color || COLORS[user.name.charCodeAt(0)%COLORS.length]
    return (
        <main className="flex flex-col gap-2 sm:gap-8 items-center justify-center max-sm:justify-between h-screen overflow-hidden">
            <section className="boardNav flex justify-center w-full h-[calc(2rem+4vw)] gap-4 sm:gap-8 min-h-[4.8rem]">
                <div className="h-full w-[50%] flex gap-6 overflow-hidden">
                    <h3 className="max-md:hidden overflow-clip mt-auto ml-auto mb-[-0.4rem] text-[var(--white)]">{user?.name || 'Guest'}</h3>
                    <div className="iconWrapper max-md:ml-auto">
                        <svg id="timerBar" style={{background: myTurn?'var(--white)':"var(--gray)"}} width="100%" height="100%" viewBox="0 0 40 40">
                            {myTurn && <rect x="2" y="2" width="36" height="36" rx={8} ry={8} />}
                        </svg>
                        <div className="icon " style={{backgroundColor: userColor+'aa'}}><h2>{user.name[0]}</h2></div>
                    </div>
                </div>

                <div className="h-full w-[50%] flex gap-6">
                    <div className="iconWrapper">
                        <svg id="timerBar" style={{background: myTurn?'var(--gray)':"#ccc"}} width="100%" height="100%" viewBox="0 0 40 40">
                            {!myTurn && <rect x="2" y="2" width="36" height="36" rx={8} ry={8} />}
                        </svg>
                        <div className="icon" style={{backgroundColor: 'var(--white)'}}><h2>{bot == 'ioana'?"🤷🏼‍♀️":bot=='vasile'?'👨🏽‍🎓':"🙋🏻‍♂️"}</h2> </div>
                    </div>
                    <h3 className="max-md:hidden mt-auto mb-[-0.4rem] text-[var(--white)]">{bot}</h3>
                </div>
            </section>
            <div className="w-full flex max-sm:flex-col items-center justify-center gap-6 sm:gap-8" id="boardWrapper">
                <section className="board" style={{opacity: myTurn?0.4:1}}>
                    {myBoard.map((tile, i) => ( 
                        <div key={i} className="tile"
                        style={{background: botSelectedTile===i?'#f33':!tile.body?userColor+'22':
                        tile.body&&tile.hit&&!tile.head?userColor:tile.head?'#999':userColor+'aa',
                        transform: tile.hit && !tile.body?'scale(0.01)':'scale(1)'}}
                        >
                            {tile.hit && tile.body && <p>x</p>}
                            {/* {i} */}
                        </div>
                    ))}
                </section>
                <section className="board" style={{opacity: myTurn?1:0.4}}>
                    {enemyBoard.map((tile, i) => (
                        <div key={i} className="tile cursor-pointer enemy" 
                        style={{background: tile.head && isTransparent?'#999':tile.body && isTransparent?'#c67': tile.hit&&tile.head?'#999':tile.hit&&tile.body?'#c67':'#c677',
                        transform: tile.hit&&!tile.body?'scale(0.01)':'scale(1)'}}
                        onClick={() => handleTileClick(tile, i)}
                        >
                            {tile.hit && tile.body && <p>x</p>}
                        </div>
                        ))}
                </section>
            </div>
            {winner.length > 0 && <YouWin text={winner} />}
        </main>
    )
}