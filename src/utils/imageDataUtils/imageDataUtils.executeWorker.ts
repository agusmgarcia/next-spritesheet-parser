import { isSSR } from "@agusmgarcia/react-essentials-utils";
import { type Rect } from "blob-detection-ts";
import { v4 as createUUID } from "uuid";

import type rawGenerateNormalMap from "./generateNormalMap.raw";
import type rawGetRects from "./getRects.raw";
import type rawRemoveBackground from "./removeBackground.raw";

export default function executeWorker(
  type: "GENERATE_NORMAL_MAP",
  ...args: [
    ...Parameters<typeof rawGenerateNormalMap>,
    signal: AbortSignal | undefined,
  ]
): Promise<ReturnType<typeof rawGenerateNormalMap> | undefined>;

export default function executeWorker(
  type: "GET_RECTS",
  ...args: [...Parameters<typeof rawGetRects>, signal: AbortSignal | undefined]
): Promise<ReturnType<typeof rawGetRects> | undefined>;

export default function executeWorker(
  type: "REMOVE_BACKGROUND",
  ...args: [
    ...Parameters<typeof rawRemoveBackground>,
    signal: AbortSignal | undefined,
  ]
): Promise<ReturnType<typeof rawRemoveBackground> | undefined>;

export default async function executeWorker(
  type: string,
  ...argsWithSignal: any[]
): Promise<any> {
  const signal: AbortSignal | undefined = argsWithSignal.at(-1);
  signal?.throwIfAborted();

  if (isSSR() || !window.Worker) return undefined;

  return await new Promise<Rect[]>((resolve, reject) => {
    const worker = (window.__GET_SPRITES_WORKER__ ??= new Worker(
      new URL("./imageDataUtils.worker.ts", import.meta.url),
    ));

    const id = createUUID();

    const cleanUp = () => {
      worker.removeEventListener("message", handleMessage);
      signal?.removeEventListener("abort", handleAbort);
    };

    const handleMessage = (event: MessageEvent<Data>) => {
      if (event.data.id !== id) return;
      cleanUp();
      if ("result" in event.data) resolve(event.data.result);
      else reject(new Error(event.data.error));
    };

    const handleAbort = () => {
      cleanUp();
      worker.postMessage({ abort: true, args: [], id, type });
      reject(new Error(signal?.reason || "Aborted"));
    };

    worker.addEventListener("message", handleMessage);
    signal?.addEventListener("abort", handleAbort);

    const args = argsWithSignal.slice(0, -1);
    worker.postMessage({ abort: false, args, id, type });
  });
}

declare global {
  interface Window {
    __GET_SPRITES_WORKER__: Worker | undefined;
  }
}

type Data = {
  id: string;
} & ({ result: any } | { error: string });
