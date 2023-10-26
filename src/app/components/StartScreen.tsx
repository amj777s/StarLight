'use-client'
import '../globals.css';
import game from '../game.module.css';
import { GameState } from '../types';
import { useContext } from 'react';
import { ThemeContext } from '../providers';
export default function StartScreen({
    setGameStatus
}: {
    setGameStatus: (state: GameState) => void
}) {
    
    return (
        <div className={game.StartScreen}>
            <h1>Starlight</h1>
            <button className='activeButton' onClick={() => setGameStatus('playing')}>Start</button>
            <button className='activeButton' onClick={() => setGameStatus('settings')}>Settings</button>
            <button className='activeButton' onClick={() => setGameStatus('highscores')}>Highscores</button>
        </div>
    )
}