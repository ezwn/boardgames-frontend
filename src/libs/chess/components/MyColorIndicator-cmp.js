import React, { useContext } from "react";

import { ChessSessionContext } from "../contexts/ChessSession-ctx";

import "./MyColorIndicator-cmp.css";

export const MyColorIndicator = () => {
  const { myRole } = useContext(ChessSessionContext);
  return <div className={`MyColorIndicator ${myRole}`}>&nbsp;</div>;
};
