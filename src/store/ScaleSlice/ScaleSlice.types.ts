import {
  type CreateGlobalSliceTypes,
  type Func,
} from "@agusmgarcia/react-core";

type ScaleSlice = CreateGlobalSliceTypes.SliceOf<
  "scale",
  {
    scale: number;
    setScale: Func<void, [scale: React.SetStateAction<number>]>;
  }
>;

export default ScaleSlice;
