import { useMediaQuery } from "@agusmgarcia/react-essentials-utils";
import { useMemo } from "react";

import { type Viewport } from "./useViewport.types";

export default function useViewport(): Viewport {
  const mobile = useMediaQuery("(max-width: 767.98px)", true);
  const tablet = useMediaQuery("(min-width: 768px) and (max-width: 1023.98px)");
  const desktop = useMediaQuery(
    "(min-width: 1024px) and (max-width: 1439.98px)",
  );
  const largeDesktop = useMediaQuery("(min-width: 1440px)");

  const value = useMemo<Viewport>(() => {
    if (mobile) return "Mobile";
    if (tablet) return "Tablet";
    if (desktop) return "Desktop";
    if (largeDesktop) return "LargeDesktop";
    return "Mobile";
  }, [desktop, largeDesktop, mobile, tablet]);

  return value;
}
