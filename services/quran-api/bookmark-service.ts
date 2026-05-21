import { Auth } from "@/models/auth";
import { getCommonHeaders, BOOKMARKS_URL, BOOKMARKS_SYNC_URL } from './base-service';
import { PostAsync, DeleteAsync, GetAsync } from "@/helper/fetcher/fetcher";
import { refreshToken } from "./user-oauth-service";
import { ReadState } from "@/models/read-state";

export const getAllBookmarks = async (token: Auth, after: string | null = null) => {
    const headers = await getHeaders(token.access_token);

    let url = `${BOOKMARKS_URL}?first=20`;

    if (after !== null) {
        url += `&after=${after}`;
    }
    
    return await GetAsync(url, headers);
}

export const addBookmark = async (token: Auth, surahId: number, ayahId: number) => {
    const payload = {
        surah_id: surahId,
        ayah_id: ayahId
    };
    const headers = await getHeaders(token.access_token, payload);
    
    return await PostAsync(BOOKMARKS_URL, headers, payload);
}

export const removeBookmark = async (token: Auth, bookmarkId: string) => {
    const headers = await getHeaders(token.access_token);
    const url = `${BOOKMARKS_URL}/${bookmarkId}`;
    return await DeleteAsync(url, headers);
}

export const syncBookmarks = async (token: Auth, bookmarks: ReadState[]) => {
    const payload = { bookmarks };
    const headers = await getHeaders(token.access_token, payload);
    
    const response = await PostAsync(BOOKMARKS_SYNC_URL, headers, payload);

    if (response?.data?.data) {
        let bookmarksList: ReadState[] = response.data.data;
        let endCursor = response.data.pagination.endCursor;
        
        while (endCursor !== null) {
            const res = await getAllBookmarks(token, endCursor);
            bookmarksList.concat(res.data.data as ReadState[]);
            endCursor = res.data.pagination.endCursor;
        }

        const newList = bookmarksList.map(x => ({
            surah_id: x.key ?? 0,
            ayah_id: x.verseNumber ?? 0,
            id: x.id
        }));

        return newList;
    }

    return null;
}

const getHeaders = async(accessToken: string, payload: {} = {}) => {
    const headers = await getCommonHeaders(payload);

    return {
        ...headers,
        'x-auth-token': accessToken
    };
}