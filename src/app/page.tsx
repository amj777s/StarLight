'use client'

import { GameState, Position } from "./types";
import React, { useState, useRef, useContext, useEffect } from "react";
import Game from "./components/Game";
import StartScreen from "./components/StartScreen";
import GameOver from "./components/GameOver";
import Settings from "./components/Settings";
import SignUp from "./components/Signup";
import Login from "./components/Login";
import UserPage from "./components/UserPage";
import './globals.css';
import Highscores from "./components/Highscores";
import { ThemeContext } from "./providers";


export default function Home() {

  const [gameStatus, setGameStatus] = useState<GameState>('home');
  const [count, setCount] = useState<number>(0);
  const [delay, setDelay] = useState<number>(3000);
  const [cursorStyle, setCursorStyle] = useState('default');
  const [song, setSong] = useState('/audio/Eightbit.ogg');
  const [playing, setPlaying] = useState<boolean>(false);
  const mousePosition = useRef<Position>({ x: 0, y: 0 });
  const mouse = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useContext(ThemeContext);
  const [user, setUser] = useState('');


  useEffect(() => {
    const potentialUser = localStorage.getItem('user');
    if (potentialUser != null) {
      setUser(potentialUser);
    }
  }, [user])

  const changePosition = (e: React.MouseEvent<HTMLDivElement>) => {
    mousePosition.current = { x: e.clientX, y: e.clientY }
    if (mouse.current != null) {
      mouse.current.style.left = `${e.clientX}px`;
      mouse.current.style.top = `${e.clientY}px`;
    }
  }

  const logOut = () => {

    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
      setUser('');
    }

  }

  // Control whether to show login button or username 
  let greeting;
  if (user) {
    greeting = (
      <div className="LogIn">
        <p id="user" onClick={() => setGameStatus('userpage')}>{user}</p>
        <ul id='menu'>
          <li onClick={() => setGameStatus('userpage')}>Home Page</li>
          <li onClick={logOut}>Log Out</li>
        </ul>
      </div>
    )
  }
  else {
    greeting = <h1 className='LogIn activeButton' onClick={() => setGameStatus('login')}>Login</h1>
  }

  return (
    // Modedeled after Finite State Machine. Each Different state is represented by a component changing based upon certain criteria
    <div className={cursorStyle.includes('custom') ? `container noCursor ${theme}` : `container ${cursorStyle} ${theme}`} onMouseMove={changePosition} >
      <audio src={song} loop autoPlay muted={!playing}> </audio>
      {cursorStyle.includes('custom') && <div className={cursorStyle} ref={mouse}></div>}
      <div className="optionsContainer">
        {greeting}
        <div className="activeButton optionButton " onClick={() => setPlaying(!playing)}><img className="optionIcon" src="/pics/audioIcon.png" /></div>
        <div className="activeButton optionButton " onClick={() => theme === 'dark' ? setTheme('light') : setTheme('dark')}><img className="optionIcon" height={30} width={30} src="/pics/brightness.png" /></div>
      </div>
      {gameStatus === 'home' && <StartScreen setGameStatus={setGameStatus} />}
      {gameStatus === 'playing' && <Game count={count} setCount={setCount} setGameStatus={setGameStatus} delay={delay} />}
      {gameStatus === 'game over' && <GameOver user={user} count={count} setCount={setCount} setGameStatus={setGameStatus} delay={delay} />}
      {gameStatus === 'settings' && <Settings setCursorStyle={setCursorStyle} setSong={setSong} setGameStatus={setGameStatus} />}
      {gameStatus === 'highscores' && <Highscores setGameStatus={setGameStatus} />}
      {gameStatus === 'signup' && <SignUp setGameStatus={setGameStatus} setUser={setUser} />}
      {gameStatus === 'login' && <Login setGameStatus={setGameStatus} setUser={setUser} />}
      {gameStatus === 'userpage' && <UserPage user={user} setGameStatus={setGameStatus} />}
    </div>
  )
}
