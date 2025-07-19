import executeWorker from "./imageDataUtils.executeWorker";
import rawRemoveBackground from "./removeBackground.raw";

export default async function removeBackground(
  ...[imageData, signal]: [
    ...Parameters<typeof rawRemoveBackground>,
    signal?: AbortSignal,
  ]
): Promise<ReturnType<typeof rawRemoveBackground>> {
  return (
    (await executeWorker("REMOVE_BACKGROUND", imageData, signal)) ||
    rawRemoveBackground(imageData)
  );
}
