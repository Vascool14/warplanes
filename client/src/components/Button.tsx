import clickSound from '../sounds/click.mp3'
import { useContext } from 'react'
import { Context } from '../Context'

export default function Button({text, onButtonClick}: {text: string, onButtonClick?: () => void}) {
    const {state} = useContext(Context)
    function handleClick(){
        if(onButtonClick) onButtonClick()
        if(state?.sounds.sfx) new Audio(clickSound).play()
    }
    return (
        <button onClick={handleClick}>
            <span className="buttonTop">{text}</span>
        </button>
    )
}