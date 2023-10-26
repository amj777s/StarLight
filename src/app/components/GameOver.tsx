'use client'

import '../globals.css';
import { GameState } from '../types';
import gameover from '../gameover.module.css';


export default function GameOver({
    count,
    delay,
    user,
    setCount,
    setGameStatus
}: {
    count: number,
    delay: number,
    user: string
    setCount: (num: number) => void,
    setGameStatus: (state: GameState) => void
}) {

    const intermediateScore: number = count - (delay / 1000 + 1);
    const score: number = intermediateScore > 0 ? intermediateScore : 0;



    const handleRestart = async (status: GameState) => {

        // Submit scores only if user is logged in and score > 0
        if (user && score) {

            const response = await fetch('/api/starlight/highscores', {
                method: 'POST',
                body: JSON.stringify({ user, score })
            });

            if (response.ok) {
                console.log('highscore Submitted');
            }

            //need to handle error and make visible that a score is being submitted;

        }

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
            <p className='fnt3Rem'>Score: {score}</p>
            <div className={gameover.actionButtons}>
                <button className='activeButton' onClick={() => handleRestart('playing')}> Try Again?</button>
                <button className='activeButton' onClick={() => handleRestart('home')}> Main Menu</button>
                <button className='activeButton' onClick={() => handleRestart('highscores')}> HighScores</button>
            </div>

        </>
    )
}