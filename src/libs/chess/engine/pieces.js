
export const isWhite = piece => {
    return !isEmpty(piece) && piece.toUpperCase() === piece;
};

export const isBlack = piece => {
    return !isEmpty(piece) && piece.toUpperCase() !== piece;
};

export const isEmpty = piece => {
    return piece === " ";
};

export const isKing = piece => {
    return piece.toUpperCase() === "K";
};

export const getColor = piece => {
    if (isBlack(piece)) return "BLACK";
    else if (isWhite(piece)) return "WHITE";
    else return undefined;
  };
  