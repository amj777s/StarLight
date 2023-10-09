import React from 'react';
import '../globals.css';

export default function Settings() {

    return (
        <>
            <label>
                Cursor Color:
                <select name='cursorColor'>
                    <option className='black' value='black'>Black</option>
                    <option className='red' value='red'>Red</option>
                    <option className='green' value='green'>Green</option>
                    <option className='rainbow' value='rainbow'>Rainbow</option>
                </select>
            </label>

            <label>
            Cursor Style:
            <select name='cursorStyle'>
                <option className='default' value='default'>Default</option>
                <option className='crosshair' value='crosshair'>Crosshair</option>
                <option className='pointer' value='pointer'>Pointer</option>
                <option className='rocket' value='rocket'>Rocket</option>
            </select>
            </label>

            <label>
            Cursor Song:
            <select id='cursorSong'>
                <option className='black' value='black'>Black</option>
                <option className='black' value='red'>Red</option>
                <option className='black' value='green'>Green</option>
                <option className='black' value='rainbow'>Rainbow</option>
            </select>
            </label>
        </>
    )

}