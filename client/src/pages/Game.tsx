import { useContext, useState } from 'react';
import { Context } from '../Context';
import VanillaTilt from 'vanilla-tilt'
import isMobile from "is-mobile"
import { ContextType, TileType } from '../types';
import { COLORS } from '../utils/Constants';

export default function Game() {
    const { state } = useContext<ContextType>(Context);
    const [ myTurn , setMyTurn ] = useState(true)
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
    return (
        <main className="flex flex-col gap-2 sm:gap-6 md:gap-8 items-center justify-center pt-12 overflow-hidden">
            {/* <h2 className={`absolute top-4 sm:top-6 ${mobile && 'sm:top-0'}`}>{myTurn?"Your turn!":`qwerty12's turn`}</h2> */}
            <section className="boardNav flex justify-center w-full h-[calc(2rem+4vw)] gap-4 sm:gap-8 md:gap-12 min-h-[4.8rem]">
                <div className="h-full w-full flex gap-6">
                    <h2 className="max-sm:hidden mt-auto mb-[-0.9rem] ml-auto">{'Vascool'}</h2>
                    <div className="iconWrapper max-sm:ml-auto">
                        <svg id="timerBar" width="100%" height="100%" viewBox="0 0 40 40">
                            {myTurn ? <rect x="2" y="2" width="36" height="36" rx={8} ry={8} />:null}
                        </svg>
                        <div className="icon" style={{backgroundColor: COLORS[9]}}><h2>V</h2></div>
                    </div>
                </div>
                <div className="h-full w-full flex gap-6">
                    <div className="iconWrapper">
                        <svg id="timerBar" width="100%" height="100%" viewBox="0 0 40 40">
                            {!myTurn ? <rect x="2" y="2" width="36" height="36" rx={8} ry={8} />:null}
                        </svg>
                        <div className="icon" style={{backgroundColor: 'var(--sky)'}}><h2>{"W"}</h2></div>
                    </div>
                    <h2 className="max-sm:hidden mt-auto mb-[-0.9rem]">{"Watson"}</h2>
                </div>
            </section>
            <div className="w-full h-full flex max-sm:flex-col items-center justify-center gap-6 md:gap-12"  id="boardWrapper">
                <section className="board" style={{filter: !myTurn?'brightness(1.3)':'brightness(0.8)'}}>
                    {myBoard.map((tile, i) => ( 
                        <div key={i} className="tile"
                        style={{background: !tile.body?'#38f3':tile.body&&tile.hit&&!tile.head?'#16d':tile.head?'#777':'#38f',
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