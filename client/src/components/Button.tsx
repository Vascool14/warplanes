import { useContext } from 'react'
import { Context } from '../Context'
import PlaySound from '../sounds/PlaySound';

type ButtonType = {
    text:string,
    icon?:boolean,
    wFull?:boolean,
    sound?:'click'|'bubble'|'hit'|'miss'|'head'|'win'|'lose'|'draw'|'attack'
    color?:'blue'|'red'|'yellow'|'green',
    onButtonClick?:()=>void
}

export default function Button({text, icon=false, wFull=false, sound='click', color='blue', onButtonClick}:ButtonType) {
    const { state } = useContext(Context);
    function handleClick() {
        if(onButtonClick) onButtonClick();
        if(state.sounds) PlaySound(sound)
    }
    return (
        <div className={`btnWrapper ${color} ${wFull? 'w-full':''}`}>
            <button onClick={handleClick}>
                <h3 style={{
                    margin: icon?'-0.2rem 0':0, 
                    transform: icon?'scale(1.4)':'scale(1)'
                }}>{text}</h3>
            </button>
        </div>
    )
}