import React from "react";

import { PlayerSearchProvider, PlayerSearchContext} from "libs/player/contexts/PlayerSearch-ctx";

import "./PlayerSelect-cmp.css";

const PlayerSelectDumb = ({ onPlayerChange }) => {
  const { search, searchResults } = React.useContext(PlayerSearchContext);
  const [rawString, setRawString] = React.useState("");

  const onTextInputChange = event => {
    const playerName = event.target.value;
    search(playerName);
    setRawString(playerName);
  };

  const player =
    searchResults && searchResults.find(result => result.name === rawString);
  onPlayerChange(player);

  return (
    <>
      <input type="text" onChange={onTextInputChange} value={rawString} />
      <div className="playerCandidateList">
        {!player &&
          searchResults &&
          searchResults.map(result => (
            <div
              className="playerCandidate"
              key={result.playerId}
              onClick={() => setRawString(result.name)}
            >
              {result.name}
            </div>
          ))}
      </div>
    </>
  );
};

export const PlayerSelect = props => (
  <PlayerSearchProvider exludeCurrentPlayer={props.exludeCurrentPlayer}>
    <PlayerSelectDumb {...props} />
  </PlayerSearchProvider>
);
