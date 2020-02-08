import React, { useContext } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { CreateButton } from "libs/ezwn-mobile-ui/buttons";
import { CurrentPlayerContext } from "libs/player/contexts/CurrentPlayer-ctx";
import {
  MyGameSessionsProvider,
  MyGameSessionsContext
} from "libs/gameSession/contexts/MyGameSessions-ctx";
import { Localized, LanguageSelector } from "libs/ezwn-i18n";

import "./GameSessionList-cmp.css";
import { AppView } from "libs/ezwn-mobile-ui/AppView-cmp";

export const GameSessionListView = () => {
  const { currentPlayer } = useContext(CurrentPlayerContext);

  const history = useHistory();

  const createGameSession = () => {
    history.push("/NewGameSessionView");
  };

  return (
    <AppView
      className="GameSessionListView"
      bottomBarContent={<CreateButton onClick={createGameSession} />}
      title={
        <>
          <Localized lang="fr">Mes parties en cours</Localized>
          <Localized lang="tw">進行中的棋盤</Localized>
        </>
      }
      titleRightButtonArea={<LanguageSelector />}
    >
      <MyGameSessionsProvider
        playerId={currentPlayer && currentPlayer.playerId}
      >
        <GameSessionList />
      </MyGameSessionsProvider>
    </AppView>
  );
};

export const GameSessionList = () => {
  const { myGameSessions } = useContext(MyGameSessionsContext);
  return (
    <div className="CenterArea GameSessionList">
      {myGameSessions && myGameSessions.length ? (
        myGameSessions.map(gsData => (
          <GameSessionListItem
            key={gsData.gameSessionId}
            gameSession={gsData}
          />
        ))
      ) : (
        <div className="centeredMessage">
          <Localized lang="fr">Vous ne participez à aucune partie.</Localized>
          <Localized lang="tw">您沒有參與遊戲</Localized>
        </div>
      )}
    </div>
  );
};

export const GameSessionListItem = ({ gameSession }) => {
  const { label, gameSessionId } = gameSession;

  return (
    <div className="GameSessionListItem">
      <Link to={`/ChessboardView/${gameSessionId}`} className="notALink">
        <PlayerList gameSession={gameSession} />
        <div className="GameSessionLabel">{label}</div>
      </Link>
    </div>
  );
};

export const PlayerList = ({ gameSession }) => {
  const { currentPlayer } = useContext(CurrentPlayerContext);

  const { playings } = gameSession;
  return (
    <div className="PlayerList">
      {playings
        .filter(p => p.player.playerId !== currentPlayer.playerId)
        .map(p => p.player.name)
        .join(", ")}
    </div>
  );
};
