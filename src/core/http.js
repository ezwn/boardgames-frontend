import axios from 'axios';
import { playerName, playerPassword, backendUrl } from './Settings';

export const http = axios.create({
    baseURL: backendUrl,
    headers: {
        Authorization: 'Basic ' + btoa(`${playerName}:${playerPassword}`)
    }
});


export const anonymousHttp = axios.create({
    baseURL: backendUrl
});