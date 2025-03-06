import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { type SetValue } from "#src/utils";

import type CarouselProps from "./Carousel.types";

export default function useCarousel({
  hideArrows: hideArrowsFromProps,
  index: indexFromProps,
  onIndexChange,
  pageGap: pageGapFromProps,
  pageSize: pageSizeFromProps,
  ...props
}: CarouselProps) {
  const bodyRef = useRef<HTMLDivElement>(null);

  const [index, rawSetIndex] = useState(indexFromProps || 0);

  const childrenLength = useMemo(
    () =>
      Array.isArray(props.children)
        ? props.children.filter((c) => !!c).length
        : 0,
    [props.children],
  );

  const pageGap = useMemo(() => pageGapFromProps || 64, [pageGapFromProps]);

  const pageSize = useMemo(() => pageSizeFromProps || 1, [pageSizeFromProps]);

  const hideArrows = useMemo(
    () => !!hideArrowsFromProps || childrenLength <= pageSize,
    [childrenLength, hideArrowsFromProps, pageSize],
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

  const previousDisabled = useMemo(() => index <= 0, [index]);

  const nextDisabled = useMemo(
    () => index >= childrenLength - 1,
    [childrenLength, index],
  );

  const setIndex = useCallback(
    (newIndex: SetValue<number>) =>
      !!onIndexChange ? onIndexChange(newIndex) : rawSetIndex(newIndex),
    [onIndexChange],
  );

  const previousOnClick = useCallback(
    () => setIndex((prev) => prev - 1),
    [setIndex],
  );

  const nextOnClick = useCallback(
    () => setIndex((prev) => prev + 1),
    [setIndex],
  );

  useEffect(() => {
    rawSetIndex(indexFromProps || 0);
  }, [indexFromProps]);

  useEffect(() => {
    setIndex((prev) => (prev < childrenLength ? prev : childrenLength));
  }, [childrenLength, setIndex]);

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
    ...props,
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
