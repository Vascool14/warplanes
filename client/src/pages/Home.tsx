import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { useContext } from 'react';
import { Context } from '../Context'
import { ContextType } from '../types';
import MenuSidebar from '../components/MenuSidebar';

export default function Home() {
    const { state } = useContext<ContextType>(Context);
    const user = state.user;
    return (
        <main className='flex items-center justify-center flex-col gap-5 pb-[3rem]'>
            <h1 className='mt-auto text-center text-[calc(3rem+3vw)]'>Warplanes ✈️</h1>  
            <Link to="/table" className='mt-auto'>
                <Button text='Play as guest' color='yellow' />
            </Link>
            {user?.username ? 
            <Link to="/table">
                <Button text={'Play as '+user.username} />
            </Link>
            :
            <div className='flex gap-4'>
                <Link to="/login">
                    <Button text='Log in' />
                </Link>
                <Link to="/register">
                    <Button text='Register' />
                </Link>
            </div>
            }   
            {/* <MenuSidebar /> */}
        </main>
    )
}
