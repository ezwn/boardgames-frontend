import React, { useState, useContext, useEffect } from "react";
import { GameSessionContext } from "libs/gameSession/contexts/GameSession-ctx";
import { isValidMove, getColor } from "./ChessEngine";
import { CurrentPlayerContext } from "libs/player/contexts/CurrentPlayer-ctx";
import { EndGameSessionModal } from "../components/EndGameSessionModal-cmp";
import { ModalOutputContext } from "libs/ezwn-mobile-ui/ModalOutput-cmp";
import { computeWorkState } from "./ChessSession-sml";

export const ChessSessionContext = React.createContext(null);

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
    myTurn
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
