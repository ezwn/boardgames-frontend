import React, { useState, useContext } from "react";
import { GameSessionContext } from "libs/gameSession/contexts/GameSession-ctx";
import { computeState, isValidMove, getColor } from "./ChessEngine";
import { CurrentPlayerContext } from "libs/player/contexts/CurrentPlayer-ctx";
import { EndGameSessionModal } from "../components/EndGameSessionModal-cmp";
import { ModalOutputContext } from "libs/ezwn-mobile-ui/ModalOutput-cmp";

export const ChessSessionContext = React.createContext(null);

const initialState = JSON.stringify({
  moves: []
});

export const ChessSessionProvider = ({ children }) => {
  const { gameSession, deleteGameSession, patchGameSessionState } = useContext(
    GameSessionContext
  );

  const { setModal } = useContext(ModalOutputContext);

  const { currentPlayer } = useContext(CurrentPlayerContext);

  const [cancelGameSessionRequested, setCancelGameSessionRequested] = useState(
    false
  );

  const [nextMove, setNextMove] = useState({
    from: null,
    to: null
  });

  const mePlaying = gameSession.playings.find(
    p => p.player.playerId === currentPlayer.playerId
  );

  const himPlaying = gameSession.playings.find(
    p => p.player.playerId !== currentPlayer.playerId
  );

  const myRole = mePlaying.role;

  const persistantState = JSON.parse(gameSession.state || initialState);

  const { moves } = persistantState;

  const computedState = computeState(moves);

  const myTurn = computedState.player === myRole;

  const lastMove =
    moves && moves.length > 0 ? moves[moves.length - 1] : undefined;

  const deleteInvalidMoves = async () => {
    if (lastMove) {
      if (lastMove.canceled) {
        await patchGameSessionState(
          JSON.stringify({
            ...persistantState,
            moves: moves.filter(move => !move.canceled)
          }),
          mePlaying.player.playerId
        );
      }
    }
  };

  const squareTouch = async (c, l, piece) => {
    if (!myTurn || (lastMove && lastMove.canceled)) {
      return;
    }

    if (!nextMove.from) {
      if (getColor(piece) !== computedState.player) {
        return;
      }

      setNextMove({
        ...nextMove,
        from: { c, l, piece }
      });
    } else if (!nextMove.to) {
      setNextMove({
        ...nextMove,
        to: { c, l, piece }
      });
    }
  };

  const invalidateMove = async () => {
    if (!myTurn) {
      return;
    }

    if (lastMove) {
      patchGameSessionState(
        JSON.stringify({
          ...persistantState,
          moves: moves.map((move, i) =>
            i === moves.length - 1 ? { ...move, canceled: true } : move
          )
        }),
        himPlaying.player.playerId
      );
    }
  };

  const doNotCancelGameSession = () => {
    setModal(null);
    setCancelGameSessionRequested(false);
  };

  const confirmCancelGameSession = () => {
    setModal(null);
    deleteGameSession(gameSession.gameSessionId);
  };

  const cancelGameSession = () => {
    setModal(<EndGameSessionModal confirmCancelGameSession={confirmCancelGameSession} doNotCancelGameSession={doNotCancelGameSession} />);
  };

  if (nextMove.from && nextMove.to) {
    if (isValidMove(computedState, nextMove)) {
      patchGameSessionState(
        JSON.stringify({
          ...persistantState,
          moves: [...moves, nextMove]
        }),
        himPlaying.player.playerId
      );
    }
    setNextMove({
      from: undefined,
      to: undefined
    });
  }

  return gameSession ? (
    <ChessSessionContext.Provider
      value={{
        squareTouch,
        myRole,
        myTurn,
        computedState,
        invalidateMove,
        cancelGameSession,
        doNotCancelGameSession,
        cancelGameSessionRequested,
        confirmCancelGameSession,
        nextMove,
        deleteInvalidMoves,
        lastMove
      }}
    >
      {children}
    </ChessSessionContext.Provider>
  ) : (
    <div />
  );
};
