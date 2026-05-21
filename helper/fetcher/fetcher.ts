import { generateBodyString, prepareBody } from './body-formatter';

const GET = "GET"
const POST = "POST"
const PUT = "PUT"
const DELETE = "DELETE"

const doFetch = async (url: string, method: string, headers: HeadersInit, body: string | null = null) => {
    try {
        const response = await fetch(url, {
            method,
            headers,
            body
        });

        const json = await response.json();

        if (response.ok) {
            return json;
        }

        throw json;
    } catch (e) {
        console.log(e);
    }
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

export const PutAsync = async (url: string, headers: HeadersInit, body: Record<string, any> = {}) => {
    return await doFetch(url, PUT, headers, prepareBody(headers, body))
}

export const DeleteAsync = async (url: string, headers: HeadersInit, body: Record<string, any> = {}) => {
    return await doFetch(url, DELETE, headers, prepareBody(headers, body))
}