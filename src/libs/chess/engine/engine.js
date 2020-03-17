import { isWhiteAt, isBlackAt, squarePut, squareGet, isEmptyAt, isKingAt } from "./board";

const initialState = () => ({
  player: "WHITE",
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
    white: "",
    black: ""
  }
});

export const computeState = (moves, state = initialState()) => {
  moves.forEach(move => {
    const { from, to } = move;
    if (from && to && !move.canceled) {
      let { board } = state;

      const toPiece = squareGet(board, to);

      if (isWhiteAt(board, to)) state.jail.white += toPiece;
      else if (isBlackAt(board, to)) state.jail.black += toPiece;

      board = squarePut(
        board,
        to,
        squareGet(board, from)
      );

      board = squarePut(board, from, " ");

      if (isKingAt(board, to) && from.c===4) {
        if (to.c === from.c - 2) {
          const tower = squareGet(board, { ...from, c: 0 });
          board = squarePut(board, { ...from, c: 3 }, tower);
          board = squarePut(board, { ...from, c: 0 }, " ");
        } else if (to.c === from.c + 2) {
          const tower = squareGet(board, { ...from, c: 7 });
          board = squarePut(board, { ...from, c: 5 }, tower);
          board = squarePut(board, { ...from, c: 7 }, " ");
        }
      }

      state.board = board;
      state.player = state.player === "WHITE" ? "BLACK" : "WHITE";
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
