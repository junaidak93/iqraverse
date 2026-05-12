import * as SecureStore from 'expo-secure-store';

export async function save(key: string, value: any) {
  await SecureStore.setItemAsync(key, `${value}`);
}

export async function getValueFor(key: string) {
  return await SecureStore.getItemAsync(key);
}

export const keys = {
    lastRead: "lastRead",
    theme: "theme",
    reciterId: "reciterId",
    autoPlayNextAyah: "autoPlayNextAyah",
}