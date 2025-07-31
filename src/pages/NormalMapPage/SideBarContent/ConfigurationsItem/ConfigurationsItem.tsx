import { Accordion, Button, Icon, Input, Typography } from "#src/components";

import useConfigurationsItem from "./ConfigurationsItem.hooks";
import type ConfigurationsItemProps from "./ConfigurationsItem.types";

export default function ConfigurationsItem(props: ConfigurationsItemProps) {
  const { homeOnClick, nameOnChange, nameValue, ...rest } =
    useConfigurationsItem(props);

  return (
    <Accordion.Item
      {...rest}
      className="flex gap-1"
      heading={
        <Typography className="text-white" variant="h2">
          Configurations
        </Typography>
      }
    >
      {/* HOME */}
      <Button
        className="flex w-fit items-center justify-center"
        onClick={homeOnClick}
        variant="secondary"
      >
        <Icon variant="home" />
      </Button>

      {/* NAME */}
      <Input
        aria-label="Name"
        autoComplete="off"
        className="text-center"
        name="name"
        onChange={nameOnChange}
        placeholder="Normal map name..."
        value={nameValue}
      />

      {/* TERMINATION */}
      <Input
        aria-label="Termination"
        className="w-28 text-center"
        disabled={true}
        name="termination"
        value=".normal.png"
      />
    </Accordion.Item>
  );
}
