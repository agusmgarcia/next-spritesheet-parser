import React from "react";

import {
  Accordion,
  Button,
  Divisor,
  Icon,
  Input,
  Typography,
} from "#src/components";

import useBoundingBoxesItem from "./BoundingBoxesItem.hooks";
import type BoundingBoxesItemProps from "./BoundingBoxesItem.types";

export default function BoundingBoxesItem(props: BoundingBoxesItemProps) {
  const {
    boundingBoxes,
    createBoundingBoxDisabled,
    createBoundingBoxOnClick,
    ...rest
  } = useBoundingBoxesItem(props);

  return (
    <Accordion.Item
      {...rest}
      className="flex flex-col gap-1"
      heading={
        <Typography className="text-white" variant="h2">
          Bounding Boxes
        </Typography>
      }
    >
      <div className="flex flex-col gap-4">
        {boundingBoxes.map((bb) => (
          <React.Fragment key={bb.id}>
            <div className="flex flex-col gap-1">
              <div className="flex gap-1">
                {/* OFFSET X */}
                <Input
                  aria-label="Offset X"
                  className="text-center"
                  disabled={bb.disabled}
                  name="offsetX"
                  onChange={bb.onChange}
                  placeholder="X"
                  type="number"
                  value={bb.offsetX}
                />

                {/* OFFSET Y */}
                <Input
                  aria-label="Offset Y"
                  className="text-center"
                  disabled={bb.disabled}
                  name="offsetY"
                  onChange={bb.onChange}
                  placeholder="Y"
                  type="number"
                  value={bb.offsetY}
                />

                {/* WIDTH */}
                <Input
                  aria-label="Width"
                  className="text-center"
                  disabled={bb.disabled}
                  min={1}
                  name="width"
                  onChange={bb.onChange}
                  placeholder="Width"
                  type="number"
                  value={bb.width}
                />

                {/* HEIGHT */}
                <Input
                  aria-label="Height"
                  className="text-center"
                  disabled={bb.disabled}
                  min={1}
                  name="height"
                  onChange={bb.onChange}
                  placeholder="Height"
                  type="number"
                  value={bb.height}
                />
              </div>

              <div className="flex gap-1">
                {/* TOOGLE VISIBILITY */}
                <Button
                  className="flex w-fit items-center justify-center"
                  disabled={bb.toggleVisibilityDisabled}
                  onClick={bb.toggleVisibilityOnClick}
                  variant={bb.visible ? "primary" : "secondary"}
                >
                  <Icon variant={bb.visible ? "eye" : "eyeClosed"} />
                </Button>

                {/* COLOR */}
                <Input
                  aria-label="Color"
                  disabled={bb.disabled}
                  name="color"
                  onChange={bb.onChange}
                  type="color"
                  value={bb.color}
                />

                {/* SELECT */}
                <Button
                  className="flex w-fit items-center justify-center"
                  disabled={bb.resetDisabled}
                  onClick={bb.resetOnClick}
                  variant="secondary"
                >
                  <Icon variant="center" />
                </Button>

                {/* DELETE BOUNDING BOX */}
                <Button
                  className="flex w-fit items-center justify-center"
                  disabled={bb.deleteDisabled}
                  onClick={bb.deleteOnClick}
                  variant="secondary"
                >
                  <Icon variant="trash" />
                </Button>
              </div>
            </div>

            <Divisor className="bg-white" />
          </React.Fragment>
        ))}

        <Button
          disabled={createBoundingBoxDisabled}
          onClick={createBoundingBoxOnClick}
          variant="primary"
        >
          Create
        </Button>
      </div>
    </Accordion.Item>
  );
}
