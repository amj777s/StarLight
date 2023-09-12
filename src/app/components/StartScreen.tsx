'use-client'
import '../globals.css';
import game from '../game.module.css';
export default function StartScreen() {

// TODO fix buttons moving whole flexbox when clicked
    return (
        <div className={game.StartScreen}>

            <h1>Starlight</h1>
            <button className='activeButton'>Start</button>
            <button className='activeButton'>Settings</button>
            <button className='activeButton'>Highscores</button>
        </div>
    )
}