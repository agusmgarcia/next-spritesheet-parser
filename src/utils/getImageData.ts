export default function getImageData(imageURL: string): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    const handleLoad = () => {
      image.removeEventListener("load", handleLoad);
      image.removeEventListener("error", handleError);

      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      const context = canvas.getContext("2d");
      if (!context) {
        reject();
      } else {
        context.drawImage(image, 0, 0);
        resolve(context.getImageData(0, 0, canvas.width, canvas.height));
      }
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
