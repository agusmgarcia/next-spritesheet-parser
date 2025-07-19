import rawGetRects from "./getRects.raw";
import executeWorker from "./imageDataUtils.executeWorker";

export default async function getRects(
  ...[imageData, options, signal]: [
    ...Parameters<typeof rawGetRects>,
    signal?: AbortSignal,
  ]
): Promise<ReturnType<typeof rawGetRects>> {
  return (
    (await executeWorker("GET_RECTS", imageData, options, signal)) ||
    rawGetRects(imageData, options)
  );
}
