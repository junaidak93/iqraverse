export interface Auth {
    access_token: string;
    refresh_token?: string | null;
    expires_in?: number | null;
    scope?: string | null;
    token_type?: string | null;
}