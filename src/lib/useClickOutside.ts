import { useEffect, useRef, type RefObject } from "react";

export function useClickOutside(ref: RefObject<HTMLElement | null>, handler: () => void) {
  // Keep the latest handler in a ref so the document listeners are subscribed
  // once and always call the current handler — no re-subscribe on every parent
  // re-render even if the caller passes an inline arrow (as App.tsx does).
  const handlerRef = useRef(handler);
  useEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handlerRef.current();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref]);
}
