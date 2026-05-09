import * as service from './translation-tafsir-service';
import { Resource } from '@/models/resource';

const RESOURCE_TYPE = 'translations';

export const getTranslationByAyah = async (resourceId: number, ayahKey: string): Promise<string> => {
    if (!TranslationsCache.resourceAyahTranslationMap) {
        TranslationsCache.resourceAyahTranslationMap = {};
    }

    const cacheKey = `${resourceId}:${ayahKey}`;

    if (TranslationsCache.resourceAyahTranslationMap[cacheKey]) {
        return TranslationsCache.resourceAyahTranslationMap[cacheKey];
    }
    
    const response = await service.getByAyah(RESOURCE_TYPE, resourceId, ayahKey);
    const text = response?.translations[0].text;

    TranslationsCache.resourceAyahTranslationMap[cacheKey] = text;

    return text;
};

export const getTranslationBySurah = async (resourceId: number, surahId: number, perPage = 50, page = 1) => {
    return await service.getBySurah(RESOURCE_TYPE, resourceId, surahId);
};

export const getTranslationByParah = async (resourceId: number, parahId: number, perPage = 50, page = 1) => {
    return await service.getByParah(RESOURCE_TYPE, resourceId, parahId);
};

export const getTranslationResources = async () => {
    if (TranslationsCache.resources && Object.keys(TranslationsCache.resources).length > 0) {
        return TranslationsCache.resources;
    }

    const data = await service.getResources(RESOURCE_TYPE) as { translations: Resource[] };

    const groups = data.translations.reduce((acc: Record<string, Resource[]>, item) => {
        const key = item.language_name;

        if (!acc[key]) 
            acc[key] = [];

        acc[key].push(item);
        return acc;
    }, {});

    TranslationsCache.resources = groups;

    return groups;
};

class TranslationsCache {
    static resources: Record<string, Resource[]>;
    static resourceAyahTranslationMap: Record<string, string>;// { "1:1:1", "translation" }
}