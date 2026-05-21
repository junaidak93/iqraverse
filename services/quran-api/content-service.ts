import { getCommonHeaders } from './base-service';
import { getAccessToken } from "./content-oauth-service";

export const getHeaders = async() => {
    const headers = await getCommonHeaders();
    const accessToken = await getAccessToken();

    return {
        ...headers,
        'x-auth-token': accessToken ? accessToken.access_token : ''
    };
}