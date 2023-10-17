'use client'

import { GameState, MouseData, Position } from "./types";
import { useState, useRef } from "react";
import Game from "./components/Game";
import StartScreen from "./components/StartScreen";
import GameOver from "./components/GameOver";
import Settings from "./components/Settings";
import './globals.css';

export default function Home() {

  const [gameStatus, setGameStatus] = useState<GameState>('home');
  const [count, setCount] = useState<number>(0);
  const [delay, setDelay] = useState<number>(3000); 
  const [cursorStyle, setCursorStyle] = useState('default');
  const [cursorColor, setCursorColor] =useState('white');
  const [song, setSong] = useState('/audio/Eightbit.ogg');
  const [playing, setPlaying] = useState<boolean>(true);
  const  mousePosition = useRef<Position>({x:0, y:0});
//TODO figure out why mousePosition doesnt seem to update



  return (
    // Modedeled after Finite State Machine. Each Different state is represented by a component changing based upon various criteria
    <div className={`container ${cursorStyle} ${cursorColor}`} onMouseMove={e => mousePosition.current= {x: e.clientX, y: e.clientY}} >
      <audio src={song} loop autoPlay muted={playing}> </audio>
      <div className="audioButton activeButton"><img className="audioIcon" src="/pics/audioIcon.png" onClick={() => setPlaying(!playing)}/></div>
      {gameStatus === 'home' && <StartScreen setGameStatus={setGameStatus} />}
      {gameStatus === 'playing' && <Game count={count} setCount={setCount} setGameStatus={setGameStatus} delay={delay} />}
      {gameStatus === 'game over' && <GameOver count={count} setCount={setCount} setGameStatus={setGameStatus}  delay={delay}/>}
      {/* {gameStatus === 'settings' && <Settings setCursorStyle={setCursorStyle} setCursorColor={setCursorColor} setSong={setSong} setGameStatus={setGameStatus}/>} */}
      {gameStatus === 'settings' && <Settings setCursorStyle={setCursorStyle} setCursorColor={setCursorColor} setSong={setSong}  setGameStatus={setGameStatus} />}
    </div>
  )
}
