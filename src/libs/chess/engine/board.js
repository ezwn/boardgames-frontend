import { isBlack, isWhite, isEmpty, isKing } from "./pieces";

export const squarePut = (board, loc, piece) => {
    const { c, l } = loc;
    const oldLine = board[l];
    board[l] = oldLine.substring(0, c) + piece + oldLine.substring(c + 1);
    return board;
};

export const squareGet = (board, loc) => {
    const { c, l } = loc;
    return board[l].charAt(c);
};

const boardTest = (pieceTest) => (board, loc) => {
    return pieceTest(squareGet(board, loc));
}

export const isBlackAt = boardTest(isBlack);
export const isWhiteAt = boardTest(isWhite);
export const isEmptyAt = boardTest(isEmpty);
export const isKingAt = boardTest(isKing);