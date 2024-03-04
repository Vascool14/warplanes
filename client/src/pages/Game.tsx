import { useContext, useEffect, useState, useRef } from 'react';
import { Context } from '../Context';
import VanillaTilt from 'vanilla-tilt'
import isMobile from "is-mobile"
import { ContextType, TileType } from '../types';
import { EMOJIS } from '../utils/Constants';
import { generateRandomBoard } from "../utils/Board"
import PlaySound from '../sounds/PlaySound';
import Button from '../components/Button';
// import io from 'socket.io-client';

// const socket = io('http://localhost:8080');

export default function Game() {
    const { state, setState } = useContext<ContextType>(Context);
    const { user } = state;
    const [ showEmoji, setShowEmoji ] = useState(false)
    const [ message, setMessage ] = useState('')
    const [ enemyMessage, setEnemyMessage ] = useState('Tu esti si mai slaban. Tu esti si mai slaban')
    const [ isWriting, setIsWriting ] = useState(false)
    const [ inputValue , setInputValue ] = useState('')

    const [ timer, setTimer ] = useState(10)
    const [ myTurn , setMyTurn ] = useState(true)
    const [ enemyBoard, setEnemyBoard ] = useState(generateRandomBoard())
    const [ myBoard, setMyBoard ] = useState(getMyLocalBoard())
    const [ winner , setWinner ] = useState('')
    const [ isTransparent , setIsTransparent ] = useState(false)
    useEffect(() => {
        setState({...state, canExit: true, musicType: 'battle'})
        
    //     socket.on('connect', () => {
    //         console.log(socket.id+' connected to server');
    //     });
        
    //     // Event listener for player joined the game
    //     socket.on('playerJoined', (message) => {
    //         console.log(message);
    //     });
    
    //     // Event listener for player left the game
    //     socket.on('playerLeft', (message) => {
    //         console.log(message);
    //     });

    //     socket.on('createTable', () => {
    //         console.log('createTable');
    //     });

    //     socket.on('disconnect', () => console.log(socket.id+' disconnected from server'));

    //     setState({...state, canExit: true, musicType: 'battle'})
    //     return () => {
    //         socket.off()
    //         setState({...state, canExit: false, musicType: 'menu'})
    //     }
        return () => {
            setState({...state, canExit: false, musicType: 'menu'})
        }
    }, [])

    useEffect(() => {
        if(timer <= 0){
            if(myTurn) setMyTurn(false);
            else setMyTurn(true);
        }
    }, [timer])

    // socketIO
    
    // socketIO

    const myBoardRef = document.querySelectorAll('.board')[0]
    const enemyBoardRef = document.querySelectorAll('.board')[1]

    function handleTileClick(tile: TileType, i:number){
        setTimer(10)
        if(!myTurn) return
        if(tile.hit) return
        setMyTurn(false)
        const newBoard = [...enemyBoard]
        newBoard[i].hit = true
        if(newBoard[i].body){ // @ts-ignore
            enemyBoardRef.style.transform = 'scale(0.95)' // @ts-ignore
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
    }
    function checkIfWon(board: TileType[]){
        let hitHeads = 0;
        board.map(tile => { if(tile.hit && tile.head) hitHeads++ })
        return hitHeads === 3
    }

    // TODO: reset game
    function resetGame(){
        // exit game (go to the leaderboard UI)
    }
    const mobile = isMobile()
    if(!mobile){
        const boardsWrapper = document.getElementById('boardWrapper')
        // @ts-ignore
        VanillaTilt.init(boardsWrapper, { max:5, speed:400  });
    }

    // message
    function emojiClick(emoji: {icon: string, name: string}){
        PlaySound(emoji.name)
        setShowEmoji(prev => !prev)
        setMessage(emoji.icon)
    }
    useEffect(() => {
        if(message.length > 0){
            const time = Math.max(4000, message.length*60)
            const messageTimeout = setTimeout(() => {
                setMessage('')
            }, time);
            return () => clearTimeout(messageTimeout)
        }
    }, [message])
    const inputRef = useRef<HTMLInputElement>(null)
    function writeMessage(){
        PlaySound()
        setIsWriting(true)
    }
    function handleButtonClick(){
        if(inputValue.length > 0){
            setMessage(inputValue); setInputValue(''); setIsWriting(false); PlaySound('send')
        }
        else {
            setShowEmoji(prev => !prev); setInputValue(''); setIsWriting(false)} 
        } 

    function getMyLocalBoard(){ 
        if(localStorage.getItem('myBoard') === null) localStorage.setItem('myBoard', JSON.stringify(generateRandomBoard()));
        return JSON.parse(localStorage.getItem('myBoard')!)
    }
    return (
        <main className={`swipe-up flex flex-col gap-2 ${!mobile && 'sm:gap-8'} items-center justify-center max-sm:justify-between pt-0`}>
            <section className={`boardNav flex justify-center w-full h-[calc(2rem+4vw)] gap-4 ${!mobile && 'sm:gap-8'} min-h-[4.8rem] ${mobile ? 'scale-[0.7]':'mt-2'}`}>
                <div className="h-full min-w-[50vw] flex gap-3">

                    <section className="max-md:hidden relative h-full ml-auto flex flex-col justify-between overflow-hidden">
                        <div className="h-[50%] mt-[-0.3rem] ml-auto">
                            <h3 className="overflow-clip text-[var(--white)]">{user?.username || 'Guest'}</h3>
                        </div>
                        
                        <div className="flex w-full h-[50%] items-center justify-center ">
                            {isWriting ? 
                            // input
                            <form className=" ml-auto w-[min(100%,20vw)] h-full py-[0.35rem] pl-2 text-xl" onSubmit={(e) => {e.preventDefault(); setMessage(inputValue); setInputValue(''); setIsWriting(false); setShowEmoji(false)}}>
                                <input ref={inputRef} type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                            </form>
                            :
                            // emoji slider
                            <div className="carousel flex gap-[calc(0.4rem+0.3vw)] px-1 justify-between items-center h-full w-full transition-all duration-300 mb-[-0.2rem]" 
                            style={{transform: `translateX(${showEmoji?'0%':'200%'})`}}
                            >
                                {EMOJIS.map((emoji, i) => (
                                    <div key={i} className="emoji cursor-pointer hover:scale-[1.1] transition-all" onClick={() => emojiClick(emoji)}>
                                        <h3>{emoji.icon}</h3>
                                    </div>
                                ))}
                                <div className="emoji cursor-pointer hover:scale-[1.1] transition-all" onClick={writeMessage}>
                                    <h3>💬</h3>
                                </div>
                            </div>}

                            <div className="scale-[0.7] mr-[-0.5rem]">
                                <Button text={isWriting? inputValue.length === 0?'x':'>':showEmoji?'>':'<'} color={isWriting && inputValue.length === 0?'red':'yellow'} icon 
                                onButtonClick={() => handleButtonClick()}/>
                            </div>
                        </div>

                    </section>

                    {/* icon */}
                    <div className="iconWrapper max-md:ml-auto relative">
                        <svg id="timerBar" style={{background: myTurn?'var(--white)':"var(--gray)"}} width="100%" height="100%" viewBox="0 0 40 40">
                            {myTurn && <rect x="2" y="2" width="36" height="36" rx={8} ry={8} />}
                        </svg>
                        <div className="icon" style={{backgroundColor: '#1e78d7aa'}}><h2>{user && user.username? user.username[0]:'g'}</h2></div>
                        
                        <div className="messageBar" onClick={() => setMessage('')} style={{minWidth: `max(100%, min(${message.length*0.9}rem, min(40vw,40vh))`,
                            transform: message.length>0?'scale(1) translateY(0)':'scale(0) translateY(-100%)', transition: 'transform 0.15s linear'}}>
                            <h4 style={{fontSize: /^[\p{Emoji}]+$/u.test(message) ? 'calc(3rem + 1vw)' : 'calc(1rem + 0.5vw)'}}>{message}</h4>
                        </div>
                    </div>
                </div>

                <div className="h-full min-w-[50vw] flex gap-6">
                    {/* icon */}
                    <div className="iconWrapper">
                        <svg id="timerBar" width="100%" height="100%" viewBox="0 0 40 40">
                            {!myTurn ? <rect x="2" y="2" width="36" height="36" rx={8} ry={8} />:null}
                        </svg>
                        <div className="icon" style={{backgroundColor: 'var(--sky)'}}><h2>{"W"}</h2></div>

                        <div className="messageBar enemyMessage" onClick={() => setEnemyMessage('')} style={{minWidth: `max(100%, min(${enemyMessage.length*0.9}rem, min(40vw,40vh))`,
                            transform: enemyMessage.length>0?'scale(1) translateY(0)':'scale(0) translateY(-100%)', transition: 'transform 0.15s linear'}}>
                            <p style={{fontSize: /^[\p{Emoji}]+$/u.test(enemyMessage) ? 'calc(3rem + 1vw)' : 'calc(1rem + 0.5vw)'}}>{enemyMessage}</p>
                        </div>
                    </div>
                    <h2 className="max-sm:hidden mt-auto mb-[-0.9rem]">{"Wiknofaw"}</h2>
                </div>
            </section>

            {/* board */}
            <div className="w-full flex max-sm:flex-col items-center justify-center gap-6 md:gap-12" id="boardWrapper">
                <section className="board" style={{opacity: myTurn?0.4:1}}>
                    {myBoard.map((tile: TileType, i:number) => ( 
                        <div key={i} className="tile"
                        style={{background: // botSelectedTile===i?'#c67':
                        !tile.body?'#1e78d7'+'22':
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
            </div>
            {winner.length > 0 && 
            <div className="win fixed inset-0 flex items-center justify-center pl-10 text-center">
                <h1 style={{animation: 'win 0.5s forwards', zIndex: 100, fontSize: 'calc(3rem + 5vw)'}}>{winner}</h1>
            </div>}
        </main>
    )
}