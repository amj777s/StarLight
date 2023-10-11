
export type GameState =  'home'|'playing'|'game over'|'Settings'|'Highscores'; 
export type Position = {
    x: number,
    y: number
}

export type ChangeGameStatus = (status: GameState) => void;