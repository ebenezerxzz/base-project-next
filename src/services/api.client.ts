import { api } from "./api";
import { parseCookies } from "nookies"

export const getAPIClient = (ctx?: any) => {
    const {'auth.token': token} = parseCookies(ctx);
    if(token) api.defaults.headers['Authorization'] = `Bearer ${token}`;

    return api;
}