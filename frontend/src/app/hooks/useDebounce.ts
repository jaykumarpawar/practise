import { useState, useEffect } from "react";

// Generic debounce hook
export function useDebounce(value: any, delay = 2000) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel previous timeout if value changes before delay
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
