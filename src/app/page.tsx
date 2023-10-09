'use client'

import { GameState } from "./types"
import StartScreen from "./components/StartScreen"
import { useState } from "react"
import Game from "./components/Game"
export default function Home() {

  const [gameStatus, setGameStatus] = useState<GameState>('home');

  const handleGameStatus = (status: GameState) => {
    setGameStatus(status);
  };

  return (
    <>
      {gameStatus === 'home' && <StartScreen onHandleGameStatus={handleGameStatus} />}
      {gameStatus == 'playing' && <Game />}
    </>
  )
}
