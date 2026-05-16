import fs from 'fs';
import Constants from 'expo-constants';
import { HmacSHA256 } from 'crypto-es';

const env = Constants.expoConfig?.extra || {};

const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImY5MzAxZjgwLTdkY2QtNGNkMi04NWZlLTJjNWM5NjBhYTA2OSIsInR5cCI6IkpXVCJ9.eyJhdWQiOltdLCJjbGllbnRfaWQiOiJhZGU4ZmE1ZS1hODg0LTQxMTktOTZmZC01Y2E3OTc1MGRlNTIiLCJleHAiOjE3NzgwNzY2ODYsImV4dCI6e30sImlhdCI6MTc3ODA3MzA4NiwiaXNzIjoiaHR0cHM6Ly9vYXV0aDIucXVyYW4uZm91bmRhdGlvbiIsImp0aSI6ImFmMGFhZWQxLTMwN2ItNGUwMy04ZDAxLTg2MWVmNzk2NTk0OSIsIm5iZiI6MTc3ODA3MzA4Niwic2NwIjpbImNvbnRlbnQiXSwic3ViIjoiYWRlOGZhNWUtYTg4NC00MTE5LTk2ZmQtNWNhNzk3NTBkZTUyIn0.npH-UyLOheJTXVF6wyBC01kD6PV9RD9dprA-_diQKm5z48Q9BSG9R3yMdZUu8f3tA46Iym8DsN0SWy7vMsteKD24Lun9X2LA69Tjs1rfolkKT56L3zZ4-pBzlmSP7M0XdKmM4XpV2efAc1HREX6oYKDakKV_MONup2RFCPfavdK1jisRVWB_M1pnOC2lVUfwWulQksoouj-I3qW5im2edFYUss_gzBUQRds585wfOC4kHcA7slLPxaaNoV1xz7bP3e9X2MdLYYecQ7Nglos4ju_CDyWmThhtqqRrqfWsDNAEgC3uVUJEUFeo4ex31LCQbD3hO2mJ2hxSbjOc-Gwpw3xYCVVNrp5KJVFE4i_WJJjoaQEm8bKL_e4LDDS80TPVcdxFHVN87X8PrDzIBkdXw4haKKZVXIpY4Hp-yowzt0AblAsSqMB8_s_BU-YolinehcIdIb_EJnNBJCZkC9gO1UQAO0akwi7eJ0hoziG2Cb6DFzvo1zhrWoCNvECBtdO7r5LzLs6rAbm23lZsvQux02EQSh2kk-W9vvZvz75qtHSVkbTnQJjxeSvKWEwjUGTZO7biz3z1Soe4hkm34Ix81UwfAUAi2ASXhevkkHpWaI6fYwOsM9GiO52-ZCeK29ozSrN2-ByzNVa_BltjFmmteQ2pbjJ0dPb0GpjrKi5tV0c';

const SALT = env.SALT;
const APP_ID = env.APPLICATION_ID;
const RESOURCE_ID = 85;
const TOTAL_SURAHS = 114;
const API_BASE_URL = env.API_BASE_URL;

interface Root {
    translations: Translation[];
    pagination: Pagination;
}

interface Translation {
  text: string;
  ayah_id: number;
  surah_id: number;
}

interface Pagination {
  next_page: number;
}

const getCommonHeaders = async (payload: any = {}): Promise<HeadersInit> => {
    const timestamp = Date.now().toString();
    
    const message = `${timestamp}:${JSON.stringify(payload)}`;
    const signature = HmacSHA256(message, SALT).toString();
    
    return {
        'Content-Type': 'application/json',
        'x-application-id': APP_ID,
        'x-timestamp': timestamp,
        'x-signature': signature
    };
}

const HEADERS: HeadersInit = {
  'x-client-id': env.EXPO_PUBLIC_QURAN_API_CLIENT_ID || '',
  'x-auth-token': token,
};

async function fetchBatch(surah_id : number, page: number): Promise<Root> {
  const url =
    `${API_BASE_URL}/resources/translations/${RESOURCE_ID}/by_chapter/${surah_id}?per_page=50` +
    `&page=${page}`;

  const response = await fetch(url, {
    headers: HEADERS,
  });

  if (!response.ok) {
    throw new Error(
      `Failed at offset ${page}: ${response.status}`
    );
  }

  const data = await response.json();

  return data;
}

async function main(): Promise<void> {
  const allTranslations: Translation[] = [];

  for (let surah_id = 1; surah_id <= TOTAL_SURAHS; surah_id++) {
    console.log(`{ surah_id: ${surah_id} }`);

    let page = 1;

    while (page != null) {
        console.log(`Fetching for page ${page}`);

        const data = await fetchBatch(surah_id, page);
        const batch = data.translations;

        for (let i = 0; i < batch.length; i++) {
            batch[i].surah_id = surah_id;
            batch[i].ayah_id = ((page - 1) * 50) + i + 1;
        }

        allTranslations.push(...batch);

        await new Promise(resolve => setTimeout(resolve, 200));

        page = data.pagination.next_page;
    }
    
  }

  fs.writeFileSync(
    './translations.json',
    JSON.stringify(allTranslations, null, 2)
  );

  console.log(
    `Done. Saved ${allTranslations.length} translations.`
  );
}

main().catch(console.error);