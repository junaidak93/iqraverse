import { Ayah } from "@/models/ayah";

const Format = (num: number) => String(num).padStart(3, '0');

export const getAyahKey = (ayah: Ayah) => `${ayah.surah_id}:${ayah.ayah_id}`;
export const getAyahDisplayKey = (ayah: Ayah) => `${ayah.surah_id} : ${ayah.ayah_id}`;
export const getAyahAudioKey = (ayah: Ayah) => `${Format(ayah.surah_id)}${Format(ayah.ayah_id)}`;