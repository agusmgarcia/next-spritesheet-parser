import rawGenerateNormalMap from "./generateNormalMap.raw";
import executeWorker from "./imageDataUtils.executeWorker";

export default async function generateNormalMap(
  ...[imageData, settings, signal]: [
    ...Parameters<typeof rawGenerateNormalMap>,
    signal: AbortSignal,
  ]
): Promise<ReturnType<typeof rawGenerateNormalMap>> {
  return (
    (await executeWorker("GENERATE_NORMAL_MAP", imageData, settings, signal)) ||
    rawGenerateNormalMap(imageData, settings)
  );
}
