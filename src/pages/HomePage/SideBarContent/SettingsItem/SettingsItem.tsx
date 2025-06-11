import { Accordion, Button, Icon, Input, Typography } from "#src/components";

import useSettingsItem from "./SettingsItem.hooks";
import type SettingsItemProps from "./SettingsItem.types";

export default function SettingsItem(props: SettingsItemProps) {
  const {
    settingsButtonDisabled,
    settingsDisabled,
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
        Delta
        <Input
          className="w-2/3 text-center"
          disabled={settingsDisabled}
          min={1}
          name="delta"
          onChange={settingsOnChange}
          placeholder="Delta"
          type="number"
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
          placeholder="Min diversity"
          step={0.01}
          type="number"
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
          placeholder="Max variation"
          step={0.01}
          type="number"
          value={settingsValue.maxVariation}
        />
      </label>

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
