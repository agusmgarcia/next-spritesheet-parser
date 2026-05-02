import { createReactStore } from "@agusmgarcia/react-essentials-store";
import { errors } from "@agusmgarcia/react-essentials-utils";

import { AnimationsSlice, type AnimationsSliceTypes } from "./AnimationsSlice";
import {
  DeletedSpritesSlice,
  type DeletedSpritesSliceTypes,
} from "./DeletedSpritesSlice";
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
export type DeletedSprites = DeletedSpritesSliceTypes.DeletedSprites;
export type NormalMapImage = NormalMapImageSliceTypes.NormalMapImage;
export type NormalMapSettings = NormalMapSettingsSliceTypes.NormalMapSettings;
export type Notification = NotificationSliceTypes.Notification;
export type Scale = ScaleSliceTypes.Scale;
export type SpriteSelection = SpriteSelectionSliceTypes.SpriteSelection;
export type SpriteSheet = SpriteSheetSliceTypes.SpriteSheet;
export type SpriteSheetImage = SpriteSheetImageSliceTypes.SpriteSheetImage;
export type SpriteSheetSettings =
  SpriteSheetSettingsSliceTypes.SpriteSheetSettings;
export type Utils = UtilsSliceTypes.Utils;

const reactStore = createReactStore({
  middlewares: (callback, slices, signal) =>
    errors.handle(callback, (error) =>
      slices.notification
        .set("error", errors.getMessage(error) || "Unexpected error", signal)
        .then(() => undefined),
    ),
  slices: {
    animations: AnimationsSlice,
    deletedSprites: DeletedSpritesSlice,
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

const useSelector = reactStore.useSelector;

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
    setAnimationGrid: useSelector((state) => state.animations.setGrid),
    setAnimationName: useSelector((state) => state.animations.setName),
    setAnimationOnion: useSelector((state) => state.animations.setOnion),
    setAnimationPlaying: useSelector((state) => state.animations.setPlaying),
    toggleAnimationCenterVisibility: useSelector(
      (state) => state.animations.toggleCenterVisibility,
    ),
  };
}

export function useDeletedSprites() {
  return {
    deletedSprites: useSelector((state) => state.deletedSprites.response),
    deletedSpritesLoading: useSelector((state) => state.deletedSprites.loading),
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
    setNormalMapSettings: useSelector((state) => state.normalMapSettings.set),
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
    selectSprite: useSelector((state) => state.spriteSelection.set),
    spriteSelection: useSelector((state) => state.spriteSelection.state),
    toggleSpriteSelection: useSelector((state) => state.spriteSelection.toggle),
    unselectAllSprites: useSelector((state) => state.spriteSelection.clear),
  };
}

export function useSpriteSheet() {
  return {
    deleteSpriteSheetSprites: useSelector(
      (state) => state.spriteSheet.deleteSprites,
    ),
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
      (state) => state.spriteSheetImage.remove,
    ),
    setSpriteSheetImage: useSelector((state) => state.spriteSheetImage.set),
    spriteSheetImage: useSelector((state) => state.spriteSheetImage.response),
    spriteSheetImageLoading: useSelector(
      (state) => state.spriteSheetImage.state.loading,
    ),
  };
}

export function useSpriteSheetSettings() {
  return {
    setSpriteSheetSettings: useSelector(
      (state) => state.spriteSheetSettings.set,
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
