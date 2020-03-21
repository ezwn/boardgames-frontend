import React, { useEffect } from "react";
import * as api from "../player-apic";
import { AppView } from "libs/ezwn-mobile-webui/AppView-cmp";
import urlSearchParams from "libs/url-search-params";

export const CurrentPlayerContext = React.createContext(null);

export const DefaultUnloggedComponent = () => (
  <AppView title={"Vous n'êtes pas inscrit"} titleLeftButton={<></>}>
    Pour accéder à cette version du jeu :
    <ul>
      <li>
        Si vous n'êtes pas inscrit, écrivez à nicolas.enzweiler(at)gmail.com.
      </li>
      <li>
        Si vous êtes inscrit, utilisez le lien qui vous a été envoyé par email.
      </li>
    </ul>
  </AppView>
);

export const CurrentPlayerProvider = ({ children }) => {
  const [currentPlayer, setCurrentPlayer] = React.useState(null);

  const login = async (playerId, password) => {
    try {
      const player = await api.login(playerId, password);
      setCurrentPlayer(player);
    } catch (error) {}
  };

  useEffect(() => {
    if (!currentPlayer) {
      const playerName = urlSearchParams.get("playerName");
      const playerPassword = urlSearchParams.get("playerPassword");
      if (playerName && playerPassword) {
        login(playerName, playerPassword);
      }
    }
  }, [currentPlayer]);

  if (!currentPlayer) {
    return <DefaultUnloggedComponent />;
  }

  return (
    <CurrentPlayerContext.Provider value={{ currentPlayer }}>
      {children}
    </CurrentPlayerContext.Provider>
  );
};
