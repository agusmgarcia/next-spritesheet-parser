import { useEffect, useState } from "react";

type Dimensions = { height: number; width: number };

const initialDimensions: Dimensions = { height: 0, width: 0 };

export default function useDimensions(ref: React.RefObject<any>): Dimensions {
  const [visible, setVisible] = useState(false);

  const [dimensions, setDimensions] = useState(initialDimensions);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setVisible(!!ref.current);
  });

  useEffect(() => {
    if (!visible) return;

    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) =>
      setDimensions({
        height: entries[0].contentRect.height,
        width: entries[0].contentRect.width,
      }),
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [ref, visible]);

  return dimensions;
}
