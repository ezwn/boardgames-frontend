import { isWhiteAt, isBlackAt, isEmptyAt } from "./board";
import { findMoveHandler } from './moves';

export const PlayerColor = {
  WHITE: "WHITE",
  BLACK: "BLACK"
};

export const oppositePlayerColor = playerColor =>
  playerColor === PlayerColor.WHITE ? PlayerColor.BLACK : PlayerColor.WHITE

export const BoardType = {
  MAIN_BOARD: "MAIN_BOARD",
  WHITE_JAIL: "WHITE_JAIL",
  BLACK_JAIL: "BLACK_JAIL"
};

const initialState = () => ({
  player: PlayerColor.WHITE,
  board: [
    "tnbqkbnt",
    "pppppppp",
    "        ",
    "        ",
    "        ",
    "        ",
    "PPPPPPPP",
    "TNBQKBNT"
  ],
  jail: {
    [PlayerColor.WHITE]: "",
    [PlayerColor.BLACK]: ""
  },
  affectedSquares: []
});

export const computeState = (moves, state = initialState()) => {
  moves.forEach(move => {
    let { board } = state;
    const { from, to } = move;
    if (from && to) {
      const moveHandler = findMoveHandler(board, from, to);
      state.affectedSquares = moveHandler.affectedSquares(state, move);
      if (!move.canceled) {
        state = moveHandler.execute(state, move);
        state.player = oppositePlayerColor(state.player);
      }
    }
  });
  return state;
};

export const isValidMove = (state, move) => {
  const { board } = state;
  const { from, to } = move;

  if (isEmptyAt(board, from)) return false;

  if (isWhiteAt(board, from) && isWhiteAt(board, to)) return false;

  if (isBlackAt(board, from) && isBlackAt(board, to)) return false;

  switch (from.piece) {
    case "p":
      return to.l > from.l;
    case "P":
      return to.l < from.l;
    default:
  }

  return true;
};
