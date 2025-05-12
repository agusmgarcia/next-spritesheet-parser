import { createStore } from "@agusmgarcia/react-core";

import createAnimationsSlice, {
  type AnimationsSliceTypes,
} from "./AnimationsSlice";
import createNotificationSlice, {
  type NotificationSliceTypes,
} from "./NotificationSlice";
import createSettingsSlice, { type SettingsSliceTypes } from "./SettingsSlice";
import createSpriteSelectionSlice from "./SpriteSelectionSlice";
import createSpriteSheetSlice, {
  type SpriteSheetSliceTypes,
} from "./SpriteSheetSlice";

export type Animation =
  AnimationsSliceTypes.default["animations"]["animations"][number];
export type Notification = NonNullable<
  NotificationSliceTypes.default["notification"]["notification"]
>;
export type Settings = SettingsSliceTypes.default["settings"]["settings"];
export type SpriteSheet = NonNullable<
  SpriteSheetSliceTypes.default["spriteSheet"]["data"]
>;

const { useSelector, ...reactStore } = createStore(
  createAnimationsSlice,
  createNotificationSlice,
  createSettingsSlice,
  createSpriteSelectionSlice,
  createSpriteSheetSlice,
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
    setAnimations: useSelector((state) => state.animations.setAnimations),
    setAnimationScale: useSelector(
      (state) => state.animations.setAnimationScale,
    ),
  };
}

export function useNotification() {
  return {
    clearNotification: useSelector(
      (state) => state.notification.clearNotification,
    ),
    notification: useSelector((state) => state.notification.notification),
    setNotification: useSelector((state) => state.notification.setNotification),
  };
}

export function useSettings() {
  return {
    setImage: useSelector((state) => state.settings.setImage),
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
    setSpriteSheet: useSelector((state) => state.spriteSheet.setSpriteSheet),
    setSpriteSheetScale: useSelector(
      (state) => state.spriteSheet.setSpriteSheetScale,
    ),
    splitSprite: useSelector((state) => state.spriteSheet.splitSprite),
    spriteSheet: useSelector((state) => state.spriteSheet.data),
    spriteSheetLoading: useSelector((state) => state.spriteSheet.loading),
  };
}
