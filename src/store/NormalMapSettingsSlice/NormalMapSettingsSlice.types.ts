import {
  type CreateGlobalSliceTypes,
  type Func,
} from "@agusmgarcia/react-core";

type NormalMapSettings = {
  strength: number;
};

type NormalMapSettingsSlice = CreateGlobalSliceTypes.SliceOf<
  "normalMapSettings",
  {
    normalMapSettings: NormalMapSettings;
    setNormalMapSettings: Func<
      void,
      [normalMapSettings: React.SetStateAction<NormalMapSettings>]
    >;
  }
>;

export default NormalMapSettingsSlice;
