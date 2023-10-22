import Button from '../../components/Button'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { Context } from '../../Context'
import axios from 'axios';

export default function Login() {
    const { state, setState } = useContext(Context);
    const user = state.user;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        if(!user){
            const navigate = useNavigate();
            navigate('/login');
        }
    }, [])
    function handleSubmit() {
        if(username.length < 3 || password.length < 3) return;
        axios.post('/login', { username, password}).then(res => {
            if(res.data.success){
                setState({ ...state, user: res.data.user })
                const navigate = useNavigate();
                navigate('/account');
            }
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <main className="flex items-center justify-center">
            <form onSubmit={(e) => {e.preventDefault(); handleSubmit()}}
            className='flex flex-col gap-6 max-w-[28rem]'>
                <h1>Log In</h1>
                <div className="input-group">
                    <input type="text" name="first-name" />
                    <label htmlFor="first-name">Username</label>
                </div>
                <div className="input-group mb-2">
                    <input type="password" name="password" />
                    <label htmlFor="password">Password</label>
                </div>
                <Button text='Submit' onButtonClick={handleSubmit} />
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </form>
        </main>
    )
}
