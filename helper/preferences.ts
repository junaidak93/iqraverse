import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function save(key: string, value: any) {
  await SecureStore.setItemAsync(key, `${value}`);
}

export async function getValueFor(key: string) {
  return await SecureStore.getItemAsync(key);
}

export async function remove(key: string) {
  await SecureStore.deleteItemAsync(key);
}

export async function saveUnsafe(key: string, value: any) {
  await AsyncStorage.setItem(key, `${value}`);
}

export async function getValueForUnsafe(key: string) {
  return await AsyncStorage.getItem(key);
}

export async function removeUnsafe(key: string) {
  await AsyncStorage.removeItem(key);
}

export const keys = {
    lastRead: "lastRead",
    theme: "theme",
    reciterId: "reciterId",
    autoPlayNextAyah: "autoPlayNextAyah",
    bookmarks: "bookmarks",
    user_token: "user_token",
    content_token: "content_token",
    profile: "profile"
}