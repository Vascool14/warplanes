import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../../Context";
import Button from "../../components/Button";
import axios from "axios";

export default function Register() {
    const { state, setState } = useContext(Context);
    const [username, setUsername] = useState('');
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
        axios.post('/register', { username, email, password})
        .then(res => {
            if(res.data.success){
                setState({ ...state, user: { username: res.data.user.username, email: email, id: res.data.user._id, gameStats: res.data.user.gameStats }})
                document.cookie = `token=${res.data.token}; path=/; max-age=2592000`; // 30 days
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
                <h1>Register</h1>
                <div className="input-group w-full">
                    <input type="text" id="username" name="username"
                    value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <label htmlFor="username">Username</label>
                </div>
                <div className="input-group">
                    <input type="email" id="email" name="email" 
                    value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <label htmlFor="email">Email</label>
                </div>
                <div className="input-group">
                    <input type="password" id="paddword" name="password" 
                    value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <label htmlFor="password">Password</label>
                </div>
                <Button text='Submit' onButtonClick={handleSubmit} />
                <p>Already have an account? <Link to="/login">Log in</Link></p>
            </form>
        </main>
    )
}