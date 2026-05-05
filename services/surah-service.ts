import * as queries from '../constants/queries';
import { Surah } from "../models/surah";
import { SQLiteDatabase } from "expo-sqlite";

export async function getAllSurahs(db: SQLiteDatabase) {
    return await db.getAllAsync<Surah>(queries.GET_ALL_SURAHS);
}

export async function getSurahByIndex(db: SQLiteDatabase, surahIndex: number) {
    return await db.getFirstAsync<Surah>(queries.GET_SURAH_BY_ID, [surahIndex]);
}

export async function getSurahsByIndices(db: SQLiteDatabase, surahIndices: string) : Promise<Surah[]> {
    return await db.getAllAsync<Surah>(queries.GET_SURAH_BY_ID.replaceAll('?', surahIndices));
}

export async function getAyahCountBySurahIndex(db: SQLiteDatabase, surahIndex: number) {
    return await db.getFirstAsync<number>(queries.GET_AYAH_COUNT_BY_SURAH_ID, [surahIndex]);
}