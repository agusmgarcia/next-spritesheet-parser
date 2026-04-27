import { executeWorker, type ExecuteWorkerTypes } from "./executeWorker";

export { createFile } from "./createFile";
export { get } from "./get";

export function generateNormalMap(
  ...args: [
    ...ExecuteWorkerTypes.ProcessEventTypes.GenerateNormalMapTypes.Input,
    signal: AbortSignal,
  ]
): Promise<ExecuteWorkerTypes.ProcessEventTypes.GenerateNormalMapTypes.Output> {
  return executeWorker("GENERATE_NORMAL_MAP", ...args);
}

export function getBackground(
  ...args: [
    ...ExecuteWorkerTypes.ProcessEventTypes.GetBackgroundTypes.Input,
    signal: AbortSignal,
  ]
): Promise<ExecuteWorkerTypes.ProcessEventTypes.GetBackgroundTypes.Output> {
  return executeWorker("GET_BACKGROUND", ...args);
}

export function getBackgroundColor(
  ...args: [
    ...ExecuteWorkerTypes.ProcessEventTypes.GetBackgroundColorTypes.Input,
    signal: AbortSignal,
  ]
): Promise<ExecuteWorkerTypes.ProcessEventTypes.GetBackgroundColorTypes.Output> {
  return executeWorker("GET_BACKGROUND_COLOR", ...args);
}

export function getHash(
  ...args: [
    ...ExecuteWorkerTypes.ProcessEventTypes.GetHashTypes.Input,
    signal: AbortSignal,
  ]
): Promise<ExecuteWorkerTypes.ProcessEventTypes.GetHashTypes.Output> {
  return executeWorker("GET_HASH", ...args);
}

export function getRects(
  ...args: [
    ...ExecuteWorkerTypes.ProcessEventTypes.GetRectsTypes.Input,
    signal: AbortSignal,
  ]
): Promise<ExecuteWorkerTypes.ProcessEventTypes.GetRectsTypes.Output> {
  return executeWorker("GET_RECTS", ...args);
}

export function removeBackground(
  ...args: [
    ...ExecuteWorkerTypes.ProcessEventTypes.RemoveBackgroundTypes.Input,
    signal: AbortSignal,
  ]
): Promise<ExecuteWorkerTypes.ProcessEventTypes.RemoveBackgroundTypes.Output> {
  return executeWorker("REMOVE_BACKGROUND", ...args);
}
