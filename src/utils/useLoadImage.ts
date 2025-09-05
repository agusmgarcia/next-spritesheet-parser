import { errors } from "@agusmgarcia/react-essentials-utils";
import { useEffect, useState } from "react";

import loadImage from "./loadImage";

type UseLoadImageResult = {
  error: unknown;
  image: HTMLImageElement | undefined;
  loading: boolean;
};

const initialLoadImageResult: UseLoadImageResult = {
  error: undefined,
  image: undefined,
  loading: false,
};

export default function useLoadImage(imageURL: string): UseLoadImageResult {
  const [result, setResult] = useState(initialLoadImageResult);

  useEffect(() => {
    if (!imageURL) {
      setResult(initialLoadImageResult);
      return;
    }

    const controller = new AbortController();

    setResult((prev) => ({ ...prev, loading: true }));
    loadImage(imageURL, controller.signal)
      .then((image) => {
        if (controller.signal.aborted) return;
        setResult((prev) => ({
          ...prev,
          error: undefined,
          image,
          loading: false,
        }));
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        setResult((prev) => ({
          ...prev,
          error: errors.getMessage(error) || "",
          loading: false,
        }));
      });

    return () => controller.abort();
  }, [imageURL]);

  return result;
}
