'use client'

import useSWR from "swr";
import '../../app/globals.css'
import { GameState, ScoreData } from "../types";
import userpage from '@/app/userpage.module.css';

async function getUserData(url: string) {
    const response = await fetch(url);
    const data: { scores: ScoreData[], avgScore: number, rank: number, totalScore: number } = await response.json();

    return data
}

function getOrdinal(n: number) {
    let ord = 'th';

    if (n % 10 == 1 && n % 100 != 11) {
        ord = 'st';
    }
    else if (n % 10 == 2 && n % 100 != 12) {
        ord = 'nd';
    }
    else if (n % 10 == 3 && n % 100 != 13) {
        ord = 'rd';
    }

    return n + ord;
}


export default function UserPage({
    user,
    setGameStatus
}: {
    user: string,
    setGameStatus: (state: GameState) => void
}) {
    const { data, error, isLoading } = useSWR(`/api/starlight/users/${user}/profile`, getUserData);

    if (error) {
        return <h1>error</h1>
    }

    if (isLoading) {
        return (
            <div className="container-no-align">
                <h1>Loading...</h1>
                <div className="loading "></div>
            </div>
        )

    }
    if (data) {


        return (
            <div className={userpage.container}>

                <div className={userpage.sectionContainer}>
                    <h2>Statistics</h2>
                    <div className={userpage.stats}>
                        <div className={`${userpage.stat} seashellBlueBg`}>
                            <p>{getOrdinal(data.rank)}</p>
                            <p className={userpage.tag}>Rank</p>
                        </div>
                        <div className={`${userpage.stat} purpleBg`}>
                            <p>{data.avgScore}</p>
                            <p className={userpage.tag}>Avg Score</p>
                        </div>
                        <div className={`${userpage.stat} leafGreen`}>
                            <p>{data.totalScore}</p>
                            <p className={userpage.tag}>Total</p>
                        </div>
                        <div className={userpage.streaks}>
                            <p className={`${userpage.tag}`}>achievements</p>
                        </div>
                    </div>
                </div>
                <div className={userpage.sectionContainer}>
                    <h2>Scores</h2>
                    <ul className={userpage.scoreTable}>
                        <li key='header' className={userpage.score}>
                            
                            <p>Score</p>
                            <p>Date</p>
                        </li>
                        {data.scores.map((stat: ScoreData) =>
                            <li key={stat.id + stat.username} className={userpage.score}>
                                <p>{stat.score}</p>
                                {/* exlcudes the time portion of the date */}
                                <p>{stat.created.toString().split('T')[0]}</p>
                            </li>)}
                    </ul>
                </div>

                <button className="activeButton wmax-60px mg-auto alignSelf" onClick={() => setGameStatus('home')}>Back</button>

            </div>
        )

    }
}
