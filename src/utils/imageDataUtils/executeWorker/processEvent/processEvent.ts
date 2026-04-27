export default async function processEvent(
  type: string,
  ...args: any[]
): Promise<any> {
  switch (type) {
    case "GENERATE_NORMAL_MAP":
      return await import("./generateNormalMap")
        .then((module) => module.generateNormalMap)
        .then((callback) => callback(...(args as Parameters<typeof callback>)));

    case "GET_BACKGROUND":
      return await import("./getBackground")
        .then((module) => module.getBackground)
        .then((callback) => callback(...(args as Parameters<typeof callback>)));

    case "GET_BACKGROUND_COLOR":
      return await import("./getBackgroundColor")
        .then((module) => module.getBackgroundColor)
        .then((callback) => callback(...(args as Parameters<typeof callback>)));

    case "GET_HASH":
      return await import("./getHash")
        .then((module) => module.getHash)
        .then((callback) => callback(...(args as Parameters<typeof callback>)));

    case "GET_RECTS":
      return await import("./getRects")
        .then((module) => module.getRects)
        .then((callback) => callback(...(args as Parameters<typeof callback>)));

    case "REMOVE_BACKGROUND":
      return await import("./removeBackground")
        .then((module) => module.removeBackground)
        .then((callback) => callback(...(args as Parameters<typeof callback>)));
  }
}
