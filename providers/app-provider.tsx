import { useEffect, useState } from "react";
import { AppContext } from "./contexts";
import { useColorScheme } from "react-native";
import * as Preferences from '../helper/preferences';
import { LastRead } from "@/models/last-read";

export const AppProvider = ({ children } : { children: any }) => {
  const systemTheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemTheme === "dark");
  const [lastRead, setLastRead] = useState<LastRead | null>(null);
  const [reciterId, setReciterId] = useState(10);
  const [autoPlayNextAyah, setAutoPlayNextAyah] = useState(true);
  const [theme, setTheme] = useState<'system' | 'light' | 'dark'>('system');

  const toggleDarkMode = () => {
    updateTheme(isDarkMode ? 'light' : 'dark');
  }

  const updateTheme = (theme: 'system' | 'light' | 'dark') => {
    setTheme(theme);

    switch (theme) {
      case 'system':
        setIsDarkMode(systemTheme === "dark");
        break;
      case 'light':
        setIsDarkMode(false);
        break;
      case 'dark':
        setIsDarkMode(true);
        break;
    }

    Preferences.save(Preferences.keys.theme, theme);
  }

  const updateLastRead = (lastRead: LastRead) => {
    Preferences.save(Preferences.keys.lastRead, JSON.stringify(lastRead));
    setLastRead(lastRead);
  }

  const updateReciterId = (reciterId: number) => {
    Preferences.save(Preferences.keys.reciterId, reciterId);
    setReciterId(reciterId);
  }

  const updateAutoPlayNextAyah = (value: boolean) => {
    Preferences.save(Preferences.keys.autoPlayNextAyah, value);
    setAutoPlayNextAyah(value);
  }

  useEffect(() => {
    async function updateValueFromPreferences() {
        const theme = await Preferences.getValueFor(Preferences.keys.theme) as 'system' | 'light' | 'dark' | null;

        if (theme) {
            updateTheme(theme);
        }

        const lastReadStr = await Preferences.getValueFor(Preferences.keys.lastRead);

        if (lastReadStr) {
            setLastRead(JSON.parse(lastReadStr));
        }

        const reciterId = await Preferences.getValueFor(Preferences.keys.reciterId);

        if (reciterId) {
            setReciterId(parseInt(reciterId));
        }

        const autoPlayNextAyah = await Preferences.getValueFor(Preferences.keys.autoPlayNextAyah);

        if (autoPlayNextAyah) {
            setAutoPlayNextAyah(autoPlayNextAyah === "true");
        }
    }

    updateValueFromPreferences();
  }, []);

  const state = { 
    isDarkMode, 
    toggleDarkMode, 
    updateTheme, 
    theme, 
    lastRead, 
    updateLastRead,
    reciterId,
    updateReciterId,
    autoPlayNextAyah,
    updateAutoPlayNextAyah
  };

  return (
    <AppContext.Provider value={state}>
      {children}
    </AppContext.Provider>
  );
};