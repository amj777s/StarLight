
export type GameState =  'home'|'playing'|'game over'|'settings'|'highscores' | 'login' | 'signup'; 


export interface Position{
    x: number,
    y: number
}

export interface MouseData extends Position {
    static: boolean, // sets to true to allow a star to fire at the mouses position to encourage movement
    counter: number //used to track whether the mouse hasn't moved for a certain amount of intervals
}

export type ChangeGameStatus = (status: GameState) => void;

export type ScoreData = {
    id: number,
    score: number,
    username: string,
    created: Date
}