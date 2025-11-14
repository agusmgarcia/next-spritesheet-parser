import { createReactStore } from "@agusmgarcia/react-essentials-store";
import { errors } from "@agusmgarcia/react-essentials-utils";
import { useMemo } from "react";

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
  const id = useSelector((state) => state.animation.state.id);
  const index = useSelector((state) => state.animation.state.index);
  const playing = useSelector((state) => state.animation.state.playing);
  const fps = useSelector((state) => state.animation.fps);

  const incompleteAnimation = useSelector(
    (state) => state.animations.response?.[id],
  );

  const animation = useMemo<Animation | undefined>(() => {
    if (!incompleteAnimation) return undefined;
    return { ...incompleteAnimation, fps, id, index, playing };
  }, [fps, id, incompleteAnimation, index, playing]);

  return {
    animation,
    backwardAnimationIndex: useSelector(
      (state) => state.animation.backwardIndex,
    ),
    backwardAnimationIndexDisabled: useSelector(
      (state) => state.animation.backwardIndexDisabled,
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
    deleteAnimation: useSelector((state) => state.animations.remove),
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
