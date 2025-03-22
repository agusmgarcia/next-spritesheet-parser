import {
  type CreateGlobalSliceTypes,
  type Func,
} from "@agusmgarcia/react-core";

type Error = {
  id: string;
  message: string;
};

type ErrorSlice = CreateGlobalSliceTypes.SliceOf<
  "error",
  {
    clearError: Func<void, [id: string]>;
    error: Error | undefined;
    setError: Func<string, [message: string]>;
  }
>;

export default ErrorSlice;
