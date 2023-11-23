import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { useContext } from 'react';
import { Context } from '../Context'
import { ContextType } from '../types';

export default function Home() {
    const { state } = useContext<ContextType>(Context);
    const user = state.user;
    return (
        <main className='flex items-center justify-center flex-col gap-5 pb-[3rem]'>
            <h1 className='mt-auto text-center'>Warplanes ✈️</h1>  
            <Link to="/tables" className='mt-auto'>
                <Button text='Play as guest' color='green' />
            </Link>
            {user?.username ? 
            <Link to="/tables">
                <Button text={'Play as '+user.username} />
            </Link>
            :
            <>
                <Link to="/login">
                    <Button text='Log in' />
                </Link>
                <Link to="/register">
                    <Button text='Register' />
                </Link>
            </>
            }   
        </main>
    )
}
