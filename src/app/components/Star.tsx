'use client'
import Image from "next/image"
import { ReactEventHandler, ReactHTMLElement, useEffect, useState } from "react";
import redStar from '../../../public/pics/redStar.png';
import '../globals.css';
import { Position } from "../types";

export default function Star(){
    const topx = Math.floor(Math.random() * 100); // used to set css style left: topx
    const topy = 0;
    const [rotate, setRotate] = useState<string>('0deg');
    const [position, setPosition] = useState<Position>({x:topx, y:topy});
    const bottomEnd = Math.floor(Math.random() * 100);

    useEffect(()=> {
        setTimeout(()=> {
            setPosition({x:90, y:75})
            setRotate('720deg');
        }, 3000)
    },[])

   
    return (
    <Image
        className="star"
        src={redStar}
        height={50}
        width={50}
        style={{
            zIndex: 10,
            position:'fixed',
            top:`${position.y}%`,
            left:`${position.x}%`,
            transform: `rotate(${rotate})`,
            filter: 'drop-shadow( 0 0 10px #b33c4c)',
            transition: "all 1s ease" // can control speed of transition to increase difficulty
        }}
        alt="pic of a star"/>
        
   )
}