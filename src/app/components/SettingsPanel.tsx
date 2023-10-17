import '../globals.css';
import settings from '../settings.module.css';
import { useState } from 'react';

export default function SettingsPanel({
    options,
    isActive,
    title,
    onShow,
    handleSettings
}: {
    options: { [setting: string]: string },
    isActive: boolean,
    title: string,
    onShow: () => void,
    handleSettings: (value: string) => void
}) {

    const [activeSettingIndex, setActiveSettingIndex] = useState<number>(0);
    let content;

    const handleSettingsClick = (e: React.MouseEvent<HTMLHeadingElement>, index: number, value: string) => {
        setActiveSettingIndex(index);
        handleSettings(value);
    }


    if (isActive) {

        content = Object.keys(options).map((option, index) => {
            const activeStyling: string = index === activeSettingIndex ? 'active' : '';
            return <h3
                className={activeStyling}
                key={option}
                onClick={(e)=> handleSettingsClick(e, index, options[option])}>{option}
            </h3>

        });
    } else {

        content = <button className='activeButton wmax-60px mg-wauto' onClick={onShow}>show</button>

    }
    return (
        <div className={settings.settingsPanel}>
            <h2>{title}</h2>
            {content}
        </div>
    )
}