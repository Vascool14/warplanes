import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../../Context'
// import Button from '../components/Button'

export default function Account() {
    const { state, setState } = useContext(Context);
    const user = state.user;
    useEffect(() => {
        if(!user){
            const navigate = useNavigate();
            navigate('/login');
        }
    }, [])
    return (
        <main>
            <h1>Hello {user?.username}</h1>
        </main>
    )
}