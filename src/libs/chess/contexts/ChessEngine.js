import React from 'react';
import { Localized } from "libs/ezwn-i18n";

const initialState = () => ({
    player: 'WHITE',
    board: ['tnbkqbnt', 'pppppppp', '        ', '        ', '        ', '        ', 'PPPPPPPP', 'TNBKQBNT'],
    jail: {
        white: '',
        black: ''
    }
});

export const computeState = (moves) => {
    let state = initialState();
    moves.forEach(move => {
        if (move.from && move.to && !move.canceled) {
            state.board = squarePut(state.board, move.from.c, move.from.l, ' ');
            if (!isEmpty(move.to.piece)) {
                if (isWhite(move.to.piece))
                    state.jail.white += move.to.piece;
                else
                    state.jail.black += move.to.piece;
            }
            state.board = squarePut(state.board, move.to.c, move.to.l, move.from.piece);

            state.player = state.player === "WHITE" ? "BLACK" : "WHITE";
        }
    });
    return state;
};

export const isValidMove = (state, move) => {
    const { from, to } = move;

    if (isEmpty(from.piece))
        return false;

    if (isWhite(from.piece) && isWhite(to.piece))
        return false;

    if (isBlack(from.piece) && isBlack(to.piece))
        return false;

    switch (from.piece) {
        case 'p':
            return to.l > from.l;
        case 'P':
            return to.l < from.l;
        default:
            ;
    }

    return true;
}

const squarePut = (board, c, l, piece) => {
    const oldLine = board[l];
    board[l] = oldLine.substring(0, c) + piece + oldLine.substring(c + 1);
    return board;
};

export const getColor = (piece) => {
    if (isBlack(piece))
        return 'BLACK';
    else if (isWhite(piece))
        return 'WHITE';
    else
        return undefined;
}

export const getTranslatedColorName = (color) => {
    switch (color) {
        case 'WHITE':
            return <>
                <Localized lang='fr'>BLANCHE</Localized>
                <Localized lang='tw'>白棋</Localized>
            </>;
        case 'BLACK':
            return <>
                <Localized lang='fr'>NOIRE</Localized>
                <Localized lang='tw'>黑棋</Localized>
            </>;
        default:
            return undefined;
    }
}

export const isWhite = (piece) => {
    return !isEmpty(piece) && piece.toUpperCase() === piece;
};


export const isBlack = (piece) => {
    return !isEmpty(piece) && piece.toUpperCase() !== piece;
};

export const isEmpty = (piece) => {
    return piece === ' ';
}