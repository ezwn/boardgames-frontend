import axios from 'axios';
import urlSearchParams from 'libs/url-search-params';

const backendUrl = process.env.REACT_APP_BGF_BACKEND;
const playerName = urlSearchParams.get("playerName");
const playerPassword = urlSearchParams.get("playerPassword");

export const http = axios.create({
    baseURL: backendUrl,
    headers: {
        Authorization: 'Basic ' + btoa(`${playerName}:${playerPassword}`)
    }
});