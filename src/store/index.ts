import { createReactStore } from "@agusmgarcia/react-essentials-store";
import { errors } from "@agusmgarcia/react-essentials-utils";

import AnimationsSlice, { type AnimationsSliceTypes } from "./AnimationsSlice";
import NormalMapSlice, { type NormalMapSliceTypes } from "./NormalMapSlice";
import NotificationSlice, {
  type NotificationSliceTypes,
} from "./NotificationSlice";
import ScaleSlice, { type ScaleSliceTypes } from "./ScaleSlice";
import SpriteSelectionSlice, {
  type SpriteSelectionSliceTypes,
} from "./SpriteSelectionSlice";
import SpriteSheetSlice, {
  type SpriteSheetSliceTypes,
} from "./SpriteSheetSlice";
import UtilsSlice, { type UtilsSliceTypes } from "./UtilsSlice";

export type Animation = AnimationsSliceTypes.Animations[number];
export type NormalMap = NormalMapSliceTypes.NormalMap;
export type Notification = NotificationSliceTypes.Notification;
export type SpriteSelection = SpriteSelectionSliceTypes.SpriteSelection;
export type Scale = ScaleSliceTypes.Scale;
export type SpriteSheet = SpriteSheetSliceTypes.SpriteSheet;
export type Utils = UtilsSliceTypes.Utils;

const { useSelector, ...reactStore } = createReactStore({
  middlewares: (callback, slices) =>
    errors.handle(callback, (error) =>
      slices.notification.set(
        "error",
        errors.getMessage(error) || "Unexpected error",
      ),
    ),
  slices: {
    animations: AnimationsSlice,
    normalMap: NormalMapSlice,
    notification: NotificationSlice,
    scale: ScaleSlice,
    spriteSelection: SpriteSelectionSlice,
    spriteSheet: SpriteSheetSlice,
    utils: UtilsSlice,
  },
});

export const StoreProvider = reactStore.StoreProvider;

export function useAnimations() {
  return {
    animations: useSelector((state) => state.animations.state),
    createAnimation: useSelector((state) => state.animations.create),
    deleteAnimation: useSelector((state) => state.animations.remove),
    resetAnimationCenter: useSelector((state) => state.animations.resetCenter),
    setAnimationCenter: useSelector((state) => state.animations.setCenter),
    setAnimationColor: useSelector((state) => state.animations.setColor),
    setAnimationFPS: useSelector((state) => state.animations.setFPS),
    setAnimationName: useSelector((state) => state.animations.setName),
    setAnimationOnion: useSelector((state) => state.animations.setOnion),
    setAnimationPlaying: useSelector((state) => state.animations.setPlaying),
    toggleAnimationCenterVisibility: useSelector(
      (state) => state.animations.toggleCenterVisibility,
    ),
  };
}

export function useNormalMap() {
  return {
    normalMap: useSelector((state) => state.normalMap.response),
    normalMapLoading: useSelector((state) => state.normalMap.state.loading),
    setNormalMapName: useSelector((state) => state.normalMap.setName),
    setNormalMapSettings: useSelector((state) => state.normalMap.setSettings),
  };
}

export function useNotification() {
  return {
    acceptNotification: useSelector((state) => state.notification.accept),
    cancelNotification: useSelector((state) => state.notification.cancel),
    notification: useSelector((state) => state.notification.state),
    setNotification: useSelector((state) => state.notification.set),
  };
}

export function useScale() {
  return {
    scale: useSelector((state) => state.scale.state),
    setScale: useSelector((state) => state.scale.set),
  };
}

export function useSpriteSelection() {
  return {
    selectSprite: useSelector((state) => state.spriteSelection.select),
    spriteSelection: useSelector((state) => state.spriteSelection.state),
    toggleSpriteSelection: useSelector(
      (state) => state.spriteSelection.toggleSelection,
    ),
    unselectAllSprites: useSelector(
      (state) => state.spriteSelection.unselectAll,
    ),
  };
}

export function useSpriteSheet() {
  return {
    mergeSpriteSheetSprites: useSelector(
      (state) => state.spriteSheet.mergeSprites,
    ),
    removeSpriteSheet: useSelector((state) => state.spriteSheet.remove),
    setSpriteSheetImage: useSelector((state) => state.spriteSheet.setImage),
    setSpriteSheetName: useSelector((state) => state.spriteSheet.setName),
    setSpriteSheetSettings: useSelector(
      (state) => state.spriteSheet.setSettings,
    ),
    splitSpriteSheetSprite: useSelector(
      (state) => state.spriteSheet.splitSprite,
    ),
    spriteSheet: useSelector((state) => state.spriteSheet.response),
    spriteSheetLoading: useSelector((state) => state.spriteSheet.state.loading),
  };
}

export function useUtils() {
  return {
    exportZip: useSelector((state) => state.utils.exportZip),
    importJSON: useSelector((state) => state.utils.importJSON),
  };
}
