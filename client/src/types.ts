
export type StateType = { 
    user: UserType | null;
    menuOpen: boolean;
    theme: 'light' | 'dark';
    sounds: boolean;
    music: boolean;
    musicType: 'menu' | 'battle' | 'win' | 'lose' | 'arena-jingle'
    canExit: boolean;
}

export type ContextType = {
    state: StateType;
    setState: React.Dispatch<React.SetStateAction<StateType>>;
};

export type UserType = {
    username: string;
    email: string;
    gameStats: {
        wins: number;
        losses: number;
        gold: number;
    }
}

// game types
export type TileType = {
    head: boolean,
    body: boolean,
    hit: boolean,
    planeNumber?: number
}

export type PlaneType = {
    headIndex: number,
    rotation:  RotationType,
}

export type RotationType = 'up' | 'down' | 'right' | 'left';