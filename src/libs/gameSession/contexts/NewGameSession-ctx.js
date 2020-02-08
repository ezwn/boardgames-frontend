import React from "react";
import { useHistory } from "react-router";

import * as api from "libs/gameSession/gameSession-apic";
import { CurrentPlayerContext } from "libs/player/contexts/CurrentPlayer-ctx";
import { useContext } from "react";

export const NewGameSessionContext = React.createContext(null);

export const NewGameSessionProvider = ({ children }) => {
  const { currentPlayer } = useContext(CurrentPlayerContext);

  const history = useHistory();

  const [myColor, setMyColor] = React.useState("WHITE");
  const [opponent, setOpponent] = React.useState(null);

  const newGameSessionIsValid = opponent && myColor;

  const createGameSession = async () => {
    if (!newGameSessionIsValid) return;

    const gameSession = {
      playings: [
        { role: myColor, player: { playerId: currentPlayer.playerId } },
        {
          role: myColor === "WHITE" ? "BLACK" : "WHITE",
          player: { playerId: opponent.playerId }
        }
      ]
    };

    const savedGameSession = await api.saveGameSession(gameSession);
    history.push(`/`);
    history.push(`/ChessboardView/${savedGameSession.gameSessionId}`);
  };

  return (
    <NewGameSessionContext.Provider
      value={{
        createGameSession,
        myColor,
        setMyColor,
        opponent,
        setOpponent,
        newGameSessionIsValid
      }}
    >
      {children}
    </NewGameSessionContext.Provider>
  );
};
