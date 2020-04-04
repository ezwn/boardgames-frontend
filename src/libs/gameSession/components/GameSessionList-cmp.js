import React, { useContext } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { CreateButton } from "libs/ezwn-mobile-webui/buttons";
import { CurrentPlayerContext } from "libs/player/contexts/CurrentPlayer-ctx";
import {
  MyGameSessionsProvider,
  MyGameSessionsContext
} from "libs/gameSession/contexts/MyGameSessions-ctx";
import { Localized } from "libs/ezwn-i18n";

import "./GameSessionList-cmp.css";
import { AppView } from "libs/ezwn-mobile-webui/AppView-cmp";
import { PlayingList } from "./PlayingList-cmp";

export const GameSessionListView = () => {
  const { currentPlayer } = useContext(CurrentPlayerContext);

  const history = useHistory();

  const createGameSession = () => {
    history.push("/NewGameSessionView");
  };

  return (
    <AppView
      titleLeftButton={<></>}
      className="GameSessionListView"
      bottomBarContent={<CreateButton onClick={createGameSession} />}
      title={
        <>
          <Localized lang="fr">Mes parties en cours</Localized>
          <Localized lang="tw">進行中的棋盤</Localized>
        </>
      }
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
    <div className="CenterArea GameSessionList" role='list'>
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
  const { currentPlayer } = useContext(CurrentPlayerContext);

  const { updatedOn, gameSessionId, playings } = gameSession;

  const mePlaying = playings.find(
    playing => playing.player.playerId === currentPlayer.playerId
  );

  const myTurn = mePlaying.nextToPlay;

  return (
      <Link role='list' to={`/ChessboardView/${gameSessionId}`}
        className={`notALink GameSessionListItem${myTurn ? " myTurn" : ""}`}>
        <div className='icon'>
          &nbsp;
        </div>
        <div className='left'>
          <PlayingList playings={playings} />
          <div className="GameSessionLabel">{
            new Date(updatedOn).toLocaleString('fr-FR')
          }</div>
        </div>
      </Link>
  );
};
