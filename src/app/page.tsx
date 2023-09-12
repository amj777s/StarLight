'use client'

import { GameState } from "./types"
import StartScreen from "./components/StartScreen"
import { useState } from "react"
export default function Home() {

  const [gameStatus, setGameStatus] = useState<GameState>('home');

  return (
    <>
    { gameStatus === 'home' && <StartScreen />}
    </>
  )
}
