import { Accordion, Button, Icon, Input, Typography } from "#src/components";

import useConfigurationsItem from "./ConfigurationsItem.hooks";
import type ConfigurationsItemProps from "./ConfigurationsItem.types";

export default function ConfigurationsItem(props: ConfigurationsItemProps) {
  const {
    deleteAnimationOnClick,
    homeOnClick,
    nameOnChange,
    nameValue,
    ...rest
  } = useConfigurationsItem(props);

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
      <Input aria-label="Name" onChange={nameOnChange} value={nameValue} />

      {/* DELETE ANIMATION */}
      <Button
        className="flex w-fit items-center justify-center"
        onClick={deleteAnimationOnClick}
        variant="secondary"
      >
        <Icon variant="trash" />
      </Button>
    </Accordion.Item>
  );
}
