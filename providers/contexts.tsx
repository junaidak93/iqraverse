import { Auth } from "@/models/auth";
import { ReadState } from "@/models/read-state";
import { UserProfile } from "@/models/user-profile";
import { createContext } from "react";

interface AppSettings {
    isDarkMode: boolean,
    toggleDarkMode: () => void,

    theme: 'system' | 'light' | 'dark',
    updateTheme: (theme: 'system' | 'light' | 'dark') => void,

    lastRead: ReadState | null,
    updateLastRead: ((lastRead: ReadState) => void),

    reciterId: number;
    updateReciterId: (reciterId: number) => void;

    autoPlayNextAyah?: boolean;
    updateAutoPlayNextAyah: (value: boolean) => void;

    bookmarks?: ReadState[];
    addBookmark: (ayah: ReadState) => void;
    removeBookmark: (ayah: ReadState) => void;
    updateBookmarks: (bookmarks: ReadState[]) => void;

    profile?: UserProfile | null;
    updateProfile: (profile: UserProfile) => void;
    clearProfile: () => void;

    userToken?: Auth | null;
    updateUserToken: (token: Auth) => void;
    clearUserToken: () => void;
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
    updateAutoPlayNextAyah: () => {},

    bookmarks: [],
    addBookmark: () => {},
    removeBookmark: () => {},
    updateBookmarks(bookmarks) {
        
    },

    profile: null,
    updateProfile(profile) {
        
    },
    clearProfile() {
        this.profile = null
    },

    userToken: null,
    updateUserToken(token: Auth) {

    },
    clearUserToken() {

    }
});