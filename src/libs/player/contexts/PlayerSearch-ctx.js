import React, { useContext } from "react";
import * as api from "../player-apic";
import { CurrentPlayerContext } from "./CurrentPlayer-ctx";

export const PlayerSearchContext = React.createContext(null);

export const PlayerSearchProvider = ({ children, exludeCurrentPlayer }) => {
  const { currentPlayer } = useContext(CurrentPlayerContext);
  const [searchResults, setSearchResults] = React.useState(null);

  const search = async playerName => {
    if (playerName.length > 1) {
      const players = await api.searchPlayers(playerName);
      setSearchResults(
        players.filter(
          p => !exludeCurrentPlayer || p.playerId !== currentPlayer.playerId
        )
      );
    } else {
      setSearchResults([]);
    }
  };

  return (
    <PlayerSearchContext.Provider value={{ searchResults, search }}>
      {children}
    </PlayerSearchContext.Provider>
  );
};
