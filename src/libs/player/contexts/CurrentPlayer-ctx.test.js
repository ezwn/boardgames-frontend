import React from "react";
import { render, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { CurrentPlayerProvider } from "libs/player/contexts/CurrentPlayer-ctx";

import axiosMock from "axios";

jest.mock("libs/url-search-params");
jest.mock("axios");

describe("CurrentPlayerProvider", () => {
  test("displays the warning when the user is not known", async () => {
    const { getByRole } = render(<CurrentPlayerProvider />);

    await waitForElement(() => getByRole("heading"));

    expect(getByRole("heading")).toHaveTextContent("Vous n'êtes pas inscrit");
  });

  test("displays the content when the user is known", async () => {
    axiosMock.post.mockResolvedValueOnce({
      data: {
        name: "Nicolas"
      }
    });

    const { getByRole } = render(
      <CurrentPlayerProvider>
        <div role="heading">SUBCOMPONENT</div>
      </CurrentPlayerProvider>
    );

    await waitForElement(() => getByRole("heading"));
    expect(getByRole("heading")).toHaveTextContent("SUBCOMPONENT");
  });
});
