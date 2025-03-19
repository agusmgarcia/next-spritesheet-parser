import { Accordion, Button, Icon, Input, Typography } from "#src/components";

import useNormalMapSettingsItem from "./NormalMapSettingsItem.hooks";
import type NormalMapSettingsItemProps from "./NormalMapSettingsItem.types";

export default function NormalMapSettingsItem(
  props: NormalMapSettingsItemProps,
) {
  const {
    normalMapSettingsButtonDisabled,
    normalMapSettingsDisabled,
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
          min={0.1}
          name="strength"
          onChange={normalMapSettingsOnChange}
          placeholder="Strength"
          step={0.1}
          type="number"
          value={normalMapSettingsValue.strength}
        />
      </label>

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
