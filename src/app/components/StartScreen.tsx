'use-client'
import '../globals.css';
import game from '../game.module.css';
import { GameState } from '../types';
export default function StartScreen({setGameStatus}: {setGameStatus: (state: GameState)=> void}) {

// TODO fix buttons moving whole flexbox when clicked
    return (
        <div className={game.StartScreen}>
            <h1>Starlight</h1>
            <button className='activeButton' onClick={()=>setGameStatus('playing')}>Start</button>
            <button className='activeButton' onClick={()=>setGameStatus('settings')}>Settings</button>
            <button className='activeButton' onClick={()=>setGameStatus('highscores')}>Highscores</button>
        </div>
    )
}