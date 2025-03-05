import useCarousel from "./Carousel.hooks";
import type CarouselProps from "./Carousel.types";

export default function Carousel(props: CarouselProps) {
  const { bodyRef, bodyStyle, children, childStyle } = useCarousel(props);

  return (
    <div
      ref={bodyRef}
      className="flex size-full overflow-x-hidden"
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
  );
}
