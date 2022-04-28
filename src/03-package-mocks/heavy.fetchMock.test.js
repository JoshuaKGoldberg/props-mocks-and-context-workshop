import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import fetchMock from "fetch-mock";
import React from "react";

import { Heavy } from "./heavy";

const mockFetch = fetchMock.sandbox();

jest.mock("cross-fetch", () => ({
  get fetch() {
    return mockFetch;
  },
  // ReferenceError: Cannot access 'mockFetch' before initialization
  // fetch: mockFetch,
}));

const url = "https://my-website.com/my-endpoint";

mockFetch.get(url, "Hi!");

describe(Heavy, () => {
  it("renders a loading message when data hasn't loaded yet", async () => {
    render(<Heavy endpoint={url} />);
    screen.getByText("loading...");
    await waitForElementToBeRemoved(() => screen.queryByText("loading..."));
  });

  it("renders a done message when data has loaded", async () => {
    render(<Heavy endpoint={url} />);
    await screen.findByText(/Done:/);
  });
});
