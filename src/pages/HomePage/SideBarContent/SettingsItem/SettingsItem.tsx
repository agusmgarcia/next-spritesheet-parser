import { Accordion, Input, Typography } from "#src/components";

import useSettingsItem from "./SettingsItem.hooks";
import type SettingsItemProps from "./SettingsItem.types";

export default function SettingsItem(props: SettingsItemProps) {
  const {
    settingsDisabled,
    settingsOnChange,
    settingsOnMouseUp,
    settingsValue,
    ...rest
  } = useSettingsItem(props);

  return (
    <Accordion.Item
      {...rest}
      className="flex flex-col gap-1"
      heading={
        <Typography className="text-white" variant="h2">
          Settings
        </Typography>
      }
    >
      <label className="flex items-center justify-between gap-2 text-white">
        Delta
        <Input
          className="w-2/3 text-center"
          disabled={settingsDisabled}
          max={20}
          min={1}
          name="delta"
          onChange={settingsOnChange}
          onMouseUp={settingsOnMouseUp}
          type="range"
          value={settingsValue.delta}
        />
      </label>

      <label className="flex items-center justify-between gap-2 text-white">
        Min diversity
        <Input
          className="w-2/3 text-center"
          disabled={settingsDisabled}
          max={1}
          min={0.01}
          name="minDiversity"
          onChange={settingsOnChange}
          onMouseUp={settingsOnMouseUp}
          step={0.01}
          type="range"
          value={settingsValue.minDiversity}
        />
      </label>

      <label className="flex items-center justify-between gap-2 text-white">
        Max variation
        <Input
          className="w-2/3 text-center"
          disabled={settingsDisabled}
          max={1}
          min={0.01}
          name="maxVariation"
          onChange={settingsOnChange}
          onMouseUp={settingsOnMouseUp}
          step={0.01}
          type="range"
          value={settingsValue.maxVariation}
        />
      </label>
    </Accordion.Item>
  );
}
