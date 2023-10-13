import React from 'react';
import '../globals.css';
import { GameState } from '../types';

const audioOptions = {
    dark: '/audio/dark.ogg',
    eightBit: '/audio/eightBit.ogg',
    energetic: '/audio/energetic.ogg',
    fantasy: '/audio/fantasy.ogg',
    relaxing: '/audio/relaxing.ogg',
    suspense: '/audio/suspense.ogg',
    uplifting: '/audio/uplifting.ogg'
}

export default function Settings({
    setCursorStyle,
    setCursorColor,
    setSong,
    setGameStatus
}: {
    setCursorStyle: (str: string) => void,
    setCursorColor: (str: string) => void,
    setSong: (str: string) => void,
    setGameStatus: (state:GameState) => void
}) {
        
    return (
        <>
            <label className='fnt3Rem'>
                Cursor Color:
                <select name='cursorColor' className='fnt3Rem' onChange={e => setCursorColor(e.target.value)} >
                    <option className='blue' value='cursor-blue'>Blue</option>
                    <option className='red' value='cursor-red'>Red</option>
                    <option className='green' value='cursor-green'>Green</option>
                    <option className='rainbow' value='cursorRainbow'>Rainbow</option>
                </select>
            </label>

            <label className='fnt3Rem'>
            Cursor Style:
            <select name='cursorStyle' className='fnt3Rem' onChange={e => setCursorStyle(e.target.value)}>
                <option className='default' value='default'>Default</option>
                <option className='crosshair' value='crosshair'>Crosshair</option>
                <option className='pointer' value='pointer'>Pointer</option>
                <option className='rocket' value='rocket'>Rocket</option>
            </select>
            </label>

            <label className='fnt3Rem'>
            Song:
            <select name='Song' className='fnt3Rem' defaultValue={audioOptions.eightBit}  onChange={e => setSong(e.target.value)}>
                <option className='black' value={audioOptions.dark}>Dark</option>
                <option className='black'  value={audioOptions.eightBit}>8-Bit</option>
                <option className='black' value={audioOptions.energetic}>Energetic</option>
                <option className='black' value={audioOptions.fantasy}>Fantasy</option>
                <option className='black' value={audioOptions.relaxing}>Relaxing</option>
                <option className='black' value={audioOptions.suspense}>Suspensful</option>
                <option className='black' value={audioOptions.uplifting}>Uplifting</option>
            </select>
            </label>
            <button className='activeButton fnt1-5rem' onClick={()=> setGameStatus('home')}>Save</button>
        </>
    )

}