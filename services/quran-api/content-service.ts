import { getAccessToken } from "./oauth-service";
import Constants from 'expo-constants';

const env = Constants.expoConfig?.extra || {};

const CLIENT_ID = env.EXPO_PUBLIC_QURAN_API_CLIENT_ID || "";
export const BASE_URL = env.EXPO_PUBLIC_QURAN_API_CONTENT_BASE_URL;

export const getHeaders = async() => {
    const accessToken = await getAccessToken();

    return {
        'Content-Type': 'application/json',
        'x-auth-token': accessToken ? accessToken.access_token : '',
        'x-client-id': CLIENT_ID
    };
}