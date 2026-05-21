import * as WebBrowser from 'expo-web-browser';
import { 
    USER_LOGIN_URL, 
    getCommonHeaders, 
    DEEP_LINK, 
    USER_PROFILE_URL, 
    QURAN_LOGOUT_URL,
    TOKEN_REFRESH_URL 
} from './base-service';
import * as Linking from 'expo-linking';
import { keys, remove, save } from '@/helper/preferences';
import { GetAsync } from '@/helper/fetcher/fetcher';
import { UserProfile } from '@/models/user-profile';
import { Auth } from '@/models/auth';

export async function loginWithQuran() : Promise<Auth | null> {
    const headers = await getCommonHeaders();
    let url = USER_LOGIN_URL + '?';

    for (const [key, value] of Object.entries(headers)) {
        url += `${key}=${encodeURIComponent(value)}&`;
    }

    if (url.endsWith('&')) {
        url = url.substring(0, url.length - 1);
    }

    const result = await WebBrowser.openAuthSessionAsync(url, DEEP_LINK);

    if (result.type === 'success') {
        const parsed = Linking.parse(result.url);

        return {
            access_token: parsed.queryParams?.access_token?.toString()?.trim() || "",
            refresh_token: parsed.queryParams?.refresh_token?.toString()?.trim()
        };
    }

    return null;
}

export const getUserProfile = async (token: Auth) : Promise<UserProfile | null> => {
    const headers = await getHeaders(token.access_token?.trim());

    const response = await GetAsync(USER_PROFILE_URL, headers);

    const profile = response?.data

    if (profile) {
        return profile;
    }

    return null;
}

export const refreshToken = async (token: Auth) : Promise<Auth | null> => {
    const headers = await getHeaders(token.access_token?.trim());
    const url = `${TOKEN_REFRESH_URL}/${token.refresh_token}`;

    const response = await GetAsync(url, headers);

    const data = response?.data

    if (data) {
        return data;
    }

    return null;
}

export const logout = async () => {
    await WebBrowser.openAuthSessionAsync(QURAN_LOGOUT_URL, DEEP_LINK);
    await remove(keys.user_token);
    return true;
}

const getHeaders = async(accessToken: string) => {
    const headers = await getCommonHeaders();

    return {
        ...headers,
        'x-auth-token': accessToken
    };
}