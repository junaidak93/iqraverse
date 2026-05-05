import { Ayah } from '@/models/ayah';
import * as queries from '../constants/queries';
import { SQLiteDatabase } from "expo-sqlite";

export async function getAllAyahsBySurahIndex(db: SQLiteDatabase, surahIndex: number) : Promise<Ayah[]> {
    return await db.getAllAsync(queries.GET_ALL_AYAHS_BY_SURAH_ID, [surahIndex]);
}

export async function getAllAyahsByParahIndex(db: SQLiteDatabase, parahIndex: number) : Promise<Ayah[]> {
    return await db.getAllAsync(queries.GET_ALL_AYAHS_BY_PARAH_ID, [parahIndex]);
}

export async function getAyahById(db: SQLiteDatabase, surahIndex: number, ayahIndex: number) : Promise<Ayah | null> {
    return await db.getFirstAsync(queries.GET_AYAH_BY_ID, [ayahIndex, surahIndex]);
}