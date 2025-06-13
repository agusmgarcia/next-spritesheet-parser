import { Accordion, Button, Icon, Input, Typography } from "#src/components";

import useSettingsItem from "./SettingsItem.hooks";
import type SettingsItemProps from "./SettingsItem.types";

export default function SettingsItem(props: SettingsItemProps) {
  const {
    settingsButtonDisabled,
    settingsDisabled,
    settingsInvertXId,
    settingsInvertYId,
    settingsLoading,
    settingsOnChange,
    settingsOnClick,
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
          placeholder="Strength"
          step={1}
          type="number"
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
            type="checkbox"
          />
        </div>
      </div>

      <Button
        className="flex items-center justify-center gap-1"
        disabled={settingsButtonDisabled}
        onClick={settingsOnClick}
        variant="primary"
      >
        Regenerate
        <Icon
          className={settingsLoading ? "animate-spin" : undefined}
          variant="refresh"
        />
      </Button>
    </Accordion.Item>
  );
}
