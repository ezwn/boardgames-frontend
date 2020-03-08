import React from "react";
import { MemoryRouter as Router, Switch, Route } from "react-router";

import { CurrentPlayerProvider } from "libs/player/contexts/CurrentPlayer-ctx";
import { ChessboardView } from "libs/chess/components/ChessboardView-cmp";
import { GameSessionListView } from "libs/gameSession/components/GameSessionList-cmp";
import { NewGameSessionView } from "libs/gameSession/components/NewGameSession-cmp";
import { LocalizationProvider } from "libs/ezwn-i18n";

import "./App-cmp.css";
import { AppLayoutProvider } from "libs/ezwn-mobile-ui/AppLayout-ctx";
import { ModalOutput, ModalOutputProvider } from "libs/ezwn-mobile-ui/ModalOutput-cmp";

const App = () => (
  <AppLayoutProvider>
    <CurrentPlayerProvider>
      <LocalizationProvider>
        <ModalOutputProvider>
          <ModalOutput />
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
        </ModalOutputProvider>
      </LocalizationProvider>
    </CurrentPlayerProvider>
  </AppLayoutProvider>
);

export default App;
