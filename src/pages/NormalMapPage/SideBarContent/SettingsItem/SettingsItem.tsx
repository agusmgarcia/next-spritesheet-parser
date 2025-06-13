import { Accordion, Input, Typography } from "#src/components";

import useSettingsItem from "./SettingsItem.hooks";
import type SettingsItemProps from "./SettingsItem.types";

export default function SettingsItem(props: SettingsItemProps) {
  const {
    settingsDisabled,
    settingsInvertXId,
    settingsInvertYId,
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
        Strength
        <Input
          className="w-2/3 text-center"
          disabled={settingsDisabled}
          max={5}
          min={1}
          name="strength"
          onChange={settingsOnChange}
          onMouseUp={settingsOnMouseUp}
          placeholder="Strength"
          step={1}
          type="range"
          value={settingsValue.strength}
        />
      </label>

      <div className="flex items-center justify-between gap-2 text-white">
        <label htmlFor={settingsInvertXId}>Invert R</label>
        <div className="flex w-2/3 justify-center">
          <Input
            checked={settingsValue.invertX}
            disabled={settingsDisabled}
            id={settingsInvertXId}
            name="invertX"
            onChange={settingsOnChange}
            onMouseUp={settingsOnMouseUp}
            type="checkbox"
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 text-white">
        <label htmlFor={settingsInvertYId}>Invert G</label>
        <div className="flex w-2/3 justify-center">
          <Input
            checked={settingsValue.invertY}
            disabled={settingsDisabled}
            id={settingsInvertYId}
            name="invertY"
            onChange={settingsOnChange}
            onMouseUp={settingsOnMouseUp}
            type="checkbox"
          />
        </div>
      </div>
    </Accordion.Item>
  );
}
