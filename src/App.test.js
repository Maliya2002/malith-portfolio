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


test("reveals recruiter content, working navigation and labelled contact fields after loading", () => {
  const originalObserver = window.IntersectionObserver;
  window.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
  const originalScrollTo = HTMLElement.prototype.scrollTo;
  HTMLElement.prototype.scrollTo = jest.fn();
  try {
    act(() => root.render(<App />));
    act(() => jest.advanceTimersByTime(850));
    expect(container.querySelector('#home h1').textContent).toContain('Ideas to code');
    expect(container.querySelector('#work')).not.toBeNull();
    expect(container.querySelector('a[download]').getAttribute('href')).toBe('/Malith_Madushan_CV.pdf');
    expect(container.querySelector('label[for="contact-email"]')).not.toBeNull();
    expect(container.querySelector('audio')).toBeNull();
    expect(container.querySelector('.ambient-background canvas')).toBeNull();
  } finally {
    window.IntersectionObserver = originalObserver;
    HTMLElement.prototype.scrollTo = originalScrollTo;
  }
});
