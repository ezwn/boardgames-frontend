import React from "react";

import { TextButton } from "libs/ezwn-mobile-ui/buttons";
import { TextButtonBar } from "libs/ezwn-mobile-ui/ViewButtonBar-cmp";
import { Localized } from "libs/ezwn-i18n";

import "./EndGameSessionModal-cmp.css";
import { GameSessionResult } from "../contexts/ChessSession-ctx";
import { useState } from "react";

export const EndGameSessionModal = ({ confirmCancelGameSession, doNotCancelGameSession }) => {

  const [gameSessionResult, setGameSessionResult] = useState(0);

  return (
    <div className="Modal EndGameSessionModal">
      <div className='message'>
        <Localized lang="fr">Arrêter cette partie ?</Localized>
        <Localized lang="tw">你想要結束遊戲嗎？</Localized>
      </div>
      <div className='gameResult'>
        <label>
          <input
            type="radio"
            checked={gameSessionResult === GameSessionResult.VICTORY}
            onChange={() => setGameSessionResult(GameSessionResult.VICTORY)}
          />
          <div className="label">
            <Localized lang="fr">J'ai gagné</Localized>
            <Localized lang="tw">I won</Localized>
          </div>
        </label>
        <label>
          <input
            type="radio"
            checked={gameSessionResult === GameSessionResult.DEFEAT}
            onChange={() => setGameSessionResult(GameSessionResult.DEFEAT)}
          />
          <div className="label">
            <Localized lang="fr">J'ai perdu</Localized>
            <Localized lang="tw">I won</Localized>
          </div>
        </label>
        <label>
          <input
            type="radio"
            checked={gameSessionResult === GameSessionResult.DRAW}
            onChange={() => setGameSessionResult(GameSessionResult.DRAW)}
          />
          <div className="label">
            <Localized lang="fr">Match nul</Localized>
            <Localized lang="tw">I won</Localized>
          </div>
        </label>
      </div>
      <TextButtonBar>
        <TextButton onClick={doNotCancelGameSession}>ANNULER</TextButton>
        <TextButton onClick={() => confirmCancelGameSession(gameSessionResult)} disabled={!gameSessionResult}>ARRÊTER</TextButton>
      </TextButtonBar>
    </div>
  );
};
