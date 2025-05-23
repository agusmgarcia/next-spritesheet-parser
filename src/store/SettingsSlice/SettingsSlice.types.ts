import {
  type AsyncFunc,
  type CreateGlobalSliceTypes,
  type Func,
} from "@agusmgarcia/react-core";

type Settings = {
  delta: number;
  image: { name: string; type: string; url: string } | undefined;
  maxArea: number;
  maxVariation: number;
  minArea: number;
  minDiversity: number;
};

type SettingsSlice = CreateGlobalSliceTypes.SliceOf<
  "settings",
  {
    setImage: AsyncFunc<void, [image: File]>;
    setSettings: Func<
      void,
      [settings: React.SetStateAction<Omit<Settings, "image">>]
    >;
    settings: Settings;
  }
>;

export default SettingsSlice;
