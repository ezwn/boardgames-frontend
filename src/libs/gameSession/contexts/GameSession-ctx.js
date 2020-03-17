import React from "react";
import { useHistory } from "react-router";

import * as api from "libs/gameSession/gameSession-apic";

const refreshDuration = parseInt(process.env.REACT_APP_REFRESH_DURATION);

export const GameSessionStatus = {
	RUNNING: 'RUNNING',
	FINISHED: 'FINISHED'
}

export const GameSessionContext = React.createContext(null);

export const GameSessionProvider = ({ children, gameSessionId }) => {
  const [gameSession, setGameSession] = React.useState(null);
  const history = useHistory();

  React.useEffect(() => {
    function fetchGameSession() {
      api
        .fetchGameSession(gameSessionId)
        .then(newGs => {
          setGameSession(newGs);
        })
        .catch(() => {
          history.push(`/`);
        });
    }

    const inteval = setInterval(fetchGameSession, refreshDuration);
    fetchGameSession();

    return () => {
      clearInterval(inteval);
    };
  }, [gameSessionId, history]);

  const saveGameSession = async newGs => {
    await api.saveGameSession(newGs);
    setGameSession(newGs);
  };

  const patchGameSessionState = async (gsState, nextPlayerToPlay) => {
    await api.patchGameSessionState(gameSessionId, gsState, nextPlayerToPlay);
    setGameSession({
      ...gameSession,
      state: gsState
    });
  };

  const finishGameSession = async (gameSession, gameSessionResult) => {
    console.log(gameSession, gameSessionResult);
    await api.finishGameSession(gameSession.gameSessionId, gameSessionResult);
    // history.push(`/`);
  };

  return gameSession ? (
    <GameSessionContext.Provider
      value={{ gameSession, saveGameSession, finishGameSession, patchGameSessionState }}
    >
      {children}
    </GameSessionContext.Provider>
  ) : (
    <div />
  );
};
