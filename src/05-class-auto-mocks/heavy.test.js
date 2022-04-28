import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import React from "react";
import { Fetcher } from "./fetcher";

jest.mock("./fetcher");

jest.spyOn(Fetcher.prototype, "fetch").mockImplementation(async () => ({
  text: async () => "Hi!",
}));

import { Heavy } from "./heavy";

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
