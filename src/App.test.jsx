import React from "react";
import { waitFor, render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import dayjs from "dayjs";

describe("General tests for articles displaying", () => {
  test("Renders list of articles", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getAllByTestId("article-card")).toBeTruthy();
    });
  });

  test("Renders by default 100 articles", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getAllByTestId("article-card")).toHaveLength(100);
    });
  });

  test("Renders articles for yesterday by default", async () => {
    render(<App />);

    await waitFor(() => {
      const defaultDay = screen.getByTestId("article-date");
      const yesterday = dayjs().subtract(1, "d").format("YYYY-MM-DD");

      expect(defaultDay.value).toContain(yesterday);
    });
  });

  test("Renders pinned article when users clicks card", async () => {
    render(<App />);

    await waitFor(() => {
      const articles = screen.getAllByTestId("article-card-pin");
      fireEvent.click(articles[0]);
    });

    await waitFor(() => {
      const pinnedArticles = screen.getAllByTestId("article-card-pin");
      expect(pinnedArticles).toBeTruthy();
    });
  });

  // TODO:
  /**
   * Add test for removing pin
   * Add test for selecting a different date
   * Add test for selecting incorrect date
   * Add test for different result values
   * Mocking axios and testing api for data or no data
   */
});
