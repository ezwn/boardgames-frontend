import React from "react";
import { render, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { GameSessionList } from "./GameSessionList-cmp";
import { MyGameSessionsContext } from "../contexts/MyGameSessions-ctx";
import { LocalizationContext } from "libs/ezwn-i18n";

describe("GameSessionList", () => {
  test("displays a message when the list is empty", async () => {
    const { getByRole } = render(
      <LocalizationContext.Provider value={{ lang: 'fr' }}>
        <MyGameSessionsContext.Provider value={{ myGameSessions: [] }}>
          <GameSessionList />
        </MyGameSessionsContext.Provider>
      </LocalizationContext.Provider>
    );

    const element = await waitForElement(() => getByRole("list"));
    expect(element).toHaveTextContent("Vous ne participez à aucune partie.");
  });
});
