import {
  createGlobalSlice,
  type CreateGlobalSliceTypes,
} from "@agusmgarcia/react-essentials-store";

import { type SpriteSheetSliceTypes } from "../SpriteSheetSlice";
import type ScaleSlice from "./ScaleSlice.types";

export default createGlobalSlice<ScaleSlice, SpriteSheetSliceTypes.default>(
  "scale",
  (subscribe) => {
    subscribe(
      (context) => setScale(1, context),
      (state) => state.spriteSheet.data?.image.url,
    );

    return {
      scale: 1,
      setScale,
    };
  },
);

function setScale(
  scale: Parameters<ScaleSlice["scale"]["setScale"]>[0],
  context: CreateGlobalSliceTypes.Context<ScaleSlice>,
): void {
  context.set((prev) => ({
    scale: Math.max(scale instanceof Function ? scale(prev.scale) : scale, 1),
  }));
}
