import { Routes, Route, useNavigate } from 'react-router-dom'
import { useContext, Suspense, lazy } from 'react'
import { Context } from './Context'
import './App.css'
import axios from 'axios'
import PlaySound from './sounds/PlaySound'
const Home = lazy(() => import('./pages/Home'))
const Button = lazy(() => import('./components/Button'))
const Menu = lazy(() => import('./components/Menu'))
// const Toast = lazy(() => import('./components/Toast'))
const Tables = lazy(() => import('./pages/Tables'))
const BotGame = lazy(() => import('./pages/BotGame'))
const Game = lazy(() => import('./pages/Game'))
const Account = lazy(() => import('./pages/auth/Account'))
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))

// import io from 'socket.io-client';
// const socket = io('http://localhost:8080/');
axios.defaults.baseURL = 'http://localhost:8080/';

export default function App() {
    const { state, setState } = useContext(Context);
    const navigate = useNavigate();
    return (
    <div className='flex'>
        <section className="w-screen fixed inset-0 overflow-hidden bg-[var(--sky)] flex justify-center">
            {state.theme === 'dark' ? 
            <div className="stars">
                <div id="star1"></div>
                <div id="star2"></div>
                <div id="star3"></div>
            </div>
            :<div id="cloud">
                <svg width="0"><filter id="filter"><feTurbulence type="fractalNoise" baseFrequency=".01" numOctaves="10" /><feDisplacementMap in="SourceGraphic" scale="240"/></filter></svg>
            </div>
            }
        </section>
        <div className={`transition-all w-screen h-screen duration-300 z-10 ${state.menuOpen && '-translate-x-[min(70vw,28rem)]'}`}>
            <Suspense fallback={null}>
                <div style={{zIndex: 100}}>
                    <div className="fixed left-0 top-1 m-4 md:m-8 cursor-pointer transition-all text-[4rem]">
                        <Button text='&lt;' icon color='red' onButtonClick={() => { navigate(-1); PlaySound('bubble')}}/>
                    </div>

                    <div className="fixed right-0 top-1 m-4 md:m-8 transition-all ml-auto text-[4rem]">
                        <Button text='+' icon color='yellow' onButtonClick={() => {setState({...state, menuOpen: !state.menuOpen}); PlaySound('click')}} />
                    </div>
                    {/* <Toast toast={state.toast} /> */}
                    <Menu />
                </div>
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/account" element={<Account />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route path="/tables" element={<Tables />} />
                    <Route path="/tables/bot-ioana" element={<BotGame bot="ioana" />} />
                    <Route path="/tables/bot-andrei" element={<BotGame bot="andrei" />} />
                    <Route path="/tables/bot-vasile" element={<BotGame bot="vasile" />} /> 
                    <Route path="/tables/:id" element={<Game />} />
                </Routes>
            </Suspense>
        </div>
    </div>
    )
}

