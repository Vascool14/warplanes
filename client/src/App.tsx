import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy, useContext, useEffect} from 'react'
import './App.css'
import { Context } from './Context'
import './later.css'
import axios from 'axios'
import Home from './pages/Home'
const Nav = lazy(() => import('./components/Nav'))
const Menu = lazy(() => import('./components/Menu'))
const Tables = lazy(() => import('./pages/Tables'))
const BotGame = lazy(() => import('./pages/BotGame'))
const Game = lazy(() => import('./pages/Game'))
// const SetPlanes = lazy(() => import('./pages/SetPlanes'))
const Account = lazy(() => import('./pages/auth/Account'))
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const Page404 = lazy(() => import('./pages/Page404'))
const GameMusic = lazy(() => import('./components/GameMusic'))
// import GameAudio from './assets/sounds/game.mp3'

// import io from 'socket.io-client';
// const socket = io('http://localhost:8080/');
axios.defaults.baseURL = 'http://localhost:8080/';

export default function App() {
    const { state, setState } = useContext(Context)
        
    // useEffect(() => {
    //     if(document.cookie.length > 0){
    //         axios.get('/me', { headers: { Authorization: `Bearer ${document.cookie.split('=')[1]}` } })
    //         .then(res => {
    //             const { username, email, gameStats } = res.data;
    //             setState({ ...state, user: { username, email, gameStats }})
    //         }).catch(err => {
    //             console.log(err);
    //         })
    //     }
    // }, [])
    return (
        <div className='flex'>
            <section className="w-screen fixed inset-0 overflow-hidden bg-[var(--sky)] flex justify-center">
                {state.theme === 'dark' ? 
                <div className="stars">
                    <div id="star1"></div>
                    <div id="star2"></div>
                    <div id="star3"></div>
                </div>:<div id="cloud"></div>}
            </section>
            {/* <div className="fixed inset-0 w-screen h-screen svgBackground"></div> */}
            <div style={{perspective: 800, zIndex: 1, overflow:'hidden'}}>
                <Suspense fallback={null}>
                    <Nav />
                    <Menu />
                    {state.music && <GameMusic />}
                    <Routes>
                        <Route path="/" element={<Home />} />

                        <Route path="/account" element={<Account />} />
                        <Route path="/login" element={<Login />} />

                        <Route path="/register" element={<Register />} />

                        <Route path="/table" element={<Tables />} />

                        {/* <Route path="/table/:id/setup" element={<SetPlanes />} /> */}
                        <Route path="/table/bot-ioana" element={<BotGame bot="ioana" />} />
                        <Route path="/table/bot-andrei" element={<BotGame bot="andrei" />} />
                        <Route path="/table/bot-vasile" element={<BotGame bot="vasile" />} /> 
                        <Route path="/table/:id" element={<Game />} />
                        
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </Suspense>
            </div>

        </div>
    )
}
