'use client'
import '../globals.css';
import { GameState } from "../types";
import Star from "./Star"
import { useState, useEffect } from "react";

const delay = 3000; //count down until game starts as well as how long the stars are delayed from when they are shown at top to transition to bottom

export default function Game({
    count,
    setCount,
    setGameStatus }:
    {
        count: number,
        setCount: (num: number) => void,
        setGameStatus: (state: GameState) => void
    }) {

    const [stars, setStars] = useState<JSX.Element[]>([]);
    console.log(`Points: ${stars.length}`)

    // Used to generate stars at interval specified by generationSpeed
    useEffect(() => {

         const interval = setInterval(() => {
            setCount(count + 1);
            setStars([...stars, <Star delay={delay}  setGameStatus={setGameStatus}/>]); // MouseOver event responsible for setting game status in Star component
        }, count> 100? 100: count>30? 500: 750) //controls speed at which stars fire

        return () => clearInterval(interval)
    }, [count])

    return (
        <>
            {count > delay/1000 && <h1 className='Font2Rem'>{count - 3}</h1>} {/*Used to account for delay  */}
            {stars.map(star => {
                return star
            })}

        </>
    )
}