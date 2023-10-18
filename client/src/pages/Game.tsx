import { useEffect, useContext } from 'react';
import { Context } from '../Context';
import { ContextType } from '../types';

export default function Game() {
    const { state } = useContext<ContextType>(Context);
    useEffect(() => {
        console.log(state)
    }, [])
    const enemyBoard = [
        0,0,1,0,0,0,0,0,0,0,
        1,1,1,1,1,0,0,0,0,0,
        0,0,1,0,0,0,0,1,0,0,
        0,1,1,1,0,1,1,1,1,1,
        0,0,0,0,0,0,0,1,0,0,
        0,0,0,1,0,0,1,1,1,0,
        0,1,1,1,1,1,0,0,0,0,
        0,0,0,1,0,0,0,0,0,0,
        0,0,1,1,1,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0
    ]
    return (
        <main className="flex max-sm:flex-col items-center justify-center gap-6 md:pt-24">
            <section className="board">
                {[...enemyBoard].reverse().map((tile, i) => (
                    <div key={i} className="tile" 
                    style={{background: tile==1?'#38fa':'var(--gray)'}}></div>
                ))}
            </section>
            <section className="board">
                {enemyBoard.map((tile, i) => (
                    <div key={i} className="tile cursor-pointer enemy" 
                    style={{background: tile==1?'#38fa':'var(--gray)'}}></div>
                ))}
            </section>
        </main>
    )
}