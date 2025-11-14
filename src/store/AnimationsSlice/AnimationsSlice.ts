import { ServerSlice } from "@agusmgarcia/react-essentials-store";
import { equals, type Func } from "@agusmgarcia/react-essentials-utils";
import { v4 as createUUID } from "uuid";

import { SpriteSheetParserClient } from "#src/apis";

import { type NotificationSlice } from "../NotificationSlice";
import { type SpriteSelectionSlice } from "../SpriteSelectionSlice";
import { type SpriteSheetImageSlice } from "../SpriteSheetImageSlice";
import { type SpriteSheetSlice } from "../SpriteSheetSlice";
import { type SpriteSheetSliceTypes } from "../SpriteSheetSlice";
import { type Request, type Response } from "./AnimationsSlice.types";

export default class AnimationsSlice extends ServerSlice<
  Response | undefined,
  Request,
  {
    notification: NotificationSlice;
    spriteSelection: SpriteSelectionSlice;
    spriteSheet: SpriteSheetSlice;
    spriteSheetImage: SpriteSheetImageSlice;
  }
> {
  constructor() {
    super(undefined);
  }

  protected override onRequestBuild(): Request {
    return {
      spriteSheetImage: !!this.slices.spriteSheetImage.response
        ? { id: this.slices.spriteSheetImage.response.id }
        : undefined,
    };
  }

  protected override async onFetch(
    { spriteSheetImage }: Request,
    signal: AbortSignal,
  ): Promise<Response | undefined> {
    if (!spriteSheetImage) return undefined;

    const state = await SpriteSheetParserClient.INSTANCE.getState(
      { id: spriteSheetImage.id },
      signal,
    );

    if (!!state?.animations) return state.animations;
    return {};
  }

  protected override onInit(signal: AbortSignal): void {
    super.onInit(signal);

    this.slices.spriteSheet.subscribe(
      (state) => state.response,
      (sprites) => {
        if (!this.response) return;

        const animationIdsToDelete = Object.keys(this.response).filter(
          (id) => !!this.response?.[id].sprites.every((s) => !!sprites?.[s.id]),
        );

        if (!animationIdsToDelete.length) return;

        const newResponse = { ...this.response };
        animationIdsToDelete.forEach((aId) => delete newResponse[aId]);
        this.response = newResponse;
      },
    );

    this.subscribe(
      (state) => state.response,
      (animations, signal) =>
        !!this.slices.spriteSheetImage.response?.id && !!animations
          ? SpriteSheetParserClient.INSTANCE.patchState(
              { animations, id: this.slices.spriteSheetImage.response.id },
              signal,
            )
          : undefined,
    );
  }

  get createDisabled(): boolean {
    return (
      !this.slices.spriteSheetImage.response ||
      !this.slices.spriteSheet.response ||
      !this.slices.spriteSelection.state.length ||
      !this.response
    );
  }

  create(): string | undefined {
    if (this.createDisabled) return undefined;

    const spriteSheetImage = this.slices.spriteSheetImage.response;
    if (!spriteSheetImage) throw new Error("Unexpected scenario");

    const spriteSheet = this.slices.spriteSheet.response;
    if (!spriteSheet) throw new Error("Unexpected scenario");

    if (!this.response) throw new Error("Unexpected scenario");
    const spriteIds = this.slices.spriteSelection.state;

    const id = createUUID();
    this.response = {
      ...this.response,
      [id]: {
        color: spriteSheetImage.backgroundColor,
        fps: 12,
        name: `New animation ${getLatestAnimationOrder(this.response) + 1}`,
        sprites: spriteIds
          .sort(sortSprites(spriteSheet))
          .map(mapSprites(spriteIds, spriteSheet)),
      },
    };

    this.slices.spriteSelection.unselectAll();
    return id;
  }

  get removeDisabled(): boolean {
    return !this.response;
  }

  async remove(id: string, signal: AbortSignal): Promise<boolean> {
    if (this.removeDisabled) return false;

    const animation = this.response?.[id];
    if (!animation) return true;

    const response = await this.slices.notification.set(
      "warning",
      `Are you sure you want to delete the animation **${animation.name}**? This action cannot be undone`,
      signal,
    );
    if (!response) return false;

    const newResponse = { ...this.response };
    delete newResponse[id];
    this.response = newResponse;

    await this.slices.notification.set("success", "Animation deleted!", signal);
    return true;
  }

  set(
    id: string,
    factory: Func<Response[number], [animation: Response[number]]>,
  ): void {
    const animation = this.response?.[id];
    if (!animation) return;

    const newAnimation = factory(animation);
    if (equals.strict(animation, newAnimation)) return;

    this.response = { ...this.response, [id]: newAnimation };
  }
}

function sortSprites(
  sprites: SpriteSheetSliceTypes.Response,
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
  sprites: SpriteSheetSliceTypes.Response,
): Func<Response[number]["sprites"][number], [spriteId: string]> {
  const spritesSelected = spriteIds.map((spriteId) => ({
    id: spriteId,
    ...sprites[spriteId],
  }));

  const maxHeight = Math.max(...spritesSelected.map((s) => s.height));

  const result = spritesSelected.reduce(
    (result, s) => {
      result[s.id] = {
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
    {} as Record<string, Response[number]["sprites"][number]>,
  );

  return (spriteId) => result[spriteId];
}

function getLatestAnimationOrder(animations: Response): number {
  return (
    Object.values(animations)
      .map((a) => +(a.name.match(/^New animation (\d+)$/)?.at(1) || "0"))
      .sort()
      .at(-1) || 0
  );
}
