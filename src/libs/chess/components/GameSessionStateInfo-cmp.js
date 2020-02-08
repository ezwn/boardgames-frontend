import React, { useContext } from "react";

import { ChessSessionContext } from "../contexts/ChessSession-ctx";
import { ValidateButton, CancelButton } from "libs/ezwn-mobile-ui/buttons";
import { SecondaryButtonBar } from "libs/ezwn-mobile-ui/ViewButtonBar-cmp";
import { Localized } from "libs/ezwn-i18n";

import "./GameSessionStateInfo-cmp.css";

export const ConfirmGameSessionDelete = () => {
  const { confirmCancelGameSession, doNotCancelGameSession } = useContext(
    ChessSessionContext
  );

  return (
    <div className="GameSessionStateInfo">
      <div>
        <Localized lang="fr">Arrêter cette partie ? Vraiment ?</Localized>
        <Localized lang="tw">你想要結束遊戲嗎？</Localized>
      </div>
      <SecondaryButtonBar>
        <CancelButton onClick={doNotCancelGameSession} />
        <ValidateButton onClick={confirmCancelGameSession} />
      </SecondaryButtonBar>
    </div>
  );
};

export const GameSessionStateInfo = () => {
  const { cancelGameSessionRequested } = useContext(ChessSessionContext);

  return cancelGameSessionRequested ? (
    <ConfirmGameSessionDelete />
  ) : (
    <RunningGameSessionStateInfo />
  );
};

export const RunningGameSessionStateInfo = () => {
  const { myTurn, lastMove, deleteInvalidMoves } = useContext(
    ChessSessionContext
  );

  return (
    <div className="GameSessionStateInfo">
      {myTurn ? (
        lastMove && lastMove.canceled ? (
          <div className="info canceledMove" onClick={deleteInvalidMoves}>
            <Localized lang="fr">
              Mon dernier mouvement a été annulé !
            </Localized>
            <Localized lang="tw">我的最後一個棋子移動被取消了！</Localized>
          </div>
        ) : (
          <div className="info yourTurn">
            <Localized lang="fr">C'est à moi de jouer</Localized>
            <Localized lang="tw">輪到我玩</Localized>
          </div>
        )
      ) : (
        <div className="info notYourTurn">
          <Localized lang="fr">
            Ce n'est <b>pas</b> mon tour
          </Localized>
          <Localized lang="tw">還沒輪到我玩</Localized>
        </div>
      )}
    </div>
  );
};
