import { computeState } from "./ChessEngine";

const defaultPersistantState = JSON.stringify({
  moves: []
});

export const computeWorkState = (currentPlayerId, gameSession) => {
  const mePlaying = gameSession.playings.find(
    p => p.player.playerId === currentPlayerId
  );

  const himPlaying = gameSession.playings.find(
    p => p.player.playerId !== currentPlayerId
  );

  const myRole = mePlaying.role;

  const persistantState = JSON.parse(
    gameSession.state || defaultPersistantState
  );
  const { moves } = persistantState;
  const computedState = computeState(moves);

  const myTurn = computedState.player === myRole;

  return {
    persistantState,
    moves,
    computedState,
    lastMove: moves && moves.length > 0 ? moves[moves.length - 1] : undefined,
    mePlaying,
    himPlaying,
    myRole,
    myTurn
  };
};
