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
import { AppLayoutContext } from "libs/ezwn-mobile-ui/AppLayout-ctx";

import "./ChessboardView-cmp.css";

const chessboardViewPadding = 10;

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
  const { centerAreaWidth, centerAreaHeight } = useContext(AppLayoutContext);

  const availableWidth = centerAreaWidth - chessboardViewPadding * 2;
  const availableHeight = centerAreaHeight - chessboardViewPadding * 2;

  const verticalMode = availableWidth < availableHeight;

  const cbSize = verticalMode ?
    Math.min(
      availableWidth,
      availableHeight * (8 / 9)
    ) :
    Math.min(
      availableWidth * (8 / 9),
      availableHeight
    );

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
      infoBar={<GameSessionStateInfo />}
    >
      <div className={`CenterArea ChessboardCenterArea ${verticalMode ? 'vertical' : 'horizontal'}`}>
        <ChessboardJail color="white" cbSize={cbSize} verticalMode={verticalMode} />
        <ChessboardMainArea cbSize={cbSize} />
        <ChessboardJail color="black" cbSize={cbSize} verticalMode={verticalMode} />
      </div>
    </AppView>
  );
};
