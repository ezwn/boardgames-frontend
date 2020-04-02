import { http } from "core/http";
import { replacePlayerName } from "core/Settings";

const [playerIdStr, playerName] = replacePlayerName ? replacePlayerName.split('_') : [undefined, undefined];
const playerId = playerIdStr ? parseInt(playerIdStr) : undefined;

const replaceNameInGameSession = gameSession => ({
  ...gameSession,
  playings: gameSession.playings.map(playing => ({
    ...playing,
    player: {
      ...playing.player,
      name: playing.player.playerId === playerId ? playerName : playing.player.name
    }
  }))
})

export const fetchGameSessions = async () => {
  const response = await http.get(
    `/gameSessions/mine`
  );
  const { data } = response;
  const gameSessions = data.map(replaceNameInGameSession);
  return gameSessions;
};

export const fetchGameSession = async gameSessionId => {
  const response = await http.get(
    `/gameSessions/${gameSessionId}`
  );
  return replaceNameInGameSession(response.data);
};

export const finishGameSession = async (gameSessionId, gameSessionResult) => {
  const response = await http.post(
    `/gameSessions/${gameSessionId}/finish/${gameSessionResult}`
  );
  return response.data;
};

export const saveGameSession = async gameSession => {
  const response = await http.post(`/gameSessions`, gameSession);
  return response.data;
};

export const patchGameSessionState = async (gameSessionId, state, nextPlayerToPlay) => {
  await http.post(`/gameSessions/${gameSessionId}`, {
    state,
    nextPlayerToPlay
  });
};
