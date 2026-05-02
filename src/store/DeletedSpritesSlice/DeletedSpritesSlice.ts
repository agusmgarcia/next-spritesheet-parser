import { ServerSlice } from "@agusmgarcia/react-essentials-store";
import { filters } from "@agusmgarcia/react-essentials-utils";

import { SpriteSheetParserClient } from "#src/clients";

import { type SpriteSheetImageSlice } from "../SpriteSheetImageSlice";
import { type SpriteSheetSlice } from "../SpriteSheetSlice";
import { type DeletedSprites, type Request } from "./DeletedSpritesSlice.types";

export default class DeletedSpritesSlice extends ServerSlice<
  DeletedSprites | undefined,
  Request,
  { spriteSheet: SpriteSheetSlice; spriteSheetImage: SpriteSheetImageSlice }
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
  ): Promise<DeletedSprites | undefined> {
    if (!spriteSheetImage) return undefined;

    const state = await SpriteSheetParserClient.INSTANCE.getState(
      { id: spriteSheetImage.id },
      signal,
    );

    return state?.deletedSprites || [];
  }

  protected override onInit(signal: AbortSignal): void {
    super.onInit(signal);

    this.subscribe(
      (state) => state.response,
      (deletedSprites, signal) =>
        !!this.slices.spriteSheetImage.response?.id && !!deletedSprites
          ? SpriteSheetParserClient.INSTANCE.patchState(
              { deletedSprites, id: this.slices.spriteSheetImage.response.id },
              signal,
            )
          : undefined,
    );
  }

  set(spriteIds: string[]): void {
    if (spriteIds.length <= 0)
      throw new Error("You need to select at least one sprite");

    const spriteSheet = this.slices.spriteSheet.response;
    if (!spriteSheet) throw new Error("You need to provide an image first");

    if (!this.response) throw new Error("You need to provide an image first");

    const deletedSprites = spriteIds
      .filter((spriteId) => !!spriteSheet[spriteId])
      .map((spriteId) => ({
        height: spriteSheet[spriteId].height,
        id: spriteId,
        width: spriteSheet[spriteId].width,
        x: spriteSheet[spriteId].x,
        y: spriteSheet[spriteId].y,
      }));

    if (!deletedSprites.length) return;

    this.response = [...this.response, ...deletedSprites].filter(
      filters.distinct,
    );
  }
}
