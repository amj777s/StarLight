'use client'

import { GameState, Position } from "./types";
import React, { useState, useRef} from "react";
import Game from "./components/Game";
import StartScreen from "./components/StartScreen";
import GameOver from "./components/GameOver";
import Settings from "./components/Settings";
import SignUp from "./components/Signup";
import Login from "./components/Login";
import './globals.css';
import Highscores from "./components/Highscores";

export default function Home() {

  const [gameStatus, setGameStatus] = useState<GameState>('home');
  const [count, setCount] = useState<number>(0);
  const [delay, setDelay] = useState<number>(3000); 
  const [cursorStyle, setCursorStyle] = useState('default');
  const [song, setSong] = useState('/audio/Eightbit.ogg');
  const [playing, setPlaying] = useState<boolean>(true);
  const  mousePosition = useRef<Position>({x:0, y:0});
  const mouse = useRef<HTMLDivElement>(null);

  const changePosition = (e: React.MouseEvent<HTMLDivElement>) => {
    mousePosition.current= {x: e.clientX, y: e.clientY}
    if(mouse.current != null){
      mouse.current.style.left= `${e.clientX}px`;
      mouse.current.style.top = `${e.clientY}px`;
    }
  }
//TODO figure out why mousePosition doesnt seem to update


  return (
    // Modedeled after Finite State Machine. Each Different state is represented by a component changing based upon various criteria
    <div className={cursorStyle.includes('custom')? 'container noCursor':`container ${cursorStyle}`} onMouseMove={changePosition} >
      <h1 className='signIn activeButton' onClick={()=> setGameStatus('signup')}>Sign In</h1>
      <audio src={song} loop autoPlay muted={playing}> </audio>
      {cursorStyle.includes('custom') && <div className={cursorStyle} ref={mouse}></div>} 
      <div className="audioButton activeButton"><img className="audioIcon" src="/pics/audioIcon.png" onClick={() => setPlaying(!playing)}/></div>
      {gameStatus === 'home' && <StartScreen setGameStatus={setGameStatus} />}
      {gameStatus === 'playing' && <Game count={count} setCount={setCount} setGameStatus={setGameStatus} delay={delay} />}
      {gameStatus === 'game over' && <GameOver count={count} setCount={setCount} setGameStatus={setGameStatus}  delay={delay}/>}
      {gameStatus === 'settings' && <Settings setCursorStyle={setCursorStyle}  setSong={setSong}  setGameStatus={setGameStatus} />}
      {gameStatus === 'highscores' && <Highscores setGameStatus={setGameStatus}/>}
      {gameStatus === 'signup' && <SignUp setGameStatus={setGameStatus}/>}
      {gameStatus === 'login' && <Login setGameStatus={setGameStatus}/>}
    </div>
  )
}
