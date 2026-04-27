export { type ProcessEventTypes } from "./processEvent";

declare global {
  // eslint-disable-next-line project-structure/file-composition
  var __GET_SPRITES_WORKER__: Worker | undefined;
}

export type Data = {
  id: string;
} & ({ result: any } | { error: string });
