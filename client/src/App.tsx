import { Routes, Route } from 'react-router-dom'
import { useContext, Suspense, lazy } from 'react'
import { Context } from './Context'
const Home = lazy(() => import('./pages/Home'))
const Menu = lazy(() => import('./components/Menu'))
const Toast = lazy(() => import('./components/Toast'))
const Scene = lazy(() => import('./scene/Scene'))
const Tables = lazy(() => import('./pages/Tables'))

import axios from 'axios'
import './App.css'

// import io from 'socket.io-client';
// const socket = io('http://localhost:8080/');
axios.defaults.baseURL = 'http://localhost:8080/';

export default function App() {
    const { state, setState } = useContext(Context);
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
        <div className={`transition-all w-screen h-screen duration-300 z-10 ${state.menuOpen && '-translate-x-[min(70vw,20rem)]'}`}>
            <Suspense fallback={null}>
                <div style={{zIndex: 100}}>
                    <Menu />
                    <div className="fixed w-[4rem] right-[-0.8rem] top-[-1.1rem] flex items-center justify-center m-[var(--padding)] rounded-full z-[101] cursor-pointer transition-all" 
                    onClick={() => setState({...state, menuOpen: !state.menuOpen})}
                    style={{transform: state.menuOpen?'rotate(45deg)':'rotate(0)'}}><h2>+</h2></div>
                    <Toast toast={state.toast} />
                </div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* <Route path="/account" element={<Account />} /> */}
                    <Route path="/tables" element={<Tables />} />
                    <Route path="/scene" element={<Scene theme={state.theme} />} />
                </Routes>
            </Suspense>
        </div>
    </div>
    )
}

