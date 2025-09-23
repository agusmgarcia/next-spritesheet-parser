import rawGetHash from "./getHash.raw";
import executeWorker from "./imageDataUtils.executeWorker";

export default async function getHash(
  ...[imageData, signal]: [
    ...Parameters<typeof rawGetHash>,
    signal: AbortSignal,
  ]
): Promise<ReturnType<typeof rawGetHash>> {
  return (
    (await executeWorker("GET_HASH", imageData, signal)) ||
    rawGetHash(imageData)
  );
}
