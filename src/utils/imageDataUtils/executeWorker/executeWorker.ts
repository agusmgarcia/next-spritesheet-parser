import { isSSR } from "@agusmgarcia/react-essentials-utils";
import { v4 as createUUID } from "uuid";

import { type Data } from "./executeWorker.types";
import { processEvent } from "./processEvent";

export default async function executeWorker(
  type: string,
  ...argsWithSignal: any[]
): Promise<any> {
  const signal: AbortSignal | undefined = argsWithSignal.at(-1);
  signal?.throwIfAborted();

  if (isSSR() || !window.Worker)
    return await processEvent(type, ...argsWithSignal);

  return await new Promise((resolve, reject) => {
    const worker = (window.__GET_SPRITES_WORKER__ ??= new Worker(
      new URL("./executeWorker.utils.ts", import.meta.url),
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
