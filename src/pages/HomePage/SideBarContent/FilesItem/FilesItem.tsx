import { Accordion, Button, Icon, Input, Typography } from "#src/components";

import useFilesItem from "./FilesItem.hooks";
import type FilesItemProps from "./FilesItem.types";

export default function FilesItem(props: FilesItemProps) {
  const {
    exportFileDisabled,
    exportFileOnClick,
    importFileDisabled,
    importFileLoading,
    importFileOnClick,
    nameDisabled,
    nameOnChange,
    nameTermination,
    nameValue,
    removeSpriteSheetDisabled,
    removeSpriteSheetOnClick,
    ...rest
  } = useFilesItem(props);

  return (
    <Accordion.Item
      {...rest}
      className="flex flex-col gap-1"
      heading={
        <Typography className="text-white" variant="h2">
          Files
        </Typography>
      }
    >
      <div className="flex gap-1">
        {/* NAME */}
        <Input
          aria-label="Name"
          autoComplete="off"
          className="text-center"
          disabled={nameDisabled}
          name="name"
          onChange={nameOnChange}
          placeholder="Sprite sheet name..."
          value={nameValue}
        />

        {/* TERMINATION */}
        <Input
          className="w-16 text-center"
          disabled={true}
          name="termination"
          value={nameTermination}
        />

        {/* REMOVE SPRITE SHEET */}
        <Button
          className="flex w-fit items-center justify-center"
          disabled={removeSpriteSheetDisabled}
          onClick={removeSpriteSheetOnClick}
          variant="secondary"
        >
          <Icon variant="trash" />
        </Button>
      </div>

      {/* IMPORT FILE */}
      <Button
        className="flex items-center justify-center gap-1"
        disabled={importFileDisabled}
        onClick={importFileOnClick}
        variant="primary"
      >
        Import
        <Icon
          className={!importFileLoading ? undefined : "animate-spin"}
          variant={!importFileLoading ? "uploadFile" : "spinner"}
        />
      </Button>

      {/* EXPORT FILE */}
      <Button
        className="flex items-center justify-center gap-1"
        disabled={exportFileDisabled}
        onClick={exportFileOnClick}
        variant="secondary"
      >
        Export
        <Icon variant="downloadFile" />
      </Button>
    </Accordion.Item>
  );
}
