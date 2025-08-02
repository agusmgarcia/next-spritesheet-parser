import { ServerSlice } from "@agusmgarcia/react-essentials-store";
import { type Func } from "@agusmgarcia/react-essentials-utils";
import { v4 as createUUID } from "uuid";

import { SpriteSheetParserClient } from "#src/apis";

import type NotificationSlice from "../NotificationSlice";
import type SpriteSheetImageSlice from "../SpriteSheetImageSlice";
import type SpriteSheetSlice from "../SpriteSheetSlice";
import { type SpriteSheetSliceTypes } from "../SpriteSheetSlice";
import { type Animations, type Request } from "./AnimationsSlice.types";

export default class AnimationsSlice extends ServerSlice<
  Animations | undefined,
  Request,
  {
    notification: NotificationSlice;
    spriteSheet: SpriteSheetSlice;
    spriteSheetImage: SpriteSheetImageSlice;
  }
> {
  constructor() {
    super(undefined);
  }

  protected override onBuildRequest(): Request {
    return {
      spriteSheetImage: !!this.slices.spriteSheetImage.response
        ? { id: this.slices.spriteSheetImage.response.id }
        : undefined,
    };
  }

  protected override async onFetch(
    { spriteSheetImage }: Request,
    signal: AbortSignal,
  ): Promise<Animations | undefined> {
    if (!spriteSheetImage) return undefined;

    const state = await SpriteSheetParserClient.INSTANCE.getState(
      { id: spriteSheetImage.id },
      signal,
    );

    if (!!state?.animations) return state.animations;

    return [];
  }

  protected override onInit(signal: AbortSignal): void {
    super.onInit(signal);

    this.slices.spriteSheet.subscribe(
      (state) => state.response,
      (sprites) =>
        (this.response = this.response?.filter((a) =>
          a.sprites.every((s) => !!sprites?.[s.id]),
        )),
    );

    this.subscribe(
      (state) => state.response,
      (animations, _, signal) =>
        !!this.slices.spriteSheetImage.response?.id && !!animations
          ? SpriteSheetParserClient.INSTANCE.patchState(
              { animations, id: this.slices.spriteSheetImage.response.id },
              signal,
            )
          : undefined,
    );
  }

  create(spriteIds: string[]): string | undefined {
    if (spriteIds.length <= 0)
      throw new Error("You need to select at least one sprite");

    const spriteSheetImage = this.slices.spriteSheetImage.response;
    if (!spriteSheetImage)
      throw new Error("You need to provide an image first");

    const spriteSheet = this.slices.spriteSheet.response;
    if (!spriteSheet) throw new Error("You need to provide an image first");

    if (!this.response) throw new Error("You need to provide an image first");

    const animation: Animations[number] = {
      color: spriteSheetImage.backgroundColor,
      fps: 12,
      id: createUUID(),
      name: `New animation ${getLatestAnimationOrder(this.response) + 1}`,
      onion: false,
      playing: spriteIds.length > 1,
      sprites: spriteIds
        .sort(sortSprites(spriteSheet))
        .map(mapSprites(spriteIds, spriteSheet)),
    };

    this.response = [...this.response, animation];
    return animation.id;
  }

  async remove(id: string, signal: AbortSignal): Promise<boolean> {
    const animation = this.response?.find((a) => a.id === id);
    if (!animation) return true;

    const response = await this.slices.notification.set(
      "warning",
      `Are you sure you want to delete the animation **${animation.name}**? This action cannot be undone`,
      signal,
    );
    if (!response) return false;

    if (!this.response) return false;
    this.response = this.response.filter((a) => a.id !== id);

    await this.slices.notification.set("success", "Animation deleted!", signal);
    return true;
  }

  setFPS(id: string, fps: React.SetStateAction<number>): void {
    if (!this.response) throw new Error("You need to provide an image first");
    this.response = this.response.map((a) =>
      a.id === id
        ? {
            ...a,
            fps: Math.max(fps instanceof Function ? fps(a.fps) : fps, 1),
          }
        : a,
    );
  }

  setColor(id: string, color: string): void {
    if (!this.response) throw new Error("You need to provide an image first");
    this.response = this.response.map((a) =>
      a.id === id ? { ...a, color } : a,
    );
  }

  setName(id: string, name: string): void {
    if (!this.response) throw new Error("You need to provide an image first");
    this.response = this.response.map((a) =>
      a.id === id ? { ...a, name } : a,
    );
  }

  setCenter(
    id: string,
    index: number,
    center:
      | Pick<
          Animations[number]["sprites"][number]["center"],
          "offsetX" | "offsetY"
        >
      | Func<
          Pick<
            Animations[number]["sprites"][number]["center"],
            "offsetX" | "offsetY"
          >,
          [center: Animations[number]["sprites"][number]["center"]]
        >,
  ): void {
    if (!this.response) throw new Error("You need to provide an image first");
    this.response = this.response.map((a) =>
      a.id === id
        ? {
            ...a,
            sprites: a.sprites.map((s, i) =>
              i === index
                ? {
                    ...s,
                    center: {
                      ...s.center,
                      ...(center instanceof Function
                        ? center(s.center)
                        : center),
                      visible: true,
                    },
                  }
                : {
                    ...s,
                    center: { ...s.center, visible: true },
                  },
            ),
          }
        : a,
    );
  }

  resetCenter(id: string, index: number): void {
    this.setCenter(id, index, (center) => ({
      offsetX: center.initialOffsetX,
      offsetY: center.initialOffsetY,
    }));
  }

  toggleCenterVisibility(id: string): void {
    if (!this.response) throw new Error("You need to provide an image first");
    this.response = this.response.map((a) =>
      a.id === id
        ? {
            ...a,
            sprites: a.sprites.map((s) => ({
              ...s,
              center: { ...s.center, visible: !s.center.visible },
            })),
          }
        : a,
    );
  }

  setOnion(id: string, onion: React.SetStateAction<boolean>): void {
    if (!this.response) throw new Error("You need to provide an image first");
    this.response = this.response.map((a) =>
      a.id === id
        ? {
            ...a,
            onion: onion instanceof Function ? onion(a.onion) : onion,
          }
        : a,
    );
  }

  setPlaying(id: string, playing: React.SetStateAction<boolean>): void {
    if (!this.response) throw new Error("You need to provide an image first");
    this.response = this.response.map((a) =>
      a.id === id
        ? {
            ...a,
            playing: playing instanceof Function ? playing(a.playing) : playing,
            sprites: (
              playing instanceof Function ? playing(a.playing) : playing
            )
              ? a.sprites.map((s) => ({
                  ...s,
                  boundingBoxes: s.boundingBoxes.map((bb) => ({
                    ...bb,
                    visible: false,
                  })),
                }))
              : a.sprites,
          }
        : a,
    );
  }

  createBoundingBox(id: string, index: number): string {
    const spriteSheet = this.slices.spriteSheet.response;
    if (!spriteSheet) throw new Error("You need to provide an image first");

    if (!this.response) throw new Error("You need to provide an image first");
    const boundingBoxId = createUUID();

    this.response = this.response.map((a) =>
      a.id === id
        ? {
            ...a,
            sprites: a.sprites.map((s, i) =>
              i === index
                ? {
                    ...s,
                    boundingBoxes: [
                      ...s.boundingBoxes,
                      {
                        color: "#008000",
                        height: spriteSheet[s.id].height,
                        id: boundingBoxId,
                        offsetX: 0,
                        offsetY: 0,
                        visible: true,
                        width: spriteSheet[s.id].width,
                      },
                    ],
                  }
                : s,
            ),
          }
        : a,
    );

    return boundingBoxId;
  }

  setBoundingBox(
    id: string,
    index: number,
    boundingBoxId: string,
    boundingBox: React.SetStateAction<
      Pick<
        Animations[number]["sprites"][number]["boundingBoxes"][number],
        "color" | "height" | "offsetX" | "offsetY" | "width"
      >
    >,
  ): void {
    if (!this.response) throw new Error("You need to provide an image first");
    this.response = this.response.map((a) =>
      a.id === id
        ? {
            ...a,
            sprites: a.sprites.map((s, i) =>
              i === index
                ? {
                    ...s,
                    boundingBoxes: s.boundingBoxes
                      .map((bb) =>
                        bb.id === boundingBoxId
                          ? {
                              ...bb,
                              ...(boundingBox instanceof Function
                                ? boundingBox(bb)
                                : boundingBox),
                              visible: true,
                            }
                          : bb,
                      )
                      .map((bb) => ({
                        ...bb,
                        height: Math.max(bb.height, 1),
                        width: Math.max(bb.width, 1),
                      })),
                  }
                : s,
            ),
          }
        : a,
    );
  }

  removeBoundingBox(id: string, index: number, boundingBoxId: string): void {
    if (!this.response) throw new Error("You need to provide an image first");
    this.response = this.response.map((a) =>
      a.id === id
        ? {
            ...a,
            sprites: a.sprites.map((s, i) =>
              i === index
                ? {
                    ...s,
                    boundingBoxes: s.boundingBoxes.filter(
                      (bb) => bb.id !== boundingBoxId,
                    ),
                  }
                : s,
            ),
          }
        : a,
    );
  }

  toggleBoundingBoxVisibility(
    id: string,
    index: number,
    boundingBoxId: string,
  ): void {
    if (!this.response) throw new Error("You need to provide an image first");
    this.response = this.response.map((a) =>
      a.id === id
        ? {
            ...a,
            sprites: a.sprites.map((s, i) =>
              i === index
                ? {
                    ...s,
                    boundingBoxes: s.boundingBoxes.map((bb) =>
                      bb.id === boundingBoxId
                        ? { ...bb, visible: !bb.visible }
                        : bb,
                    ),
                  }
                : s,
            ),
          }
        : a,
    );
  }
}

