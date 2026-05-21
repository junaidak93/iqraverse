import { getHeaders } from './content-service';
import { API_BASE_URL } from './base-service';
import { GetAsync } from '@/helper/fetcher/fetcher';

export const getByAyah = async (resourceType: string, resourceId: number, ayahKey: string) => {
    const url = `${API_BASE_URL}/resources/${resourceType}` +
    `/${resourceId}/by_ayah/${ayahKey}`;
    
    const response = await GetAsync(url, await getHeaders());
    return response?.data;
};

export const getBySurah = async (resourceType: string, resourceId: number, surahId: number, perPage = 50, page = 1) => {
    const url = `${API_BASE_URL}/resources/${resourceType}` +
    `/${resourceId}/by_chapter/${surahId}`;
    
    const response = await GetAsync(url, await getHeaders(), {
        per_page: perPage,
        page: page
    });
    return response?.data;
};

export const getByParah = async (resourceType: string, resourceId: number, parahId: number, perPage = 50, page = 1) => {
    const url = `${API_BASE_URL}/resources/${resourceType}` +
    `/${resourceId}/by_juz/${parahId}`;
    
    const response = await GetAsync(url, await getHeaders(), {
        per_page: perPage,
        page: page
    });
    return response?.data;
};

export const getResources = async (resourceType: string) => {
    const url = `${API_BASE_URL}/resources/${resourceType}`;
    const response = await GetAsync(url, await getHeaders());
    return response?.data;
};