import { useDevicePixelRatio, useDimensions } from "@agusmgarcia/react-core";
import { useEffect, useRef } from "react";

import { useNormalMap, useScale } from "#src/store";
import { useLoadImage } from "#src/utils";

import type MainContentProps from "./MainContent.types";

export default function useMainContent(props: MainContentProps) {
  const { normalMap } = useNormalMap();
  const { scale: scaleFromStore } = useScale();

  const ref = useRef<HTMLDivElement>(null);
  const normalMapCanvasRef = useRef<HTMLCanvasElement>(null);

  const { image } = useLoadImage(normalMap?.image.url || "");
  const dimensions = useDimensions(ref);
  const scale = useDevicePixelRatio() * scaleFromStore;

  useEffect(() => {
    if (!image) return;
    if (!normalMap?.image.backgroundColor) return;

    const normalMapCanvas = normalMapCanvasRef.current;
    if (!normalMapCanvas) return;

    normalMapCanvas.width = Math.max(dimensions.width, image.width * scale);
    normalMapCanvas.width +=
      360 - (normalMapCanvas.width - image.width * scale);

    normalMapCanvas.height = Math.max(dimensions.height, image.height * scale);

    const context = normalMapCanvas.getContext("2d");
    if (!context) return;

    context.imageSmoothingEnabled = false;
    context.imageSmoothingQuality = "high";

    context.clearRect(0, 0, normalMapCanvas.width, normalMapCanvas.height);
    context.fillStyle = normalMap.image.backgroundColor;
    context.fillRect(0, 0, normalMapCanvas.width, normalMapCanvas.height);
    context.scale(scale, scale);
    context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
  }, [
    image,
    normalMap?.image.backgroundColor,
    dimensions.height,
    dimensions.width,
    scale,
  ]);

  return { ...props, normalMapCanvasRef, ref };
}
