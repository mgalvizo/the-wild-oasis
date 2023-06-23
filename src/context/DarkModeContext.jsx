import { createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
    // Media query that checks which color scheme the user has in its preferences
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(
        window.matchMedia('(prefers-color-scheme: dark)').matches,
        'isDarkMode'
    );

    useEffect(() => {
        if (isDarkMode) {
            // documentElement is the html tag of the document
            document.documentElement.classList.add('dark-mode');
            document.documentElement.classList.remove('light-mode');
        } else {
            document.documentElement.classList.add('light-mode');
            document.documentElement.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(isDark => !isDark);
    };

    const contextValue = {
        isDarkMode,
        toggleDarkMode,
    };

    return (
        <DarkModeContext.Provider value={contextValue}>
            {children}
        </DarkModeContext.Provider>
    );
};

const useDarkMode = () => {
    const context = useContext(DarkModeContext);

    if (context === undefined) {
        throw new Error(
            'Attempt to access DarkModeContext outside of DarkModeProvider'
        );
    }

    return context;
};

export { DarkModeProvider, useDarkMode };
