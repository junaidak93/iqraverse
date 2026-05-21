import { useEffect, useState } from "react";
import { AppContext } from "./contexts";
import { useColorScheme } from "react-native";
import * as Preferences from '../helper/preferences';
import { ReadState } from "@/models/read-state";
import { UserProfile } from "@/models/user-profile";
import { Auth } from "@/models/auth";
import * as bookmarkService from "@/services/quran-api/bookmark-service";

export const AppProvider = ({ children } : { children: any }) => {
  const systemTheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemTheme === "dark");
  const [lastRead, setLastRead] = useState<ReadState | null>(null);
  const [reciterId, setReciterId] = useState(10);
  const [autoPlayNextAyah, setAutoPlayNextAyah] = useState(true);
  const [bookmarks, setBookmarks] = useState<ReadState[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userToken, setUserToken] = useState<Auth | null>(null);
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

  const updateLastRead = (lastRead: ReadState) => {
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

  const addBookmark = (ayah: ReadState) => {
    Preferences.saveUnsafe(Preferences.keys.bookmarks, JSON.stringify([...bookmarks, ayah]));
    setBookmarks([...bookmarks, ayah]);

    if (userToken) {
      bookmarkService.addBookmark(userToken as Auth, ayah.surah_id, ayah.ayah_id);
    }
  };

  const removeBookmark = (ayah: ReadState) => {
    const updatedBookmarks = bookmarks.filter((b) => b.ayah_id !== ayah.ayah_id);
    Preferences.saveUnsafe(Preferences.keys.bookmarks, JSON.stringify(updatedBookmarks));
    setBookmarks(updatedBookmarks);

    if (userToken && ayah.id) {
      bookmarkService.removeBookmark(userToken as Auth, ayah.id);
    }
  };

  const updateBookmarks = (bookmarks: ReadState[]) => {
    Preferences.saveUnsafe(Preferences.keys.bookmarks, JSON.stringify(bookmarks));
    setBookmarks(bookmarks);
  };

  const updateProfile = (profile: UserProfile) => {
    Preferences.save(Preferences.keys.profile, JSON.stringify(profile));
    setProfile(profile);
  }

  const clearProfile = () => {
    setProfile(null);
    Preferences.remove(Preferences.keys.profile);
  }

  const updateUserToken = (token: Auth) => {
    Preferences.save(Preferences.keys.user_token, JSON.stringify(token));
    setUserToken(token);
  }

  const clearUserToken = () => {
    setUserToken(null);
    Preferences.remove(Preferences.keys.user_token);
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

        const bookmarksStr = await Preferences.getValueForUnsafe(Preferences.keys.bookmarks);

        if (bookmarksStr) {
            setBookmarks(JSON.parse(bookmarksStr));
        }

        const profileStr = await Preferences.getValueFor(Preferences.keys.profile);

        if (profileStr) {
            setProfile(JSON.parse(profileStr));
        }

        const userTokenStr = await Preferences.getValueFor(Preferences.keys.user_token);

        if (userTokenStr) {
            setUserToken(JSON.parse(userTokenStr));
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
    updateAutoPlayNextAyah,
    bookmarks,
    addBookmark,
    removeBookmark,
    updateBookmarks,
    profile,
    updateProfile,
    clearProfile,
    userToken,
    updateUserToken,
    clearUserToken
  };

  return (
    <AppContext.Provider value={state}>
      {children}
    </AppContext.Provider>
  );
};