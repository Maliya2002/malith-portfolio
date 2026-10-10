const LOCK_CLASS = "page-scroll-locked";
const SETTLE_MS = 1200;
const USER_INPUT_EVENTS = ["wheel", "touchstart", "keydown", "mousedown"];

export function lockScroll() {
  document.documentElement.classList.add(LOCK_CLASS);
  document.body.classList.add(LOCK_CLASS);
}

export function unlockScroll() {
  document.documentElement.classList.remove(LOCK_CLASS);
  document.body.classList.remove(LOCK_CLASS);
}

export function forceScrollTop() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

/**
 * Keeps the page pinned to the very top while the freshly rendered content
 * settles (images decoding, 3D canvas resizing, in-view animations firing),
 * which is when browsers are most likely to leave the visitor mid-page.
 * The pin releases early the moment the visitor interacts, so it never traps them.
 */
export function pinTopUntilStable(duration = SETTLE_MS) {
  let frame = 0;
  let timer = 0;
  let stopped = false;

  const stop = () => {
    if (stopped) return;
    stopped = true;
    cancelAnimationFrame(frame);
    clearTimeout(timer);
    USER_INPUT_EVENTS.forEach((event) =>
      window.removeEventListener(event, stop, true)
    );
    window.removeEventListener("load", forceScrollTop);
  };

  const keepAtTop = () => {
    if (stopped) return;
    forceScrollTop();
    frame = requestAnimationFrame(keepAtTop);
  };

  USER_INPUT_EVENTS.forEach((event) =>
    window.addEventListener(event, stop, true)
  );
  window.addEventListener("load", forceScrollTop);

  forceScrollTop();
  keepAtTop();
  timer = window.setTimeout(stop, duration);

  return stop;
}
