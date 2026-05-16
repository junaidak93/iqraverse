import Constants from 'expo-constants';
import { HmacSHA256 } from 'crypto-es';

const env = Constants.expoConfig?.extra || {};
const salt = env.SALT;
const appId = env.APPLICATION_ID;

export const API_BASE_URL = env.API_BASE_URL;
export const LOGIN_URL = `${env.API_BASE_URL}${env.LOGIN_ENDPOINT}`;

export const getCommonHeaders = async (payload: any = {}): Promise<HeadersInit> => {
    const timestamp = Date.now().toString();
    
    const message = `${timestamp}:${JSON.stringify(payload)}`;
    const signature = HmacSHA256(message, salt).toString();
    
    return {
        'Content-Type': 'application/json',
        'x-application-id': appId,
        'x-timestamp': timestamp,
        'x-signature': signature
    };
}