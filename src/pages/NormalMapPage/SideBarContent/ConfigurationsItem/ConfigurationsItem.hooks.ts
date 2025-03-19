import { useRouter } from "next/navigation";
import { useCallback } from "react";

import type ConfigurationsItemProps from "./ConfigurationsItem.types";

export default function useConfigurationsItem(props: ConfigurationsItemProps) {
  const { homeOnClick } = useHome();

  return {
    ...props,
    homeOnClick,
  };
}

function useHome() {
  const { push } = useRouter();

  const homeOnClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    () => push("/"),
    [push],
  );

  return { homeOnClick };
}
