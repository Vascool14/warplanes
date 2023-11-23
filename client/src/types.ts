
export type StateType = { 
    user: UserType | null;
    menuOpen: boolean;
    theme: 'light' | 'dark';
    sounds: { music: boolean, sfx: boolean };
    airplanes: PlaneType[];
    toast: {message: string; success: boolean; }
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

// game types
export type TileType = {
    head: boolean,
    body: boolean,
    hit: boolean,
}

export type PlaneType = {
    headIndex: number,
    rotation:  RotationType,
}

export type RotationType = 'up' | 'down' | 'right' | 'left';