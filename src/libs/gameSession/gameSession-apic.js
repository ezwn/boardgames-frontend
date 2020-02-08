import http from 'axios';

const backendUrl = process.env.REACT_APP_BGF_BACKEND;

export const fetchGameSessions = async (playerId) => {
    const response = await http.get(`${backendUrl}/gameSessions/byPlayerId/${playerId}`);
    return response.data;
};

export const fetchGameSession = async (gameSessionId) => {
    const response = await http.get(`${backendUrl}/gameSessions/${gameSessionId}`);
    return response.data;
};

export const deleteGameSession = async (gameSessionId) => {
    const response = await http.delete(`${backendUrl}/gameSessions/${gameSessionId}`);
    return response.data;
};

export const saveGameSession = async (gameSession) => {
    const response = await http.post(`${backendUrl}/gameSessions`, gameSession);
    return response.data;
};
