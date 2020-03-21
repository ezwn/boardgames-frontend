import React, { useState, useContext, useEffect } from "react";
import { GameSessionContext, GameSessionStatus } from "libs/gameSession/contexts/GameSession-ctx";
import { isValidMove } from "../engine/engine";
import { CurrentPlayerContext } from "libs/player/contexts/CurrentPlayer-ctx";
import { EndGameSessionModal } from "../components/EndGameSessionModal-cmp";
import { ModalOutputContext } from "libs/ezwn-mobile-webui/ModalOutput-cmp";
import { computeWorkState } from "./ChessSession-sml";
import { getColor } from "../engine/pieces";
import { squareGet } from "../engine/board";

export const GameSessionResult = {
  VICTORY: 'VICTORY',
  DEFEAT: 'DEFEAT',
  DRAW: 'DRAW'
};

export const ChessSessionContext = React.createContext(null);

export const ChessSessionProvider = ({ children }) => {
  const { gameSession, finishGameSession, patchGameSessionState } = useContext(
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

  const [workState, setWorkState] = useState({
    persistantState: null,
    moves: [],
    computedState: null,
    mePlaying: null,
    himPlaying: null,
    myRole: null
  });

  const { playerId } = currentPlayer;

  useEffect(() => {
    setWorkState(computeWorkState(playerId, gameSession));
  }, [playerId, gameSession]);

  const {
    persistantState,
    computedState,
    moves,
    lastMove,
    mePlaying,
    himPlaying,
    myRole,
    myTurn,
    status
  } = workState;

  const hisPlayerId = himPlaying && himPlaying.player.playerId;

  useEffect(() => {
    if (nextMove.from && nextMove.to) {
      if (isValidMove(computedState, nextMove)) {
        patchGameSessionState(
          JSON.stringify({
            ...persistantState,
            moves: [...moves, nextMove]
          }),
          hisPlayerId
        );
      }
      setNextMove({
        from: undefined,
        to: undefined
      });
    }
  }, [computedState, nextMove, hisPlayerId, moves, patchGameSessionState, persistantState]);

  if (!computedState)
    return <div />

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

  const squareTouch = async (c, l) => {
    if (!myTurn || status===GameSessionStatus.FINISHED) {
      return;
    }

    if (lastMove && lastMove.canceled) {
      await deleteInvalidMoves();
      return;
    }

    if (!nextMove.from) {

      const piece = squareGet(computedState.board, {c, l});
      if (getColor(piece) !== computedState.player) {
        return;
      }

      setNextMove({
        ...nextMove,
        from: { c, l }
      });
    } else if (!nextMove.to) {
      setNextMove({
        ...nextMove,
        to: { c, l }
      });
    }
  };

  const invalidateMove = async () => {
    if (!myTurn || status===GameSessionStatus.FINISHED) {
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

  const confirmCancelGameSession = (gameSessionResult) => {
    setModal(null);
    finishGameSession(gameSession, gameSessionResult);
  };

  const cancelGameSession = () => {
    setModal(
      <EndGameSessionModal
        confirmCancelGameSession={confirmCancelGameSession}
        doNotCancelGameSession={doNotCancelGameSession}
      />
    );
  };

  return gameSession ? (
    <ChessSessionContext.Provider
      value={{
        squareTouch,
        myRole,
        myTurn,
        status,
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
