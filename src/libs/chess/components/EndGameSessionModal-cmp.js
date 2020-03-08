import React from "react";

import { ValidateButton, CancelButton } from "libs/ezwn-mobile-ui/buttons";
import { SecondaryButtonBar } from "libs/ezwn-mobile-ui/ViewButtonBar-cmp";
import { Localized } from "libs/ezwn-i18n";

import "./EndGameSessionModal-cmp.css";

export const EndGameSessionModal = ({ confirmCancelGameSession, doNotCancelGameSession }) => {
  return (
    <div className="Modal EndGameSessionModal">
      <div className='message'>
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
