import http from 'axios';

const backendUrl = process.env.REACT_APP_BGF_BACKEND;

export const login = async (playerId, password) => {
    try {
        const response = await http.post(`${backendUrl}/players/login`, { name: playerId, password });
        return response.data;
    } catch (error) {
        if (!error.response) {
            throw new Error('Impossible de se connecter au serveur');
        }

        switch (error.response.status) {
            default:
            case 404:
                throw new Error('Erreur technique imprévue');
        }
    }
}

export const searchPlayers = async (playerName) => {
    try {
        const response = await http.get(`${backendUrl}/players/findByNameStartsWith?playerName=${playerName}`);
        return response.data;
    } catch (error) {
        if (!error.response) {
            throw new Error('Impossible de se connecter au serveur');
        }

        switch (error.response.status) {
            default:
            case 404:
                throw new Error('Erreur technique imprévue');
        }
    }
}