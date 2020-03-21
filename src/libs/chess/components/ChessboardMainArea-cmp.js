import React, { useContext } from "react";
import { ChessboardSquare } from "./ChessboardSquare-cmp";
import { ChessSessionContext } from "../contexts/ChessSession-ctx";

import "./ChessboardMainArea-cmp.css";

export const ChessboardMainArea = ({ cbSize }) => {
  const { computedState } = useContext(ChessSessionContext);

  return (
    <div className="ChessboardMainArea" style={{ width: cbSize, height: cbSize }}>
      {computedState.board.map((rowData, l) => (
        <div className="row" key={`${l}`}>
          {rowData.split("").map((piece, c) => (
            <MainAreaChessboardSquare key={`${c}`} l={l} c={c} piece={piece} />
          ))}
        </div>
      ))}
    </div>
  );
};

const MainAreaChessboardSquare = ({ piece, c, l }) => {
  const { squareTouch, nextMove, lastMove } = useContext(ChessSessionContext);

  let className = (c + l) % 2 === 0 ? "white" : "black";

  const isLastMoveFrom =
    lastMove && lastMove.from.c === c && lastMove.from.l === l;
  const isLastMoveTo = lastMove && lastMove.to.c === c && lastMove.to.l === l;
  if (isLastMoveFrom || isLastMoveTo) {
    className += lastMove.canceled ? " canceledMove" : " lastMove";
  }

  const isNextMoveFrom =
    nextMove && nextMove.from && nextMove.from.c === c && nextMove.from.l === l;
  if (isNextMoveFrom) className += " selected";

  return (
    <ChessboardSquare
      onClick={() => squareTouch(c, l)}
      piece={piece}
      className={className}
    />
  );
};
