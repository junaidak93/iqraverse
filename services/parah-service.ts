import { Parah } from '@/models/parah';
import { Surah } from '@/models/surah';
import * as queries from '../constants/queries';
import { SQLiteDatabase } from "expo-sqlite";
import { ParahAyahMap } from '@/models/parah-ayah-map';

export async function getAllParahs(db: SQLiteDatabase) : Promise<Parah[]> {
    return await db.getAllAsync(queries.GET_ALL_PARAHS);
}

export async function getParahByIndex(db: SQLiteDatabase, parahIndex: number) : Promise<Parah | null> {
    return await db.getFirstAsync(queries.GET_PARAH_BY_ID, [parahIndex]);
}

export async function getSurahsByParahIndex(db: SQLiteDatabase, parahIndex: number) : Promise<Surah[]> {
    return await db.getAllAsync(queries.GET_SURAH_BY_PARAH_ID, [parahIndex]);
}

export async function getAyahRangeByParah(db: SQLiteDatabase) : Promise<ParahAyahMap[]> {
    return await db.getAllAsync(queries.GET_AYAHS_IN_PARAH);
}