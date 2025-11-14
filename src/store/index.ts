import { createReactStore } from "@agusmgarcia/react-essentials-store";
import { errors } from "@agusmgarcia/react-essentials-utils";

import { AnimationSlice, type AnimationSliceTypes } from "./AnimationSlice";
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

export type Animation = AnimationSliceTypes.State;
export type Animations = AnimationsSliceTypes.Response;
export type NormalMapImage = NormalMapImageSliceTypes.Response;
export type NormalMapSettings = NormalMapSettingsSliceTypes.Response;
export type Notification = NotificationSliceTypes.State;
export type SpriteSelection = SpriteSelectionSliceTypes.State;
export type Scale = ScaleSliceTypes.State;
export type SpriteSheetImage = SpriteSheetImageSliceTypes.Response;
export type SpriteSheetSettings = SpriteSheetSettingsSliceTypes.Response;
export type SpriteSheet = SpriteSheetSliceTypes.Response;
export type Utils = UtilsSliceTypes.State;

const { useSelector, ...reactStore } = createReactStore({
  middlewares: (callback, slices, signal) =>
    errors.handle(callback, (error) =>
      slices.notification
        .set("error", errors.getMessage(error) || "Unexpected error", signal)
        .then(() => undefined),
    ),
  slices: {
    animation: AnimationSlice,
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

export function useAnimation() {
  return {
    backward: useSelector((state) => state.animation.backward),
    backwardDisabled: useSelector((state) => state.animation.backwardDisabled),
    forward: useSelector((state) => state.animation.forward),
    forwardDisabled: useSelector((state) => state.animation.forwardDisabled),
    fps: useSelector((state) => state.animation.fps),
    index: useSelector((state) => state.animation.state.index),
    minusFPS: useSelector((state) => state.animation.minusFPS),
    minusFPSDisabled: useSelector((state) => state.animation.minusFPSDisabled),
    playing: useSelector((state) => state.animation.state.playing),
    plusFPS: useSelector((state) => state.animation.plusFPS),
    plusFPSDisabled: useSelector((state) => state.animation.plusFPSDisabled),
    resume: useSelector((state) => state.animation.resume),
    resumeDisabled: useSelector((state) => state.animation.resumeDisabled),
    setAnimationId: useSelector((state) => state.animation.setAnimationId),
    setFPS: useSelector((state) => state.animation.setFPS),
    setFPSDisabled: useSelector((state) => state.animation.setFPSDisabled),
    stop: useSelector((state) => state.animation.stop),
    stopDisabled: useSelector((state) => state.animation.stopDisabled),
    toFirst: useSelector((state) => state.animation.toFirst),
    toFirstDisabled: useSelector((state) => state.animation.toFirstDisabled),
    toLast: useSelector((state) => state.animation.toLast),
    toLastDisabled: useSelector((state) => state.animation.toLastDisabled),
  };
}

export function useAnimations() {
  return {
    animations: useSelector((state) => state.animations.response),
    animationsLoading: useSelector((state) => state.animations.loading),
    createAnimation: useSelector((state) => state.animations.create),
    deleteAnimation: useSelector((state) => state.animations.remove),
    resetAnimationCenter: useSelector((state) => state.animations.resetCenter),
    setAnimationCenter: useSelector((state) => state.animations.setCenter),
    setAnimationColor: useSelector((state) => state.animations.setColor),
    setAnimationFPS: useSelector((state) => state.animations.setFPS),
    setAnimationName: useSelector((state) => state.animations.setName),
    toggleAnimationCenterVisibility: useSelector(
      (state) => state.animations.toggleCenterVisibility,
    ),
  };
}

export function useNormalMapImage() {
  return {
    normalMapImage: useSelector((state) => state.normalMapImage.response),
    normalMapImageLoading: useSelector((state) => state.normalMapImage.loading),
  };
}

export function useNormalMapSettings() {
  return {
    normalMapSettings: useSelector((state) => state.normalMapSettings.response),
    normalMapSettingsLoading: useSelector(
      (state) => state.normalMapSettings.loading,
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
    spriteSheetLoading: useSelector((state) => state.spriteSheet.loading),
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
      (state) => state.spriteSheetImage.loading,
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
      (state) => state.spriteSheetSettings.loading,
    ),
  };
}

export function useUtils() {
  return {
    exportZip: useSelector((state) => state.utils.exportZip),
  };
}
