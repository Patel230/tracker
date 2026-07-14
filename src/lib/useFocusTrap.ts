import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Trap Tab cycling inside `ref`, move focus in on mount, and restore focus to
// the previously active element on unmount.
//
// `onEscape` is held in a ref so the effect does not re-run when the caller
// passes a fresh inline arrow every render (as the modals do): re-running would
// re-snapshot `previouslyFocused` and steal focus back to the first field on
// every parent render while the user is typing.
export function useFocusTrap(ref: RefObject<HTMLElement | null>, active: boolean, onEscape?: () => void) {
  const onEscapeRef = useRef(onEscape);
  useEffect(() => {
    onEscapeRef.current = onEscape;
  });

  useEffect(() => {
    if (!active) return;
    const container = ref.current;
    if (!container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusables = container.querySelectorAll<HTMLElement>(FOCUSABLE);
    const first = focusables[0];
    if (first) first.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onEscapeRef.current) {
        e.preventDefault();
        onEscapeRef.current();
        return;
      }
      if (e.key !== "Tab") return;

      const items = container.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (items.length === 0) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else if (document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    container.addEventListener("keydown", onKeyDown);
    return () => {
      container.removeEventListener("keydown", onKeyDown);
      if (previouslyFocused && document.body.contains(previouslyFocused)) {
        previouslyFocused.focus();
      }
    };
  }, [ref, active]);
}
