import { Accordion, Button, Icon, Typography } from "#src/components";

import useFilesItem from "./FilesItem.hooks";
import type FilesItemProps from "./FilesItem.types";

export default function FilesItem(props: FilesItemProps) {
  const {
    exportFileDisabled,
    exportFileOnClick,
    importFileDisabled,
    importFileLoading,
    importFileOnClick,
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
