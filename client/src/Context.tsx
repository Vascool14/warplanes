import { createContext, useState } from 'react';
import { StateType, ContextType } from './types';

export const Context = createContext<ContextType>({}) as React.Context<ContextType>;

export const Provider = (props: any) => {
    const [ state, setState ] = useState<StateType>({
        user: {
            // username: 'Vascool',
            // email: 'andreivascul2004@gmail.com',
            // id: '31ujr013iohfqcp09q',
            // wins: 69,
            // losses: 13,
        },
        menuOpen: false,
        theme: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light',
        sounds: { music: true, sfx: true},
        airplanes: [],
        toast: {message: '', success: false}
    });
    return (
    <Context.Provider value={{state, setState}}>
        {props.children}
    </Context.Provider>
    );
};