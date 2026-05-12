import { LastRead } from "@/models/last-read";
import { createContext } from "react";

interface AppSettings {
    isDarkMode: boolean,
    toggleDarkMode: () => void,

    theme: 'system' | 'light' | 'dark',
    updateTheme: (theme: 'system' | 'light' | 'dark') => void,

    lastRead: LastRead | null,
    updateLastRead: ((lastRead: LastRead) => void),

    reciterId: number;
    updateReciterId: (reciterId: number) => void;

    autoPlayNextAyah?: boolean;
    updateAutoPlayNextAyah: (value: boolean) => void;
};

export const AppContext = createContext<AppSettings>({
    isDarkMode: true,
    toggleDarkMode() {},

    theme: 'system',
    updateTheme() {},
    
    lastRead: {
        parah_id: 0,
        surah_id: 0,
        ayah_id: 0,
    },
    updateLastRead: () => {},

    reciterId: 10,
    updateReciterId: () => {},

    autoPlayNextAyah: true,
    updateAutoPlayNextAyah: () => {}
});