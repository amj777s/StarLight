import { useState } from 'react';
import settings from '../settings.module.css';
import SettingsPanel from './SettingsPanel';
import { GameState } from '../types'; 


const cursorStyles = {
    default: 'default',
    crosshair: 'crosshair',
    pointer: 'pointer',
    rocket: 'rocket',
    blue: 'cursor-blue',
    red: 'cursor-red',
    green: 'cursor-green', //put custom mouses under this line, must have custom in name
    'rainbow ball': 'custom rainbow ball',
    'rainbow star': 'custom rainbow littleStar',
    'rainbow arrow': 'custom rainbow arrow',
    'rainbow x': 'custom rainbow x'
    
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
    setSong,
    setGameStatus
}:{
    setCursorStyle: (str: string) => void,
    setSong: (str: string) => void,
    setGameStatus: (state: GameState) => void

}) {
    const [activeIndex, setActiveIndex] = useState<number>(0);


    return (
        <div className={settings.settingsContainer}>
            <SettingsPanel title='Cursor Style' handleSettings={setCursorStyle} isActive={activeIndex === 0} onShow={() => setActiveIndex(0)} options={cursorStyles} />
            <SettingsPanel title='Song'  handleSettings={setSong} isActive={activeIndex === 1} onShow={() => setActiveIndex(1)} options={audioOptions} />
            <button className='activeButton fnt1-5Rem' onClick={() => setGameStatus('home')}>Save</button>
        </div>
    )
}