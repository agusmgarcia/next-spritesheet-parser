import { errors } from "@agusmgarcia/react-essentials-utils";

import { processEvent } from "./processEvent";

const CONTROLLERS: Record<string, AbortController> = {};

self.onmessage = async (event) => {
  const { abort, args, id, type } = event.data;

  if (abort) {
    const controller = CONTROLLERS[id];
    if (!controller) return;
    controller.abort();
    return;
  }

  CONTROLLERS[id] = new AbortController();
  const signal = CONTROLLERS[id].signal;

  try {
    const result = await processEvent(type, ...args, signal);
    self.postMessage({ id, result });
  } catch (error) {
    const message = errors.getMessage(error) || "";
    self.postMessage({ error: message, id });
  } finally {
    delete CONTROLLERS[id];
  }
};
