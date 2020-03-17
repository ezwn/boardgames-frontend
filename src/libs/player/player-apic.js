import { http } from "core/http";

export const login = async () => {
    
    try {

        const response = await http.get(
            `/players/me`
        );
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
        const response = await http.get(`/players/findByNameStartsWith?playerName=${playerName}`);
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