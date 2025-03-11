import { Accordion, Button, Icon } from "#src/components";

import useFilesItem from "./FilesItem.hooks";
import type FilesItemProps from "./FilesItem.types";

export default function FilesItem(props: FilesItemProps) {
  const {
    exportFileDisabled,
    exportFileLoading,
    exportFileOnClick,
    heading,
    importFileDisabled,
    importFileLoading,
    importFileOnClick,
  } = useFilesItem(props);

  return (
    <Accordion.Item className="flex flex-col gap-1" heading={heading}>
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
        <Icon
          className={!exportFileLoading ? undefined : "animate-spin"}
          variant={!exportFileLoading ? "downloadFile" : "spinner"}
        />
      </Button>
    </Accordion.Item>
  );
}
