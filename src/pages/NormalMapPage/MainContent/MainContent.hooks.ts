import {
  useDevicePixelRatio,
  useDimensions,
} from "@agusmgarcia/react-essentials-utils";
import { useEffect, useRef } from "react";

import { Layout } from "#src/fragments";
import { useNormalMapImage, useScale } from "#src/store";
import { useLoadImage } from "#src/utils";

import type MainContentProps from "./MainContent.types";

export default function useMainContent(props: MainContentProps) {
  const { normalMapImage } = useNormalMapImage();
  const { scale: scaleFromStore } = useScale();

  const ref = useRef<HTMLDivElement>(null);
  const normalMapCanvasRef = useRef<HTMLCanvasElement>(null);

  const { image } = useLoadImage(normalMapImage?.url || "");
  const dimensions = useDimensions(ref);
  const scale = useDevicePixelRatio() * scaleFromStore;

  useEffect(() => {
    if (!image) return;
    if (!normalMapImage?.backgroundColor) return;

    const normalMapCanvas = normalMapCanvasRef.current;
    if (!normalMapCanvas) return;

    normalMapCanvas.width = Math.max(dimensions.width, image.width * scale);
    normalMapCanvas.width +=
      Layout.SIDEBAR_WIDTH - (normalMapCanvas.width - image.width * scale);

    normalMapCanvas.height = Math.max(dimensions.height, image.height * scale);

    const context = normalMapCanvas.getContext("2d");
    if (!context) return;

    context.imageSmoothingEnabled = false;
    context.imageSmoothingQuality = "high";

    context.clearRect(0, 0, normalMapCanvas.width, normalMapCanvas.height);
    context.fillStyle = normalMapImage.backgroundColor;
    context.fillRect(0, 0, normalMapCanvas.width, normalMapCanvas.height);
    context.scale(scale, scale);
    context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
  }, [
    image,
    normalMapImage?.backgroundColor,
    dimensions.height,
    dimensions.width,
    scale,
  ]);

  return { ...props, normalMapCanvasRef, ref };
}
