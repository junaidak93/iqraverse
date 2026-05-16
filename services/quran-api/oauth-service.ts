import { GetAsync, PostAsync } from '@/helper/fetcher/fetcher';
import { Auth } from '@/models/auth';
import { getCommonHeaders, LOGIN_URL } from './base-service';


export async function getAccessToken() : Promise<Auth | null> {
    if (Cache.auth && isTokenValid(Cache.timeSaved, Cache.auth.expires_in)) {
      return Cache.auth;
    }

    const headers = await getCommonHeaders();

    try {
      const response = await GetAsync(LOGIN_URL, headers);

      Cache.auth = response.data as Auth;
      Cache.timeSaved = Date.now();
  } catch (error) {
      console.error("Error fetching access token:", error);
      
      if (!Cache.auth) {
        throw error;
      }
  }

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