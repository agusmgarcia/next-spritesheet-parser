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

export type Animation = AnimationsSliceTypes.Response[string] &
  AnimationSliceTypes.State;
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
    animation: useSelector((state) => state.animation.state),
    backwardAnimationIndex: useSelector(
      (state) => state.animation.backwardIndex,
    ),
    backwardAnimationIndexDisabled: useSelector(
      (state) => state.animation.backwardIndexDisabled,
    ),
    deleteAnimation: useSelector((state) => state.animation.remove),
    deleteAnimationDisabled: useSelector(
      (state) => state.animation.removeDisabled,
    ),
    forwardAnimationIndex: useSelector((state) => state.animation.forwardIndex),
    forwardAnimationIndexDisabled: useSelector(
      (state) => state.animation.forwardIndexDisabled,
    ),
    minusAnimationFPS: useSelector((state) => state.animation.minusFPS),
    minusAnimationFPSDisabled: useSelector(
      (state) => state.animation.minusFPSDisabled,
    ),
    plusAnimationFPS: useSelector((state) => state.animation.plusFPS),
    plusAnimationFPSDisabled: useSelector(
      (state) => state.animation.plusFPSDisabled,
    ),
    resumeAnimation: useSelector((state) => state.animation.resume),
    resumeAnimationDisabled: useSelector(
      (state) => state.animation.resumeDisabled,
    ),
    setAnimationFPS: useSelector((state) => state.animation.setFPS),
    setAnimationFPSDisabled: useSelector(
      (state) => state.animation.setFPSDisabled,
    ),
    setAnimationId: useSelector((state) => state.animation.setId),
    setAnimationIdDisabled: useSelector(
      (state) => state.animation.setIdDisabled,
    ),
    setColor: useSelector((state) => state.animation.setColor),
    setColorDisabled: useSelector((state) => state.animation.setColorDisabled),
    setName: useSelector((state) => state.animation.setName),
    setNameDisabled: useSelector((state) => state.animation.setNameDisabled),
    stopAnimation: useSelector((state) => state.animation.stop),
    stopAnimationDisabled: useSelector((state) => state.animation.stopDisabled),
    toFirstAnimationIndex: useSelector((state) => state.animation.toFirstIndex),
    toFirstAnimationIndexDisabled: useSelector(
      (state) => state.animation.toFirstIndexDisabled,
    ),
    toLastAnimationIndex: useSelector((state) => state.animation.toLastIndex),
    toLastAnimationIndexDisabled: useSelector(
      (state) => state.animation.toLastIndexDisabled,
    ),
  };
}

export function useAnimations() {
  return {
    animations: useSelector((state) => state.animations.response),
    animationsLoading: useSelector((state) => state.animations.loading),
    createAnimation: useSelector((state) => state.animations.create),
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
    setNormalMapSettings: useSelector((state) => state.normalMapSettings.set),
    setNormalMapSettingsDisabled: useSelector(
      (state) => state.normalMapSettings.setDisabled,
    ),
  };
}

export function useNotification() {
  return {
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
      (state) => state.spriteSheetImage.remove,
    ),
    setSpriteSheetImage: useSelector((state) => state.spriteSheetImage.set),
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
