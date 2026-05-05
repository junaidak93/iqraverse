import dbConstants from "./db-constants";

export const GET_ALL_PARAHS = `SELECT * FROM ${dbConstants.TABLE_PARAH}`;
export const GET_ALL_SURAHS = `SELECT * FROM ${dbConstants.TABLE_SURAH}`;
export const GET_ALL_AYAHS_BY_SURAH_ID = `SELECT * FROM ${dbConstants.TABLE_AYAH} WHERE ${dbConstants.SURAH_ID} = ?`;
export const GET_ALL_AYAHS_BY_PARAH_ID = `SELECT * FROM ${dbConstants.TABLE_AYAH} WHERE ${dbConstants.PARAH_ID} = ?`;
export const GET_AYAH_BY_ID = `SELECT * FROM ${dbConstants.TABLE_AYAH} WHERE ${dbConstants.AYAH_ID} = ? AND ${dbConstants.SURAH_ID} = ?`;
export const GET_PARAH_BY_ID = `SELECT * FROM ${dbConstants.TABLE_PARAH} WHERE ${dbConstants.PARAH_ID} = ?`;
export const GET_SURAH_BY_ID = `SELECT * FROM ${dbConstants.TABLE_SURAH} WHERE ${dbConstants.INDEX} IN (?)`;
export const GET_AYAH_COUNT_BY_SURAH_ID = `SELECT COUNT(*) as count FROM ${dbConstants.TABLE_AYAH} WHERE ${dbConstants.SURAH_ID} = ?`;
export const GET_AYAH_COUNT_BY_PARAH_ID = `SELECT COUNT(*) as count FROM ${dbConstants.TABLE_AYAH} WHERE ${dbConstants.PARAH_ID} = ?`;
export const GET_SURAH_BY_PARAH_ID = `SELECT * FROM ${dbConstants.TABLE_SURAH} WHERE ? IN (${dbConstants.PARAH_ID_PLURAL})`;


export const GET_AYAHS_IN_PARAH = 
`SELECT 
	${dbConstants.PARAH_ID}, 
    CONCAT(${dbConstants.SURAH_ID}, ':', MIN(${dbConstants.AYAH_ID}), " — ", ${dbConstants.SURAH_ID}, ':', MAX(${dbConstants.AYAH_ID})) ayah_range
FROM 
	${dbConstants.TABLE_AYAH}
GROUP BY 
	${dbConstants.PARAH_ID}, 
    ${dbConstants.SURAH_ID}`;