import { useState, useLayoutEffect } from "react";

export function useWindowSize() {
  const [size, setSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  useLayoutEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.visualViewport?.width,
        height: window.visualViewport?.height,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
}
