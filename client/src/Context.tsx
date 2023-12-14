import { createContext, useState } from 'react';
import { StateType, ContextType } from './types';

export const Context = createContext<ContextType>({}) as React.Context<ContextType>;

export const Provider = (props: any) => {
    const [ state, setState ] = useState<StateType>({
        user: {
            username: '',
            email: '',
            // id: '',
            gameStats:{ wins: 0, losses: 0, gold: 0 }
        },
        menuOpen: false,
        theme: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light',
        sounds: true,
        music: false,
        musicType: 'menu',
        canExit: true,
    });
    return (
    <Context.Provider value={{state, setState}}>
        {props.children}
    </Context.Provider>
    );
};