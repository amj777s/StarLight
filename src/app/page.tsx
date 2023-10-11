'use client'

import { GameState } from "./types"
import { useState } from "react"
import Game from "./components/Game"
import StartScreen from "./components/StartScreen"
import GameOver from "./components/GameOver"
export default function Home() {

  const [gameStatus, setGameStatus] = useState<GameState>('home');
  const [count, setCount] = useState<number>(0);

 

  return (
    // Modedeled after Finite State Machine. Each Different state is represented by a component changing based upon various criteria
    <>
      {gameStatus === 'home' && <StartScreen setGameStatus={setGameStatus} />}
      {gameStatus === 'playing' && <Game count={count} setCount={setCount} setGameStatus={setGameStatus} />}
      {gameStatus === 'game over' && <GameOver/>}
    </>
  )
}
