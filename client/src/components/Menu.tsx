import { useContext } from "react";
import { Context } from "../Context";
import Button from "./Button";
import { StateType } from "../types";
import { useNavigate } from "react-router-dom";

export default function Menu() {
    const { state, setState } = useContext<{state: StateType, setState: any}>(Context);
    const sounds = state.sounds;
    const music = state.music;
    function toggleTheme(){
        const newTheme = ( state.theme =='dark'?'light':'dark');
        document.documentElement.setAttribute('data-theme', newTheme );
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', getComputedStyle(document.documentElement).getPropertyValue('--sky'));
        // clear localStorage
        localStorage.clear();
        setState({...state, theme: newTheme});
    } 
    // const year = new Date().getFullYear();
    const navigate = useNavigate();
    return (   
        <>    
            <aside className="z-[100] overflow-y-scroll bg-[var(--bg)] h-[min(50vh,40rem)] w-[min(86vw,36rem)] rounded-[calc(var(--radius)+5px)]
            fixed left-[50%] top-[50%] transition-all duration-300 flex flex-col items-center gap-2 squishy p-5 pt-6" 
            style={{transform: state.menuOpen?'translate(-50%,-50%)':'translate(-50%,-200vh)'}}>
                <div className="absolute right-5">
                    <Button text='x' icon color='red' onButtonClick={() => setState({...state, menuOpen: false})} />
                </div>
                
                {/* // account */}
                {state.user?.email && state.user.email.length > 0 ?
                <section className="flex flex-col gap-3 w-full" onClick={() => setState({...state, menuOpen: false})}>
                    <h2 className="mt-auto">{state.user.username}</h2>
                    <div className="flex w-full items-center justify-between text-center gap-4">
                        <Button text="account" wFull color="blue" onButtonClick={() => navigate('/account')} />
                        <Button text='logout' wFull color="red" onButtonClick={() => {setState({...state, user: {username: '', email: ''}}); document.cookie='token=; path=/; max-age=0';}} />
                    </div>
                </section>
                :
                <section className="w-full flex flex-col gap-3">
                    <h2 className="mt-auto">Account</h2>
                    <div className="flex gap-4 w-full">
                        <Button text='login' wFull color="blue" onButtonClick={() => { navigate('/login'); setState({...state, menuOpen: false})}} />
                        <Button text='register' wFull color="blue" onButtonClick={() => { navigate('/register'); setState({...state, menuOpen: false})}} />
                    </div>

                </section>}


                {/* <h2 className="mt-auto">Settings</h2> */}
                <section className="flex gap-4 w-full mt-auto">
                    <div className='flex flex-col w-full items-center justify-between text-center gap-1'>
                        <p className="w-full">music</p>
                        <Button text={music?'on':'off'} wFull color={music?'green':'red'}
                        onButtonClick={() => setState({...state, music: !music})}/>
                    </div>
                    <div className='flex flex-col w-full items-center justify-between text-center gap-1'>
                        <p className="w-full">SFX&nbsp;🔊</p>
                        <Button text={sounds?'on':'off'} wFull color={sounds?'green':'red'} 
                        onButtonClick={() => setState({...state, sounds: !sounds})}/>
                    </div>
                <div className='flex flex-col w-full items-center justify-between text-center gap-1'>
                    <p className="w-full">dark&nbsp;mode</p>
                    <Button text={state.theme=='dark'?'on':'off'} wFull color={state.theme=='dark'?'green':'red'} onButtonClick={() => toggleTheme()} />
                </div>  
                </section>

                {/* <p>Warplanes<span className="font-[900] text-[calc(1rem+1vw)] px-[1px]">©</span>{year}</p> */}
            </aside>
            {state.menuOpen &&
            <div onClick={() => setState({...state, menuOpen: false})} className="fixed w-screen h-screen left-0 bg-[#1117] z-[99]">
            </div>}
        </>
    )
}