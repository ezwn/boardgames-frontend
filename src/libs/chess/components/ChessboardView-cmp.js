import React, { useContext } from "react";

import {
  GameSessionProvider,
  GameSessionContext
} from "libs/gameSession/contexts/GameSession-ctx";
import { AppView } from "libs/ezwn-mobile-ui/AppView-cmp";
import { useParams } from "react-router";
import { PlayingList } from "libs/gameSession/components/PlayingList-cmp";
import { ChessSessionProvider } from "../contexts/ChessSession-ctx";
import { UndoButton, StopButton } from "libs/ezwn-mobile-ui/buttons";
import { GameSessionStateInfo } from "./GameSessionStateInfo-cmp";
import { ChessboardJail } from "./ChessboardJail-cmp";
import { ChessSessionContext } from "../contexts/ChessSession-ctx";
import { ChessboardMainArea } from "./ChessboardMainArea-cmp";
import { MyColorIndicator } from "./MyColorIndicator-cmp";

import "./ChessboardView-cmp.css";

export const ChessboardView = props => {
  let { gameSessionId } = useParams();

  return (
    <GameSessionProvider gameSessionId={gameSessionId}>
      <ChessSessionProvider>
        <ChessboardViewDumb {...props} gameSessionId={gameSessionId} />
      </ChessSessionProvider>
    </GameSessionProvider>
  );
};

const ChessboardViewDumb = () => {
  const { myTurn, invalidateMove, lastMove, cancelGameSession } = useContext(ChessSessionContext);
  const { gameSession } = useContext(GameSessionContext);

  return (
    <AppView
      title={<PlayingList playings={gameSession.playings} />}
      bottomBarContent={
        <>
          <UndoButton
            onClick={invalidateMove}
            disabled={!myTurn || !lastMove || lastMove.canceled}
          />
          <StopButton onClick={cancelGameSession} />
        </>
      }
      titleRightButtonArea={<MyColorIndicator />}
    >
      <div className="CenterArea ChessboardCenterArea">
        <GameSessionStateInfo />
        <ChessboardJail color="white" />
        <ChessboardMainArea />
        <ChessboardJail color="black" />
      </div>
    </AppView>
  );
};
