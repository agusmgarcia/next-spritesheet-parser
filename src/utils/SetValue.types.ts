import { type Func } from "@agusmgarcia/react-core";

type SetValue<TValue> = TValue | Func<TValue, [prev: TValue]>;

export default SetValue;
