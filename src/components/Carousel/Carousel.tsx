import { twMerge } from "tailwind-merge";

import { Button, Icon } from "#src/components";

import useCarousel from "./Carousel.hooks";
import type CarouselProps from "./Carousel.types";

export default function Carousel(props: CarouselProps) {
  const {
    bodyRef,
    bodyStyle,
    children,
    childStyle,
    hideArrows,
    nextDisabled,
    nextOnClick,
    previousDisabled,
    previousOnClick,
    rootStyle,
  } = useCarousel(props);

  return (
    <div
      className={twMerge("relative size-full overflow-hidden")}
      style={rootStyle}
    >
      {!hideArrows && (
        <Button
          className="absolute left-0 top-0 w-fit"
          disabled={previousDisabled}
          onClick={previousOnClick}
          variant="raw"
        >
          <Icon variant="arrowLeft" />
        </Button>
      )}

      <div
        ref={bodyRef}
        className="flex size-full items-stretch overflow-x-hidden"
        style={bodyStyle}
      >
        {Array.isArray(children) ? (
          children.map(
            (child, index) =>
              !!child && (
                <div key={index} style={childStyle}>
                  {child}
                </div>
              ),
          )
        ) : !!children ? (
          <div style={childStyle}>{children}</div>
        ) : (
          <></>
        )}
      </div>

      {!hideArrows && (
        <Button
          className="absolute right-0 top-0 w-fit"
          disabled={nextDisabled}
          onClick={nextOnClick}
          variant="raw"
        >
          <Icon variant="arrowRight" />
        </Button>
      )}
    </div>
  );
}
