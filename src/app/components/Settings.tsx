import { useState } from 'react';
import settings from '../settings.module.css';
import SettingsPanel from './SettingsPanel';
import { GameState } from '../types'; 

const cursorColors = {
    blue: 'cursor-blue',
    red: 'cursor-red',
    green: 'cursor-green'
};

const cursorStyles = {
    default: 'default',
    crosshair: 'crosshair',
    pointer: 'pointer',
    rocket: 'rocket'
};

const audioOptions = {
    eightBit: '/audio/eightBit.ogg',
    dark: '/audio/dark.ogg',
    energetic: '/audio/energetic.ogg',
    fantasy: '/audio/fantasy.ogg',
    relaxing: '/audio/relaxing.ogg',
    suspense: '/audio/suspense.ogg',
    uplifting: '/audio/uplifting.ogg'
}

export default function SettingsAccordian({
    setCursorStyle,
    setCursorColor,
    setSong,
    setGameStatus
}:{
    setCursorStyle: (str: string) => void,
    setCursorColor: (str: string) => void,
    setSong: (str: string) => void,
    setGameStatus: (state: GameState) => void

}) {
    const [activeIndex, setActiveIndex] = useState<number>(0);


    return (
        <div className={settings.settingsContainer}>
            <SettingsPanel title='Cursor Style' handleSettings={setCursorStyle} isActive={activeIndex === 0} onShow={() => setActiveIndex(0)} options={cursorColors} />
            <SettingsPanel title='Cursor Color'  handleSettings={setCursorColor} isActive={activeIndex === 1} onShow={() => setActiveIndex(1)} options={cursorStyles} />
            <SettingsPanel title='Song'  handleSettings={setSong} isActive={activeIndex === 2} onShow={() => setActiveIndex(2)} options={audioOptions} />
            <button className='activeButton fnt1-5Rem' onClick={() => setGameStatus('home')}>Save</button>
        </div>
    )
}