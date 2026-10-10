import {
  lockScroll,
  unlockScroll,
  forceScrollTop,
  pinTopUntilStable,
} from "./scrollControl";

const LOCK_CLASS = "page-scroll-locked";

describe("scrollControl", () => {
  afterEach(() => {
    unlockScroll();
    window.scrollTo.mockClear();
  });

  test("lockScroll freezes the root element and the body", () => {
    lockScroll();

    expect(document.documentElement.classList.contains(LOCK_CLASS)).toBe(true);
    expect(document.body.classList.contains(LOCK_CLASS)).toBe(true);
  });

  test("unlockScroll releases the lock again", () => {
    lockScroll();
    unlockScroll();

    expect(document.documentElement.classList.contains(LOCK_CLASS)).toBe(false);
    expect(document.body.classList.contains(LOCK_CLASS)).toBe(false);
  });

  test("forceScrollTop pins the window and both document roots", () => {
    document.documentElement.scrollTop = 900;
    document.body.scrollTop = 900;

    forceScrollTop();

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    expect(document.documentElement.scrollTop).toBe(0);
    expect(document.body.scrollTop).toBe(0);
  });

  test("pinTopUntilStable returns a release function", () => {
    const stop = pinTopUntilStable();

    expect(typeof stop).toBe("function");
    stop();
  });

  test("pinTopUntilStable releases itself when the visitor scrolls", () => {
    const stop = pinTopUntilStable();
    const framesAfterRelease = window.scrollTo.mock.calls.length;

    window.dispatchEvent(new Event("wheel"));

    // Nothing re-pins the page once the pin has been released.
    expect(window.scrollTo.mock.calls.length).toBe(framesAfterRelease);
    stop();
  });
});
