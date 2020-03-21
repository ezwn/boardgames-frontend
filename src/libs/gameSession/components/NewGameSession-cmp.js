import React, { useContext } from "react";

import { AppView } from "libs/ezwn-mobile-webui/AppView-cmp";
import { ValidateButton } from "libs/ezwn-mobile-webui/buttons";
import { PlayerSelect } from "libs/player/components/PlayerSelect-cmp";
import { Localized } from "libs/ezwn-i18n";
import {
  NewGameSessionContext,
  NewGameSessionProvider
} from "libs/gameSession/contexts/NewGameSession-ctx";


import "./NewGameSession-cmp.css";


export const getTranslatedColorName = color => {
  switch (color) {
    case "WHITE":
      return (
        <>
          <Localized lang="fr">BLANCHE</Localized>
          <Localized lang="tw">白棋</Localized>
        </>
      );
    case "BLACK":
      return (
        <>
          <Localized lang="fr">NOIRE</Localized>
          <Localized lang="tw">黑棋</Localized>
        </>
      );
    default:
      return undefined;
  }
};

export const NewGameSessionView = props => (
  <NewGameSessionProvider>
    <NewGameSession {...props} />
  </NewGameSessionProvider>
);

export const NewGameSession = () => {
  const {
    createGameSession,
    myColor,
    setMyColor,
    setOpponent,
    newGameSessionIsValid
  } = useContext(NewGameSessionContext);

  const onColorRadioChange = event => setMyColor(event.target.value);

  return (
    <AppView
      title={
        <>
          <Localized lang="fr">Organiser une partie</Localized>
          <Localized lang="tw">加入棋盤</Localized>
        </>
      }
      bottomBarContent={
        <ValidateButton
          onClick={createGameSession}
          disabled={!newGameSessionIsValid}
        />
      }
    >
      <div className="CenterArea NewGameSession">
        <div className="form">
          <div className="field">
            <div className="label">
              <Localized lang="fr">Je joue la couleur</Localized>
              <Localized lang="tw">我選擇旗子的顏色</Localized>
            </div>
            <div className="input">
              <label>
                <input
                  type="radio"
                  value="WHITE"
                  checked={myColor === "WHITE"}
                  onChange={onColorRadioChange}
                />
                {getTranslatedColorName("WHITE")}
              </label>
              &nbsp;&nbsp;&nbsp;
              <label>
                <input
                  type="radio"
                  value="BLACK"
                  checked={myColor === "BLACK"}
                  onChange={onColorRadioChange}
                />
                {getTranslatedColorName("BLACK")}
              </label>
            </div>
          </div>
          <div className="field">
            <div className="label">
              <Localized lang="fr">Contre</Localized>
              <Localized lang="tw">另一方玩家</Localized>
            </div>
            <div className="input">
              <PlayerSelect
                onPlayerChange={setOpponent}
                exludeCurrentPlayer={true}
              />
            </div>
          </div>
        </div>
      </div>
    </AppView>
  );
};
