import { type CreateGlobalSliceTypes } from "@agusmgarcia/react-essentials-store";
import { type Func } from "@agusmgarcia/react-essentials-utils";

type ScaleSlice = CreateGlobalSliceTypes.SliceOf<
  "scale",
  {
    scale: number;
    setScale: Func<void, [scale: React.SetStateAction<number>]>;
  }
>;

export default ScaleSlice;
