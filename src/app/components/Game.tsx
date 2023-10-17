'use client'
import '../globals.css';
import { GameState, Position } from "../types";
import Star from "./Star"
import { useState, useEffect, Fragment } from "react";
import { v4 as uuidv4 } from 'uuid';


// TODO kickout the first Star component from stars Array  so that refreshing doesnt get bogged down by lots of stars in star

export default function Game({
    count,
    delay, //count down until game starts as well as how long the stars are delayed from when they are shown at top to transition to bottom
    setCount,
    setGameStatus
}: {
    count: number,
    delay: number,
    setCount: (num: number) => void,
    setGameStatus: (state: GameState) => void
}) {

    const [stars, setStars] = useState<JSX.Element[]>([]);
    
    // Used to generate stars at interval specified by count
    useEffect(() => {

        const interval = setInterval(() => {
            //Array must be long enough so that enough stars complete transition before being removed from array.
            //Star component moves from element 24 to element zero in array before being sliced off.
            // For example with a star being generated every 250 miliseconds in an array that means, a star will go through the array in 25 * .25 s ~ 6 seconds
            // need a minimum of  traverse time greater than the delay variable for star to complete transition from top to bottom
            // Also add additional seconds to allow more stars to form at top of screen. Adjust to what looks best
            if (stars.length === 25) { //Array must be long enough so that enough stars complete transition before being removed from array.

                let starBuffer = stars.slice(1);

                starBuffer.push(<Star delay={delay} setGameStatus={setGameStatus} key={uuidv4()}  />);
                setStars(starBuffer);

            } else {

                setStars([...stars, <Star delay={delay} setGameStatus={setGameStatus} key={uuidv4()}  />]); // MouseOver event responsible for setting game status in Star component

            }

            setCount(count + 1);

        }, count > 100 ? 250 : count > 30 ? 500 : 750) //controls speed at which stars fire, 750ms > 500ms > 250ms for last level

        return () => {
            clearInterval(interval);
        }
    }, [count])

    return (
        <>
            {count > (delay + 1000) / 1000 && <h1 className='fnt10Rem'>{count - (delay / 1000 + 1)}</h1>} {/*Used to account for delay and interval time  */}
            {stars.map((star) => {
                return <Fragment key={star.key}>{star}</Fragment>
            })}

        </>
    )
}