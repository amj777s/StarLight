
export type GameState =  'home'|'playing'|'game over'|'settings'|'highscores'; 


export type Position = {
    x: number,
    y: number
}

export type ChangeGameStatus = (status: GameState) => void;