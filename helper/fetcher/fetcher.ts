import { generateBodyString, prepareBody } from './body-formatter';

const GET = 'GET';
const POST = 'POST';

const doFetch = async (url: string, method: string, headers: HeadersInit, body: string | null = null) => {
    const response = await fetch(url, {
        method,
        headers,
        body
    });

    if (response.ok) {
        return await response.json();
    }

    throw await response.json();
}

export const GetAsync = async (url: string, headers: HeadersInit, params: Record<string, any> = {}) => {
    if (params && Object.keys(params).length > 0) {
        url += `?${generateBodyString(params)}`;
    }
    
    return await doFetch(url, GET, headers);
};

export const PostAsync = async (url: string, headers: HeadersInit, body: Record<string, any> = {}) => {
    return await doFetch(url, POST, headers, prepareBody(headers, body));
}