'use client'

import { createContext, useState } from "react";

type ThemeContext = {
    theme: string,
    setTheme: (value:string) => void
};

export const ThemeContext = createContext<ThemeContext>({theme: 'dark', setTheme: ()=> {}});

export default function ThemeProvider({
    children
}: {
    children: React.ReactNode
}) {
    
    const [theme, setTheme] = useState('dark');
    
    return (
        <ThemeContext.Provider value={{theme,setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
