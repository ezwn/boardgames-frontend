import React, { useContext } from "react";
import { ChessboardSquare } from "./ChessboardSquare-cmp";
import { ChessSessionContext } from "../contexts/ChessSession-ctx";

import "./ChessboardJail-cmp.css";

const jailRange = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

export const ChessboardJail = ({ color, cbSize, verticalMode }) => {
  const { computedState } = useContext(ChessSessionContext);

  const style = verticalMode ?
    { width: cbSize, height: cbSize/16 } :
    { width: cbSize/16, height: cbSize } ;

  return (
    <div className="ChessboardJail" style={style}>
      {jailRange.map(c => (
        <ChessboardSquare
          key={c}
          piece={computedState.jail[color].split("")[c] || " "}
          className={color === "white" ? "black" : "white"}
        />
      ))}
    </div>
  );
};
