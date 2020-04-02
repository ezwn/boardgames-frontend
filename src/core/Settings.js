import urlSearchParams from "libs/url-search-params";

const initParam = (key) => {
    const qsPlayerName = urlSearchParams.get(key);
    if (qsPlayerName) {
      localStorage.setItem(key, qsPlayerName);
    }
    
    return localStorage.getItem(key);
}

export const playerName = initParam("playerName");
export const playerPassword = initParam("playerPassword");
export const replacePlayerName = initParam("replacePlayerName");
export const backendUrl = process.env.REACT_APP_BGF_BACKEND;
