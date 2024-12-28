import React,{useState,createContext} from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({children})=>{
    const [isDarkTheme,setIsDarkTheme]  = useState(true);  //default dark theme

    const toggleTheme = ()=>{
        setIsDarkTheme(!isDarkTheme);
    }

    return (
        <ThemeContext.Provider 
        value={{
            isDarkTheme,
            setIsDarkTheme,
            toggleTheme,
        }}
        >
            {children}
        </ThemeContext.Provider>
    )
}