import { Accordion, Button, Icon, Input, Typography } from "#src/components";

import useNormalMapSettingsItem from "./NormalMapSettingsItem.hooks";
import type NormalMapSettingsItemProps from "./NormalMapSettingsItem.types";

export default function NormalMapSettingsItem(
  props: NormalMapSettingsItemProps,
) {
  const {
    normalMapSettingsButtonDisabled,
    normalMapSettingsDisabled,
    normalMapSettingsInvertXId,
    normalMapSettingsInvertYId,
    normalMapSettingsLoading,
    normalMapSettingsOnChange,
    normalMapSettingsOnClick,
    normalMapSettingsValue,
    ...rest
  } = useNormalMapSettingsItem(props);

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
          disabled={normalMapSettingsDisabled}
          min={0.01}
          name="strength"
          onChange={normalMapSettingsOnChange}
          placeholder="Strength"
          step={0.01}
          type="number"
          value={normalMapSettingsValue.strength}
        />
      </label>

      <div className="flex items-center justify-between gap-2 text-white">
        <label htmlFor={normalMapSettingsInvertXId}>Invert R</label>
        <div className="flex w-2/3 justify-center">
          <Input
            checked={normalMapSettingsValue.invertX}
            disabled={normalMapSettingsDisabled}
            id={normalMapSettingsInvertXId}
            name="invertX"
            onChange={normalMapSettingsOnChange}
            type="checkbox"
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 text-white">
        <label htmlFor={normalMapSettingsInvertYId}>Invert G</label>
        <div className="flex w-2/3 justify-center">
          <Input
            checked={normalMapSettingsValue.invertY}
            disabled={normalMapSettingsDisabled}
            id={normalMapSettingsInvertYId}
            name="invertY"
            onChange={normalMapSettingsOnChange}
            type="checkbox"
          />
        </div>
      </div>

      <Button
        className="flex items-center justify-center gap-1"
        disabled={normalMapSettingsButtonDisabled}
        onClick={normalMapSettingsOnClick}
        variant="primary"
      >
        Regenerate
        <Icon
          className={normalMapSettingsLoading ? "animate-spin" : undefined}
          variant="refresh"
        />
      </Button>
    </Accordion.Item>
  );
}
