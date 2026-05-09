import { getHeaders, BASE_URL } from './content-service';
import { GetAsync } from '@/helper/fetcher/fetcher';

export const getByAyah = async (resourceType: string, resourceId: number, ayahKey: string) => {
    const url = `${BASE_URL}/${resourceType}` +
    `/${resourceId}/by_ayah/${ayahKey}`;
    
    return await GetAsync(url, await getHeaders());
};

export const getBySurah = async (resourceType: string, resourceId: number, surahId: number, perPage = 50, page = 1) => {
    const url = `${BASE_URL}/${resourceType}` +
    `/${resourceId}/by_chapter/${surahId}`;
    
    return await GetAsync(url, await getHeaders(), {
        per_page: perPage,
        page: page
    });
};

export const getByParah = async (resourceType: string, resourceId: number, parahId: number, perPage = 50, page = 1) => {
    const url = `${BASE_URL}/${resourceType}` +
    `/${resourceId}/by_juz/${parahId}`;
    
    return await GetAsync(url, await getHeaders(), {
        per_page: perPage,
        page: page
    });
};

export const getResources = async (resourceType: string) => {
    const url = `${BASE_URL}/resources/${resourceType}`;
    return await GetAsync(url, await getHeaders());
};