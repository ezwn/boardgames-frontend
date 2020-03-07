import React from "react";
import { useHistory } from "react-router";

import * as api from "libs/gameSession/gameSession-apic";

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

    const inteval = setInterval(fetchGameSession, 1000);
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
    console.log(nextPlayerToPlay);

    await api.patchGameSessionState(gameSessionId, gsState, nextPlayerToPlay);
    setGameSession({
      ...gameSession,
      state: gsState
    });
  };

  const deleteGameSession = async gameSessionId => {
    await api.deleteGameSession(gameSessionId);
    history.push(`/`);
  };

  return gameSession ? (
    <GameSessionContext.Provider
      value={{ gameSession, saveGameSession, deleteGameSession, patchGameSessionState }}
    >
      {children}
    </GameSessionContext.Provider>
  ) : (
    <div />
  );
};
