import Constants from 'expo-constants';
import { HmacSHA256, WordArray, Base64 } from 'crypto-es';
import stringify from 'json-stable-stringify';

const env = Constants.expoConfig?.extra || {};
const appId = env.APPLICATION_ID;

export const API_BASE_URL = env.API_BASE_URL;
export const CONTENT_LOGIN_URL = `${env.API_BASE_URL}${env.CONTENT_LOGIN_ENDPOINT}`;
export const USER_LOGIN_URL = `${env.API_BASE_URL}${env.USER_LOGIN_ENDPOINT}`;
export const USER_PROFILE_URL = `${env.API_BASE_URL}${env.USER_PROFILE_ENDPOINT}`;
export const TOKEN_REFRESH_URL = `${env.API_BASE_URL}${env.TOKEN_REFRESH_ENDPOINT}`;
export const QURAN_LOGOUT_URL = env.QURAN_LOGOUT_URL;
export const BOOKMARKS_URL = `${env.API_BASE_URL}${env.BOOKMARKS_ENDPOINT}`;
export const BOOKMARKS_SYNC_URL = `${env.API_BASE_URL}${env.BOOKMARKS_SYNC_ENDPOINT}`;
export const DEEP_LINK = env.DEEP_LINK;

export const getCommonHeaders = async (payload: any = {}): Promise<HeadersInit> => {
    const timestamp = Date.now().toString();
    const nonce = WordArray.random(16).toString(Base64);
    
    const message = `${timestamp}:${nonce}:${stringify(payload)}`;
    const signature = HmacSHA256(message, nonce).toString();
    
    return {
        'Content-Type': 'application/json',
        'x-application-id': appId,
        'x-timestamp': timestamp,
        'x-nonce': nonce,
        'x-signature': signature
    };
}