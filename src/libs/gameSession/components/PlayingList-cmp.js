import React, { useContext } from "react";

import "./PlayingList-cmp.css";
import { CurrentPlayerContext } from "libs/player/contexts/CurrentPlayer-ctx";
import { ColorIndicator } from "libs/chess/components/ColorIndicator-cmp";

export const PlayingList = ({ playings }) => {
  const { currentPlayer } = useContext(CurrentPlayerContext);

  const isMine = playing => playing.player.playerId === currentPlayer.playerId
  const isNotMine = playing => playing.player.playerId !== currentPlayer.playerId

  return (
    <div className="PlayingList">
      {playings
        .filter(isNotMine)
        .map(playing => (
          <Playing key={playing.playingId} {...playing} />
        ))}
      {playings
        .filter(isMine)
        .map(playing => (
          <Playing key={playing.playingId} {...playing} />
        ))}
    </div>
  );
};

const Playing = ({ player, role }) => {
  const { currentPlayer } = useContext(CurrentPlayerContext);
  return <>
    {player.name}
    &nbsp;
    <ColorIndicator color={role} />
    &nbsp;&nbsp;&nbsp;
  </>;
};
