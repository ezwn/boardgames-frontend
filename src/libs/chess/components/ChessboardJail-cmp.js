import React, { useContext } from "react";
import { ChessboardSquare } from "./ChessboardSquare-cmp";
import { ChessSessionContext } from "../contexts/ChessSession-ctx";

import "./ChessboardJail-cmp.css";
import { oppositePlayerColor } from "../engine/engine";

const jailRange = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

export const ChessboardJail = ({ ownerColor, cbSize, verticalMode }) => {
  const { computedState } = useContext(ChessSessionContext);
  const { lastMove } = useContext(ChessSessionContext);

  let opponentColor = oppositePlayerColor(ownerColor);

  const style = verticalMode ?
    { width: cbSize, height: cbSize / 16 } :
    { width: cbSize / 16, height: cbSize };

  const pieces = computedState.jail[opponentColor].split("");

  const isAffected = lastMove && !lastMove.canceled && computedState.affectedSquares.find(square => square.type === ownerColor + '_JAIL')

  return (
    <div className="ChessboardJail" style={style}>
      {jailRange.map((c, i) => (
        <ChessboardSquare
          key={c}
          piece={pieces[c] || " "}
          className={ownerColor.toLowerCase() + (
            isAffected && i === pieces.length - 1
              ? " lastMove"
              : ""
          )}
        />
      ))}
    </div>
  );
};
