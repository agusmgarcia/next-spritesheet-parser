export default async function createFile(
  imageData: ImageData,
  name: string,
  type: string | undefined,
  signal: AbortSignal,
): Promise<File> {
  const canvas = document.createElement("canvas");
  canvas.width = imageData.width;
  canvas.height = imageData.height;

  const context = canvas.getContext("2d");
  if (!context) throw new Error("Context is not available");

  context.imageSmoothingEnabled = false;
  context.imageSmoothingQuality = "high";

  context.putImageData(imageData, 0, 0);

  const blob = await new Promise<Blob | undefined>((resolve) =>
    canvas.toBlob((blob) => resolve(blob || undefined), type),
  );

  signal.throwIfAborted();
  if (!blob) throw new Error("Unexpected scenario");

  return new File([blob], name, { type });
}
