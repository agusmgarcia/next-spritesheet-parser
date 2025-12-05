import { Accordion, Button, Icon, Input, Typography } from "#src/components";

import useConfigurationsItem from "./ConfigurationsItem.hooks";
import type ConfigurationsItemProps from "./ConfigurationsItem.types";

export default function ConfigurationsItem(props: ConfigurationsItemProps) {
  const {
    animationName,
    deleteAnimation,
    deleteAnimationDisabled,
    goToHome,
    setAnimationName,
    setAnimationNameDisabled,
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
        onClick={goToHome}
        variant="secondary"
      >
        <Icon variant="home" />
      </Button>

      {/* NAME */}
      <Input
        aria-label="Name"
        autoComplete="off"
        className="text-center"
        disabled={setAnimationNameDisabled}
        name="name"
        onChange={setAnimationName}
        placeholder="Animation name..."
        value={animationName}
      />

      {/* DELETE ANIMATION */}
      <Button
        className="flex w-fit items-center justify-center"
        disabled={deleteAnimationDisabled}
        onClick={deleteAnimation}
        variant="secondary"
      >
        <Icon variant="trash" />
      </Button>
    </Accordion.Item>
  );
}
