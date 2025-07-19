export default function loadImage(
  imageURL: string,
  signal?: AbortSignal,
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    if (!!signal?.aborted) {
      reject(new Error(signal.reason));
      return;
    }

    const image = new Image();

    const handleLoad = () => {
      if (!!signal?.aborted) {
        reject(new Error(signal.reason));
        return;
      }

      image.removeEventListener("load", handleLoad);
      image.removeEventListener("error", handleError);
      resolve(image);
    };

    const handleError = (event: Event | string) => {
      if (!!signal?.aborted) {
        reject(new Error(signal.reason));
        return;
      }

      image.removeEventListener("load", handleLoad);
      image.removeEventListener("error", handleError);
      reject(event);
    };

    image.addEventListener("load", handleLoad);
    image.addEventListener("error", handleError);
    image.src = imageURL;
  });
}
