import { type Func } from "@agusmgarcia/react-core";

type FPSItemProps = {
  fps: number;
  fpsOnChange: React.ChangeEventHandler<HTMLInputElement>;
  minusFPSDisabled: boolean;
  minusFPSOnClick: Func;
  plusFPSDisabled: boolean;
  plusFPSOnClick: Func;
};

export default FPSItemProps;
