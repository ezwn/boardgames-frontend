import React from "react";
import { MemoryRouter as Router, Switch, Route } from "react-router";

import { CurrentPlayerProvider } from "libs/player/contexts/CurrentPlayer-ctx";
import { ChessboardView } from "libs/chess/components/ChessboardView-cmp";
import { GameSessionListView } from "libs/gameSession/components/GameSessionList-cmp";
import { NewGameSessionView } from "libs/gameSession/components/NewGameSession-cmp";
import { LocalizationProvider } from "libs/ezwn-i18n";

import "./App-cmp.css";

const App = () => (
  <CurrentPlayerProvider>
    <LocalizationProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <GameSessionListView />
          </Route>
          <Route exact path="/ChessboardView/:gameSessionId">
            <ChessboardView />
          </Route>
          <Route exact path="/NewGameSessionView">
            <NewGameSessionView />
          </Route>
        </Switch>
      </Router>
    </LocalizationProvider>
  </CurrentPlayerProvider>
);

export default App;
