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

// The intro loader is the only
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

test("preserves shared section links and navigates after the loader", () => {
  const originalObserver = window.IntersectionObserver;
  window.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
  const originalScrollIntoView = HTMLElement.prototype.scrollIntoView;
  const originalScrollTo = HTMLElement.prototype.scrollTo;
  HTMLElement.prototype.scrollIntoView = jest.fn();
  HTMLElement.prototype.scrollTo = jest.fn();
  window.history.replaceState(null, '', '/#work');
  try {
    act(() => root.render(<App />));
    act(() => jest.advanceTimersByTime(850));
    expect(window.location.hash).toBe('#work');
    expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({ behavior: 'auto' });
    expect(container.querySelectorAll('.project-card')).toHaveLength(6);
    expect(container.querySelector('#work').textContent).not.toContain('Smart Campus');
    expect(container.querySelector('a[aria-label="Developed by MMCode"]').href).toBe('https://mmcode.lk/');
    const menu = container.querySelector('button[aria-controls="mobile-navigation"]');
    act(() => menu.click());
    expect(menu.getAttribute('aria-expanded')).toBe('true');
    act(() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' })));
    expect(menu.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(menu);
  } finally {
    window.history.replaceState(null, '', '/');
    window.IntersectionObserver = originalObserver;
    HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
    HTMLElement.prototype.scrollTo = originalScrollTo;
  }
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
