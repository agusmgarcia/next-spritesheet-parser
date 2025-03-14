import { type Func } from "@agusmgarcia/react-core";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type CarouselProps from "./Carousel.types";

export default function useCarousel({
  hideArrows: hideArrowsFromProps,
  index: indexFromProps,
  onIndexChange: onIndexChangeFromProps,
  pageGap: pageGapFromProps,
  pageSize: pageSizeFromProps,
  ...rest
}: CarouselProps) {
  const bodyRef = useRef<HTMLDivElement>(null);

  const [index, rawSetIndex] = useState(indexFromProps || 0);

  const pageGap = useMemo<number>(
    () => pageGapFromProps || 64,
    [pageGapFromProps],
  );

  const pageSize = useMemo<number>(
    () => pageSizeFromProps || 1,
    [pageSizeFromProps],
  );

  const pagesCount = useMemo<number>(
    () =>
      Array.isArray(rest.children)
        ? Math.ceil(rest.children.filter((c) => !!c).length / pageSize)
        : 1,
    [rest.children, pageSize],
  );

  const hideArrows = useMemo<boolean>(
    () => !!hideArrowsFromProps || pagesCount <= 1,
    [hideArrowsFromProps, pagesCount],
  );

  const rootStyle = useMemo<React.CSSProperties>(
    () => ({
      paddingLeft: !hideArrows ? `${24 + pageGap}px` : undefined,
      paddingRight: !hideArrows ? `${24 + pageGap}px` : undefined,
    }),
    [hideArrows, pageGap],
  );

  const bodyStyle = useMemo<React.CSSProperties>(
    () => ({ gap: `${pageGap}px` }),
    [pageGap],
  );

  const childStyle = useMemo<React.CSSProperties>(
    () => ({
      flex: `1 0 calc(100% / ${pageSize} - ${((pageSize - 1) * pageGap) / pageSize}px)`,
    }),
    [pageGap, pageSize],
  );

  const previousDisabled = useMemo<boolean>(() => index <= 0, [index]);

  const nextDisabled = useMemo<boolean>(
    () => index >= pagesCount - 1,
    [index, pagesCount],
  );

  const setIndex = useCallback<
    Func<void, [newIndex: React.SetStateAction<number>]>
  >(
    (newIndex) =>
      !!onIndexChangeFromProps
        ? onIndexChangeFromProps(newIndex)
        : rawSetIndex(newIndex),
    [onIndexChangeFromProps],
  );

  const previousOnClick = useCallback<Func>(
    () => setIndex((prev) => prev - 1),
    [setIndex],
  );

  const nextOnClick = useCallback<Func>(
    () => setIndex((prev) => prev + 1),
    [setIndex],
  );

  useEffect(() => {
    rawSetIndex(indexFromProps || 0);
  }, [indexFromProps]);

  useEffect(() => {
    setIndex((prev) => (prev < pagesCount ? prev : pagesCount));
  }, [pagesCount, setIndex]);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0].contentRect;
      const left = (entry.width + pageGap) * index;
      body.scrollTo({ behavior: "smooth", left, top: 0 });
    });

    observer.observe(body);
    return () => observer.unobserve(body);
  }, [index, pageGap]);

  return {
    ...rest,
    bodyRef,
    bodyStyle,
    childStyle,
    hideArrows,
    nextDisabled,
    nextOnClick,
    previousDisabled,
    previousOnClick,
    rootStyle,
  };
}
