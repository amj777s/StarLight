'use client'
import Image from "next/image"
import { useEffect, useState } from "react";
import '../globals.css';
import { GameState, Position } from "../types";
import stars from "../stars";

const topy = 0;

export default function Star({delay, setGameStatus}:{delay: number, setGameStatus: (state: GameState) => void}){
    const topx = Math.floor(Math.random() * 100); // used to set css style left: topx
    const [starImg, setStarImg] = useState(Object.keys(stars)[Math.floor(Math.random() * Object.keys(stars).length)] as keyof typeof stars); // Returns random key for stars object;
    const [rotate, setRotate] = useState<string>('0deg');
    const [position, setPosition] = useState<Position>({x:topx, y:topy});
    const bottomEnd = Math.floor(Math.random() * 100);

    // Trigger the game over effect here pass it up to the parent component
    const handleMouseEnter = ()=> {
        console.log("Hit!")
        setGameStatus('game over');
    }
    
    useEffect(()=> {
        setTimeout(()=> {
            setPosition({x:bottomEnd, y:105});
            setRotate('720deg');
        }, delay)
    },[])


    return (
    <Image
        className="star"  
        src={stars[starImg]}
        height={50}
        width={50}
        onMouseEnter={handleMouseEnter}
        style={{
            zIndex: 10,
            position:'fixed',
            top:`${position.y}%`,
            left:`${position.x}%`,
            transform: `rotate(${rotate})`,
            filter: 'drop-shadow( 0 0 10px #ffffff)',
            transition: "all 1s ease" // can control speed of transition to increase difficulty
        }}
        alt="pic of a star"/>
        
   )
}