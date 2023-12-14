import { useContext, useEffect, useState, useRef } from 'react';
import { Context } from '../Context';
import VanillaTilt from 'vanilla-tilt'
import isMobile from "is-mobile"
import { ContextType, TileType } from '../types';
import { COLORS, EMOJIS } from '../utils/Constants';
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
    const [ isWriting, setIsWriting ] = useState(false)
    const [ inputValue , setInputValue ] = useState('')
    const [ myTurn , setMyTurn ] = useState(true)
    const [ enemyBoard, setEnemyBoard ] = useState(generateRandomBoard())
    const [ myBoard, setMyBoard ] = useState(generateRandomBoard())
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

    // socketIO
    
    // socketIO

    function handleTileClick(tile: TileType, i:number){
        if(!myTurn) return
        if(tile.hit) return
        const newBoard = [...enemyBoard]
        newBoard[i].hit = true
        setEnemyBoard(newBoard)
        if(checkIfWon(newBoard)){ 
            const winTimeout = setTimeout(() => {
                alert('You won against qwerty12!')
                return resetGame()
            }, 500);
            return () => clearTimeout(winTimeout)
        }
        setMyTurn(false)
        // handleBotTurn() enemy turn
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
    const mobile = isMobile()
    if(!mobile){
        const boardsWrapper = document.getElementById('boardWrapper')
        // @ts-ignore
        VanillaTilt.init(boardsWrapper, { max:5, speed:400  });
    }

    const userColor = user && user.username? COLORS[user.username.charCodeAt(0)%COLORS.length]: COLORS[0]
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
        inputRef.current!.focus()
    }
    function handleButtonClick(){
        if(inputValue.length > 0){
            setMessage(inputValue); setInputValue(''); setIsWriting(false); PlaySound('send')
        }
        else {
            setShowEmoji(prev => !prev); setInputValue(''); setIsWriting(false)} 
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
                        <div className="icon" style={{backgroundColor: userColor+'aa'}}><h2>{user && user.username? user.username[0]:'g'}</h2></div>
                        
                        <div className="messageBar" style={{minWidth: `max(100%, min(${message.length*0.9}rem, min(40vw,40vh))`,
                            transform: message.length>0?'scale(1) translateY(0)':'scale(0) translateY(-100%)', transition: 'transform 0.15s linear'}}>
                            <h4 style={{fontSize: /^[\p{Emoji}]+$/u.test(message) ? 'calc(3rem + 1vw)' : 'calc(1rem + 0.5vw)'}}>{message}</h4>
                        </div>
                    </div>
                </div>

                <div className="h-full min-w-[50vw] flex gap-6">
                    <div className="iconWrapper">
                        <svg id="timerBar" width="100%" height="100%" viewBox="0 0 40 40">
                            {!myTurn ? <rect x="2" y="2" width="36" height="36" rx={8} ry={8} />:null}
                        </svg>
                        <div className="icon" style={{backgroundColor: 'var(--sky)'}}><h2>{"W"}</h2></div>
                    </div>
                    <h2 className="max-sm:hidden mt-auto mb-[-0.9rem]">{"Wiknofaw"}</h2>
                </div>
            </section>

            {/* board */}
            <div className="w-full flex max-sm:flex-col items-center justify-center gap-6 md:gap-12"  id="boardWrapper">
                <section className="board" style={{opacity: myTurn?0.4:1}}>
                    {myBoard.map((tile, i) => ( 
                        <div key={i} className="tile"
                        style={{background: !tile.body?userColor+'22':
                        tile.body&&tile.hit&&!tile.head?userColor:tile.head?'#999':userColor+'aa',
                        transform: tile.hit && !tile.body?'scale(0.01)':'scale(1)'
                    }}
                        >
                            {tile.hit && tile.body && <p>x</p>}
                            {/* {i} */}
                            {/* {tile.body && <p>{tile.planeNumber}</p>} */}
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