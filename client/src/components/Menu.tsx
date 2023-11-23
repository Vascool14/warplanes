import { useContext } from "react";
import { Context } from "../Context";

export default function Menu() {
    const { state, setState } = useContext<any>(Context);
    const toggleTheme = () => {
        const newTheme = ( state.theme =='dark' ? 'light' : 'dark');
        document.documentElement.setAttribute('data-theme', newTheme );
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', getComputedStyle(document.documentElement).getPropertyValue('--sky'));
        localStorage.setItem( 'data-theme', newTheme );
        setState({...state, theme: newTheme});
    } 
    const year = new Date().getFullYear();
    return (   
        <>
        <aside className="z-[100] overflow-hidden shadow-lg bg-[var(--bg)] translate-x-[100%] h-screen w-[min(70vw,28rem)] rounded-l-[1.5rem]
        fixed right-0 transition-all flex flex-col items-center gap-4 p-6">
            <style>
                {`.container { width:62px;  height:37px; display: flex; align-items: center; justifiy-content:center; position:relative; }
                .checkbox { opacity:1; width:0;  height:0;}
                .switch { width:100%; height:100%; position: absolute; top: 18px;
                    background: var(--gray) !important; 
                    border-radius:1.2rem; cursor:pointer; transition: all 0.2s ease-out;}
                .slider { width: 31px;  height: 31px; position: absolute;      
                    left: 3px; top: 3px; border-radius:50%;  background-color:var(--white);  
                    box-shadow:0px 3px 8px #0003, 0px 3px 1px #0001; transition: all 0.2s ease-out;  cursor:pointer; }
                .checkbox:checked + .switch { background:#4b4 !important; }
                .checkbox:checked + .switch .slider { left:calc(50% - 3px); }
                `}
            </style>
            <h2>Settings</h2>
            <section className='flex w-full items-center justify-between'>
                <h3>Theme</h3>
                <div className="container">
                    <input type="checkbox" checked={state.theme!=="light"} className="checkbox" id="checkbox1" 
                    onChange={() => toggleTheme()} />
                    <label className="switch" htmlFor="checkbox1"><span className="slider"></span></label>
                </div>
            </section>
            <section className='flex w-full items-center justify-between'>
                <h3>Music</h3>
                <div className="container">
                    <input type="checkbox" checked={state.sounds.music==true} className="checkbox" id="checkbox2" 
                    onChange={() => setState({...state, sounds: {...state.sounds, music: !state.sounds.music}})} />
                    <label className="switch" htmlFor="checkbox2"><span className="slider"></span></label>
                </div>
            </section>
            <section className='mb-auto flex w-full items-center justify-between'>
                <h3>Sounds</h3>
                <div className="container">
                    <input type="checkbox" checked={state.sounds.sfx==true} className="checkbox" id="checkbox3" 
                    onChange={() => setState({...state, sounds: {...state.sounds, sfx: !state.sounds.sfx}})} />
                    <label className="switch" htmlFor="checkbox3"><span className="slider"></span></label>
                </div>
            </section>
            <p>Warplanes<span className="font-[900] text-[30px] px-[1px]">©</span>{year}</p>
        </aside>
        {state.menuOpen && <div onClick={() => setState({...state, menuOpen: false})} className="fixed w-[103vw] h-screen left-0 bg-[#1112] z-[99]"></div>}
        </>
    )
}