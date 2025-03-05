export default function loadImage(imageURL: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    const handleLoad = () => {
      image.removeEventListener("load", handleLoad);
      image.removeEventListener("error", handleError);
      resolve(image);
    };

    const handleError = (event: Event | string) => {
      image.removeEventListener("load", handleLoad);
      image.removeEventListener("error", handleError);
      reject(event);
    };

    image.addEventListener("load", handleLoad);
    image.addEventListener("error", handleError);
    image.src = imageURL;
  });
}
