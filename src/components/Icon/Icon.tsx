import { twMerge } from "tailwind-merge";

import useIcon from "./Icon.hooks";
import type IconProps from "./Icon.types";

export default function Icon(props: IconProps) {
  const { variant, ...rest } = useIcon(props);

  switch (variant) {
    case "backward":
      return (
        <svg {...rest} height={24} viewBox="0 0 24 24" width={24}>
          <path d="M7 4c0.55228 0 1 0.44772 1 1v6.3333l10.2227 -6.81507c0.2297 -0.15317 0.5401 -0.09109 0.6933 0.13868 0.0548 0.08213 0.084 0.17864 0.084 0.27735V19.0657c0 0.2762 -0.2239 0.5 -0.5 0.5 -0.0987 0 -0.1952 -0.0292 -0.2773 -0.0839L8 12.6667V19c0 0.5523 -0.44772 1 -1 1s-1 -0.4477 -1 -1V5c0 -0.55228 0.44772 -1 1 -1Zm10 3.73703L10.6056 12 17 16.263V7.73703Z" />
        </svg>
      );

    case "pause":
      return (
        <svg {...rest} height={24} viewBox="0 0 24 24" width={24}>
          <path d="M6 5h2v14H6V5Zm10 0h2v14h-2V5Z" />
        </svg>
      );

    case "play":
      return (
        <svg {...rest} height={24} viewBox="0 0 24 24" width={24}>
          <path d="M8 18.3915V5.60846L18.2264 12 8 18.3915ZM6 3.80421V20.1957c0 0.7855 0.86395 1.2643 1.53 0.848l13.1132 -8.1957c0.6267 -0.3917 0.6267 -1.3044 0 -1.696L7.53 2.95621c-0.66605 -0.41628 -1.53 0.06257 -1.53 0.848Z" />
        </svg>
      );

    case "roundedPlay":
      return (
        <svg {...rest} height={24} viewBox="0 0 24 24" width={24}>
          <path d="M12 22C6.47715 22 2 17.5228 2 12 2 6.47715 6.47715 2 12 2c5.5228 0 10 4.47715 10 10 0 5.5228 -4.4772 10 -10 10Zm0 -2c4.4183 0 8 -3.5817 8 -8 0 -4.41828 -3.5817 -8 -8 -8 -4.41828 0 -8 3.58172 -8 8 0 4.4183 3.58172 8 8 8ZM10.6219 8.41459l4.8789 3.25261c0.1838 0.1225 0.2335 0.3709 0.1109 0.5547 -0.0293 0.0439 -0.067 0.0816 -0.1109 0.1109l-4.8789 3.2526c-0.1838 0.1226 -0.4322 0.0729 -0.5547 -0.1109 -0.0438 -0.0657 -0.0672 -0.1429 -0.0672 -0.2219V8.74741c0 -0.22092 0.1791 -0.4 0.4 -0.4 0.079 0 0.1562 0.02337 0.2219 0.06718Z" />
        </svg>
      );

    case "spinner":
      return (
        <svg
          {...rest}
          className={twMerge("animate-spin", rest.className)}
          height={24}
          viewBox="0 0 24 24"
          width={24}
        >
          <path d="M12 2c0.5523 0 1 0.44772 1 1v3c0 0.55228 -0.4477 1 -1 1s-1 -0.44772 -1 -1V3c0 -0.55228 0.4477 -1 1 -1Zm0 15c0.5523 0 1 0.4477 1 1v3c0 0.5523 -0.4477 1 -1 1s-1 -0.4477 -1 -1v-3c0 -0.5523 0.4477 -1 1 -1Zm10 -5c0 0.5523 -0.4477 1 -1 1h-3c-0.5523 0 -1 -0.4477 -1 -1s0.4477 -1 1 -1h3c0.5523 0 1 0.4477 1 1ZM7 12c0 0.5523 -0.44772 1 -1 1H3c-0.55228 0 -1 -0.4477 -1 -1s0.44772 -1 1 -1h3c0.55228 0 1 0.4477 1 1Zm12.0711 7.0711c-0.3906 0.3905 -1.0237 0.3905 -1.4142 0l-2.1214 -2.1214c-0.3905 -0.3905 -0.3905 -1.0236 0 -1.4142 0.3906 -0.3905 1.0237 -0.3905 1.4142 0l2.1214 2.1214c0.3905 0.3905 0.3905 1.0236 0 1.4142ZM8.46447 8.46447c-0.39053 0.39052 -1.02369 0.39052 -1.41422 0L4.92893 6.34315c-0.39052 -0.39053 -0.39052 -1.02369 0 -1.41422 0.39053 -0.39052 1.02369 -0.39052 1.41422 0l2.12132 2.12132c0.39052 0.39053 0.39052 1.02369 0 1.41422ZM4.92893 19.0711c-0.39052 -0.3906 -0.39052 -1.0237 0 -1.4142l2.12132 -2.1214c0.39053 -0.3905 1.02369 -0.3905 1.41422 0 0.39052 0.3906 0.39052 1.0237 0 1.4142l-2.12132 2.1214c-0.39053 0.3905 -1.02369 0.3905 -1.41422 0ZM15.5355 8.46447c-0.3905 -0.39053 -0.3905 -1.02369 0 -1.41422l2.1214 -2.12132c0.3905 -0.39052 1.0236 -0.39052 1.4142 0 0.3905 0.39053 0.3905 1.02369 0 1.41422l-2.1214 2.12132c-0.3905 0.39052 -1.0236 0.39052 -1.4142 0Z" />
        </svg>
      );

    case "uploadFile":
      return (
        <svg {...rest} height={24} viewBox="0 0 24 24" width={24}>
          <path d="M8 2v2H5l-0.001 10h14L19 4h-3V2h4c0.5523 0 1 0.44772 1 1v18c0 0.5523 -0.4477 1 -1 1H4c-0.55228 0 -1 -0.4477 -1 -1V3c0 -0.55228 0.44772 -1 1 -1h4Zm10.999 14h-14L5 20h14l-0.001 -4ZM17 17v2h-2v-2h2ZM12 2l4 4h-3v5h-2V6H8l4 -4Z" />
        </svg>
      );
  }
}
