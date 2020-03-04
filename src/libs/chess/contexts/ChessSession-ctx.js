import React, { useState, useContext } from "react";
import { GameSessionContext } from "libs/gameSession/contexts/GameSession-ctx";
import { computeState, isValidMove, getColor } from "./ChessEngine";
import { CurrentPlayerContext } from "libs/player/contexts/CurrentPlayer-ctx";

export const ChessSessionContext = React.createContext(null);

const initialState = JSON.stringify({
  moves: []
});

export const ChessSessionProvider = ({ children }) => {
  const { gameSession, saveGameSession, deleteGameSession, patchGameSessionState } = useContext(
    GameSessionContext
  );
  const { currentPlayer } = useContext(CurrentPlayerContext);

  const [cancelGameSessionRequested, setCancelGameSessionRequested] = useState(
    false
  );

  const [nextMove, setNextMove] = useState({
    from: null,
    to: null
  });

  const me = gameSession.playings.find(
    p => p.player.playerId === currentPlayer.playerId
  );

  const him = gameSession.playings.find(
    p => p.player.playerId !== currentPlayer.playerId
  );

  const myRole = me.role;

  const persistantState = JSON.parse(gameSession.state || initialState);

  const { moves } = persistantState;

  const computedState = computeState(moves);

  const myTurn = computedState.player === myRole;

  const lastMove =
    moves && moves.length > 0 ? moves[moves.length - 1] : undefined;

  const deleteInvalidMoves = async () => {
    if (lastMove) {
      if (lastMove.canceled) {
        await saveGameSession({
          ...gameSession,
          state: JSON.stringify({
            ...persistantState,
            moves: moves.filter(move => !move.canceled)
          })
        });
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
      saveGameSession({
        ...gameSession,
        state: JSON.stringify({
          ...persistantState,
          moves: moves.map((move, i) =>
            i === moves.length - 1 ? { ...move, canceled: true } : move
          )
        })
      });
    }
  };

  const cancelGameSession = () => {
    setCancelGameSessionRequested(true);
  };

  const doNotCancelGameSession = () => {
    setCancelGameSessionRequested(false);
  };

  const confirmCancelGameSession = () => {
    deleteGameSession(gameSession.gameSessionId);
  };

  if (nextMove.from && nextMove.to) {
    if (isValidMove(computedState, nextMove)) {
      patchGameSessionState(
        JSON.stringify({
          ...persistantState,
          moves: [...moves, nextMove]
        }),
        him.playerId
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
