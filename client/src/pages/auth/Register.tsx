import { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../../Context";
import Button from "../../components/Button";

export default function Register() {
    const { state, setState } = useContext(Context);
    const user = state.user;
    useEffect(() => {
        if(!user){
            const navigate = useNavigate();
            navigate('/login');
        }
    }, [])
    return (
        <main className="flex items-center justify-center">
            <form onSubmit={(e) => {e.preventDefault(); console.log('submit')}}
            className='flex flex-col gap-6 max-w-[28rem]'>
                <h1>Register</h1>
                <div className="input-group w-full">
                    <input type="text" name="first-name"/>
                    <label htmlFor="first-name">Username</label>
                </div>
                <div className="input-group">
                    <input type="email" name="email" />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="input-group mb-2">
                    <input type="password" name="password" />
                    <label htmlFor="password">Password</label>
                </div>
                <Button text='Submit' />
                <p>Already have an account? <Link to="/login">Log in</Link></p>
            </form>
        </main>
    )
}