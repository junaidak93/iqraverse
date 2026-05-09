import { useEffect, useState } from "react";
import { ThemeContext } from "./contexts";
import { useColorScheme } from "react-native";
import * as Preferences from '../helper/preferences';

export const ThemeProvider = ({ children } : { children: any }) => {
  const systemTheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemTheme === "dark");
  const toggleDarkMode = () => {
    Preferences.save(Preferences.keys.isDarkMode, !isDarkMode);
    setIsDarkMode(!isDarkMode);
  }

  useEffect(() => {
    async function updateValueFromPreferences() {
        const _isDarkMode = await Preferences.getValueFor(Preferences.keys.isDarkMode);
        
        if (_isDarkMode && _isDarkMode !== "") {
            setIsDarkMode(_isDarkMode.toLowerCase() === "true");
        }
    }

    updateValueFromPreferences();
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode: isDarkMode, toggleTheme: toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};