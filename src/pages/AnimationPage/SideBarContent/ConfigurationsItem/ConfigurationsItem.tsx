import { Accordion, Button, Icon, Input } from "#src/components";

import useConfigurationsItem from "./ConfigurationsItem.hooks";
import type ConfigurationsItemProps from "./ConfigurationsItem.types";

export default function ConfigurationsItem(props: ConfigurationsItemProps) {
  const { heading, homeOnClick, nameOnChange, nameValue } =
    useConfigurationsItem(props);

  return (
    <Accordion.Item className="flex gap-1" heading={heading}>
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

      {/* // TODO: add delete animation button */}
    </Accordion.Item>
  );
}
