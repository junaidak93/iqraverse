import { Resource } from '@/models/resource';
import languages from '../../constants/translation-languages';
import * as service from './translation-tafsir-service';

const RESOURCE_TYPE = 'tafsirs';

export const getTafsirByAyah = async (resourceId: number, ayahKey: string): Promise<string> => {
    if (!TafsirsCache.resourceAyahTafsirMap) {
        TafsirsCache.resourceAyahTafsirMap = {};
    }

    const cacheKey = `${resourceId}:${ayahKey}`;

    if (TafsirsCache.resourceAyahTafsirMap[cacheKey]) {
        return TafsirsCache.resourceAyahTafsirMap[cacheKey];
    }
    
    const response = await service.getByAyah(RESOURCE_TYPE, resourceId, ayahKey);
    const text = response?.tafsir?.text;

    TafsirsCache.resourceAyahTafsirMap[cacheKey] = text;

    return text;
};

export const getTafsirBySurah = async (resourceId: number, surahId: number, perPage = 50, page = 1) => {
    return await service.getBySurah(RESOURCE_TYPE, resourceId, surahId);
};

export const getTafsirByParah = async (resourceId: number, parahId: number, perPage = 50, page = 1) => {
    return await service.getByParah(RESOURCE_TYPE, resourceId, parahId);
};

export const getTafsirResources = async () => {
    if (TafsirsCache.resources && Object.keys(TafsirsCache.resources).length > 0) {
        return TafsirsCache.resources;
    }

    const data = await service.getResources(RESOURCE_TYPE) as { tafsirs: Resource[] };

    const groups = data.tafsirs.reduce((acc: Record<string, Resource[]>, item) => {
        const key = item.language_name;

        if (!acc[key]) 
            acc[key] = [];

        acc[key].push(item);
        return acc;
    }, {});


    TafsirsCache.resources = groups;

    return groups;
};

class TafsirsCache {
    static resources: Record<string, Resource[]>;
    static resourceAyahTafsirMap: Record<string, string>;// { "1:1:1", "tafsir" }
}