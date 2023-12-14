import Button from '../../components/Button'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { Context } from '../../Context'
import axios from 'axios';

export default function Login() {
    const { state, setState } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        if(state.user?.email !== ''){
            navigate('/account');
        }
        setState({...state, canExit: true})
        return () => { setState({...state, canExit: false}) }
    }, [])
    function handleSubmit() {
        if(email.length < 3 || password.length < 3) return;
        axios.post('/login', { email, password})
        .then(res => {
            const { username, email, gameStats } = res.data.user;
            setState({ ...state, user: { username, email, gameStats }})
            document.cookie = `token=${res.data.token}; path=/; max-age=2592000`; // 30 days
            navigate('/account');
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
                    <input type="text" id="email" name="email" autoComplete='email'
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="input-group">
                    <input type="password" id="password" name="password" autoComplete='current-password'
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label htmlFor="password">Password</label>
                </div>
                <Button text='Submit' onButtonClick={handleSubmit} />
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </form>
        </main>
    )
}
