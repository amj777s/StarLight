import '../globals.css';
import { GameState } from '../types';
import gameover from '../gameover.module.css';
//figure out how to fade component in
export default function GameOver({
    count,
    delay,
    setCount,
    setGameStatus
}: {
    count: number,
    delay: number
    setCount: (num: number) => void,
    setGameStatus: (state: GameState) => void
}) {

    const handleRestart = (status: GameState)=> {
        setCount(0);
        switch (status) {
            case 'playing':
                setGameStatus('playing');
                break;
            case 'home':
                setGameStatus('home');
                break;
            case 'highscores':
                setGameStatus('highscores');
                break;
            default:
                break;
        }
    

    }
    return (
        <>
            <h1 className='laser fnt5Rem'>Game Over</h1> 
            <p className='fnt3Rem'>Score: {count - (delay / 1000 + 1)}</p>
            <div className={gameover.actionButtons}>
                <button className='activeButton' onClick={()=> handleRestart('playing')}> Try Again?</button>
                <button className='activeButton' onClick={()=> handleRestart('home')}> Main Menu</button>
                <button className='activeButton' onClick={()=> handleRestart('highscores')}> HighScores</button>
                
            </div>
            
        </>
    )
}