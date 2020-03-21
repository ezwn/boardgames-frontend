import { isWhiteAt, isBlackAt, squarePut, squareGet, isEmptyAt, isKingAt } from "./board";
import { BoardType, PlayerColor } from "./engine";

export const commonMove = {

    execute: (state, move) => {
        const { from, to } = move;
        let { board } = state;

        const toPiece = squareGet(board, to);

        if (isWhiteAt(board, to)) state.jail[PlayerColor.WHITE] += toPiece;
        else if (isBlackAt(board, to)) state.jail[PlayerColor.BLACK] += toPiece;

        board = squarePut(
            board,
            to,
            squareGet(board, from)
        );

        board = squarePut(board, from, " ");

        state.board = board;
        return state;
    },

    affectedSquares: (state, move) => {
        const { from, to } = move;
        let { board } = state;

        if (isEmptyAt(board, to)) {
            return [
                { type: BoardType.MAIN_BOARD, loc: from },
                { type: BoardType.MAIN_BOARD, loc: to }
            ];
        } else {
            return [
                { type: BoardType.MAIN_BOARD, loc: from },
                { type: BoardType.MAIN_BOARD, loc: to },
                { type: state.player + '_JAIL' }
            ];
        }
    }

};


export const castlingMove = {

    execute: (state, move) => {
        const { from, to } = move;
        let { board } = state;

        board = squarePut(
            board,
            to,
            squareGet(board, from)
        );

        board = squarePut(board, from, " ");

        if (to.c === from.c - 2) {
            const tower = squareGet(board, { ...from, c: 0 });
            board = squarePut(board, { ...from, c: 3 }, tower);
            board = squarePut(board, { ...from, c: 0 }, " ");
        } else if (to.c === from.c + 2) {
            const tower = squareGet(board, { ...from, c: 7 });
            board = squarePut(board, { ...from, c: 5 }, tower);
            board = squarePut(board, { ...from, c: 7 }, " ");
        }

        state.board = board;
        return state;
    },

    affectedSquares: (state, move) => {
        const { from, to } = move;

        if (to.c === from.c - 2) {
            return [
                { type: BoardType.MAIN_BOARD, loc: from },
                { type: BoardType.MAIN_BOARD, loc: to },
                { type: BoardType.MAIN_BOARD, loc: { ...from, c: 0 } },
                { type: BoardType.MAIN_BOARD, loc: { ...from, c: 3 } }
            ];
        } else if (to.c === from.c + 2) {
            return [
                { type: BoardType.MAIN_BOARD, loc: from },
                { type: BoardType.MAIN_BOARD, loc: to },
                { type: BoardType.MAIN_BOARD, loc: { ...from, c: 5 } },
                { type: BoardType.MAIN_BOARD, loc: { ...from, c: 7 } }
            ];
        }


    }
};

export const findMoveHandler = (board, from, to) => {
    if (isKingAt(board, from) && from.c === 4 && Math.abs(from.c - to.c) === 2) {
        return castlingMove;
    } else {
        return commonMove;
    }
}
