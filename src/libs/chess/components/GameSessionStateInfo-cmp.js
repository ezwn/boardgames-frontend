import React, { useContext } from "react";

import { ChessSessionContext } from "../contexts/ChessSession-ctx";
import { Localized } from "libs/ezwn-i18n";
import { infoBarHeight } from "libs/ezwn-mobile-webui/AppLayout-ctx";

import "./GameSessionStateInfo-cmp.css";
import { GameSessionStatus } from "libs/gameSession/contexts/GameSession-ctx";

export const GameSessionStateInfo = () => {
  const { myTurn, lastMove, deleteInvalidMoves, status } = useContext(
    ChessSessionContext
  );

  return (
    <div className="InfoBar GameSessionStateInfo">
      {(status === GameSessionStatus.FINISHED) ? (<div className="info notYourTurn" style={{ lineHeight: `${infoBarHeight}px` }}>
        <Localized lang="fr">
          La partie est terminée
          </Localized>
        <Localized lang="tw">還沒輪到我玩</Localized>
      </div>) :
        myTurn ? (
          lastMove && lastMove.canceled ? (
            <div className="info canceledMove" onClick={deleteInvalidMoves} style={{ lineHeight: `${infoBarHeight}px` }}>
              <Localized lang="fr">
                Mon dernier mouvement a été annulé !
            </Localized>
              <Localized lang="tw">我的最後一個棋子移動被取消了！</Localized>
            </div>
          ) : (
              <div className="info yourTurn" style={{ lineHeight: `${infoBarHeight}px` }}>
                <Localized lang="fr">C'est à moi de jouer</Localized>
                <Localized lang="tw">輪到我玩</Localized>
              </div>
            )
        ) : (
            <div className="info notYourTurn" style={{ lineHeight: `${infoBarHeight}px` }}>
              <Localized lang="fr">
                Ce n'est <b>pas</b> mon tour
          </Localized>
              <Localized lang="tw">還沒輪到我玩</Localized>
            </div>
          )}
    </div>
  );
};
