import { useContext } from 'react'
import { Context } from '../Context'

export default function GameMusic() {
    const { state } = useContext(Context);
    return <audio src={`/src/sounds/${state.musicType}.mp3`} autoPlay loop />
}