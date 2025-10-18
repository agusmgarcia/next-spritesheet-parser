import { createReactStore } from "@agusmgarcia/react-essentials-store";
import { errors } from "@agusmgarcia/react-essentials-utils";

import { AnimationsSlice, type AnimationsSliceTypes } from "./AnimationsSlice";
import {
  NormalMapImageSlice,
  type NormalMapImageSliceTypes,
} from "./NormalMapImageSlice";
import {
  NormalMapSettingsSlice,
  type NormalMapSettingsSliceTypes,
} from "./NormalMapSettingsSlice";
import {
  NotificationSlice,
  type NotificationSliceTypes,
} from "./NotificationSlice";
import { ScaleSlice, type ScaleSliceTypes } from "./ScaleSlice";
import {
  SpriteSelectionSlice,
  type SpriteSelectionSliceTypes,
} from "./SpriteSelectionSlice";
import {
  SpriteSheetImageSlice,
  type SpriteSheetImageSliceTypes,
} from "./SpriteSheetImageSlice";
import {
  SpriteSheetSettingsSlice,
  type SpriteSheetSettingsSliceTypes,
} from "./SpriteSheetSettingsSlice";
import {
  SpriteSheetSlice,
  type SpriteSheetSliceTypes,
} from "./SpriteSheetSlice";
import { UtilsSlice, type UtilsSliceTypes } from "./UtilsSlice";

export type Animation = AnimationsSliceTypes.Animations[number];
export type NormalMapImage = NormalMapImageSliceTypes.NormalMapImage;
export type NormalMapSettings = NormalMapSettingsSliceTypes.NormalMapSettings;
export type Notification = NotificationSliceTypes.Notification;
export type SpriteSelection = SpriteSelectionSliceTypes.SpriteSelection;
export type Scale = ScaleSliceTypes.Scale;
export type SpriteSheetImage = SpriteSheetImageSliceTypes.SpriteSheetImage;
export type SpriteSheetSettings =
  SpriteSheetSettingsSliceTypes.SpriteSheetSettings;
export type SpriteSheet = SpriteSheetSliceTypes.SpriteSheet;
export type Utils = UtilsSliceTypes.Utils;

const { useSelector, ...reactStore } = createReactStore({
  middlewares: (callback, slices, signal) =>
    errors.handle(callback, (error) =>
      slices.notification
        .set("error", errors.getMessage(error) || "Unexpected error", signal)
        .then(() => undefined),
    ),
  slices: {
    animations: AnimationsSlice,
    normalMapImage: NormalMapImageSlice,
    normalMapSettings: NormalMapSettingsSlice,
    notification: NotificationSlice,
    scale: ScaleSlice,
    spriteSelection: SpriteSelectionSlice,
    spriteSheet: SpriteSheetSlice,
    spriteSheetImage: SpriteSheetImageSlice,
    spriteSheetSettings: SpriteSheetSettingsSlice,
    utils: UtilsSlice,
  },
});

export const StoreProvider = reactStore.StoreProvider;

export function useAnimations() {
  return {
    animations: useSelector((state) => state.animations.response),
    animationsLoading: useSelector((state) => state.animations.state.loading),
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

export function useNormalMapImage() {
  return {
    normalMapImage: useSelector((state) => state.normalMapImage.response),
    normalMapImageLoading: useSelector(
      (state) => state.normalMapImage.state.loading,
    ),
  };
}

export function useNormalMapSettings() {
  return {
    normalMapSettings: useSelector((state) => state.normalMapSettings.response),
    normalMapSettingsLoading: useSelector(
      (state) => state.normalMapSettings.state.loading,
    ),
    setNormalMapSettings: useSelector(
      (state) => state.normalMapSettings.setSettings,
    ),
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
    splitSpriteSheetSprite: useSelector(
      (state) => state.spriteSheet.splitSprite,
    ),
    spriteSheet: useSelector((state) => state.spriteSheet.response),
    spriteSheetLoading: useSelector((state) => state.spriteSheet.state.loading),
  };
}

export function useSpriteSheetImage() {
  return {
    removeSpriteSheetImage: useSelector(
      (state) => state.spriteSheetImage.removeImage,
    ),
    setSpriteSheetImage: useSelector(
      (state) => state.spriteSheetImage.setImage,
    ),
    spriteSheetImage: useSelector((state) => state.spriteSheetImage.response),
    spriteSheetImageLoading: useSelector(
      (state) => state.spriteSheetImage.state.loading,
    ),
  };
}

export function useSpriteSheetSettings() {
  return {
    setSpriteSheetSettings: useSelector(
      (state) => state.spriteSheetSettings.setSettings,
    ),
    spriteSheetSettings: useSelector(
      (state) => state.spriteSheetSettings.response,
    ),
    spriteSheetSettingsLoading: useSelector(
      (state) => state.spriteSheetSettings.state.loading,
    ),
  };
}

export function useUtils() {
  return {
    exportZip: useSelector((state) => state.utils.exportZip),
  };
}
