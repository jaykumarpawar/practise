import { useEffect } from "react";

export default function useDisableContextMenu(): void {
  useEffect(() => {
    const handleContextMenu = (event: MouseEvent): void => {
      event.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (
        e.key === "F12" || // F12
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) || // Ctrl+Shift+I/J
        (e.ctrlKey && e.key.toLowerCase() === "u") // Ctrl+U
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
}
