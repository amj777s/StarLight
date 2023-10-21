'use client'

import { ScoreData } from "@/app/types";
import scores from '@/app/scores.module.css';
import { GameState } from "@/app/types";
import '../../app/globals.css'
import useSWR from "swr";


async function getHighscores(url: string) {
    const response = await fetch(url);
    const highscores = await response.json();   
    return highscores
}


export default function Highscores({setGameStatus}: {setGameStatus: (state:GameState) => void}) {
        const {data,error, isLoading} = useSWR('http://localhost:3000/api/starlight/highscores', getHighscores);
        if(error){
            return <h1>error</h1>
        }
        
        if(isLoading){
            return (
                <div className="container-no-align">
                    <h1>Loading...</h1>
                    <div className="loading "></div>
                </div>
            )
            
        }
    
    return (
        <>
            <ul className={scores.scoreTable}>
                <li key='header' className={scores.score}>
                    <p>Rank</p>
                    <p>Score</p>
                    <p>Username</p>
                    <p>Date</p>
                </li>
                {data.map((stat:ScoreData, index:number) =>
                    <li key={stat.id + stat.username} className={scores.score}>
                        <p>{index + 1}</p>
                        <p>{stat.score}</p>
                        <p>{stat.username}</p>
                        {/* exlcudes the time portion of the date */}
                        <p>{stat.created.toString().split('T')[0]}</p>
                    </li>)}
            </ul>

            <button className="activeButton wmax-60px mg-auto" onClick={()=>setGameStatus('home')}>Back</button>
        </>
    )
}