import { TileType } from "../types"
import { useEffect, useState, useContext } from "react"
import { Context } from "../Context"
import VanillaTilt from 'vanilla-tilt'
import isMobile from "is-mobile"
import { generateRandomBoard, getRandomValidHeadIndex } from "../utils/Board"
import PlaySound from "../sounds/PlaySound"
// import Button from "../components/Button"
import SetPlanes from "./SetPlanes"

export default function BotGame({bot} : {bot:'vasile'|'ioana'|'andrei'}){
    const { state, setState } = useContext(Context)
    const { user } = state

    const [ isBoardReady , setIsBoardReady ] = useState<boolean>(false)
    const [ myBoard, setMyBoard ] = useState<TileType[]>(Array(100).fill({head:false, body:false, hit:false}))
    const [ myTurn , setMyTurn ] = useState(Math.random() > 0.5)
    const [ enemyBoard, setEnemyBoard ] = useState(generateRandomBoard())

    const [ botSelectedTile , setBotSelectedTile ] = useState(100)
    const [ winner , setWinner ] = useState('')
    const [ isTransparent , setIsTransparent ] = useState(false)
    const [ timer , setTimer ] = useState(10)

    useEffect(() => {
        setState({...state, musicType: 'arena-jingle'})
        if(!isBoardReady) return;
        
        setTimeout(() => { 
            setState({...state, canExit: true, musicType: 'battle'}); 
            if(!myTurn) handleBotTurn()
        }, 4000);
        
        const interval = setInterval(() => {
            if(timer > 0) setTimer(prev => prev - 1)
        }, 1000);
        return () => {
            clearInterval(interval) 
        }
    }, [isBoardReady])

    useEffect(() => {
        if(timer <= 0){
            if(myTurn){setMyTurn(false);handleBotTurn()}
            else setMyTurn(true);
        }
    }, [timer])

    // setup "modal"
    if(!isBoardReady) return <SetPlanes board={myBoard} setBoard={setMyBoard} setBoardReady={setIsBoardReady} />

    const mobile = isMobile()
    
    const myBoardRef = document.querySelectorAll('.board')[0]
    const enemyBoardRef = document.querySelectorAll('.board')[1]
    // game logic
    function handleTileClick(tile: TileType, i:number){
        setTimer(10)
        if(!myTurn) return
        if(tile.hit) return
        setMyTurn(false)
        const newBoard = [...enemyBoard]
        newBoard[i].hit = true
        if(newBoard[i].body){
            // @ts-ignore
            enemyBoardRef.style.transform = 'scale(0.95)'
            // @ts-ignore
            setTimeout(() => { enemyBoardRef.style.transform = 'scale(1)' }, 200)
        }
        if(state.sounds){
            if(newBoard[i].head) PlaySound('head')
            else if(newBoard[i].body) PlaySound('hit')
            else PlaySound('miss')
        } 
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
        const newBoard = [...myBoard]
        const randomTile = getRandomValidHeadIndex(newBoard)
        if(randomTile%7 == 0) setBotSelectedTile(getRandomValidHeadIndex(newBoard))
        if(randomTile%4 !== 0) { setTimeout(() => { setBotSelectedTile(getRandomValidHeadIndex(newBoard))}, 800) }
        setTimeout(() => { setBotSelectedTile(randomTile)}, 1500)
        setTimeout(() => {  
            newBoard[randomTile].hit = true
            if(newBoard[randomTile].body){
                // @ts-ignore
                myBoardRef.style.transform = 'scale(0.95)'
                // @ts-ignore
                setTimeout(() => { myBoardRef.style.transform = 'scale(1)' }, 200)
            }
            if(state.sounds){
                if(newBoard[randomTile].head) PlaySound('head'+Math.floor(Math.random()*3+1))
                else if(newBoard[randomTile].body) PlaySound('hit'+Math.floor(Math.random()*2+1))
                else PlaySound('miss')
            } 
            setMyBoard(newBoard)
            setBotSelectedTile(100)
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
        }, 1500 + 2500*Math.random())
    }
    function checkIfWon(board: TileType[]){
        let hitHeads = 0;
        board.map(tile => { if(tile.hit && tile.head) hitHeads++ })
        return hitHeads === 3
    }
    function resetGame(){
        setMyBoard(generateRandomBoard())
        setEnemyBoard(generateRandomBoard())
        setMyTurn(true)
        setWinner('')
        setIsTransparent(false)
    }

    if(!mobile){
        const boardsWrapper = document.getElementById('boardWrapper')
        // @ts-ignore
        VanillaTilt.init(boardsWrapper, { max:5, speed:400  });
    }
    return (
        <main className={`swipe-up flex flex-col gap-2 ${!mobile && 'sm:gap-8'} items-center justify-center h-screen overflow-hidden pt-0`}>
            {/* <div className="fixed top-24 right-6 cursor-pointer"> 
                <Button icon text={isPaused?'=':'|>'} onButtonClick={() => setIsPaused(prev => !prev)} />
            </div> */}
            <section className={`boardNav flex justify-center w-full h-[calc(2rem+4vw)] gap-6 ${!mobile && 'sm:gap-8'} min-h-[4.8rem] ${mobile ? 'scale-[0.7]':'mt-2'}`}>
                <div className="h-full w-[50%] flex gap-4">
                    <h3 className="max-md:hidden overflow-clip text-[var(--white)] ml-auto mb-[-0.4rem] mt-auto">{user?.username || 'Guest'}</h3>
                    <div className="iconWrapper max-md:ml-auto relative">
                        <svg id="timerBar" style={{background: myTurn?'var(--white)':"var(--gray)",
                        // animationPlayState: isPaused?'paused':'running'    
                        }} width="100%" height="100%" viewBox="0 0 40 40">
                            {myTurn && <rect x="2" y="2" width="36" height="36" rx={8} ry={8} />}
                        </svg>
                        <div className="icon" style={{backgroundColor: '#1e78d7aa'}}><h2>{user && user.username? user.username[0]:'g'}</h2></div>
                    </div>
                </div>

                <div className="h-full w-[50%] flex gap-6">
                    <div className="iconWrapper">
                        <svg id="timerBar" style={{background: !myTurn?'var(--white)':'var(--gray)'}} width="100%" height="100%" viewBox="0 0 40 40">
                            {!myTurn && <rect x="2" y="2" width="36" height="36" rx={8} ry={8} />}
                        </svg>
                        <div className="icon" style={{backgroundColor: '#c67'}}><h2>{bot == 'ioana'?"🤷🏼‍♀️":bot=='vasile'?'👨🏽‍🎓':"🙋🏻‍♂️"}</h2> </div>
                    </div>
                    <h3 className="max-md:hidden mt-auto mb-[-0.4rem] text-[var(--white)]">{bot}</h3>
                </div>
            </section>

            {/* start icons */} 
            <section className="showdown">
                <div className="left p-12 h-full flex w-full">
                    <div className="icon">
                        <h1>{user && user.username? user.username[0]:'g'}</h1>
                    </div>
                    <h1 className="text-[var(--white)]">{user?.username || 'guest'}</h1>
                </div>
                <div className="right p-12 h-full flex w-full items-end justify-end">
                    <div className="icon">
                        <h1>{bot == 'ioana'?"🤷🏼‍♀️":bot=='vasile'?'👨🏽‍🎓':"🙋🏻‍♂️"}</h1>
                    </div>
                    <h1 className="text-[var(--white)]">{bot}</h1>
                </div>
            </section>

            <section className={`w-full flex max-sm:flex-col max-sm:mb-auto items-center justify-center gap-6 ${!mobile && 'sm:gap-8'}`} id="boardWrapper">
                <section className="board" style={{opacity: myTurn?0.4:1}}>
                    {myBoard.map((tile: TileType, i:number) => ( 
                        <div key={i} className="tile"
                        style={{background: botSelectedTile===i?'#c67':!tile.body?'#1e78d7'+'22':
                        tile.body&&tile.hit&&!tile.head?'#1e78d7':tile.head?'#999':'#1e78d7'+'aa',
                        transform: tile.hit && !tile.body?'scale(0.01)':'scale(1)'}}
                        >
                            {tile.hit && tile.body && <p>x</p>}
                        </div>
                    ))}
                </section>
                <section className="board" style={{opacity: myTurn?1:0.4}}>
                    {enemyBoard.map((tile: TileType, i:number) => (
                        <div key={i+100} className="tile cursor-pointer enemy" 
                        style={{background: tile.head && isTransparent?'#999':tile.body && isTransparent?'#c67': tile.hit&&tile.head?'#999':tile.hit&&tile.body?'#c67':'#c677',
                        transform: tile.hit&&!tile.body?'scale(0.01)':'scale(1)'}}
                        onClick={() => handleTileClick(tile, i)}
                        >
                            {tile.hit && tile.body && <p>x</p>}
                        </div>
                        ))}
                </section>
            </section>
            {winner.length > 0 && 
            <div className="win fixed inset-0 flex items-center justify-center pl-10 text-center">
                <h1 style={{animation: 'win 0.5s forwards', zIndex: 100, fontSize: 'calc(3rem + 5vw)'}}>{winner}</h1>
            </div>}
        </main>
    )
}
