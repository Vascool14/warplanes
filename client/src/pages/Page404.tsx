import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function Page404() {
    const navigate = useNavigate();
    return (
        <main className='flex flex-col justify-center items-center'>
            <h1>Error <span className='text-[var(--redLight)]'>404</span></h1>
            <h3 className='mb-4'>Page Not Found</h3>
            <Button color="yellow" text="go back" onButtonClick={() => navigate(-1)} />
        </main>
    )
}