function sortSprites(
  sprites: SpriteSheetSliceTypes.SpriteSheet,
): Func<number, [spriteId1: string, spriteId2: string]> {
  return (spriteId1, spriteId2) => {
    const sprite1 = sprites[spriteId1];
    const sprite2 = sprites[spriteId2];

    return sprite1.y <= sprite2.y + sprite2.height &&
      sprite1.y + sprite1.height >= sprite2.y
      ? sprite1.x - sprite2.x
      : sprite1.y - sprite2.y;
  };
}

function mapSprites(
  spriteIds: string[],
  sprites: SpriteSheetSliceTypes.SpriteSheet,
): Func<Animations[number]["sprites"][number], [spriteId: string]> {
  const spritesSelected = spriteIds.map((spriteId) => ({
    id: spriteId,
    ...sprites[spriteId],
  }));

  const maxHeight = Math.max(...spritesSelected.map((s) => s.height));

  const result = spritesSelected.reduce(
    (result, s) => {
      result[s.id] = {
        boundingBoxes: [
          {
            color: "#008000",
            height: s.height,
            id: createUUID(),
            offsetX: 0,
            offsetY: 0,
            visible: false,
            width: s.width,
          },
        ],
        center: {
          initialOffsetX: 0,
          initialOffsetY: (maxHeight - s.height) / 2,
          offsetX: 0,
          offsetY: (maxHeight - s.height) / 2,
          visible: false,
        },
        id: s.id,
      };
      return result;
    },
    {} as Record<string, Animations[number]["sprites"][number]>,
  );

  return (spriteId) => result[spriteId];
}

function getLatestAnimationOrder(animations: Animations): number {
  return (
    animations
      .map((a) => +(a.name.match(/^New animation (\d+)$/)?.at(1) || "0"))
      .sort()
      .at(-1) || 0
  );
}
