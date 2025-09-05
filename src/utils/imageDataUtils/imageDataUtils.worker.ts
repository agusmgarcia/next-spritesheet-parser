import { errors } from "@agusmgarcia/react-essentials-utils";

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

async function processEvent(type: string, ...args: any[]): Promise<any> {
  switch (type) {
    case "GENERATE_NORMAL_MAP":
      return await import("./generateNormalMap.raw")
        .then((module) => module.default)
        .then((callback) => callback(...(args as Parameters<typeof callback>)));

    case "GET_RECTS":
      return await import("./getRects.raw")
        .then((module) => module.default)
        .then((callback) => callback(...(args as Parameters<typeof callback>)));

    case "REMOVE_BACKGROUND":
      return await import("./removeBackground.raw")
        .then((module) => module.default)
        .then((callback) => callback(...(args as Parameters<typeof callback>)));
  }
}
