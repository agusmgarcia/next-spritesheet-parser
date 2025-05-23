import { catchError, createStore } from "@agusmgarcia/react-core";

import { getErrorMessage } from "#src/utils";

import createAnimationsSlice, {
  type AnimationsSliceTypes,
} from "./AnimationsSlice";
import createNormalMapSettingsSlice, {
  type NormalMapSettingsSliceTypes,
} from "./NormalMapSettingsSlice";
import createNormalMapSlice, {
  type NormalMapSliceTypes,
} from "./NormalMapSlice";
import createNotificationSlice, {
  type NotificationSliceTypes,
} from "./NotificationSlice";
import createScaleSlice, { type ScaleSliceTypes } from "./ScaleSlice";
import createSettingsSlice, { type SettingsSliceTypes } from "./SettingsSlice";
import createSpriteSelectionSlice from "./SpriteSelectionSlice";
import createSpriteSheetSlice, {
  type SpriteSheetSliceTypes,
} from "./SpriteSheetSlice";

export type Animation =
  AnimationsSliceTypes.default["animations"]["animations"][number];
export type NormalMapSettings =
  NormalMapSettingsSliceTypes.default["normalMapSettings"]["normalMapSettings"];
export type NormalMap = NonNullable<
  NormalMapSliceTypes.default["normalMap"]["data"]
>;
export type Notification = NonNullable<
  NotificationSliceTypes.default["notification"]["notification"]
>;
export type Scale = ScaleSliceTypes.default["scale"]["scale"];
export type Settings = SettingsSliceTypes.default["settings"]["settings"];
export type SpriteSheet = NonNullable<
  SpriteSheetSliceTypes.default["spriteSheet"]["data"]
>;

const { useSelector, ...reactStore } = createStore(
  createAnimationsSlice,
  createNormalMapSettingsSlice,
  createNormalMapSlice,
  createNotificationSlice,
  createScaleSlice,
  createSettingsSlice,
  createSpriteSelectionSlice,
  createSpriteSheetSlice,
)((callback, context) =>
  catchError(callback, (error) => {
    if (context.signal.aborted) return;
    context.get().notification.setNotification("error", getErrorMessage(error));
  }),
);

export const StoreProvider = reactStore.StoreProvider;

export function useAnimations() {
  return {
    animations: useSelector((state) => state.animations.animations),
    createAnimation: useSelector((state) => state.animations.createAnimation),
    deleteAnimation: useSelector((state) => state.animations.deleteAnimation),
    resetAnimationOffset: useSelector(
      (state) => state.animations.resetAnimationOffset,
    ),
    setAnimationColor: useSelector(
      (state) => state.animations.setAnimationColor,
    ),
    setAnimationFPS: useSelector((state) => state.animations.setAnimationFPS),
    setAnimationName: useSelector((state) => state.animations.setAnimationName),
    setAnimationOffset: useSelector(
      (state) => state.animations.setAnimationOffset,
    ),
    setAnimationOnion: useSelector(
      (state) => state.animations.setAnimationOnion,
    ),
    setAnimationPlaying: useSelector(
      (state) => state.animations.setAnimationPlaying,
    ),
  };
}

export function useNormalMapSettings() {
  return {
    normalMapSettings: useSelector(
      (state) => state.normalMapSettings.normalMapSettings,
    ),
    setNormalMapSettings: useSelector(
      (state) => state.normalMapSettings.setNormalMapSettings,
    ),
  };
}

export function useNormalMap() {
  return {
    normalMap: useSelector((state) => state.normalMap.data),
    normalMapLoading: useSelector((state) => state.normalMap.loading),
  };
}

export function useNotification() {
  return {
    notification: useSelector((state) => state.notification.notification),
    setNotification: useSelector((state) => state.notification.setNotification),
  };
}

export function useScale() {
  return {
    scale: useSelector((state) => state.scale.scale),
    setScale: useSelector((state) => state.scale.setScale),
  };
}

export function useSettings() {
  return {
    setImage: useSelector((state) => state.settings.setImage),
    setJSONFile: useSelector((state) => state.settings.setJSONFile),
    setSettings: useSelector((state) => state.settings.setSettings),
    settings: useSelector((state) => state.settings.settings),
  };
}

export function useSpriteSelection() {
  return {
    selectSprite: useSelector((state) => state.spriteSelection.selectSprite),
    spriteSelection: useSelector(
      (state) => state.spriteSelection.spriteSelection,
    ),
    toggleSpriteSelection: useSelector(
      (state) => state.spriteSelection.toggleSpriteSelection,
    ),
    unselectAllSprites: useSelector(
      (state) => state.spriteSelection.unselectAllSprites,
    ),
  };
}

export function useSpriteSheet() {
  return {
    mergeSprites: useSelector((state) => state.spriteSheet.mergeSprites),
    splitSprite: useSelector((state) => state.spriteSheet.splitSprite),
    spriteSheet: useSelector((state) => state.spriteSheet.data),
    spriteSheetLoading: useSelector((state) => state.spriteSheet.loading),
  };
}
