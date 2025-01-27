// Purpose: This hook locks the body scroll when a modal/dialog is open.
// It prevents background scrolling to enhance the user experience.

import { useEffect } from "react";

export function useLockBody(lock: boolean = true) {
  useEffect(() => {
    if (!lock) return;

    // Save the current overflow style
    const originalStyle = window.getComputedStyle(document.body).overflow;

    // Lock the body scroll
    document.body.style.overflow = "hidden";

    // Revert to the original style on cleanup
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [lock]);
}
