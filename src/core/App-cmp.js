import React from "react";
import { MemoryRouter as Router, Switch, Route } from "react-router";

import { CurrentPlayerProvider } from "libs/player/contexts/CurrentPlayer-ctx";
import { ChessboardView } from "libs/chess/components/ChessboardView-cmp";
import { GameSessionListView } from "libs/gameSession/components/GameSessionList-cmp";
import { NewGameSessionView } from "libs/gameSession/components/NewGameSession-cmp";
import { LocalizationProvider } from "libs/ezwn-i18n";

import "./App-cmp.css";
import { AppLayoutProvider } from "libs/ezwn-mobile-webui/AppLayout-ctx";
import { ModalOutput, ModalOutputProvider } from "libs/ezwn-mobile-webui/ModalOutput-cmp";
import { BackendStatusProvider } from "libs/ezwn-backend-status/contexts/BackendStatus-ctx";
import { BackendDownWarning } from "libs/ezwn-backend-status/components/BackendDownWarning-cmp";
import { ChatView } from "libs/chat/components/Chat-cmp";

const App = () => (
  <BackendStatusProvider>
    <AppLayoutProvider>
      <CurrentPlayerProvider>
        <LocalizationProvider>
          <ModalOutputProvider>
            <ModalOutput />
            <BackendDownWarning />
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
                <Route exact path="/ChatView/:chatId">
                  <ChatView />
                </Route>
              </Switch>
            </Router>
          </ModalOutputProvider>
        </LocalizationProvider>
      </CurrentPlayerProvider>
    </AppLayoutProvider>
  </BackendStatusProvider>
);

export default App;
