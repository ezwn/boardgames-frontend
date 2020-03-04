import React, { useContext } from "react";

import "./PlayingList-cmp.css";
import { CurrentPlayerContext } from "libs/player/contexts/CurrentPlayer-ctx";

export const PlayingList = ({ playings }) => {
  const { currentPlayer } = useContext(CurrentPlayerContext);

  return (
    <div className="PlayingList">
      {playings
        .filter(playing => playing.player.playerId !== currentPlayer.playerId)
        .map(playing => (
          <Playing key={playing.playingId} {...playing} />
        ))}
    </div>
  );
};

export const Playing = ({ player }) => {
  const { currentPlayer } = useContext(CurrentPlayerContext);
  const isMe = currentPlayer.playerId === player.playerId;
  return <>{isMe ? <>moi</>: player.name}</>;
};
