import { PostAsync } from '@/helper/fetcher/fetcher';
import { Auth } from '@/models/auth';
import Constants from 'expo-constants';

const env = Constants.expoConfig?.extra || {};

const URL = `${env.EXPO_PUBLIC_QURAN_API_OAUTH_BASE_URL}/token`;

const KEY_CLIENT_ID = env.EXPO_PUBLIC_KEY_CLIENT_ID || "";
const KEY_GRANT_TYPE = env.EXPO_PUBLIC_KEY_GRANT_TYPE || "";
const KEY_SCOPE = env.EXPO_PUBLIC_KEY_SCOPE || "";

const CLIENT_ID = env.EXPO_PUBLIC_QURAN_API_CLIENT_ID;
const GRANT_TYPE = env.EXPO_PUBLIC_VALUE_GRANT_TYPE;
const SCOPE = env.EXPO_PUBLIC_VALUE_SCOPE;

const username = CLIENT_ID;
const password = env.EXPO_PUBLIC_QURAN_API_CLIENT_SECRET;

const auth = btoa(`${username}:${password}`);

const HEADERS: HeadersInit = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Authorization': `Basic ${auth}`
};

const BODY = {
    [KEY_CLIENT_ID]: CLIENT_ID,
    [KEY_GRANT_TYPE]: GRANT_TYPE,
    [KEY_SCOPE]: SCOPE
};

export async function getAccessToken() : Promise<Auth | null> {
    if (Cache.auth && isTokenValid(Cache.timeSaved, Cache.auth.expires_in)) {
      return Cache.auth;
    }

    Cache.auth = await PostAsync(URL, HEADERS, BODY);
    Cache.timeSaved = Date.now();

    return Cache.auth;
}

function isTokenValid(issuedAt: number, expiresInSeconds: number): boolean {
  const currentTime = Date.now();
  return currentTime < (issuedAt + (expiresInSeconds * 1000));
}

class Cache {
    static auth: Auth | null;
    static timeSaved: number;
}