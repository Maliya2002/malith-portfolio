// React 18 needs this flag before any act() call, otherwise every render
// logs "the current testing environment is not configured to support act".
global.IS_REACT_ACT_ENVIRONMENT = true;

// jsdom has no layout engine, so these browser APIs are missing.
// They are stubbed globally so component tests can render the real tree.
window.scrollTo = jest.fn();

if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  });
}
