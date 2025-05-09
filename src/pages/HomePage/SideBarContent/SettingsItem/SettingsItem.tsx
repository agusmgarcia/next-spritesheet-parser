import { twMerge } from "tailwind-merge";

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
  } = useSettingsItem(props);

  return (
    <Accordion.Item
      className="flex flex-col gap-1"
      defaultCollapsed={true}
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
          min={0}
          name="delta"
          onChange={settingsOnChange}
          placeholder="Delta"
          type="number"
          value={settingsValue.delta}
        />
      </label>

      <label className="flex items-center justify-between gap-2 text-white">
        Min area
        <Input
          className="w-2/3 text-center"
          disabled={settingsDisabled}
          min={0}
          name="minArea"
          onChange={settingsOnChange}
          placeholder="Min area"
          type="number"
          value={settingsValue.minArea}
        />
      </label>

      <label className="flex items-center justify-between gap-2 text-white">
        Min diversity
        <Input
          className="w-2/3 text-center"
          disabled={settingsDisabled}
          min={0}
          name="minDiversity"
          onChange={settingsOnChange}
          placeholder="Min diversity"
          type="number"
          value={settingsValue.minDiversity}
        />
      </label>

      <label className="flex items-center justify-between gap-2 text-white">
        Max area
        <Input
          className="w-2/3 text-center"
          disabled={settingsDisabled}
          min={0}
          name="maxArea"
          onChange={settingsOnChange}
          placeholder="Max area"
          step={0.1}
          type="number"
          value={settingsValue.maxArea}
        />
      </label>

      <label className="flex items-center justify-between gap-2 text-white">
        Max variation
        <Input
          className="w-2/3 text-center"
          disabled={settingsDisabled}
          min={0}
          name="maxVariation"
          onChange={settingsOnChange}
          placeholder="Max variation"
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
          className={twMerge(settingsLoading ? "animate-spin" : undefined)}
          variant="refresh"
        />
      </Button>
    </Accordion.Item>
  );
}
