import { useDevicePixelRatio, useDimensions } from "@agusmgarcia/react-core";
import { useEffect, useRef } from "react";

import { useNormalMap } from "#src/store";
import { useLoadImage } from "#src/utils";

import type MainContentProps from "./MainContent.types";

export default function useMainContent(props: MainContentProps) {
  const { normalMap } = useNormalMap();

  const ref = useRef<HTMLDivElement>(null);
  const normalMapCanvasRef = useRef<HTMLCanvasElement>(null);

  const { image } = useLoadImage(normalMap?.imageURL || "");
  const rootDimensions = useDimensions(ref);
  const scale = useDevicePixelRatio() * (normalMap?.scale || 0);

  useEffect(() => {
    if (!image) return;
    if (!normalMap?.backgroundColor) return;

    const normalMapCanvas = normalMapCanvasRef.current;
    if (!normalMapCanvas) return;

    normalMapCanvas.width =
      Math.max(rootDimensions.width, image.width * scale) + 360;
    normalMapCanvas.height = Math.max(
      rootDimensions.height,
      image.height * scale,
    );

    const context = normalMapCanvas.getContext("2d");
    if (!context) return;

    context.imageSmoothingEnabled = false;
    context.imageSmoothingQuality = "high";

    context.clearRect(0, 0, normalMapCanvas.width, normalMapCanvas.height);
    context.fillStyle = normalMap.backgroundColor;
    context.fillRect(0, 0, normalMapCanvas.width, normalMapCanvas.height);
    context.scale(scale, scale);
    context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
  }, [
    image,
    normalMap?.backgroundColor,
    rootDimensions.height,
    rootDimensions.width,
    scale,
  ]);

  return { ...props, normalMapCanvasRef, ref };
}
