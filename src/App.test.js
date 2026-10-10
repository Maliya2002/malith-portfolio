import React, { act } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

let container;
let root;

beforeEach(() => {
  jest.useFakeTimers();
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.clearAllTimers();
  jest.useRealTimers();
});

// The site must always boot from the top, and the intro loader is the only
// thing mounted until it finishes - so no portfolio section can steal the
// first paint (or the scroll position).
test("renders only the intro loader on first paint", () => {
  act(() => {
    root.render(<App />);
  });

  expect(container.textContent).toContain("Malith Madushan");
  expect(container.textContent).toContain("LOADING");
  expect(container.textContent).not.toContain("Selected");
});
