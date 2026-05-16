import Constants from 'expo-constants';
import { HmacSHA256, WordArray, Base64 } from 'crypto-es';
import stringify from 'json-stable-stringify';

const env = Constants.expoConfig?.extra || {};
const appId = env.APPLICATION_ID;

export const API_BASE_URL = env.API_BASE_URL;
export const LOGIN_URL = `${env.API_BASE_URL}${env.LOGIN_ENDPOINT}`;

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