import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../../Context'
// import Button from '../components/Button'

export default function Account() {
    const { state, setState } = useContext(Context);
    const user = state.user;
    const navigate = useNavigate();
    useEffect(() => {
        if(!user || user && user.username === ''){
            navigate('/login');
        }
        setState({...state, canExit: true})
        return () => { setState({...state, canExit: false}) }
    }, [])
    return (
        <main className='pt-20 sm:pt-24'>
            {user ? <div className="w-full h-full flex flex-col">
                <section className="flex items-end">
                    <div className="icon h-full p-2 aspect-square">
                        <div className="bg-blue-500 h-full w-full flex items-center justify-center rounded-[var(--radius)]">
                            <h1>{user.username[0]}</h1>
                        </div>
                    </div>
                    <h1>{user.username}</h1>
                </section>
                <h3>{user.email}</h3>
                {user.gameStats ? <section className='mt-4'>
                    <h1>Game Stats:</h1>
                    <h3>Gold: {user.gameStats.gold}</h3>
                    <h3>Wins: {user.gameStats.wins}</h3>
                    <h3>Losses: {user.gameStats.losses}</h3>
                    <h3>Games Played: {user.gameStats.wins + user.gameStats.losses}</h3>
                    <h3>Win Rate: {Math.floor(user.gameStats.wins / (user.gameStats.wins + user.gameStats.losses) * 100)}%</h3>
                </section>: null}
            </div>: null}
        </main>
    )
}