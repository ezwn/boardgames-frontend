import React, { useEffect } from "react";
import * as api from "../player-apic";

export const CurrentPlayerContext = React.createContext(null);

export const DefaultUnloggedComponent = () => (
  <div>
    Pour accéder à cette version du jeu :
    <ul>
      <li>
        Si vous n'êtes pas inscrit, écrivez à nicolas.enzweiler(at)gmail.com.
      </li>
      <li>
        Si vous êtes inscrit, utilisez le lien qui vous a été envoyé par email.
      </li>
    </ul>
  </div>
);

export const CurrentPlayerProvider = ({ children }) => {
  const [currentPlayer, setCurrentPlayer] = React.useState(null);

  const login = async (playerId, password) => {
    try {
      const player = await api.login(playerId, password);
      setCurrentPlayer(player);
    } catch (error) { }
  };

  const { search } = window.location;

  useEffect(() => {
    if (!currentPlayer) {
      var urlParams = new URLSearchParams(search);
      const playerName = urlParams.get("playerName");
      const playerPassword = urlParams.get("playerPassword");

      if (playerName && playerPassword) {
        login(playerName, playerPassword);
      }
    }
  }, [currentPlayer, search]);

  if (!currentPlayer) {
    return <DefaultUnloggedComponent />;
  }

  return (
    <CurrentPlayerContext.Provider value={{ currentPlayer }}>
      {children}
    </CurrentPlayerContext.Provider>
  );
};
