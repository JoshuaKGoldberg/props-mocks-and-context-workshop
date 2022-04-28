import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import React from "react";

// See /__mocks__/cross-fetch-example.js
import { fetch } from "cross-fetch-example";

import { Heavy } from "./heavy";

fetch.get("/my-endpoint", "Hi!");

describe(Heavy, () => {
  it("renders a loading message when data hasn't loaded yet", async () => {
    render(<Heavy endpoint="/my-endpoint" />);
    screen.getByText("loading...");
    await waitForElementToBeRemoved(() => screen.queryByText("loading..."));
  });

  it("renders a done message when data has loaded", async () => {
    render(<Heavy endpoint="/my-endpoint" />);
    await screen.findByText(/Done:/);
  });
});
