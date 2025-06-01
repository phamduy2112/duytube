import { useEffect, useState } from "react";

/**
 * useDelayedSkeleton - Hook to delay skeleton rendering
 * @param delay number - delay in ms (default is 500ms)
 * @returns showSkeleton: boolean
 */
export const useDelayedSkeleton = (delay: number = 500) => {
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSkeleton(false);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  return showSkeleton;
};
