import { type Func } from "@agusmgarcia/react-core";

type FilesItemProps = {
  exportFileDisabled: boolean;
  exportFileLoading: boolean;
  exportFileOnClick: Func;
  importFileDisabled: boolean;
  importFileLoading: boolean;
  importFileOnClick: Func;
};

export default FilesItemProps;
