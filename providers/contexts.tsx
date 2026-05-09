import { createContext } from "react";

interface AppTheme {
    isDarkMode: boolean,
    toggleTheme: () => void
};

export const ThemeContext = createContext<AppTheme>({
    isDarkMode: true,
    toggleTheme() {
        alert("Here");
    },
});