
export type StateType = { 
    user: UserType | null;
    menuOpen: boolean;
    theme: 'light' | 'dark';
    sounds: { music: boolean, sfx: boolean };
    airplanes: PlaneType[];
    toast: {message: string; success: boolean; }
}

export type TileType = {
    position: number,
    head: boolean,
    body: boolean
}
export type PlaneType = {
    head: number,
    rotation: 'up'|'right'|'down'|'left';
}

export type ContextType = {
    state: StateType;
    setState: React.Dispatch<React.SetStateAction<StateType>>;
};

export type UserType = {
    id: string;
    username: string;
    email: string;
    wins: number;
    losses: number;
}