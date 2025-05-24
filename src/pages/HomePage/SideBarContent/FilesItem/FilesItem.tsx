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
    nameValue,
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
      {/* NAME */}
      <Input
        aria-label="Name"
        className="text-center"
        disabled={nameDisabled}
        name="name"
        onChange={nameOnChange}
        placeholder="Sprite sheet name..."
        value={nameValue}
      />

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
